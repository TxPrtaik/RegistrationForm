require("dotenv").config();

async function sendMail(to, link, name) {
  try {
    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": process.env.BREVO_API_KEY,
      },
      body: JSON.stringify({
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
        htmlContent: `
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
                  Proceed to Next Step
                </a>
              </p>

              <p>Best Regards,<br/>
              <strong>Accenture Recruitment Team</strong></p>

            </body>
          </html>
        `,
      }),
    });

    const data = await response.json();

    console.log("✅ Email sent:", data);
    return data;

  } catch (err) {
    console.error("❌ Brevo error:", err);
  }
}

module.exports = sendMail;
