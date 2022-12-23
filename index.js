//Require das dependências
const express = require("express")
const path = require("path")
const bodyParser = require("body-parser")
const app = express()
const mongoose = require("mongoose")
//Conectando ao mongoDB
require("./config/database")
const Posts = require("./src/models/posts.js")

//Bodyparser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

//Pasta estática
app.use("/public", express.static(path.join(__dirname, "public")))

//EJS
app.engine("html", require("ejs").renderFile)
app.set("view engine", "html")
app.set("views", path.join(__dirname, "src/views"))

//salvando os caminhos para usar no router
const router = express.Router()
app.use("/", router)
app.use("/:slug", router)

router.get("/", async (req, res) => {
  if(req.query.busca == null) {
    try {
      let posts = await Posts.find({})
      res.status(200).render("pages/home", {posts: posts})
    } catch (error) {
      res.status(500).render("pages/error", {error: "Erro ao exibir a página home"})
    }
  } else {
    try {
      res.status(200).render("pages/busca", {})
    } catch (error) {
      
    }
  }
  
})

router.get("/:slug", async (req, res) => {
  let posts = await Posts.find({})
  Posts.findOneAndUpdate({slug:req.params.slug}, {$inc: {views: 1}}, {new: true}, (err, noticia) => {
    console.log(noticia)
    res.status(200).render("pages/single", {noticia:noticia, posts: posts})
  })
})

//rodando servidor
app.listen(4000, () => {
  console.log("Servidor rodando")
})