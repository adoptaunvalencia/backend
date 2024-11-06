const comproveDate = (value) => {
  const expiresDate = new Date(value);
  const currentDate = new Date();
  if (
    expiresDate <= currentDate ||
    expiresDate - currentDate < 24 * 60 * 60 * 1000
  ) {
    return false;
  } else return true;
};

module.exports = comproveDate