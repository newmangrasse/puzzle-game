const express = require('express');
const app = express();

// SQL Injection vulnerability
app.get('/user', (req, res) => {
  const userId = req.query.id;
  const query = "SELECT * FROM users WHERE id = " + userId; // Direct concatenation
  // Execute query (vulnerable to SQL injection)
  res.send(query);
});

// Command Injection vulnerability
const { exec } = require('child_process');
app.get('/ping', (req, res) => {
  const host = req.query.host;
  exec('ping -c 4 ' + host, (error, stdout) => { // Unsanitized input
    res.send(stdout);
  });
});

// Path Traversal vulnerability
const fs = require('fs');
app.get('/file', (req, res) => {
  const filename = req.query.name;
  fs.readFile('./files/' + filename, (err, data) => { // No path validation
    res.send(data);
  });
});

// XSS vulnerability
app.get('/search', (req, res) => {
  const searchTerm = req.query.q;
  res.send('<h1>Search results for: ' + searchTerm + '</h1>'); // Unescaped output
});

// Insecure random number generation
app.get('/token', (req, res) => {
  const token = Math.random().toString(36); // Weak randomness
  res.send({ token });
});

app.listen(3000);
