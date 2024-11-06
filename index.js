const express = require("express");
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");

const app = express();
const port = process.env.PORT || 5000;
const cors =require("cors");


app.use(cors());
app.use(express.json());
app.get('/', (req, res) => {
  res.send('Hay gays this is jotheesh');
})



const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = "mongodb+srv://jotheeshjo22:L7la16MVI9ie9N9A@cluster0.chdq0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const menColleciton = client.db("crud").collection("mens");



    // POST Method
    app.post("/men", async( req,res) =>{
        const data = req.body;
        const result = await menColleciton.insertOne(data);
        res.send(result);
    })


    // GET Method
    app.get("/getMen", async(req,res) => {
        const product =  await menColleciton.find().toArray();
        res.send(product);
    })


    // GET an single id method 
    app.get("/men/:id", async (req,res) => {
        const id = req.params.id;
        const filter = {_id: new ObjectId(id)};
        const result = await menColleciton.findOne(filter);
        res.send(result);
    })


    // PUTCH METHOD 
    app.patch("/patchmen/:id", async(req,res) => {
        const id = req.params.id;
        const update = req.body;
        const filter = {_id: new ObjectId(id)};
        const updatedoc ={
            $set:{
                ...update
            }
        };
        const option = {update:true};
        const result = await menColleciton.updateOne(filter,updatedoc,option);
        res.send(result);
    })


    // DELETED METHOD
    app.delete("/deletemen/:id", async(req,res) => {
        const id = req.params.id;
        const filter = {_id: new ObjectId(id)}
        const result = await menColleciton.deleteOne(filter);
        res.send(200).json({success: true,message: "The data is deleted", result});
    })


    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.listen(port, () => {
    console.log(`listing port on ${port}`)
});
