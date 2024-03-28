const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const express = require('express');
const cors = require('cors');
require('dotenv').config()
const app = express()
const port = process.env.PORT | 5000

// middleWare
const corsOptions = {
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200,
}
app.use(cors({
    origin: [
        'http://localhost:5173',
        'http://localhost:5174',
        'http://localhost:5175',
        'https://youflixtask.web.app',
        'https://youflixtask.firebaseapp.com'
    ],
    credentials: true
}))
app.use(express.json())
// mongodb
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.60qibw3.mongodb.net/?retryWrites=true&w=majority`;

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
        // await client.connect();
        const taskCollection = client.db('task-collection').collection('tasks')
        const videosCollection = client.db('youflix').collection('videos')

        app.get('/all-videos', async (req,res) => {
            const result = await videosCollection.find().toArray()
            res.send(result)
        })

        
        app.get('/vid/:id', async (req, res) => {
            const id = req.params.id
            console.log(id);
            const query = {_id : new ObjectId(id)}
            const result = await videosCollection.findOne(query)
            res.send(result)
        })





        // Send a ping to confirm a successful connection
        // await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('YouFlix Is Going')
})
app.listen(port, console.log('YouFlix is running'))