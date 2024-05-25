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

  bodyOfWater: {
    type: String,
  },

  status: {
    type: String,
  },

  description: {
    type: String,
  },

  coverImage: {
    type: Buffer,
  },
  coverImageType: {
    type: String,
  },

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
});

poolSchema.virtual("coverImagePath").get(function () {
  if (this.coverImage != null && this.coverImageType != null) {
    return `data:${
      this.coverImageType
    };charset=utf-8;base64,${this.coverImage.toString("base64")}`;
  }
});

module.exports = mongoose.model("Pool", poolSchema);
