const getProfile = async (req, res, next) => {
  const { user } = req;
  console.log(user);
  
  try {
    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

module.exports = getProfile