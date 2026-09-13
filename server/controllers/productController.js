const db = require("../config/db");

// ==========================================
// GET ALL PRODUCTS
// ==========================================

exports.getProducts = (req, res) => {

  const sql = `
    SELECT *
    FROM products
    WHERE status = 'active'
    ORDER BY created_at DESC
  `;

  db.query(sql, (err, results) => {

    if (err) {

      console.error("GET PRODUCTS ERROR:", err);

      return res.status(500).json({
        message: "Unable to fetch products"
      });

    }

    res.status(200).json(results);

  });
};


// ==========================================
// GET PRODUCT BY ID
// ==========================================

exports.getProductById = (req, res) => {

  const { id } = req.params;

  const sql = `
    SELECT *
    FROM products
    WHERE id = ?
  `;

  db.query(sql, [id], (err, results) => {

    if (err) {

      console.error("GET PRODUCT ERROR:", err);

      return res.status(500).json({
        message: "Unable to fetch product"
      });

    }

    if (results.length === 0) {

      return res.status(404).json({
        message: "Product not found"
      });

    }

    res.status(200).json(results[0]);

  });
};


// ==========================================
// CREATE PRODUCT
// ==========================================

exports.createProduct = (req, res) => {

  const {
    name,
    description,
    price,
    stock,
    image
  } = req.body;

  if (!name || price === undefined) {

    return res.status(400).json({
      message: "Product name and price are required"
    });

  }

  const sql = `
    INSERT INTO products
    (
      name,
      description,
      price,
      stock,
      image
    )
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      name,
      description || "",
      price,
      stock || 0,
      image || ""
    ],
    (err, result) => {

      if (err) {

        console.error(
          "CREATE PRODUCT ERROR:",
          err
        );

        return res.status(500).json({
          message: "Unable to create product"
        });

      }

      res.status(201).json({
        message: "Product created successfully",
        productId: result.insertId
      });

    }
  );
};


// ==========================================
// UPDATE PRODUCT
// ==========================================

exports.updateProduct = (req, res) => {

  const { id } = req.params;

  const {
    name,
    description,
    price,
    stock,
    image
  } = req.body;

  const sql = `
    UPDATE products
    SET
      name = ?,
      description = ?,
      price = ?,
      stock = ?,
      image = ?
    WHERE id = ?
  `;

  db.query(
    sql,
    [
      name,
      description || "",
      price,
      stock || 0,
      image || "",
      id
    ],
    (err, result) => {

      if (err) {

        console.error(
          "UPDATE PRODUCT ERROR:",
          err
        );

        return res.status(500).json({
          message: "Unable to update product"
        });

      }

      if (result.affectedRows === 0) {

        return res.status(404).json({
          message: "Product not found"
        });

      }

      res.status(200).json({
        message: "Product updated successfully"
      });

    }
  );
};


// ==========================================
// DELETE PRODUCT
// ==========================================

exports.deleteProduct = (req, res) => {

  const { id } = req.params;

  const sql = `
    DELETE FROM products
    WHERE id = ?
  `;

  db.query(
    sql,
    [id],
    (err, result) => {

      if (err) {

        console.error(
          "DELETE PRODUCT ERROR:",
          err
        );

        return res.status(500).json({
          message: "Unable to delete product"
        });

      }

      if (result.affectedRows === 0) {

        return res.status(404).json({
          message: "Product not found"
        });

      }

      res.status(200).json({
        message: "Product deleted successfully"
      });

    }
  );
};
