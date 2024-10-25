const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/products', { useNewUrlParser: true, useUnifiedTopology: true });

const productSchema = new mongoose.Schema({
    product_code: String,
    name: String,
    description: String,
    price: Number,
    qty: Number,
    date_added: Date
});

const Product = mongoose.model('Product', productSchema);

app.post('/products', async (req, res) => {
    const product = new Product(req.body);
    await product.save();
    res.send(product);
});

app.get('/products', async (req, res) => {
    const products = await Product.find();
    res.send(products);
});

app.put('/products/:id', async (req, res) => {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.send(product);
});

app.delete('/products/:id', async (req, res) => {
    await Product.findByIdAndDelete(req.params.id);
    res.send({ message: 'Product deleted' });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
