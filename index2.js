let express = require('express');
let morgan = require('morgan')
let app = express();
let port = 8000

app.use(express.json());
app.use(morgan('dev'))

let data = [
  {
    id: 1,
    nombre: 'Juan',
    usuario: 'juan123',
    pais: 'España'
  },
  {
    id: 2,
    nombre: 'María',
    usuario: 'maria456',
    pais: 'México'
  },
  {
    id: 3,
    nombre: 'Pedro',
    usuario: 'pedro789',
    pais: 'Colombia'
  }
]

app.get("/",(req,res)=>{
    res.send("Hola mundo")
})
app.get("/usuarios/all",(req,res)=>{
    res.status(200).json(data)
})

app.get("/usuarios/:id",(req,res)=>{
    const id_user=req.params.id
    const encontrado = data.find(item=>item.id==id_user)
    if(encontrado){
        res.status(200).json(encontrado)
    }
    else{
        res.status(404).json({message:"No se encontró"})
    }
})

app.post("/usuarios/nuevo", (req, res) => {
    let { id, nombre, usuario, pais } = req.body;
    if (!id || !nombre || !usuario || !pais) { //
      return res.status(400).send('Bad Request');
    }
    data.push({ id, nombre, usuario, pais });
    res.status(201).json(req.body);
  });

  app.put("/usuarios/:id",(req,res)=>{
    const user_body= req.body
    const param=req.params.id
    const encontrado=data.findIndex(item=>item.id==param)
    if(encontrado!=-1){
        data[encontrado]=user_body
        res.status(201).json(data)
    }else{
        res.status(404).json({message:"No se encontró"})
    }
})

app.listen(port,()=>{
    console.log("Servicio escuchando el puerto: ",port)
})