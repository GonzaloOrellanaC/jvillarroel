import React, { useEffect, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import CircularProgress from '@mui/material/CircularProgress';
import LinkPreview from './LinkPreview';

const ADMIN_API = `${import.meta.env.VITE_API_URL}/auth/login`;
const NEWS_API = `${import.meta.env.VITE_API_URL}/news`;

interface AdminPanelProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ open, setOpen }) => {
  const [isLogged, setIsLogged] = useState(!!localStorage.getItem('admin_token'));
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  // Modal step: 0 = none, 1 = select type, 2 = fill form, 3 = loading
  const [modalStep, setModalStep] = useState<0 | 1 | 2 | 3>(0);

  // Cuando se abre el modal, si ya está logueado, ir directo a selección de tipo
  useEffect(() => {
    if (open) {
      const token = localStorage.getItem('admin_token');
      setIsLogged(!!token);
      if (token) {
        setModalStep(1);
      } else {
        setModalStep(0);
      }
    }
  }, [open]);
  const [newsType, setNewsType] = useState<'text' | 'text_images' | 'text_video' | 'link'>('text');
  // Campos estructurados para la noticia
  const [epigrafe, setEpigrafe] = useState('');
  const [titular, setTitular] = useState('');
  const [bajada, setBajada] = useState('');
  const [lead, setLead] = useState('');
  const [cuerpo, setCuerpo] = useState('');
  const [newsText, setNewsText] = useState(''); // legacy, para compatibilidad
  const [newsImages, setNewsImages] = useState<FileList | null>(null);
  const [newsVideo, setNewsVideo] = useState<File | null>(null);
  const [newsMsg, setNewsMsg] = useState('');
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [newsLink, setNewsLink] = useState('');
  const [linkPreview, setLinkPreview] = useState<{ title?: string; image?: string; description?: string } | null>(null);
  const [linkLoading, setLinkLoading] = useState(false);
  // Obtener preview del link
  useEffect(() => {
    if (!newsLink || !newsLink.startsWith('http')) {
      setLinkPreview(null);
      return;
    }
    setLinkLoading(true);
    const timeout = setTimeout(() => {
      fetch(`${import.meta.env.VITE_API_URL}/link-preview`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: newsLink })
      })
        .then(res => res.json())
        .then(data => setLinkPreview(data))
        .catch(() => setLinkPreview(null))
        .finally(() => setLinkLoading(false));
    }, 600);
    return () => clearTimeout(timeout);
  }, [newsLink]);

  // Eliminado el efecto de CustomEvent

  const handleLogin = async () => {
    setLoginError('');
    try {
      const res = await fetch(ADMIN_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      if (!res.ok) throw new Error('Credenciales incorrectas');
      const data = await res.json();
      localStorage.setItem('admin_token', data.token);
      setIsLogged(true);
      setEmail('');
      setPassword('');
      alert('¡Login exitoso! Elige el tipo de publicación.');
      setModalStep(1);
      setTimeout(() => {
        const fab = document.getElementById('admin-fab');
        if (fab) {
          fab.classList.add('ring', 'ring-yellow-400', 'ring-offset-2');
          setTimeout(() => fab.classList.remove('ring', 'ring-yellow-400', 'ring-offset-2'), 3000);
        }
      }, 300);
    } catch (e: any) {
      setLoginError(e.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    setIsLogged(false);
    setOpen(false);
    setModalStep(0);
    window.location.reload();
  };

  const handleNewsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('admin_token');
    if (!token) return;
    setNewsMsg('');
    setModalStep(3); // show loading
    try {
      // 1. Subir imágenes
      let imageUrls: string[] = [];
      if (newsType === 'text_images' && newsImages && newsImages.length > 0) {
        for (let i = 0; i < newsImages.length && i < 4; i++) {
          const imgForm = new FormData();
          imgForm.append('file', newsImages[i]);
          const res = await fetch(`${import.meta.env.VITE_API_URL}/upload`, {
            method: 'POST',
            body: imgForm,
            headers: { 'Authorization': 'Bearer ' + token }
          });
          if (!res.ok) throw new Error('Error al subir imagen');
          const data = await res.json();
          imageUrls.push(data.url);
        }
      }
      // 2. Subir video
      let videoUrl = '';
      if (newsType === 'text_video' && newsVideo) {
        const vidForm = new FormData();
        vidForm.append('file', newsVideo);
        const res = await fetch(`${import.meta.env.VITE_API_URL}/upload`, {
          method: 'POST',
          body: vidForm,
          headers: { 'Authorization': 'Bearer ' + token }
        });
        if (!res.ok) throw new Error('Error al subir video');
        const data = await res.json();
        videoUrl = data.url;
      }
      // 3. Enviar noticia con campos estructurados
      const body: any = {
        type: newsType,
      };
      if (newsType !== 'link') {
        body.epigrafe = epigrafe;
        body.titular = titular;
        body.bajada = bajada;
        body.lead = lead;
        body.cuerpo = cuerpo;
      }
      if (imageUrls.length > 0) body.images = imageUrls;
      if (videoUrl) body.video = videoUrl;
  if (newsType === 'link' && newsLink) body.link = newsLink;
      if (newsType === 'link' && linkPreview) body.linkPreview = linkPreview;
      const res = await fetch(NEWS_API, {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });
      if (!res.ok) throw new Error('Error al publicar noticia');
      setNewsMsg('¡Noticia publicada!');
      setTimeout(() => { setOpen(false); setModalStep(0); window.location.reload(); }, 1200);
    } catch (e: any) {
      setNewsMsg(e.message);
      setModalStep(2); // return to form
    }
  };

  // Vista previa dinámica
  useEffect(() => {
    if (newsType === 'text_images' && newsImages && newsImages.length > 0) {
      setPreviewUrl(URL.createObjectURL(newsImages[0]));
    } else if (newsType === 'text_video' && newsVideo) {
      setPreviewUrl(URL.createObjectURL(newsVideo));
    } else {
      setPreviewUrl(null);
    }
    // cleanup
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
    // eslint-disable-next-line
  }, [newsType, newsImages, newsVideo]);

  if (!open) return null;

  // Step 0: login
  if (modalStep === 0) {
    return (
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="xs" fullWidth>
        <DialogTitle>Panel de Administración</DialogTitle>
        <DialogContent>
          <TextField
            label="Email"
            type="email"
            fullWidth
            margin="normal"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <TextField
            label="Contraseña"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          {loginError && <div style={{ color: 'red', marginTop: 8 }}>{loginError}</div>}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancelar</Button>
          <Button onClick={handleLogin} variant="contained" color="primary">Ingresar</Button>
        </DialogActions>
      </Dialog>
    );
  }

  // Step 1: select type
  if (modalStep === 1) {
    return (
      <Dialog open={open} onClose={() => { setOpen(false); setModalStep(0); }} maxWidth="xs" fullWidth>
        <DialogTitle>¿Qué tipo de publicación quieres hacer?</DialogTitle>
        <DialogContent>
          <Button fullWidth variant="contained" color="primary" style={{ marginBottom: 12 }} onClick={() => { setNewsType('text'); setModalStep(2); }}>Solo texto</Button>
          <Button fullWidth variant="contained" color="primary" style={{ marginBottom: 12 }} onClick={() => { setNewsType('text_images'); setModalStep(2); }}>Texto + imágenes</Button>
          <Button fullWidth variant="contained" color="primary" style={{ marginBottom: 12 }} onClick={() => { setNewsType('text_video'); setModalStep(2); }}>Texto + video</Button>
          <Button fullWidth variant="contained" color="primary" onClick={() => { setNewsType('link'); setModalStep(2); }}>Enlace a noticia</Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleLogout}>Cerrar sesión</Button>
        </DialogActions>
      </Dialog>
    );
  }

  // Step 2: show form for selected type
  if (modalStep === 2) {
    return (
      <Dialog open={open} onClose={() => setModalStep(1)} maxWidth="sm" fullWidth>
        <DialogTitle>Nueva Noticia</DialogTitle>
        <DialogContent>
          <form id="news-form" onSubmit={handleNewsSubmit} encType="multipart/form-data">
            {newsType !== 'link' && (
              <>
                <TextField label="Epígrafe o antetítulo" fullWidth margin="normal" value={epigrafe} onChange={e => setEpigrafe(e.target.value)} />
                <TextField label="Titular" fullWidth margin="normal" value={titular} onChange={e => setTitular(e.target.value)} required />
                <TextField label="Bajada o subtítulo" fullWidth margin="normal" value={bajada} onChange={e => setBajada(e.target.value)} />
                <TextField label="Lead o entradilla" fullWidth margin="normal" value={lead} onChange={e => setLead(e.target.value)} />
                <TextField label="Cuerpo de la noticia" fullWidth margin="normal" multiline minRows={4} value={cuerpo} onChange={e => setCuerpo(e.target.value)} required />
              </>
            )}
            {newsType === 'text_images' && (
              <Button variant="outlined" component="label" fullWidth style={{ marginTop: 12 }}>
                Subir imágenes (máx 4)
                <input type="file" accept="image/*" multiple hidden onChange={e => setNewsImages(e.target.files)} />
              </Button>
            )}
            {newsType === 'text_video' && (
              <Button variant="outlined" component="label" fullWidth style={{ marginTop: 12 }}>
                Subir video
                <input type="file" accept="video/mp4,video/webm" hidden onChange={e => setNewsVideo(e.target.files ? e.target.files[0] : null)} />
              </Button>
            )}
            {newsType === 'link' && (
              <TextField
                label="Enlace de noticia"
                type="url"
                fullWidth
                margin="normal"
                value={newsLink}
                onChange={e => setNewsLink(e.target.value)}
                required
              />
            )}
            {newsType === 'link' && newsLink && (
              <LinkPreview url={newsLink} />
            )}
            <div style={{ marginTop: 16 }}>
              <Button type="submit" variant="contained" color="warning" fullWidth disabled={newsType === 'link' && !newsLink}>Publicar</Button>
            </div>
            {newsMsg && <div style={{ marginTop: 8, color: 'green', fontWeight: 600 }}>{newsMsg}</div>}
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setModalStep(1)}>Volver</Button>
          <Button onClick={handleLogout}>Cerrar sesión</Button>
        </DialogActions>
      </Dialog>
    );
  }

  // Step 3: loading spinner
  if (modalStep === 3) {
    return (
      <Dialog open={open} maxWidth="xs" fullWidth>
        <DialogContent style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24, padding: 32 }}>
          <CircularProgress color="warning" />
          <div style={{ fontWeight: 700, color: '#1e3a8a', fontSize: 18 }}>Guardando noticia...</div>
          {newsMsg && <div style={{ color: 'green', fontWeight: 600 }}>{newsMsg}</div>}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleLogout}>Cerrar sesión</Button>
        </DialogActions>
      </Dialog>
    );
  }

  return null;
};

export default AdminPanel;
