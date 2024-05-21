const mongoose = require('mongoose')
const path = require('path')

const coverImageBasePath = 'uploads/poolCovers'

const poolSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true,
  },

  number: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
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

  coverImageName: {
    type: String,
  },

  createdAt: {
    type: Date,
    default: Date.now
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

})

// poolSchema.virtual('coverImagePath').get(function() {
//   if (this.coverImageName != null && this.coverImageType != null) {
//     return `data:${this.coverImageType};charset=utf-8;base64,${this.coverImage.toString('base64')}`
//   }
// })

poolSchema.virtual('coverImagePath').get(function () {
  if (this.coverImageName != null) {
    return path.join('/', coverImageBasePath, this.coverImageName)
  }
})

module.exports = mongoose.model('Pool', poolSchema)
module.exports.coverImageBasePath = coverImageBasePath