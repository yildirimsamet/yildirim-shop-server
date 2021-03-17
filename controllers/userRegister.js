const User = require("../models/User");
const bcrypt = require("bcryptjs");
const dbConnect = require("../utils/dbConnect");
const sendMail = require("../utils/sendMail");
const userRegister = async (req, res, next) => {
  if (req.method === "POST") {
    const { email, password, name, surname, address, number } = req.body;

    if (!email || !password || !name || !surname || !address || !number) {
      return res.json({
        success: false,
        data: "Email ve parola boş bırakılamaz.",
      });
    }
    if (password.length < 6) {
      return res.json({
        success: false,
        data: "Parola 6 karekterden kısa olamaz.",
      });
    }
    if (address.length < 15) {
      return res.json({
        success: false,
        data: "Adres bilgisi 15 karekterden kısa olamaz.",
      });
    }
    if (number.length !== 13) {
      return res.json({
        success: false,
        data: "Lütfen geçerli bir telefon numarası giriniz.",
      });
    }
    if (name.length < 3 || surname.length < 2) {
      return res.json({
        success: false,
        data: "Lütfen geçerli bir İsim/Soyisim giriniz.",
      });
    }
    dbConnect();
    const isAlreadyuser = await User.findOne({ email });
    if (isAlreadyuser) {
      return res.json({
        success: false,
        data: "Emaile ait bir kullanıcı zaten var",
      });
    }
    try {
      const hashedPass = bcrypt.hashSync(password, 10);
      const newUser = await User.create({
        email,
        password: hashedPass,
        name,
        surname,
        address,
        number,
      });
      await sendMail(newUser.email, newUser._id);
      res.json({
        success: true,
        data: { email, name, surname, address, number },
      });
    } catch (error) {
      res.json({ success: false, data: "Kullanıcı oluşturma başarısız." });
    }
  } else {
    res.json({ success: false, data: "Cannot GET/PUT/DELETE" });
  }
};
module.exports = userRegister;
