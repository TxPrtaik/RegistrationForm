require("dotenv").config();
const brevo = require("@getbrevo/brevo");

async function sendMail(to, link, name) {
  try {
    // ✅ Brevo API setup
    let apiInstance = new brevo.TransactionalEmailsApi();

    apiInstance.setApiKey(
      brevo.TransactionalEmailsApiApiKeys.apiKey,
      process.env.BREVO_API_KEY
    );

    // ✅ HTML Email Template (same design as your Nodemailer version)
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

    // ✅ Email payload
    let sendSmtpEmail = new brevo.SendSmtpEmail();

    sendSmtpEmail.subject = "Application Received – Accenture";
    sendSmtpEmail.htmlContent = htmlContent;

    sendSmtpEmail.sender = {
      name: "Accenture Recruitment",
      email: process.env.BREVO_SENDER_EMAIL, // verified sender email
    };

    sendSmtpEmail.to = [
      {
        email: to, // 👈 anyone
        name: name,
      },
    ];

    // ✅ Send email
    const response = await apiInstance.sendTransacEmail(sendSmtpEmail);

    console.log("✅ Email sent successfully:", response);
    return response;

  } catch (error) {
    console.error("❌ Error sending email:", error);
    throw error;
  }
}

module.exports = sendMail;
