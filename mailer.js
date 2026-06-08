require("dotenv").config();
const nodemailer = require("nodemailer");

async function sendMail(to, link, name) {
  try {
    // ✅ SMTP Transporter (FIXED FOR RENDER IPv6 ISSUE)
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      family: 4, // ⭐ IMPORTANT FIX (forces IPv4, solves ENETUNREACH)
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      connectionTimeout: 15000,
      socketTimeout: 15000,
    });

    // Optional: verify connection (good for debugging)
    await transporter.verify();

    // ✅ HTML Email Template
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          
          <p>Dear ${name},</p>

          <p>Greetings from Accenture!</p>

          <p>
            We are pleased to inform you that we have successfully received your application
            for opportunities at Accenture.
          </p>

          <p>
            To proceed further in the recruitment process, please select your preferred role
            by clicking the link below:
          </p>

          <p>
            <a href="${link}"
               style="background:#0a66c2;color:#fff;padding:10px 15px;
               text-decoration:none;border-radius:5px;display:inline-block;">
              Proceed to Next Step
            </a>
          </p>

          <p>
            Kindly complete the process at the earliest to continue with your application.
          </p>

          <p>
            If you face any issues, feel free to contact us.
          </p>

          <br/>

          <p>Best Regards,<br/>
          <strong>Accenture Recruitment Team</strong></p>

        </body>
      </html>
    `;

    // ✅ Mail Options
    const mailOptions = {
      from: `"Accenture Recruitment" <${process.env.EMAIL_USER}>`,
      to: to,
      subject: "Application Received – Accenture",
      html: htmlContent,
    };

    // ✅ Send Email
    const info = await transporter.sendMail(mailOptions);

    console.log("✅ Email sent successfully:", info.messageId);
    return info;

  } catch (error) {
    console.error("❌ Error sending email:", error);
    throw error;
  }
}

module.exports = sendMail;
