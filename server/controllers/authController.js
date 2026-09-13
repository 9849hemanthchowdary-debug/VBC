const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// ==========================================
// REGISTER
// ==========================================

exports.register = async (req, res) => {

  try {

  console.log("REGISTER BODY:", req.body);

  if (!req.body) {
    return res.status(400).json({
      message: "Request body is missing"
    });
  }

  const {
    name,
    email,
    phone,
    address,
    password
  } = req.body;

    // ==========================================
    // CHECK REQUIRED FIELDS
    // ==========================================

    if (!name || !email || !password) {

      return res.status(400).json({
        message: "Name, email and password are required"
      });

    }


    // ==========================================
    // CHECK IF EMAIL ALREADY EXISTS
    // ==========================================

    const checkSql = `
      SELECT id
      FROM users
      WHERE email = ?
    `;

    db.query(
      checkSql,
      [email],
      async (err, results) => {

        if (err) {

          console.error(
            "CHECK USER ERROR:",
            err
          );

          return res.status(500).json({
            message: "Database error while checking user"
          });

        }


        // ==========================================
        // EMAIL ALREADY EXISTS
        // ==========================================

        if (results.length > 0) {

          return res.status(409).json({
            message: "Email already registered"
          });

        }


        // ==========================================
        // HASH PASSWORD
        // ==========================================

        const hashedPassword =
          await bcrypt.hash(password, 10);


        // ==========================================
        // INSERT USER
        // ==========================================

        const insertSql = `
          INSERT INTO users
          (
            name,
            email,
            phone,
            address,
            password,
            role
          )
          VALUES (?, ?, ?, ?, ?, ?)
        `;

        db.query(
          insertSql,
          [
            name,
            email,
            phone || "",
            address || "",
            hashedPassword,
            "customer"
          ],
          (insertError, result) => {

            if (insertError) {

              console.error(
                "REGISTER DATABASE ERROR:",
                insertError
              );

              return res.status(500).json({
                message: "Unable to register user",
                error: insertError.message
              });

            }


            // ==========================================
            // SUCCESS
            // ==========================================

            return res.status(201).json({
              message: "Registration successful",
              userId: result.insertId
            });

          }
        );

      }
    );

  } catch (error) {

    console.error(
      "REGISTER SERVER ERROR:",
      error
    );

    return res.status(500).json({
      message: "Server error",
      error: error.message
    });

  }

};

// ==========================================
// LOGIN
// ==========================================
exports.login = (req, res) => {

  console.log("LOGIN REQUEST BODY:", req.body);

  if (!req.body) {
    return res.status(400).json({
      message: "Request body is missing. Send JSON body from Postman."
    });
  }

  const {
    email,
    password
  } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "Email and password are required"
    });
  }

  const sql = `
    SELECT *
    FROM users
    WHERE email = ?
  `;

  db.query(sql, [email], async (err, results) => {

    if (err) {
      console.error("LOGIN DATABASE ERROR:", err);

      return res.status(500).json({
        message: "Database error"
      });
    }

    if (results.length === 0) {
      return res.status(401).json({
        message: "Invalid email or password"
      });
    }

    const user = results[0];

    const passwordMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!passwordMatch) {
      return res.status(401).json({
        message: "Invalid email or password"
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d"
      }
    );

    return res.status(200).json({
      message: "Login successful",
      token: token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role
      }
    });

  });
};
