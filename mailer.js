const { Resend } = require("resend");

const resend = new Resend("re_KV1CMj7H_8Yy5mCbw32Nvg2PKtZPVb4A1");

async function sendMail(to, link, name) {

    try {

        const data = await resend.emails.send({
            from: "onboarding@resend.dev",
            to: to,
            subject: "Application Received",
            html: `
                <h2>Hello ${name}</h2>
                <p>Your application has been received.</p>
                <a href="${link}">Proceed Here</a>
            `
        });

        console.log(data);

    } catch(err) {
        console.log(err);
    }
}
