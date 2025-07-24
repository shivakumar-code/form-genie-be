const fs = require('fs');
const path = require('path');

const userDataPath = path.join(__dirname, '../data/usersData.json');

function getUserByCardNumber(cardNumber) {
 try {
    const rawData = fs.readFileSync(userDataPath, 'utf8');
    const parsed = JSON.parse(rawData);

    // Check if 'users' is an array
    if (!Array.isArray(parsed.users)) return null;

    return parsed.users.find(user => user.id === cardNumber) || null;
  } catch (error) {
    console.error('Error reading user data:', error);
    return null;
  }
}

module.exports = { getUserByCardNumber };
