import nodemailer from "nodemailer";

export async function handler(event) {
  const { name, email, subject, message } = JSON.parse(event.body);

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });

  try {
    await transporter.sendMail({
      from: `"${name}" <${email}>`,
      to: process.env.RECEIVING_EMAIL,
      subject,
      text: message,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, message: "Email enviado correctamente ✅" }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, error: error.message }),
    };
  }
}
