import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// API Route para enviar correos usando Gmail SMTP (gratis)

export async function POST(request: NextRequest) {
  try {
    const emailData = await request.json();
    const { to, subject, html, text } = emailData;

    console.log('📧 Intentando enviar correo a:', to);
    console.log('📧 Asunto:', subject);

    // Configuración de Gmail SMTP
    const gmailUser = process.env.GMAIL_USER;
    const gmailAppPassword = process.env.GMAIL_APP_PASSWORD;

    if (!gmailUser || !gmailAppPassword) {
      console.error('❌ Variables de entorno GMAIL_USER o GMAIL_APP_PASSWORD no configuradas');
      return NextResponse.json(
        { 
          success: false,
          error: 'Configuración de Gmail no encontrada. Por favor, configura GMAIL_USER y GMAIL_APP_PASSWORD en las variables de entorno.'
        },
        { status: 500 }
      );
    }

    // Crear transporter de Nodemailer con Gmail
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: gmailUser,
        pass: gmailAppPassword, // Contraseña de aplicación de Gmail
      },
    });

    // Configurar el correo
    const mailOptions = {
      from: {
        name: 'Tienda Navideña',
        address: gmailUser, // Tu correo Gmail
      },
      to: to,
      subject: subject,
      html: html,
      text: text, // Versión de texto plano como alternativa
    };

    // Enviar el correo
    try {
      const info = await transporter.sendMail(mailOptions);
      console.log('✅ Correo enviado exitosamente');
      console.log('📧 Message ID:', info.messageId);
      
      return NextResponse.json({ 
        success: true,
        message: 'Email enviado exitosamente',
        messageId: info.messageId
      });
    } catch (emailError) {
      console.error('❌ Error al enviar correo:', emailError);
      return NextResponse.json(
        { 
          success: false,
          error: emailError instanceof Error ? emailError.message : 'Error desconocido al enviar correo'
        },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error('❌ Error procesando solicitud de correo:', error);
    return NextResponse.json(
      { 
        success: false,
        error: error instanceof Error ? error.message : 'Error desconocido'
      },
      { status: 500 }
    );
  }
}

