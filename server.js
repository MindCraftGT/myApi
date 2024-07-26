const express = require('express');
const mongoose = require('mongoose');
const app = express();
const Product = require('./models/productModel');

//app middleware
app.use(express.json())

//routes
app.get('/', (req, res) => {
    res.send("Hello, customer, you are running your api on port 3000, done by douglas")
})
//get products route
app.get('/products', async(req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

//get specific product using an id
app.get('/products/:id', async(req,res)=>{
    try {
        const {id} = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

//Posting product to the database 
app.post('/products', async(req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(200).json(product);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});
    }
})

//updating existing products in the database
app.put('/products/:id', async(req, res) => {
    try {
       const {id} = req.params;
       const product = await Product.findByIdAndUpdate(id, req.body);
       if(!product){
        return res.status(404).json({message: `Cannot find any product with ID ${id}`}); //cant find product in database
       }
       const updatedProduct = await Product.findById(id);
       res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

//deleting a product
app.delete('/products/:id', async(req, res)=>{
    try {
       const {id} = req.params;
       const product = await Product.findByIdAndDelete(id);
       if(!product){
        res.status(404).json({message: `Cannot find any product with ID ${id}`});
       }
       res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

mongoose.set("strictQuery", false)
mongoose.
connect(`mongodb+srv://dagy:nasa2017@dagyapi.0af7hok.mongodb.net/Node-Api?retryWrites=true&w=majority&appName=DagyApi`)
.then(()=>{
    console.log("Connected to MongoDB")
    app.listen(3000, () => {
        console.log('Successfully connected to port 3000');
    })
}).catch((error)=>{
    console.log(error)
});