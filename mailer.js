require("dotenv").config();
const brevo = require("@getbrevo/brevo");

async function sendMail(to, link, name) {
  try {
    // ✅ Correct API initialization
    const apiInstance = new brevo.TransactionalEmailsApi();

    // IMPORTANT: set API key correctly
    apiInstance.setApiKey(
      brevo.TransactionalEmailsApiApiKeys.apiKey,
      process.env.BREVO_API_KEY
    );

    // HTML template
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
            To proceed further, click below:
          </p>

          <p>
            <a href="${link}"
               style="background:#0a66c2;color:#fff;padding:10px 15px;
               text-decoration:none;border-radius:5px;display:inline-block;">
              Proceed
            </a>
          </p>

          <p>Best Regards,<br/>
          <strong>Accenture Recruitment Team</strong></p>

        </body>
      </html>
    `;

    // Email payload
    const sendSmtpEmail = {
      sender: {
        name: "Accenture Recruitment",
        email: process.env.BREVO_SENDER_EMAIL,
      },
      to: [
        {
          email: to,
          name: name,
        },
      ],
      subject: "Application Received – Accenture",
      htmlContent: htmlContent,
    };

    // Send email
    const response = await apiInstance.sendTransacEmail(sendSmtpEmail);

    console.log("✅ Email sent:", response.messageId || response);

    return response;

  } catch (error) {
    console.error("❌ Brevo error:", error);
    throw error;
  }
}

module.exports = sendMail;
