import express from "express";
import cors from "cors";
import { executeQuery} from "./Database.js";

const app = express();

app.use(express.json({limit: '50mb'}));
app.use(cors());

let port = process.env.PORT || 3000;

app.get("/veiculos", (req, res) => {
    executeQuery("SELECT * FROM VEICULOS",[],(err, result) => {
        if(err){        
            return res.status(500).json(err);
        } else {
            return res.status(200).json(result);
        }
    });
});

app.get("/veiculos/:id", (req, res) => {
    executeQuery("SELECT * FROM VEICULOS WHERE ID=?",[req.params.id],(err, result) => {
        if(err){        
            return res.status(500).json(err);
        } else {
            return res.status(200).json(result);
        }
    });
});
''
app.delete("/veiculos/:id", (req, res) => {
    executeQuery("DELETE FROM VEICULOS WHERE ID=?",[req.params.id],(err, result) => {
        if(err){        
            return res.status(500).json(err);
        } else {
            return res.status(200).send("OK");
        }
    });
});

app.post("/veiculos", (req, res) => {
    console.log("banco de dados 1");
  let sql = "INSERT INTO VEICULOS(DESCRICAO,PORTAS,COR) VALUES(?,?,?)";
  if (!req.body.id){
    executeQuery(sql,[req.body.descricao, req.body.portas, req.body.cor], function(err, result){
        if(err){
            console.log(err);
            return res.status(500).json(err); 
        } else {

            return res.status(201).send("ok")//json(result);  
        }
    });  
 } else {
    sql = "UPDATE VEICULOS SET DESCRICAO = ?, PORTAS = ?, COR = ? WHERE ID = ?";
    executeQuery(sql,[req.body.descricao, req.body.portas, req.body.cor,req.body.id], function(err, result){
        if(err){
            console.log(err);
            return res.status(500).json(err); 
        } else {

            return res.status(201).send("ok")//json(result);  
        }
    });    
 } 
});

app.listen(port, () => {
    console.log(`Servidor iniciado na porta: ${port}`);
});
