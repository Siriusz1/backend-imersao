import { getTodosPosts, criarPost, atualizarPost }from "../models/postsModel.js";
import fs from "fs";
import gerarDescricaoComGemini from "../services/geminiService.js";

export async function  listarPosts(req, res){
    const posts = await getTodosPosts();
    res.status(200).json(posts);
  }

export async function postarNovoPost(req, res) {
  const novoPost = req.body;
  //O try é usado para tentar fazer a conexão com banco de dados e impede que a aplicação congele se não conseguir.
  try {
     const postCriado = await criarPost(novoPost)
     res.status(200).json(postCriado);
  } catch (erro){
    console.erro(erro.message);
    res.status(500).json({"Erro":"Falha na requisição"})
  }
}

export async function uploadImagem(req, res) {
  const novoPost = {
    descricao: "",
    imgUrl: req.file.originalname,
    alt:""
  }
  //O try é usado para tentar fazer a conexão com banco de dados e impede que a aplicação congele se não conseguir.
  try {
     const postCriado = await criarPost(novoPost);
     const imagemAtualizada = `uploads/${postCriado.insertedId}.png`
     fs.renameSync(req.file.path, imagemAtualizada)
     res.status(200).json(postCriado);
  } catch (erro){
    console.erro(erro.message);
    res.status(500).json({"Erro":"Falha na requisição"})
  }
}

export async function atualizarNovoPost(req, res) {
  const id = req.params.id;
  const urlImagem = `http://localhost:3000/${id}.png`
  //O try é usado para tentar fazer a conexão com banco de dados e impede que a aplicação congele se não conseguir.
  try {
    const imgBuffer = fs.readFileSync(`uploads/${id}.png`);
    const descricao = await gerarDescricaoComGemini(imgBuffer);
    const post = {
      imgUrl: urlImagem,
      descricao: descricao,
      alt: req.body.alt
    }
    const postCriado = await atualizarPost(id, post);
    res.status(200).json(postCriado);
 } catch (erro){
   console.erro(erro.message);
   res.status(500).json({"Erro":"Falha na requisição"})
 }
}