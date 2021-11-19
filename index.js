const express = require('express');

// Definindo o corpo do requerimento como Json
app.use(express.json());

//    Instalar o MongoDB (npm install mongodb)

//    Impostar o MongoDB
const {MongoClient, ObjectId} = require('mongodb');

//    Realizar a conexão com o o Banco de Dados
const url = "mongodb+srv://vinicin:pQGU7fRiuhxzE523@cluster0.mt4ek.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const dbName =  "ocean-backend-nuvem";

// Função principal (assincrona)
async function main() {
    
    // conexão com o banco de dados
    const client = await MongoClient.connect(url);
    const db = client.db(dbName);

    //    Procurar pelas collection que criamos
    const collection = db.collection('herois');

    const app = express();

    // Requisições
    app.get('/', function (req, res) {
    res.send('Olá Mundo! <a href="herois">Vejas os Heróis</a>');

    });

    let herois = ["Flash", "Batman", "Super Shock", "Ciborg", "Viuva-Negra"];

    // [GET] "/herois" - Read All
    app.get("/herois", async function (req, res) {
        // Acesso ao documento
        const documentos = await collection.find().toArray();

        // Resposta do requerimento
        res.send(documentos);
    });

    // [GET] "/herois/:" - Read Single by ID
    app.get('/herois/:id', async function (req, res) {
        const id = +req.params.id;

        // Buscando o dado com o id
        const item = await collection.findOne({ _id: new ObjectId(id) });

        // Enviando a resposta
        res.send('Aqui está: ' + item);
    });

    // [POST] "/herois/create" - add to array
    app.post("/herois/create", async function (req, res) {
        const item = req.body;

        await collection.insertOne(item);

        res.send(item);
    });

    // [PUT] "/herois/update/:id" - change
    app.put('/herois/update/:id', async function (req, res){
        const id = req.params.id;
        const item = req.body;

        await collection.updateOne(
            { _id: new ObjectId(id) },
            {
                $set: item
            }
        )


        res.send('100% Atualizado')
    });

    // [] "/herois/delete" - remove from array
    app.delete('/herois/delete/:id', async function (req, res) {
        
        await collection.deleteOne({_id: new ObjectId(id)})

        res.send('Removido!');
    });


    app.listen(process.env.PORT || 3000);
}

// Leitura da função principal
main();