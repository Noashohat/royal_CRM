const database = require("./database");
const joi = require("joi");
const fileMgmt = require("../shared/fileMgmt");

module.exports = {
  addProduct: async function (req, res, next) {
    const reqBody = req.body;

    const schema = joi.object({
      name: joi.string().required().min(2).max(100),
      description: joi.string().required().min(2).max(300),
      price: joi.number().required(),
    });

    const { error, value } = schema.validate(reqBody);

    if (error) {
      res.send(`error adding product: ${error}`);
      return;
    }

    const sql =
      "INSERT INTO products(name, description, price)" + " VALUES(?,?,?);";

    try {
      const result = await database.query(sql, [
        reqBody.name,
        reqBody.description,
        reqBody.price,
      ]);
    } catch (err) {
      console.log(err);
      return;
    }

    res.send(`${reqBody.name} added successfully`);
  },

  productsList: async function (req, res, next) {
    //1. [v] add fields in the products html
    //2. [v] get the parameters from the request
    //3. [] validate parameters using joi
    //4. [] if validation failed - return error
    //5. [] if validation succeeded - create map
    //6. [] update sql query with parameters

    const param = req.query;

    const schema = joi.object({
      column: joi.string().valid("name", "price").default("name"),
      sort: joi.string().valid("ASC", "DESC").default("ASC"),
    });

    const { error, value } = schema.validate(param);

    if (error) {
      console.log(error);
      res.status(400).send("ad failed");
      return;
    }

    const fieldsMap = new Map([
      ["name", "products.name"],
      ["email", "products.email"],
    ]);

    const sql = `SELECT * FROM products ORDER BY ${fieldsMap.get(
      value.column
    )} ${value.sort}`;

    try {
      const result = await database.query(sql);
      res.send(result[0]);
    } catch (err) {
      console.log(err);
    }
  },

  // todo: search product by name
  exportProducts: function (req, res, next) {
    const sql =
      "SELECT name,description,price FROM products ORDER BY name ASC;";
    fileMgmt.exportToFile(res, sql, "products");
  },

  // todo: edit product details
  editProduct: async function (req, res, next) {
    // const sql = UPDATE
    res.send("todo update products");
  },

  // todo: delete product
  deleteProduct: async function (req, res, next) {
    // const sql = DELETE
    res.send("todo delete products");
  },

  // todo: search product by name
  searchProducts: async function (req, res, next) {
    // const sql = SELECT WHERE...
    res.send("todo search products");
  },

  // todo: sort products by name...
};
