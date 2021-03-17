const mongoose = require("mongoose");
const { Schema } = mongoose;
const ProductSchema = new Schema({
  images: {
    type: Array,
    default: [
      "https://cdn.dsmcdn.com/mweb/master/product-placeholder.6dd40f981c7c0292fec5160d3b067fbb.jpg",
      "https://cdn.dsmcdn.com/mweb/master/product-placeholder.6dd40f981c7c0292fec5160d3b067fbb.jpg",
      "https://cdn.dsmcdn.com/mweb/master/product-placeholder.6dd40f981c7c0292fec5160d3b067fbb.jpg",
    ],
    //default trendyol image bul
  },
  imagePlaceHolder: {
    type: String,
    default:
      "https://cdn.dsmcdn.com/mweb/master/product-placeholder.6dd40f981c7c0292fec5160d3b067fbb.jpg",
  },
  shopName: {
    type: String,
    default: "Bilinmiyor",
  },
  productName: {
    type: String,
    default: "Bilinmiyor",
  },
  price: {
    type: String,
    default: "Bilinmiyor",
  },
  productScore: {
    type: String,
    default: "Bilinmiyor",
  },
  freeCargo: {
    type: Boolean,
    default: false,
  },
  rushDelivery: {
    type: Boolean,
    default: false,
  },
  category: {
    type: String,
  },
  gender: {
    type: String,
    enum: ["Erkek", "Kadın", "Unisex"],
    default: "Unisex",
  },
});
module.exports = mongoose.model("Product", ProductSchema);
