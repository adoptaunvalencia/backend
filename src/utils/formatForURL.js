const formatForURL = (string) => {
  return string.replace(/ /g, '+');
};
module.exports = formatForURL;