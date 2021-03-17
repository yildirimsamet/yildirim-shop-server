const nodemailer = require("nodemailer");
async function sendMail(usermail, userid) {
  try {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "login",
        user: "sametyildirimtest@gmail.com",
        pass: process.env.EMAIL_PASS,
      },
    });

    let info = await transporter.sendMail({
      from: "sametyildirimtest@gmail.com",
      to: usermail,
      subject: "Email aktivasyon",
      text: "Email aktivasyon",
      html: `<div>
        <h1>Yildirim Shop Hesap Aktive</h1>
          <p><a href='${process.env.WEBSITE}/${userid}'>Aktivasyon Linki</a></p>
          <p>Yada bu linke gidin ' ${process.env.WEBSITE}/${userid} ' </p>
          </div>
          `,
    });

    console.log("Message sent: %s", info.messageId);
  } catch (error) {
    console.log("Mail gönderilemedi");
  }
}

module.exports = sendMail;
