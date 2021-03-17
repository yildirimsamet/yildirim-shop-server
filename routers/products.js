const express = require("express");
const Product = require("../models/Product");
const dbConnect = require("../utils/dbConnect");
const router = express.Router();
const fetch = require("isomorphic-unfetch");
dbConnect();
// router.get("/addproducts", async (req, res) => {
// const data = await Product.create({
//   images: [],
//   shopName: "asd",
//   productName: "asd",
//   price: "123",
//   productScore: "5",
//   freeCargo: false,
//   rushDelivery: true,
//   category: "samet",
// });
// -----------------------------------------------------------------------
// if (res.products.length > 1) {
//   for (let j = 0; j < res.products.length; j++) {
//     await Product.create({
//       images: res.products[j].images,
//       shopName: res.products[j].brand.name,
//       productName: res.products[j].name,
//       price: res.products[j].price.currentText,
//       productScore: res.products[j].ratingScore.averageRating
//         ? res.products[j].ratingScore.averageRating
//         : "0",
//       freeCargo: res.products[j].variants[0].listings[0].freeCargo,
//       rushDelivery:
//         res.products[j].variants[0].listings[0].rushDelivery,
//       category: res.products[j].category.name,
//       gender: "Erkek",
//     });
//   }
// } else {
//   console.log(
//     "hata --------------------------------------------1 " + i
//   );
// }
//   for (let i = 557351; i < 557352; i++) {
//     try {
//       fetch(
//         `https://public.m.trendyol.com/discovery-mweb-browsinggw-service/api/boutique-detail/boutiques/${i}/kadin?availability=false&pi=3&sort=score&language=tr&storefrontId=1`
//       )
//         .then((resp) => resp.json())
//         .then((resp) => console.log(resp));
//     } catch (error) {}
//   }
//   res.send("sa");
// });
router.get("/", async (req, res) => {
  try {
    const data = await Product.find({});
    res.json({ success: true, data });
  } catch (error) {
    res.json({ success: false, data: "Bir hata oluştu." });
  }
});
router.get("/findbyid/:id", async (req, res) => {
  try {
    const data = await Product.findById(req.params.id);
    res.json({ success: true, data });
  } catch (error) {
    res.json({ success: false, data: "Veriye erişilemedi." });
  }
});
router.get("/erkek/kategoriler", async (req, res) => {
  const data = await Product.distinct("category", { gender: "Erkek" });
  res.json({ success: true, data });
});
router.get("/kadin/kategoriler", async (req, res) => {
  const data = await Product.distinct("category", { gender: "Kadın" });
  res.json({ success: true, data });
});

router.get("/pagination/:start", async (req, res) => {
  try {
    const data = await Product.find({})
      .skip(parseInt(req.params.start) * 12)
      .limit(12);
    res.json({ success: true, data });
  } catch (error) {
    res.json({ success: false, data: "Bir hata oluştu." });
  }
});
router.get("/erkek/pagination/:start", async (req, res) => {
  try {
    const data = await Product.find({ gender: "Erkek" })
      .skip(parseInt(req.params.start) * 12)
      .limit(12);
    res.json({ success: true, data });
  } catch (error) {
    res.json({ success: false, data: "Bir hata oluştu." });
  }
});
router.get("/kadin/pagination/:start", async (req, res) => {
  try {
    const data = await Product.find({ gender: "Kadın" })
      .skip(parseInt(req.params.start) * 12)
      .limit(12);
    res.json({ success: true, data });
  } catch (error) {
    res.json({ success: false, data: "Bir hata oluştu." });
  }
});
// router.get("/:kategori", async (req, res) => {
//   try {
//     const data = await Product.find({
//       productName: { $regex: req.params.kategori, $options: "i" },
//     });
//     res.json({ success: true, data });
//   } catch (error) {
//     res.json({ success: false, data: "Bir hata oluştu." });
//   }
// });
router.get("/kadin/:kategori/:start", async (req, res) => {
  try {
    const data = await Product.find({
      gender: "Kadın",
      category: { $regex: `${req.params.kategori}`, $options: "i" },
    })
      .skip(parseInt(req.params.start) * 12)
      .limit(12);
    res.json({ success: true, data });
  } catch (error) {
    res.json({ success: false, data: "Bir hata oluştu." });
  }
});
router.get("/erkek/:kategori/:start", async (req, res) => {
  try {
    const data = await Product.find({
      gender: "Erkek",
      category: { $regex: `${req.params.kategori}`, $options: "i" },
    })
      .skip(parseInt(req.params.start) * 12)
      .limit(12);
    res.json({ success: true, data });
  } catch (error) {
    res.json({ success: false, data: "Bir hata oluştu." });
  }
});
router.get("/brand/:brand/:start", async (req, res) => {
  try {
    const data = await Product.find({
      shopName: { $regex: req.params.brand, $options: "i" },
    })
      .skip(parseInt(req.params.start) * 12)
      .limit(12);
    res.json({ success: true, data });
  } catch (error) {
    res.json({ success: false, data: "Bir hata oluştu." });
  }
});
// router.get("/brand/erkek/:brand", async (req, res) => {
//   try {
//     const data = await Product.find({
//       shopName: { $regex: req.params.brand, $options: "i" },
//       gender: "Erkek",
//     });
//     res.json({ success: true, data });
//   } catch (error) {
//     res.json({ success: false, data: "Bir hata oluştu." });
//   }
// });
// router.get("/brand/kadin/:brand", async (req, res) => {
//   try {
//     const data = await Product.find({
//       shopName: { $regex: req.params.brand, $options: "i" },
//       gender: "Kadın",
//     });
//     res.json({ success: true, data });
//   } catch (error) {
//     res.json({ success: false, data: "Bir hata oluştu." });
//   }
// });
router.post("/deletebyid", async (req, res) => {
  try {
    const data = await Product.findByIdAndDelete(req.body.id);
    res.json({ success: true, data });
  } catch (error) {
    res.json({ success: false, data: "Bir hata oluştu." });
  }
});
module.exports = router;
