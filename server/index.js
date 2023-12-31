const express = require("express");
const app = express();

const port = process.env.PORT || 4000;
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
const connectDB = require("./db.config");
const Razorpay = require("razorpay");
const crypto = require("./Order.modules");
const { OrderModel } = require("./Order.modules");

var razorpay = new Razorpay({
  key_id: "rzp_test_xZgvhQhDPAIcFr",
  key_secret: "XmoSwyMfXGvUZc8GafZFTNmGff",
});

//connection
//connectDB;

//middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.urlencoded({ extended: false }));

const uri = "mongodb://localhost:27017/bookStore";

mongoose
  .connect(uri)
  .then(function () {
    console.log("database connected");
  })
  .catch(function () {
    console.log("error");
  });

//password->yDGIImrswjTfmB5r
// mongodb

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

//Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    //create a collection of documents
    const bookCollections = client.db("BookInventory").collection("books");

    //insert a book to the db: post method

    app.post("/upload-book", async (req, res) => {
      const data = req.body;
      const result = await bookCollections.insertOne(data);
      res.send(result);
    });

    //get all books from the database
    app.get("/all-books", async (req, res) => {
      const books = bookCollections.find();
      const result = await books.toArray();
      res.send(result);
    });

    //update a book data: patch or update methods
    app.patch("/book/:id", async (req, res) => {
      const id = req.params.id;
      // console.log(id);
      const updateBookData = req.body;
      const filter = { _id: new ObjectId(id) };
      const updateDoc = {
        $set: {
          ...updateBookData,
        },
      };
      const options = { upsert: true };
      //  update
      const result = await bookCollections.updateOne(
        filter,
        updateDoc,
        options
      );
      res.send(result);
    });

    //delete a book data
    app.delete("/book/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const result = await bookCollections.deleteOne(filter);
      res.send(result);
    });

    //find by category
    app.get("/all-books", async (req, res) => {
      let query = {};
      if (req.query?.category) {
        query = { category: req.query.category };
      }
    });

    //to get single book data
    app.get("/book:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const result = await bookCollections.findOne(filter);
      res.send(result);
    });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    //await client.close();
  }
}
run().catch(console.dir);

//api call here
app.post("/payment/checkout", async (req, res) => {
  const { name, amount } = req.body;
  const order = await razorpay.orders.create({
    amount: Number(amount * 100), // amount in the smallest currency unit
    currency: "INR",
  });

  await OrderModel.create({
    order_id: order.id,
    name: name,
    amount: amount,
  });

  console.log({ order });
  res.json(order);
});

app.post("/payment/payment-verification", async (req, res) => {
  const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
    req.body;
  const body_data = razorpay_order_id + " " + razorpay_payment_id;

  const expect = crypto
    .createHmac("sha256", "XmoSwyMfXGvUZc8GafZFTNmGff")
    .update(body_data)
    .diget("hex");
  const isValid = expect === razorpay_signature;
  if (isValid) {
    await OrderModel.findOne(
      { order_id: razorpay_order_id },
      {
        $set: { razorpay_order_id, razorpay_payment_id, razorpay_signature },
      }
    );
    res.redirect(
      `http://localhost:3000/success?payment_id=${razorpay_payment_id}`
    );
    return;
  } else {
    res.redirect("http://localhost:3000/failed");
    return;
  }

  await OrderModel.create({
    order_id: order.id,
    name: name,
    amount: amount,
  });

  console.log({ order });
  res.json(order);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
