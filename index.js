const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const port = process.env.PORT || 4000;

const app = express();

//middleware
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.hesma7h.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        const categoriesCollection = client.db('mobiledb').collection('categories');
        const productsCollection = client.db('mobiledb').collection('products');
        const bookingsCollection = client.db('mobiledb').collection('bookings');


        app.get('/categories', async (req, res) => {
            const query = {};
            const categories = await categoriesCollection.find(query).toArray();
            res.send(categories);
        });

        app.get('/categories/:type', async (req, res) => {
            const type = req.params.type;
            const result = await productsCollection.find({ type: type }).toArray();
            res.send(result);
        });

        //booking
        app.post('/bookings', async (req, res) => {
            const bookings = req.body;
            const result = await bookingsCollection.insertOne(bookings);
            res.send(result);

        });

    }
    finally {

    }
}
run().catch(console.log);


app.get('/', (req, res) => {
    res.send('mobile dokan server is running');

});

app.listen(port, () => console.log(`mobile dokan running on ${port}`));