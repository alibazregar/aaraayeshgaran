const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categorySchema = new Schema({
  type: {
    type: String,
    required: true,
    values: [
      "eyeMakeup",
      "faceMakeup",
      "hairMakeup",
      "makeupStand",
      "mirrorAndMakeupStand",
      "makeupBoxOrBag",
      "hairCare",
      "skinCare",
      "personalHygiene",
      "electricalHairAndBodyRemoval",
      "electricalSkinAndHairCare",
      "electricalHairStylingEquipment",
      "electricalPumice",
      "aerator",
      "brushAndPadWashMachine",
      "faceBrush",
      "eyelashCurler"
    ],
  },
  name:{type:String, required: true},
});
module.exports = mongoose.model("category", categorySchema);
