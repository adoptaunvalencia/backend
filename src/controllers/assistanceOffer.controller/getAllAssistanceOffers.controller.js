const User = require('../../models/users-model/user.model');
const AssistanceOffer = require('../../models/assistance-offer-model/assistanceOffer.model');

const getAllAssistanceOffers = async (req, res, next) => {
  // CLIENT = /api/assistance-offers?page=1&limit=10
  const { isAuth } = req;
  const { page = 1, limit = 10 } = req.query;
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

    if (isAuth) {
      query = query.populate({
        path: 'userId',
        select: '-password -email',
      });
    }
    const offers = await query.skip(skip).limit(limit);
    const totalOffers = await AssistanceOffer.countDocuments();

    return res.status(200).json({
      assistancesOffers: offers,
      total: totalOffers,
      page,
      totalPages: Math.ceil(totalOffers / limit),
    });
  } catch (error) {
    next(error);
  }
};

/* 
# Endpoint: Get Assistance Offers

## Description
This endpoint allows the client to fetch a paginated list of assistance offers. The client can specify the page number and the number of results per page. If the user is authenticated (`isAuth`), the response includes additional user data (excluding sensitive information such as password and email) for each offer.

## URL
GET /api/assistance-offers

markdown

## Query Parameters
The client can pass the following query parameters in the URL for pagination:

- **`page`** (optional): The page number to retrieve. Default is `1` if not provided.
- **`limit`** (optional): The number of results per page. Default is `10` if not provided.

### Example Request:
- Get the first page with 10 results:
GET /api/assistance-offers?page=1&limit=10

sql

- Get the second page with 20 results:
GET /api/assistance-offers?page=2&limit=20

sql

- Get the first page with the default results per page (10):
GET /api/assistance-offers

markdown

## Request Headers
- **Authorization**: (optional) If the user is authenticated, include the `Authorization` header with the JWT token or session information.
Authorization: Bearer <JWT_TOKEN>

sql

## Response
The server will respond with a JSON object containing the following data:

- **`assistancesOffers`**: An array of assistance offers. Each object in the array contains the offer details (e.g., title, description, type of offer, etc.).
- **`total`**: The total number of assistance offers available in the database (without pagination).
- **`page`**: The current page being requested.
- **`totalPages`**: The total number of pages based on the `limit` and `total` number of offers.

### Example Response:
```json
{
	"assistancesOffers": [
		{
			"location": {
				"type": "Point",
				"coordinates": [
					-0.504228,
					38.3451509
				]
			},
			"_id": "672b70a215468b25ff8c2f7b",
			"title": "UPDATE 2 🤣",
			"description": "Tengo dispolnible una habitación para dormir.",
			"status": true,
			"userId": {
				"_id": "672953991f7f64ac65037a94",
				"name": "Daniele",
				"lastname": "Mazzola",
				"avatar": "https://res.cloudinary.com/dylazw28d/image/upload/v1730847605/avatar/jhnqgyqksyviox033xp5.png",
				"birthDate": "1987-02-19T00:00:00.000Z",
				"city": "Barcelona",
				"address": "Carrer de Bailèn, 28, 3-a",
				"postalcode": "08010",
				"roles": [
					"user"
				],
				"lat": "41.5380655",
				"lon": "2.1071138",
				"createdAt": "2024-11-04T23:07:05.537Z",
				"updatedAt": "2024-11-05T23:00:05.603Z",
				"__v": 0
			},
			"expires": "2024-11-08T00:00:00.000Z",
			"img": "https://www.gisinfo.net/images/news_main/first_news_images/1940_image_400.jpg",
			"city": "Alicante",
			"address": "Pasaje metal 7, 5-A",
			"postalcode": "03006",
			"typeOffer": "hygiene",
			"createdAt": "2024-11-06T13:35:30.483Z",
			"updatedAt": "2024-11-06T13:35:30.483Z",
			"__v": 0
		}
	],
	"total": 1,
	"page": 1,
	"totalPages": 1
}
Status Codes
200 OK: The request was successful and the data is returned.
400 Bad Request: The request was invalid (e.g., invalid query parameters).
401 Unauthorized: The user is not authorized to view the assistance offers.
500 Internal Server Error: A server error occurred while processing the request.
Authentication
If the client is authenticated (isAuth is true), the response will include additional user information (userId) related to each assistance offer. This can be used to identify the person who created the offer. If not authenticated, the response will only include the assistance offers without this user data.

Notes
Pagination is optional. If the page and limit parameters are not provided, the server will return the first page with 10 results by default.
The total field in the response indicates the total number of assistance offers in the database, allowing the client to calculate the number of pages and implement pagination controls on the frontend. */

// CONTROLLER
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
      query = query.where('typeOffer').equals(assistanceType);
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
      assistanceOffers: offers,
      total,
      page: parseInt(page),
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.log(error);

    next(error);
  }
};

module.exports = { getAllAssistanceOffers, getFilterOffers };

/* 
# Endpoint: Filter Assistance Offers

## Description
This endpoint allows clients to retrieve a filtered list of assistance offers based on location, assistance type, or proximity to a geographical point. If useLocation=true, the client must provide lat, lon, and distance for a proximity search; otherwise, the client can specify a city using location.

### URL
- GET /assistance-offers/filter

### Query Parameters
| Parameter       | Type     | Description                                                                                 |
|-----------------|----------|---------------------------------------------------------------------------------------------|
| `useLocation`   | Boolean  | Set to true to use current location coordinates for search.   |
| `lat`           | Number   | Latitude for proximity search. Required if `useLocation=true`.                              |
| `lon`           | Number   | Longitude for proximity search. Required if `useLocation=true`.                             |
| `distance`      | Number   | Radius in kilometers for the proximity search. Required if `useLocation=true`.     |
| `location`      | String   | City or location name for a non-geographical search. Optional, used if `useLocation=false`. |
| `assistanceType`| String   | Type of assistance required, e.g., `accommodation`, `hygiene`, `food`, `pet_fostering`. Optional.|
| `page`| Number   | TPage number for pagination. Default is 1.|
| `limit`| Number   | Number of results per page for pagination. Default is 10.|

### Example Requests
#### Search by Current Location (Proximity Search)
**URL:**

- GET /api/assistance-offers/filter?useLocation=true&lat=40.7128&lon=-74.0060&distance=10&assistanceType=food&page=1&limit=10
**Description:** Fetch assistance offers within a 10 km radius from the specified latitude and longitude, filtering by assistance type `food`.

#### Search by City
**URL:**
- GET /api/assistance-offers/filter?useLocation=false&location=Valencia&assistanceType=accommodation&page=2&limit=5
**Description:** Fetch assistance offers available in Valencia for the assistance type `accommodation`.

#### Search by Assistance Type Only
**URL:**
GET /api/assistance-offers/filter?assistanceType=hygiene
**Description:** Fetch all offers that provide hygiene-related assistance without location filtering.

### Request Headers
**Authorization (optional):** If the user is authenticated, include the `Authorization` header with the JWT token.
- Authorization: Bearer <JWT_TOKEN>

### Response

The server responds with a JSON object containing the following:

| Field               | Type               | Description                                                                 |
|---------------------|--------------------|-----------------------------------------------------------------------------|
| `assistanceOffers`  | Array of Objects   | Array of assistance offers with details like title, description, city, etc. |
| `total`             | Number             | Total number of offers that match the filter criteria.                      |
| `page`              | Number             | The current page.                                                           |
| `totalPages`        | Number             | Total number of pages available based on the limit.                         |

#### Example Response

```json
{
  "assistanceOffers": [
    {
      "title": "Food Assistance",
      "description": "Offering free food to families in need.",
      "status": true,
      "userId": {
        "_id": "60d0fe4f5311236168a109ca",
        "name": "John Doe",
        "city": "Valencia"
      },
      "expires": "2024-12-31T00:00:00.000Z",
      "img": "https://example.com/image.jpg",
      "city": "Valencia",
      "address": "Pasaje metal 7, 58",
      "postalcode": "03030",
      "lat": "40.7128",
      "lon": "-74.0060",
      "typeOffer": "food"
    },
    ......
  ],
  "total": 20,
  "page": 1,
  "totalPages": 2
}

#### Status Codes
- 200 OK: The request was successful, and the results are returned.
- 400 Bad Request: Missing or invalid parameters (e.g., lat, lon, distance required with useLocation=true).
- 401 Unauthorized: User is not authorized to view assistance offers.
- 500 Internal Server Error: An error occurred on the server.

#### Error Handling
- Missing Required Parameters: If useLocation=true is set without lat, lon, or distance, a 400 error will be returned.
Invalid Parameters: A 400 error will be returned if parameters are of an incorrect type or outside expected bounds.

 */
