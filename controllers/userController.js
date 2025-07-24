const path = require('path');
const fs = require('fs');

// Read user data from JSON file
const usersFilePath = path.join(__dirname, '../data/usersData.json');

const getUserById = (req, res) => {
  const { id } = req.params;

  fs.readFile(usersFilePath, 'utf8', (err, jsonData) => {
    if (err) {
      console.error("Error reading users file:", err);
      return res.status(500).json({ message: 'Internal Server Error' });
    }

    try {
      const users = JSON.parse(jsonData).users;
      const user = users.find(u => u.id === id);

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.json(user);
    } catch (parseErr) {
      console.error("Error parsing JSON:", parseErr);
      return res.status(500).json({ message: 'Error parsing user data' });
    }
  });
};

module.exports = {
  getUserById
};
