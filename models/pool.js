const mongoose = require("mongoose");

const poolSchema = new mongoose.Schema({
  firstName: {
    type: String,
  },

  lastName: {
    type: String,
  },

  number: {
    type: String,
  },

  email: {
    type: String,
  },

  altNumber: {
    type: String,
  },

  altEmail: {
    type: String,
  },

  bodyOfWater: {
    type: String,
  },

  status: {
    type: String,
  },

  description: {
    type: String,
  },

  images: [
    {
      image: Buffer,
      imageType: String,
    },
  ],

  createdAt: {
    type: Date,
    default: Date.now,
  },

  system: {
    type: String,
  },

  pump: {
    type: String,
  },

  filter: {
    type: String,
  },

  heater: {
    type: String,
  },

  size: {
    type: String,
  },

  otherEquipment: {
    type: String,
  },

  hhlBuild: {
    type: String,
  },

  brand: {
    type: String,
  },

  make: {
    type: String,
  },

  assignedTo: {
    type: String,
  },

  conditionHt: {
    type: String,
  },
  conditionPool: {
    type: String,
  },

  yearToDate1: {
    type: String,
  },

  yearToDate2: {
    type: String,
  },

  yearToDate3: {
    type: String,
  },
});

poolSchema.virtual("coverImagePath").get(function () {
  if (this.images != null && this.images.length > 0) {
    return this.images.map(
      (img) =>
        `data:${img.imageType};charset=utf-8;base64,${img.image.toString(
          "base64"
        )}`
    );
  }
  return [];
});

module.exports = mongoose.model("Pool", poolSchema);
