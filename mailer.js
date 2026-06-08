const nodemailer = require("nodemailer");

async function sendMail(to,link,name) {

    // Create transporter
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "recrutire.accentrue@gmail.com",
            pass: "kvac hitr altn romz"
        }
    });

    // Email options
    const mailOptions = {
        from: "recrutire.accentrue@gmail.com",
        to: to,
        subject: "Application Received – Proceed to Select Your Role",
        text:`Dear ${name},

Greetings from Accenture!

We are pleased to inform you that we have successfully received your application for opportunities at Accenture.

To proceed further in the recruitment process, please select your preferred role by clicking the link below:

Proceed Link: ${link}

Kindly complete the process at the earliest to continue with your application.

If you face any issues, feel free to contact us.

Best Regards,
Accenture Recruitment Team`
    };

    // Send mail
    const info = await transporter.sendMail(mailOptions);

    console.log("Email sent:", info.response);
}
module.exports=sendMail;
//sendMail().catch(console.error);