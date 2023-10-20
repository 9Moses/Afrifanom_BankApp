const pool = require("../db_conn/db");
const express = require("express");

const router = express.Router();

//login Bank Teller
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const result = await pool.query(
      "SELECT * FROM users WHERE username = $1 AND password = $2",
      [username, password]
    );

    if (result.rows.length > 0) {
      const responsePayload = {
        message: "Login successful. Redirect to the next page.",
        //username: user.username, // Include the username here
      };

      res.status(201).send(responsePayload);
    } else {
      res.send("Invalid credentials");
    }
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).send({ message: "An error occurred", payload: null });
  }
});

// Create a Post route for Account Details
// Define a function to encrypt the account number
const encryptAccountNumber = (accountNumber) => {
  return (
    accountNumber.substring(0, 3) +
    "****" +
    accountNumber.substring(accountNumber.length - 3)
  );
};

router.post("/accounts", async (req, res) => {
  const { account_name, account_number } = req.body;
  const account_balance = parseInt(req.body.account_balance);

  // Check if the account number is not more than 15 characters
  if (account_number.length > 15) {
    return res
      .status(400)
      .json({ error: "Account number should not exceed 15 characters" });
  }

  const encryptedAccountNumber = encryptAccountNumber(account_number);
  try {
    // Query to insert data from the database

    const insertQuery = `INSERT INTO account1 (account_name, account_number, account_balance) VALUES ($1, $2, $3) RETURNING id`;

    const resultDb = await pool.query(insertQuery, [
      account_name,
      encryptedAccountNumber,
      account_balance,
    ]);

    if (resultDb.rowCount === 1) {
      res.status(201).json({
        message: "Data inserted successfully",
        insertedId: resultDb.rows[0].id,
      });
    } else {
      res.status(500).json({ message: "Data insertion failed" });
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Create a GET route for fetching Account Details
router.get("/account_data", async (req, res) => {
  try {
    // Query to retrieve text and PDF data from the database
    const query =
      "SELECT id, account_name, account_number, account_balance FROM account1";

    const result = await pool.query(query);

    // Map the results to a format suitable for sending to the frontend
    const data = result.rows.map((row) => ({
      id: row.id,
      account_name: row.account_name,
      account_number: row.account_number,
      account_balance: row.account_balance,
    }));

    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//Create a Post for deposit
router.post("/deposit", async (req, res) => {
  const accountName = req.body.account_name;
  const amount = parseInt(req.body.account_balance);

  console.log("--acc_name", accountName);
  console.log("--amount", amount);
  try {
    // Fetch current balance from the database
    const selectQuery = `SELECT account_balance FROM account1 WHERE account_name = $1`;
    const result = await pool.query(selectQuery, [accountName]);

    if (result.rowCount === 1) {
      const currentBalance = result.rows[0].account_balance;
      const newBalance = currentBalance + amount;

      // Update the account balance in the database
      //const selectQuery = `SELECT account_balance FROM account WHERE account_name = $1`;
      const updateQuery = `UPDATE account1 SET account_balance = $1 WHERE  account_name= $2`;
      await pool.query(updateQuery, [newBalance, accountName]);

      res.status(200).json({
        message: `Deposit of $${amount} successful. New balance is $${newBalance}.`,
      });
    } else {
      res.status(404).json({ error: "Account not found" });
    }
  } catch (error) {
    console.error("Error depositing amount:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/withdrawal", async (req, res) => {
  const accountName = req.body.account_name;
  const amount = parseInt(req.body.account_balance);

  try {
    // Fetch current balance from the database
    const selectQuery = `SELECT account_balance FROM account1 WHERE account_name = $1`;
    const result = await pool.query(selectQuery, [accountName]);

    if (result.rowCount === 1) {
      const currentBalance = result.rows[0].account_balance;

      if (amount <= currentBalance) {
        const newBalance = currentBalance - amount;

        // Update the account balance in the database
        const updateQuery = `UPDATE account1 SET account_balance = $1 WHERE account_name = $2`;
        await pool.query(updateQuery, [newBalance, accountName]);

        res.status(200).json({
          message: `Withdrawal of $${amount} successful. New balance is $${newBalance}.`,
        });
      } else {
        res.status(400).json({ error: "Insufficient funds" });
      }
    } else {
      res.status(404).json({ error: "Account not found" });
    }
  } catch (error) {
    console.error("Error withdrawing amount:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//Delete an Account
router.delete("/account/:id", async (req, res) => {
  const accountId = parseInt(req.params.id);

  try {
    // Query to delete an account based on its ID
    const deleteQuery = `DELETE FROM account1 WHERE id = $1`;
    const result = await pool.query(deleteQuery, [accountId]);

    if (result.rowCount === 1) {
      res.status(200).json({
        message: `Account with ID ${accountId} deleted successfully.`,
      });
    } else {
      res.status(404).json({ error: `Account with ID ${accountId} not found` });
    }
  } catch (error) {
    console.error("Error deleting account:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//End of Day report

module.exports = router;
