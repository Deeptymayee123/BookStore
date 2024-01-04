const express = require("express");
const app = express();

const port = process.env.PORT || 4000;
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
// const connectDB = require('./db.config');
const Razorpay = require("razorpay");
const crypto = require("crypto");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const Book = require("./models/Book");
const Order = require("./models/Order");

var razorpay = new Razorpay({
  key_id: "rzp_test_IhNkeFHuQGPcEa",
  key_secret: "00sV8WpG8PUyQstKqRI6g7ty",
});

//middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));

const uri = "mongodb://localhost:27017/bookStore";

mongoose
  .connect(uri)
  .then(function () {
    console.log("database connected");
  })
  .catch(function (err) {
    console.log("error: ", err.message);
  });

//password->yDGIImrswjTfmB5r
// mongodb

app.get("/", (req, res) => {
  res.send("Hello World!");
});

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
    const bookCollections = client.db("bookStore").collection("books");

    //insert a book to the db: post method
    app.post("/upload-book", async (req, res) => {
      try {
        console.log(req.body);
        const newBook = new Book(req.body);

        const savedBook = await newBook.save();

        return res.status(200).json(savedBook);
      } catch (error) {
        console.log(error);
        return res.status(500).json(error);
      }
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
    app.get("/book/:id", async (req, res) => {
      try {
        console.log(req.params.id);
        const book = await Book.findById(req.params.id);

        // console.log('book: ', book);

        return res.status(200).json(book);
      } catch (error) {
        console.log(error);
        return res.status(500).json(error);
      }
    });

    // payment checkout
    app.post("/payment/checkout", async (req, res) => {
      console.log("hey");
      try {
        const { _id, name, amount } = req.body;

        const order = await razorpay.orders.create({
          amount: Number(amount * 100), // amount in the smallest currency unit
          currency: "INR",
        });

        // console.log('order: ', order);

        const newOrder = new Order({
          amount: order.amount,
          name,
          razorpay_order_id: order.id,
          product_id: _id,
        });

        await newOrder.save();

        return res.status(200).json(order);
      } catch (error) {
        // console.log(error);
        return res.status(500).json({
          error,
          message: "Internal server error",
        });
      }
    });

    // verify payment
    app.post("/payment/payment-verification", async (req, res) => {
      const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
        req.body;

      const body_data = razorpay_order_id + "|" + razorpay_payment_id;

      const expect = crypto
        .createHmac("sha256", "94qCQItFZmIcxgMhRgbHiUlu")
        .update(body_data)
        .digest("hex");

      const isValid = expect === razorpay_signature;

      if (isValid) {
        await Order.findOne(
          { _id: razorpay_order_id },
          {
            $set: {
              razorpay_payment_id,
              razorpay_order_id,
              razorpay_signature,
            },
          }
        );
        res.redirect(
          `http://localhost:5173/success?payment_id=${razorpay_payment_id}`
        );
        return;
      } else {
        res.redirect("http://localhost:5173/failed");
        return;
      }
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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
