const mongoose = require("mongoose")

const postsSchema = mongoose.Schema({
  titulo: {type: String, required:true},
  imagem: String,
  categoria: String,
  conteudo: {type: String, required:true},
  slug: String
})

module.exports = mongoose.model("Posts", postsSchema)