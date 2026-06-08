require("dotenv").config();
const nodemailer = require("nodemailer");

async function sendMail(to, link, name) {
  try {
    // Create transporter (SMTP config)
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // false for 587
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      connectionTimeout: 10000,
      greetingTimeout: 10000,
      socketTimeout: 10000,
    });

    // Verify connection (helps debug on Render)
    await transporter.verify();

    // HTML email content
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          
          <p>Dear ${name},</p>

          <p>Greetings from Accenture!</p>

          <p>
            We are pleased to inform you that we have successfully received your application.
          </p>

          <p>
            To proceed further, please select your preferred role by clicking below:
          </p>

          <p>
            <a href="${link}" 
               style="background:#0a66c2;color:#fff;padding:10px 15px;
               text-decoration:none;border-radius:5px;display:inline-block;">
              Proceed to Next Step
            </a>
          </p>

          <p>
            Kindly complete the process at the earliest.
          </p>

          <br/>

          <p>Best Regards,<br/>
          <strong>Accenture Recruitment Team</strong></p>

        </body>
      </html>
    `;

    // Mail options
    const mailOptions = {
      from: `"Accenture Recruitment" <${process.env.EMAIL_USER}>`,
      to: to,
      subject: "Application Received – Accenture",
      html: htmlContent,
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);

    console.log("Email sent successfully:", info.messageId);

    return info;

  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
}

module.exports = sendMail;
