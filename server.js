//De dentro da pasta express, puxa o express.
import express from "express";
import routes from "./src/routes/postRoutes.js";
//Mock = Dados estão sendo disponibilizados localmente

// É como se esse app representasse o servidor, tudo que for feito, irá chamar o app.
const app = express();
app.use(express.static("uploads"))
routes(app)
app.listen(3000, ()=> {
  console.log("Servidor Escutando...");
});
