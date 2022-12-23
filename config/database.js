const mongoose = require("mongoose")

mongoose.Promise = global.Promise;
mongoose.set("strictQuery", true)

mongoose.connect("mongodb://localhost/portalnode", {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => console.log("Conectado ao mongoDB"))
.catch(err => console.log(err))