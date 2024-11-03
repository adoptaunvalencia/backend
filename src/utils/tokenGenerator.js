// Function to generate a random token of 8 digits
const generateToken = () => {
  const token = Math.floor(10000000 + Math.random() * 90000000).toString();
  return token;
};

module.exports = generateToken;
