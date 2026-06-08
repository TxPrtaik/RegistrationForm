const { Resend } = require("resend");

const resend = new Resend("re_KV1CMj7H_8Yy5mCbw32Nvg2PKtZPVb4A1");

async function sendMail(to, link, name) {

    try {

        const data = await resend.emails.send({
            from: "onboarding@resend.dev",
            to: to,
            subject: "Application Received Accenture",
            html: `
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
      <a href="${link}" style="color: #0a66c2; font-weight: bold;">
        Proceed to Next Step
      </a>
    </p>

    <p>
      Kindly complete the process at the earliest to continue with your application.
    </p>

    <p>
      If you face any issues, feel free to contact us.
    </p>

    <br />

    <p>Best Regards,</p>
    <p><strong>Accenture Recruitment Team</strong></p>

  </body>
</html>
            `
        });

        console.log(data);

    } catch(err) {
        console.log(err);
    }
}
module.exports=sendMail;
