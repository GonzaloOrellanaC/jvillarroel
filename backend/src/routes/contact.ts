import express from 'express';
import nodemailer from 'nodemailer';

const router = express.Router();

// POST /api/contact
router.post('/', async (req, res) => {
  const { name, email, message } = req.body;
  console.log('Contacto recibido:', { name, email, message });
  if (!name || !email || !message) {
    res.status(400).json({ error: 'Todos los campos son obligatorios.' });
  }

  // Configura el transporter de nodemailer (puedes usar Gmail, SMTP, etc.)
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  
  // Email para el destinatario y para el admin
  const mailOptionsAdmin = {
    from: 'contacto@jorgevillarroeldiputado.cl',
    to: 'contacto@jorgevillarroeldiputado.cl',
    subject: `Nuevo mensaje de contacto de ${name}`,
    text: `Nombre: ${name}\nEmail: ${email}\nMensaje: ${message}`,
  };

  const mailOptionsUser = {
    from: 'contacto@jorgevillarroeldiputado.cl',
    to: email,
    subject: 'Gracias por contactarnos',
    text: `Hola ${name},\n\nHemos recibido tu mensaje y te responderemos pronto.\n\nMensaje enviado:\n${message}`,
  };

  try {
    await transporter.sendMail(mailOptionsAdmin);
    await transporter.sendMail(mailOptionsUser);
    res.json({ success: true });
  } catch (err) {
    console.error('Error al enviar correo:', err);
    res.status(500).json({ error: 'No se pudo enviar el correo.' });
  }
});

export default router;
