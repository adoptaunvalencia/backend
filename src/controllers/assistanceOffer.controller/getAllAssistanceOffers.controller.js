const User = require('../../models/users-model/user.model');
const AssistanceOffer = require('../../models/assistance-offer-model/assistanceOffer.model');

const getAllAssistanceOffersMap = async (req, res, next) => {
  const { isAuth } = req;
  let query = AssistanceOffer.find().sort({ createdAt: -1 });
  try {
    if (isAuth) {
      query = query.populate({
        path: 'userId',
        select:
          '-password -lastname -email -birthDate -city -address -postalcode -roles -lat -lon',
      });
    }
    const assistancesOffers = await query;
    return res.status(200).json({
      offers: assistancesOffers,
    });
  } catch (error) {
    next(error);
  }
};

const getAllAssistanceOffers = async (req, res, next) => {
  // CLIENT = /api/assistance-offers?page=1&limit=10
  const { isAuth } = req;
  const { page = 1, limit = 50, sort = 'recent' } = req.query;
  const skip = (page - 1) * limit;
  try {
    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);
    if (isNaN(pageNumber) || pageNumber <= 0) {
      return res
        .status(400)
        .json({ error: 'Invalid page number. It must be a positive integer.' });
    }

    if (isNaN(limitNumber) || limitNumber <= 0) {
      return res.status(400).json({
        error: 'Invalid limit number. It must be a positive integer.',
      });
    }

    let query = AssistanceOffer.find();

    if (sort === 'recent') {
      query = query.sort({ createdAt: -1 });
    }

    if (isAuth) {
      query = query.populate({
        path: 'userId',
        select:
          '-password -lastname -email -birthDate -city -address -postalcode -roles -lat -lon',
      });
    }
    const offers = await query.skip(skip).limit(limit);
    const totalOffers = await AssistanceOffer.countDocuments();

    return res.status(200).json({
      offers: offers,
      total: totalOffers,
      page,
      totalPages: Math.ceil(totalOffers / limit),
    });
  } catch (error) {
    next(error);
  }
};

const getFilterOffers = async (req, res, next) => {
  const {
    useLocation,
    lat,
    lon,
    distance,
    location,
    assistanceType,
    page = 1,
    limit = 10,
  } = req.query;
  const { isAuth } = req;
  const skip = (page - 1) * limit;
  const EARTH_RADIUS_IN_KM = 6378.1;
  try {
    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);
    if (isNaN(pageNumber) || pageNumber <= 0) {
      return res
        .status(400)
        .json({ error: 'Invalid page number. It must be a positive integer.' });
    }
    if (isNaN(limitNumber) || limitNumber <= 0) {
      return res.status(400).json({
        error: 'Invalid limit number. It must be a positive integer.',
      });
    }
    let query = AssistanceOffer.find();
    if (useLocation === 'true') {
      if (!lat || !lon || !distance) {
        return res.status(400).json({
          error:
            "Latitude, longitude, and distance are required when 'useLocation=true'.",
        });
      }
      const latitude = parseFloat(lat);
      const longitude = parseFloat(lon);
      const radius = parseFloat(distance);

      if (isNaN(latitude) || isNaN(longitude) || isNaN(radius)) {
        return res.status(400).json({
          error: 'Latitude, longitude, and distance must be valid numbers.',
        });
      }
      query = query.find({
        location: {
          $geoWithin: {
            $centerSphere: [[longitude, latitude], radius / EARTH_RADIUS_IN_KM],
          },
        },
      });
    } else if (location) {
      query = query.where('city').equals(location);
    }
    if (assistanceType) {
      query = query.where('typeOffer.type').equals(assistanceType);
    }
    if (isAuth) {
      query = query.populate({
        path: 'userId',
        select: '-password -email',
      });
    }
    const total = await AssistanceOffer.countDocuments(query);
    query = query.skip(skip).limit(parseInt(limit));
    const offers = await query;
    return res.status(200).json({
      offers: offers,
      total,
      page: parseInt(page),
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.log(error);

    next(error);
  }
};

module.exports = {
  getAllAssistanceOffersMap,
  getAllAssistanceOffers,
  getFilterOffers,
};
