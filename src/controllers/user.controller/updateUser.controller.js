const User = require('../../models/users-model/user.model');
const AssistanceOffer = require('../../models/assistance-offer-model/assistanceOffer.model');
const { deleteImg } = require('../../utils/deleteAvatar');
const fetchGeoCode = require('../../utils/fetchGeoCode');

const updateUser = async (req, res, next) => {
  const { user } = req;
  const { city, address, postalcode } = req.body;
  try {
    if ((city, address, postalcode)) {
      return res.status(400).json({
        message:
          'You do not have permission to modify the address from this endpoint.',
      });
    }
    const updateUser = await User.findByIdAndUpdate(
      user._id,
      { $set: req.body },
      { new: true },
    );
    if (!updateUser) {
      return res
        .status(404)
        .json({ message: 'Ups, there was a problem, please try again' });
    }
    return res.status(201).json({ message: 'User update', user: updateUser });
  } catch (error) {
    next(error);
  }
};

const updateAvatar = async (req, res, next) => {
  const { user } = req;
  try {
    if (req.file) {
      deleteImg(user.avatar);
      req.body.image = req.file.path;
    }
    const updateUser = await User.findByIdAndUpdate(
      user._id,
      { $set: { avatar: req.body.image } },
      { new: true },
    );
    return res
      .status(200)
      .json({ message: 'Avatar actualizado.', user: updateUser });
  } catch (error) {
    next(error);
  }
};

const updateAddress = async (req, res, next) => {
  const { user } = req;
  const { city, address, postalcode } = req.body;
  try {
    const newGeoCodeData = await fetchGeoCode(address, city, postalcode);
    if (!newGeoCodeData) {
      return res.status(400).json({
        message:
          'Unable to fetch geolocation data. Please check the address information and try again.',
      });
    }
    const updatedAddress = await User.findByIdAndUpdate(
      user._id,
      {
        $set: {
          ...req.body,
          lat: newGeoCodeData[0].lat,
          lon: newGeoCodeData[0].lon,
        },
      },
      { new: true },
    );
    if (!updatedAddress) {
      return res
        .status(404)
        .json({ message: 'Ups, there was a problem, please try again' });
    }
    return res
      .status(201)
      .json({ message: 'Address update', address: updatedAddress });
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  const { user } = req;
  const deleteUser = await User.findByIdAndDelete(user._id);
  if (!deleteUser) {
    return res.status(404)
    .json({ message: 'Ups, there was a problem, please try again' });
  }

  await AssistanceOffer.deleteMany({ userId: user._id });

  return res
    .status(204)
    .json({ message: 'User and related Assistance Offers successfully deleted' })
}

module.exports = { updateUser, updateAvatar, updateAddress, deleteUser };
