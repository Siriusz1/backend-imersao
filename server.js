//De dentro da pasta express, puxa o express.
import express from "express";
//Mock = Dados estão sendo disponibilizados localmente
const posts = [
  {
    id: 1,
    descricao: "Uma foto teste" ,
    imagem: "https://placecats.com/millie/300/150",
  },
  {
    id: 2,
    descricao: "Gatinho fofo dormindo",
    imagem: "https://placecats.com/millie/300/150",
  },
  {
    id: 3,
    descricao: "Olhar penetrante",
    imagem: "https://placecats.com/millie/300/150",
  },
];

// É como se esse app representasse o servidor, tudo que for feito, irá chamar o app.
const app = express();
app.use(express.json());
app.listen(3000, ()=> {
  console.log("Servidor Escutando...");
});

app.get("/posts", (req, res)=>{
  res.status(200).json(posts)
});

function buscarPostPorID(id){
  return posts.findIndex((post)=>{
    return post.id === Number(id)
  })
}

app.get("/posts/:id", (req, res)=>{
  const index = buscarPostPorID(req.params.id)
  res.status(200).json(posts[index])
});