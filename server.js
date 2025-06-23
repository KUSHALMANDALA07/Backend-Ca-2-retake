const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); 


let users = [
  { email: "alice@example.com", password: "alice123" },
  { email: "bob@example.com", password: "bob123" },
  { email: "charlie@example.com", password: "charlie123" },
];

app.put('/update-user', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required." });
  }

  let userFound = false;
  users = users.map(user => {
    if (user.email === email) {
      userFound = true;
      return { email, password };
    }
    return user;
  });

  if (userFound) {
    res.json({ message: "User password updated successfully." });
  } else {
    res.status(404).json({ message: "Email not found" });
  }
});

app.delete('/delete-user', (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required." });
  }

  const initialLength = users.length;
  users = users.filter(user => user.email !== email);

  if (users.length < initialLength) {
    res.json({ message: "User deleted successfully" });
  } else {
    res.status(404).json({ message: "Email not found" });
  }
});

app.get("/", (req, res) => {
  res.send("User Management API is running.");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
