const mongoose = require("mongoose")

const postsSchema = mongoose.Schema({
  titulo: {type: String, required:true},
  imagem: String,
  categoria: String,
  conteudo: {type: String, required:true},
  slug: String,
  autor: String,
  views: Number
})

module.exports = mongoose.model("Posts", postsSchema)