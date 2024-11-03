const { default: mongoose } = require("mongoose");

const informationSchema = new mongoose.Schema({
  idUser:{},
  documentation:{},
  city: { type: String, trim: true, required: true },
  address: { type: String, trim: true, required: true },
}, {
  timestamps:true,
  collection: 'InformationUser'
})