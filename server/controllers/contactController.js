const db = require("../config/db");

exports.createMessage = (req, res) => {
  const { name, email, phone, message } = req.body || {};

  if (!name || !email || !message) {
    return res.status(400).json({ message: "Name, email and message are required." });
  }

  db.query(
    "INSERT INTO contact_messages (name, email, phone, message) VALUES (?, ?, ?, ?)",
    [name.trim(), email.trim().toLowerCase(), phone?.trim() || "", message.trim()],
    (error, result) => {
      if (error) {
        console.error("CREATE MESSAGE ERROR:", error.message);
        return res.status(500).json({ message: "Unable to save your message." });
      }

      return res.status(201).json({
        message: "Thanks! Your message has been saved. We will contact you shortly.",
        messageId: result.insertId
      });
    }
  );
};
