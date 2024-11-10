
const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const userProfilePath = path.join(__dirname, 'db', 'perfilusuario.json');

app.get('/api/userProfile', (req, res) => {
  fs.readFile(userProfilePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to read user profile' });
    }
    res.json(JSON.parse(data));
  });
});

app.post('/api/userProfile', (req, res) => {
  fs.writeFile(userProfilePath, JSON.stringify(req.body, null, 2), (err) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to save user profile' });
    }
    res.status(200).json({ message: 'User profile saved successfully' });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});