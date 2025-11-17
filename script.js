const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;
let arr=[];

// מאפשר קבלת JSON מהבקשות
app.use(express.json());

// מאפשר לשרת קבצים סטטיים מתיקיית public
app.use(express.static('public'));

// GET לדף הבית
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// POST לטופס הרישום
app.post('/submit-register-data', (req, res) => {
  const { FirstName, LastName } = req.body;

  if (!FirstName || !LastName) {
    return res.status(400).json({ error: "First name and last name are required." });
  }

  const now = new Date();
  const entry = {
    firstName: FirstName,
    lastName: LastName,
    timestamp: now.toLocaleString()
  };

  arr.push(entry);

  // מחזיר את כל ההיסטוריה
  res.json(arr); // <-- עכשיו הקליינט מקבל **מערך ישיר**
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});



