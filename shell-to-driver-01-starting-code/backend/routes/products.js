const Router = require("express").Router;
const { Decimal128, ObjectId } = require("mongodb");

const { getDB } = require("../db/db");
const router = Router();

const products = [
  {
    name: "Stylish Backpack",
    description:
      "A stylish backpack for the modern women or men. It easily fits all your stuff.",
    price: 79.99,
    image: "http://localhost:3100/images/product-backpack.jpg",
  },
  {
    name: "Lovely Earrings",
    description:
      "How could a man resist these lovely earrings? Right - he couldn't.",
    price: 129.59,
    image: "http://localhost:3100/images/product-earrings.jpg",
  },
  {
    name: "Working MacBook",
    description:
      "Yes, you got that right - this MacBook has the old, working keyboard. Time to get it!",
    price: 1799,
    image: "http://localhost:3100/images/product-macbook.jpg",
  },
  {
    name: "Red Purse",
    description: "A red purse. What is special about? It is red!",
    price: 159.89,
    image: "http://localhost:3100/images/product-purse.jpg",
  },
  {
    name: "A T-Shirt",
    description:
      "Never be naked again! This T-Shirt can soon be yours. If you find that buy button.",
    price: 39.99,
    image: "http://localhost:3100/images/product-shirt.jpg",
  },
  {
    name: "Cheap Watch",
    description: "It actually is not cheap. But a watch!",
    price: 299.99,
    image: "http://localhost:3100/images/product-watch.jpg",
  },
];

// Get list of products products
router.get("/", (req, res, next) => {
  const queryPage = req.query.page;
  const pageSize = 5;
  // let resultProducts = [...products];
  // if (queryPage) {
  //   resultProducts = products.slice(
  //     (queryPage - 1) * pageSize,
  //     queryPage * pageSize
  //   );
  // }
  // res.json(resultProducts);

  getDB()
    .collection("products")
    .find()
    .sort({ price: -1 })
    .map((product) => {
      product.price = product.price.toString();
      return product;
    })
    .skip((queryPage - 1) * pageSize)
    .limit(pageSize)
    .toArray()
    .then((result) => {
      return res.json(result);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

// Get single product
router.get("/:id", (req, res, next) => {
  // const product = products.find((p) => p._id === req.params.id);
  // res.json(product);
  getDB()
    .collection("products")
    .findOne({ _id: new ObjectId(req.params.id) })
    .then((result) => {
      res.json({ ...result, price: result.price.toString() });
    })
    .catch((err) => {
      console.log(err);
    });
});

// Add new product
// Requires logged in user
router.post("", (req, res, next) => {
  const newProduct = {
    name: req.body.name,
    description: req.body.description,
    price: Decimal128.fromString(req.body.price + ""), // store this as 128bit decimal in MongoDB
    image: req.body.image,
  };

  getDB()
    .collection("products")
    .insertOne(newProduct)
    .then((result) => {
      return res.status(201).send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

// Edit existing product
// Requires logged in user
router.patch("/:id", (req, res, next) => {
  const updatedProduct = {
    name: req.body.name,
    description: req.body.description,
    price: Decimal128.fromString(req.body.price + ""), // store this as 128bit decimal in MongoDB
    image: req.body.image,
  };
  getDB()
    .collection("products")
    .updateOne(
      { _id: new ObjectId(req.params.id) },
      {
        $set: {
          ...updatedProduct,
        },
      }
    )
    .then((result) => {
      return res.status(203).json(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

// Delete a product
// Requires logged in user
router.delete("/:id", (req, res, next) => {
  getDB()
    .collection("products")
    .deleteOne({ _id: new ObjectId(req.params.id) })
    .then((result) => {
      res.status(204).json(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
