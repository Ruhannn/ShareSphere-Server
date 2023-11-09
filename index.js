const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.llm45p4.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
async function run() {
  try {
    const serviceCollection = client.db("ShareSphere").collection("services");
    const bookingCollection = client.db("ShareSphere").collection("booking");

    app.post("/add-service", async (req, res) => {
      const formData = req.body;
      const result = await serviceCollection.insertOne(formData);
      res.send(result);
    });

    app.get("/services", async (req, res) => {
      const result = await serviceCollection.find().toArray();
      res.send(result);
    });

    app.get("/service/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await serviceCollection.findOne(query);
      res.send(result);
    });

    app.post("/booking-service", async (req, res) => {
      const bookingData = req.body;
      const result = await bookingCollection.insertOne(bookingData);
      res.send(result);
    });
    console.log("You successfully connected to MongoDB!");
  } finally {
  }
}
run().catch(console.dir);
app.get("/", (req, res) => {
  res.send("i love ayaka");
});
app.listen(port, () => {
  console.log(`Love Ayaka on ${port}`);
});
