import nodemailer from "nodemailer";

const transport = nodemailer.createTransport({
  host: process.env.MAIL_TRAP_HOST,
  port: process.env.MAIL_TRAP_PORT ? parseInt(process.env.MAIL_TRAP_PORT) : 587,
  secure: false,
  auth: {
    user: process.env.MAIL_TRAP_USER,
    pass: process.env.MAIL_TRAP_API_KEY,
  },
});

const sendEmail = async (to: string, subject: string, text: string) => {
  try {
    const info = await transport.sendMail({
      from: "Scriplty  <Scriptly.dev@paramvirsingh.me>",
      to: to,
      subject: subject,
      html: text,
    });
    console.log("Email sent: %s", info.messageId);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

export { sendEmail };
