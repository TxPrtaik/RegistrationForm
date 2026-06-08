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
          <p>Dear ${name},</p>
          <p>Your application is received.</p>
          <a href="${link}">Proceed</a>
        `,
      }),
    });

    const data = await response.json();

    console.log("📩 Brevo Response:", data);

    return data;

  } catch (err) {
    console.error("❌ Send error:", err);
  }
}

module.exports = sendMail;
