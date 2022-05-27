const express = require('express')
const app = express()
const port = 5000
const cors = require('cors')
const bodyParser = require('body-parser')
require('dotenv').config()



//=======================
app.use(cors())
app.use(bodyParser.json())



app.get('/', (req, res) => {
  res.send('Hello World!')
})


//===========================

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.uppua.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
  const collection = client.db("emaJohnStorge").collection("products");
  const Ordercollection = client.db("emaJohnStorge").collection("orders");
  
  app.post('/addProduct', (req,res) =>{
      const product = req.body
      collection.insertOne(product)
      .then(result => {
          console.log(result.insertedCount)
      })
  })

  

  app.get('/products', (req,res) =>{
      collection.find({})
      .toArray((error, documents) =>{
          res.send(documents)
      })
  })

  app.get('/product/:key', (req,res) =>{
    collection.find({key: req.params.key})
    .toArray((error, document) =>{
        res.send(document[0])
    })
})


app.post('/productsByKeys', (req, res) =>{
    const productKeys = req.body
    collection.find({key: {$in: productKeys}})
    .toArray((error, document) =>{
        res.send(document)
    })
})


//=========================
app.post('/addOrder', (req,res) =>{
    const order = req.body
    Ordercollection.insertOne(order)
    .then(result => {
        console.log(result.insertedCount > 0)
    })
})

});




app.listen(process.env.PORT || port)