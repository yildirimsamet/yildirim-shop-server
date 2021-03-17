const dbConnect = require("../utils/dbConnect");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const userLogin = async (req, res, next) => {
  if (req.method === "POST") {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.json({
        success: false,
        data: "Email ve parola boş bırakılamaz.",
      });
    }
    dbConnect();
    try {
      const user = await User.findOne({ email });
      if (user.isBanned === true) {
        return res.json({
          success: false,
          data: "Hesabınız kalıcı olarak engellenmiştir.",
        });
      }
      if (user.isAuthed === false) {
        return res.json({
          success: false,
          data: "Lütfen hesabınızı gelen mailden aktif ediniz.",
        });
      }
      const isPassTrue = await bcrypt.compare(password, user.password);
      if (!isPassTrue) {
        res.json({ success: false, data: "Parolanız yanlış." });
      }
      try {
        const token = jwt.sign(
          {
            _id: user._id,
            email: user.email,
            name: user.name,
            surname: user.surname,
            address: user.address,
            number: user.number,
            isBanned: user.isBanned,
            isAdmin: user.isAdmin,
            websiteAge: user.createdAt,
          },
          process.env.JWT_SECRET,
          { expiresIn: "365d" }
        );
        return res.json({ success: true, token: token });
      } catch (error) {
        return res.json({ success: false, data: "Token oluşturulamadı" });
      }
    } catch (error) {
      return res.json({
        success: false,
        data: "Giriş Yapılamadı / Kullanıcı Bulunamadı.",
      });
    }
  } else {
    res.json({ success: false, data: "Cannot GET/PUT/DELETE" });
  }
};
module.exports = userLogin;
