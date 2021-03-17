const User = require("../models/User");
const dbConnect = require("../utils/dbConnect");
const mongoose = require("mongoose");

const userAuth = async (req, res, next) => {
  const { id } = req.body;
  if (req.method === "POST") {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) {
      return res.json({ success: false, data: "Kullancı id geçerli değil." });
    }
    dbConnect();
    const user = await User.findByIdAndUpdate(id, { isAuthed: true });
    if (!user) {
      return res.json({ success: false, data: "Kullanıcı bulunamadı." });
    }
    if (user) {
      return res.json({
        success: true,
        data: "Hesabınız başarıyla aktifleştirildi.",
      });
    }
  } else {
    res.json({ success: false, data: "Cannot GET/PUT/DELETE" });
  }
};
module.exports = userAuth;
