# Adopta un Valenciano

Our goal is to provide a direct channel for people affected by DANA to find temporary shelter, access to food and a place for personal hygiene, provided by volunteers who want to help. This initiative aims to be simple, accessible and fast, maximizing the reach and ease of connection between victims and people who can offer help.

## Table of Content 

* [Tech Stack/Dependencies](#tech-stack/dependencies)
* [Environment Variables](#environment-variables)
* [Project Folder Structure](#project-folder-structure)
* [Middleware Functions](#middleware-functions)
* [User API Endpoints](#user-api-endpoints)
* [Assistance Offer API Endpoints](#assistance-offer-api-endpoints)

## Tech Stack/Dependencies

### Production
- **Node.js** recommended version 18.0 or higher
- **Express** ^4.21.1
- **JSON Web Tokens (JWT)** ^9.0.2
- **CORS** ^2.8.5
  
### Integration
- **MongoDB y Mongoose** ^8.8.0
- **Nodemailer** ^6.9.16
- **GoogleApis** ^144.0.0
- **Cloudinary** ^1.41.3
- **Multer** ^1.4.5-lts.1
- **Multer-storage-cloudinary** ^4.0.0
  
### Development
- **Bcrypt** ^5.1.1
- **Dotenv** ^16.4.5
- **Nodemon** ^3.1.7
  

## Environment Variables
To run this project, you will need to add the following environment variables to your .env file

- CONNECT_DDBB
- JWT_SECRET
- EMAIL_HOST
- OAUTH_CLIENTID
- OAUTH_CLIENT_SECRET
- OAUTH_REFRESH_TOKEN
- GEO_API_KEY
- CLOUDINARY_NAME
- CLOUDINARY_SECRET
- CLOUDINARY_KEY
  

## Project Folder Structure

```
├── src
│ ├── config
│ │ ├── cloudinary.js
│ │ ├── connection.js
│ │ ├── jwt.js
│ │ ├── nodemailer.js
│ │ └── oauth.google.js
│ ├── controllers
│ │ ├── assistanceOffer.controller.js
| │ │ ├── createAssistanceOffer.js
| │ │ ├── deleteAssistanceOffer.js
| │ │ ├── getAllAssistanceOffer.js
| │ │ ├── getAssistanceOfferById.js
| │ │ └── updateAssistanceOffer.js
│ │ └── user.controller.js
| │ │ ├── mails.js
| | │ │ ├── emailForgotPassword.js
| | │ │ ├── emailNewPassword.js
| | │ │ └── emailWelcome.js
| │ │ ├── forgotPassword.controller.js
| │ │ ├── getProfile.controller.js
| │ │ ├── login.controller.js
| │ │ ├── putPassword.controller.js
| │ │ ├── register.controller.js
| │ │ └── updateUser.js
│ ├── middlewares
│ │ ├── terms-middleware
│ │ │ ├── acceptTermsMiddleware.js
│ │ │ └── createTermMiddleware.js
│ │ ├── authenticateUserMiddleware.js
│ │ ├── checkAvatarMiddleware.js
│ │ ├── getProfileMiddleware.js
│ │ ├── isAuth.js
│ │ ├── loginMiddleware.js
│ │ └── registerMiddleware.js
│ ├── models
│ │ ├── assistance-offer-model
| │ │ └── assistanceOffer.model.js
│ │ └── users-model
| │   └── user.model.js
│ ├── routes
│ │ ├── assistanceOffer.routes
| │ │ └── assistanceOffer.routes.js
│ │ └── users-model
| │   └── user.routes.js
│ └── utils
│ │ ├── comproveDate.js
│ │ ├── deleteAvatar.js
│ │ ├── fetchGeoCode.js
│ │ ├── formatForURL.js
│ │ └── tokenGenerator.js
├── index.js
├── .gitignore
├── README.md
```


## Middleware Functions

#### `registerUser` (Register Middleware)

Handles user registration by performing the following steps:

1. Checks if the provided email is already registered.
2. If the email is unique, creates a new user instance with the provided data (`name`, `lastname`, `email`, `password`, `birthDate`, `city`, `address`, `postalcode`).
3. Saves the user in the database and returns a success message.

Example Request

```
POST /users/register
Content-Type: application/json

	{
			"email": "test123@test123.com",
			"password":"11111111",
			"name":"Daniele",
			"lastname":"Mazzola",
      "phone":"123123132",
			"birthDate":"1987-02-19",
			"city":"Alicante",
			"address":"Pasaje metal 7, 5-B",
			"postalcode":"03006"
	}
```

Example Response

```
{
  "message": "User successfully created.",
  "user": {
    "_id": "67294d3dbce4f02b91ea2e55",
    "name": "Daniele",
    "lastname": "Mazzola",
    "phone": "123123132",
    "avatar": "https://cdn-icons-png.flaticon.com/512/3541/3541871.png",
    "email": "test123@test123.com",
    "password": "$2b$10$0CSdyHrJpSIc.li9.6iw6umNPAxnGKxl1EsmT8NlqyKRXJoLiIEjO",
    "birthDate": "1987-02-19T00:00:00.000Z",
    "city": "Alicante",
    "address": "Pasaje metal 7, 5-B",
    "postalcode": "03006",
    "roles": ["user"],
    "lat": "38.3451509",
    "lon": "-0.504228",
    "createdAt": "2024-11-04T22:39:57.280Z",
    "updatedAt": "2024-11-04T22:39:57.280Z",
    "__v": 0
  }
}
```

### Geolocation Warning
**⚠️ IMPORTANT:** If the `geocoding` service cannot obtain coordinates for the provided address, the registration process will be `STOPPED`, and the user will not be created. In this case, a response with the following error message will be sent:

```
{
  "message": "Unable to fetch geolocation data. Please check the address information and try again."
}
```

#### `loginUser` (Login Middleware)

Handles user login by performing the following steps:

1. Searches the user by email in the database.
2. If found, compares the provided password with the hashed password stored in the database.
3. If the password matches, generates a JWT and returns it to the client.

Example Request

```
POST /users/login
Content-Type: application/json

{
  "email": "test123@test123.com",
  "password": "11111111"
}
```

Example Response

```
{
  "user": {
    "_id": "67294d3dbce4f02b91ea2e55",
    "name": "Daniele",
    "lastname": "Mazzola",
    "avatar": "https://cdn-icons-png.flaticon.com/512/3541/3541871.png",
    "email": "test123@test123.com",
    "password": "$2b$10$0CSdyHrJpSIc.li9.6iw6umNPAxnGKxl1EsmT8NlqyKRXJoLiIEjO",
    "birthDate": "1987-02-19T00:00:00.000Z",
    "city": "Alicante",
    "address": "Pasaje metal 7, 5-B",
    "postalcode": "03006",
    "roles": ["user"],
    "lat": "38.3451509",
    "lon": "-0.504228",
    "createdAt": "2024-11-04T22:39:57.280Z",
    "updatedAt": "2024-11-04T22:39:57.280Z",
    "__v": 0
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3Mjk0ZDNkYmNlNGYwMmI5MWVhMmU1NSIsImlhdCI6MTczMDc2MDA3OCwiZXhwIjoxNzMzMzUyMDc4fQ.k5gKHenfP8BJ-hO6kx2NJPW6fu87BkAmPOBOgizmxkA"
}
```

#### `getProfile` (Get Profile Middleware)

Retrieves the profile data of the authenticated user by performing the following steps:

1. Extracts the user ID from the request object.
2. Retrieves the user data from the database, excluding the password.
3. Returns the user profile information to the client.

Example Request

```
GET /api/users/profile

```

Example Response

```
{
  "_id": "67294d3dbce4f02b91ea2e55",
  "name": "Daniele",
  "lastname": "Mazzola",
  "avatar": "https://cdn-icons-png.flaticon.com/512/3541/3541871.png",
  "email": "test123@test123.com",
  "password": "$2b$10$0CSdyHrJpSIc.li9.6iw6umNPAxnGKxl1EsmT8NlqyKRXJoLiIEjO",
  "birthDate": "1987-02-19T00:00:00.000Z",
  "city": "Alicante",
  "address": "Pasaje metal 7, 5-B",
  "postalcode": "03006",
  "roles": ["user"],
  "lat": "38.3451509",
  "lon": "-0.504228",
  "createdAt": "2024-11-04T22:39:57.280Z",
  "updatedAt": "2024-11-04T22:39:57.280Z",
  "__v": 0
}
```


#### `authenticateUser` (Authentication Middleware)

This middleware is responsible for authenticating users using a JWT token. It performs the following steps:

1. Extracts the authorization token from the request header.
2. If no token is provided, it returns a 401 error with a message indicating that an authorization token is required.
3. Attempts to verify the token using the `verifyToken` function. If the token is invalid or expired, it returns a 401 error.
4. Searches for the user in the database using the decoded ID from the token.
5. If the user is not found, it returns a 401 error.
6. If authentication is successful, it adds the user object to the req object so that it is available in subsequent middleware functions.

Example Usage

```
GET /protected-route
Authorization: Bearer your_jwt_token
```


#### `isAuth` (Authentication Middleware)

This middleware is responsible for verifying if the user is authenticated by checking if a valid token exists. It performs the following steps:

1. Extracts the id from the request parameters (if provided).
2. Extracts the authorization token from the request headers (Bearer {token}).
3. If the token is present, it sets req.isAuth to true, otherwise sets it to false.
4. If an id is provided in the parameters, it checks the token and proceeds to the next middleware.
5. If no id is provided, it only checks the token and proceeds to the next middleware.

Example Request
```
GET /api/assistance-offer/get-assistance/:id'
Authorization: Bearer your_jwt_token
```

Example Response
Response Status:

If the token is valid, req.isAuth is set to true.
If no token is provided or the token is invalid, req.isAuth is set to false.
This middleware does not return a response itself, but it modifies the req.isAuth property to be used in subsequent middleware or route handlers.

#### `createTerms` (Create Terms Middleware)

This middleware allows the creation of a new version of terms and conditions by performing the following steps:

1. Extracts `versionId` and `content` from the request body.
2. Deactivates all existing terms by setting `isActive` to `false`.
3. Creates and saves a new active terms document with the provided `versionId` and `content`.
4. Returns a success message with the newly created terms.

Example Request

```http
POST /terms/create
Content-Type: application/json

{
  "versionId": "1.0.0",
  "content": "These are the terms and conditions..."
}
```

Example Response

```json
{
  "message": "Terms created successfully",
  "terms": {
    "versionId": "1.0.0",
    "content": "These are the terms and conditions...",
    "isActive": true
  }
}

```

#### `acceptTerms ` (Accept Terms Middleware)

This middleware handles user acceptance of the latest terms and conditions by performing the following steps:

1. Extracts the `userId` from the request body.
2. Searches for the active terms in the database.
3. If active terms are found, updates or creates a record in the `UserTerms` model, linking the user to the accepted version of the terms.
4. Returns a success message with the updated user terms data.

Example Request

```http
POST /users/accept-terms
Content-Type: application/json

{
  "userId": "67294d3dbce4f02b91ea2e55"
}
```

Example Response

```json
{
  "message": "Terms accepted",
  "userTerms": {
    "userId": "67294d3dbce4f02b91ea2e55",
    "acceptedVersionId": "1.0.0",
    "acceptedAt": "2024-11-05T10:20:30.000Z"
  }
}
```

# API Documentation

**Server URL:** `https://developer-proyect-dana.vercel.app`

# User API Endpoints

**User Endpoint:** `https://developer-proyect-dana.vercel.app/secure/api/v1/user`

| HTTP Method                  | URL                | Headers          | Request Body                                                                |            Description                                                      | Response               |
| ---------------------------- | ------------------ | ---------------- | --------------------------------------------------------------------------- | --------------------------------------------------------------------------- | ---------------------- |
| [**GET**](#get-user-profile) | `/`                | Bearer `{token}` |                                                                             | Gets user profile information                                               | `{ user }`             |
| [**POST**](#register-user)   | `/register-user`   |                  | `{ name, lastname, birthDate, email, password, city, address, postalcode }` | Registers a new user in the database.                                       | `{ user }`             |
| [**POST**](#login-user)      | `/login-user`      |                  | `{ email, password }`                                                       | Logs in a user, creating a session.                                         | `{ user, token }`      |
| [**POST**](#forgot-password) | `/forgot-password` |                  | `{ email }`                                                                 | Sends a reset password link to the user. Returns message: "Code sent" mail. | `{ message }`          |
| [**POST**](#comprove-token)  | `/comprove-token`  |                  | `{ token }`                                                                 | Verifies the reset password token. Returns boolean.                         | `true/false`           |
| [**PUT**](#create-password)  | `/create-password` |                  | `{ token, password }`                                                       | Updates the user’s password. Returns `{ user }`.                            | `{ user }`             |
| [**PUT**](#update-user)      | `/update-user`     | Bearer `{token}` | `{ any_user_field_except_city_address_postalcode }`                         | Updates user data except for address fields.                                | `{ message, user }`    |
| [**PUT**](#update-avatar)    | `/update-avatar`   | Bearer `{token}` | `multipart/form-data` with field `avatar` (image file)                      | Updates the user's avatar image.                                            | `{ message, user }`    |
| [**PUT**](#update-address)   | `/update-address`  | Bearer `{token}` | `{ city, address, postalcode }`                                             | Updates the user's address with geolocation data.                           | `{ message, address }` |


## Get User Profile

### Description
This endpoint returns the profile information of the user who is currently authenticated. The profile data is directly retrieved from the authenticated user’s context (`req.user`), which is typically populated by middleware handling JWT validation.

### URL
GET `https://developer-proyect-dana.vercel.app/secure/api/v1/user`

### Request Headers
- Authorization: (required) Include the JWT token of the authenticated user.
Authorization: Bearer <JWT_TOKEN>

### Response
The server will respond with a JSON object containing the authenticated user’s profile data.

#### Example Response:
```
{
  "_id": "672b7ffa7b87a0b8b323477d",
  "name": "Alberto",
  "lastname": "Perez",
  "avatar": "https://cdn-icons-png.flaticon.com/512/3541/3541871.png",
  "phone": "666666666",
  "email": "alberto@example.com",
  "password": "$2b$10$7fHiH0y2GbmIkG9y8Q.VBe7MHWrMiKrZaAIIIB.MA.HMCPY0FwDqe",
  "birthDate": "1992-05-11T00:00:00.000Z",
  "city": "Alicante",
  "address": "Calle corazón 7",
  "postalcode": "03006",
  "lat": "38.3451509",
  "lon": "-0.504228",
  "roles": [
    "user"
  ],
  "createdAt": "2024-11-06T14:40:58.654Z",
  "updatedAt": "2024-11-06T14:40:58.654Z",
  "__v": 0
}
```
#### Status Codes:
- 200 OK: The request was successful and the data is returned.
- 401 Unauthorized: The user is not authorized to view the assistance offers.
- 500 Internal Server Error: A server error occurred while processing the request.


## Register User

### Description
This endpoint allows a new user to register by providing necessary information, including an address that is verified with geolocation data. Upon successful registration, a welcome email is sent to the new user.

### URL
POST `https://developer-proyect-dana.vercel.app/secure/api/v1/user/register-user`

### Request Body
The request body for creating a new user must include the following fields in JSON format:

- `name` (required): The first name of the user.
- `lastname` (required): The last name of the user.
- `avatar` (optional): A URL to the user's avatar image. Defaults to a placeholder image if not provided.
- `phone` (required): The user's phone number.
- `email` (required): The user's email address (must be unique).
- `password` (required): The user's password.
- `birthDate` (required): The user's date of birth in ISO format.
- `city` (required): The user's city of residence.
- `address` (required): The user's address.
- `postalcode` (required): The postal code associated with the user's address.
- `lat` (required): Latitude of the user's location. If not provided, the server will attempt to fetch it based on the provided address, city, and postal code.
- `lon` (required): Longitude of the user's location. If not provided, the server will attempt to fetch it based on the provided address, city, and postal code.
- `roles` (optional): Defines user roles; defaults to ["user"].

### Response
The server will respond with a JSON object containing the authenticated user’s profile data.

#### Example Response:
```
{
  "message": "User successfully created.",
  "user": {
    "_id": "672b7ffa7b87a0b8b323477d",
    "name": "Alberto",
    "lastname": "Perez",
    "avatar": "https://cdn-icons-png.flaticon.com/512/3541/3541871.png",
    "phone": "666666666",
    "email": "alberto@example.com",
    "password": "$2b$10$7fHiH0y2GbmIkG9y8Q.VBe7MHWrMiKrZaAIIIB.MA.HMCPY0FwDqe",
    "birthDate": "1992-05-11T00:00:00.000Z",
    "city": "Alicante",
    "address": "Calle corazón 7",
    "postalcode": "03006",
    "lat": "38.3451509",
    "lon": "-0.504228",
    "roles": [
      "user"
    ],
    "createdAt": "2024-11-06T14:40:58.654Z",
    "updatedAt": "2024-11-06T14:40:58.654Z",
    "__v": 0
  }
}

```
#### Status Codes:
- 201 Created: User successfully created.
- 400 Bad Request: Geolocation data could not be fetched due to invalid address information.
- 500 Internal Server Error: A server error occurred during registration.


## Login User

### Description
This endpoint authenticates a user based on their email and password. If the credentials are valid, the endpoint returns a JWT token for authorization in subsequent requests.

### URL
POST `https://developer-proyect-dana.vercel.app/secure/api/v1/user/login-user`

### Request Body
The request body should contain the following parameters:

- `email` (required): The email address of the user attempting to log in.
- `password` (required): The password associated with the user's account.

#### Example Request
```
{
  "name": "Alberto",
  "lastname": "Perez",
  "avatar": "https://cdn-icons-png.flaticon.com/512/3541/3541871.png",
  "phone": "666666666",
  "email": "alberto@example.com",
  "password": "$2b$10$7fHiH0y2GbmIkG9y8Q.VBe7MHWrMiKrZaAIIIB.MA.HMCPY0FwDqe",
  "birthDate": "1992-05-11T00:00:00.000Z",
  "city": "Alicante",
  "address": "123 Main St",
  "postalcode": "03006",
  "lat": "38.3451509",
  "lon": "-0.504228",
  "roles": ["user"]
}
```

### Response
Upon successful authentication, the response includes:

- `user`: An object containing the user's information.
- `token`: A JWT token for use in subsequent requests, allowing the client to authenticate for secure routes.

#### Example Response:
```
{
  "user": {
    "_id": "672b7ffa7b87a0b8b323477d",
    "name": "Alberto",
    "lastname": "Perez",
    "avatar": "https://cdn-icons-png.flaticon.com/512/3541/3541871.png",
    "phone": "666666666",
    "email": "alberto@example.com",
    "password": "$2b$10$7fHiH0y2GbmIkG9y8Q.VBe7MHWrMiKrZaAIIIB.MA.HMCPY0FwDqe",
    "birthDate": "1992-05-11T00:00:00.000Z",
    "city": "Alicante",
    "address": "123 Main St",
    "postalcode": "03006",
    "lat": "38.3451509",
    "lon": "-0.504228",
    "roles": ["user"]
  },
  "token": "eyJhbGciOiJIUzjHyUisInR5cCI6IkpXVCJ9..."
}
```

#### Status Codes
- 200 OK: The user is authenticated successfully, and the token is provided.
- 409 Conflict: The password provided is invalid.
- 500 Internal Server Error: An error occurred during the authentication process.

#### Authentication
- Upon a successful login, the server provides a JWT token in the response. This token should be included in the Authorization header of subsequent requests to access protected resources.


## Forgot Password

### Description
These endpoints allow users to initiate a password reset by generating a unique token and sending a reset email. The `forgotPassword` endpoint generates a token and sends it to the user's email, while the `comproveToken` endpoint checks if the token is valid for password reset.

### URL
POST `https://developer-proyect-dana.vercel.app/secure/api/v1/user/forgot-password`

### Request Body
The request body should contain the following parameter:

- `email` (required): The email address of the user requesting the password reset.

#### Example Request
```
{
  "email": "user@example.com"
}
```

### Response
The server will respond with a message indicating whether the password reset email has been sent successfully.

#### Example Response
```
{
  "message": "Code sent to your email."
}
```

### Status Codes
- 201 Created: A password reset token has been generated, and a reset email has been sent to the user.
- 404 Not Found: The email provided is not associated with any registered user.
- 500 Internal Server Error: An error occurred while processing the request.


## Comprove Token

### Description
This endpoint allows the client to verify whether a password reset token is valid by checking if it exists in the user's record. It is used to confirm the legitimacy of the token before allowing the user to reset their password.

### URL
POST `https://developer-proyect-dana.vercel.app/secure/api/v1/user/comprove-token`

### Request Body
- `token` (required): The token to be verified, which was sent to the user during the password reset process.

### Example Request
```
{
  "token": "user-reset-token"
}
```

### Response
The server will respond with a status (boolean) indicating whether the token is valid or not.

#### Example Response
```
{
  "status": true
}
```

#### Status Codes
- 200 OK: The token is valid and exists in the user's record.
- 400 Bad Request: The token does not exist or is invalid.


## Create Password

### Description
This endpoint allows the client to update the user's password using a valid password reset token. Once the token is verified, the new password is encrypted and saved, and the token is removed from the user's record. A confirmation email is sent to notify the user of the password change.

### URL
PUT `https://developer-proyect-dana.vercel.app/secure/api/v1/user/update-password`

### Request Body
The request body should contain the following parameters:

- `token` (required): The password reset token that was sent to the user via email.
- `password` (required): The new password that the user wants to set.

####  Example Request
```
{
  "token": "user-reset-token",
  "password": "newPassword123"
}
```
### Response
The server will respond with a message indicating whether the password reset email has been sent successfully.

#### Example Response
```
{
  "message": "Code sent to your email."
}
```

#### Status Codes
- 201 OK: The token is valid and exists in the user's record.
- 400 Bad Request: The token does not exist or is invalid.
- 500 Internal Server Error: An error occurred while processing the request.


## Update User

### Description
This endpoint allows the client to update the user's information, excluding address details. If the request body contains `city`, `address`, or `postalcode`, the update will be rejected as these fields cannot be modified through this endpoint.

### URL
PUT `https://developer-proyect-dana.vercel.app/secure/api/v1/user/update-user`

### Request Headers
- Authorization: (required) Include the JWT token of the authenticated user.
Authorization: Bearer <JWT_TOKEN>

### Request Body
The request body should contain the following parameters for updating user details:

- `name` (optional): The user's first name.
- `lastname` (optional): The user's last name.
- `phone` (optional): The user's phone number.
- `email` (optional): The user's email address (must be unique).
- `birthDate` (optional): The user's birthdate.
- `avatar` (optional): The user's avatar image (can be an updated URL or a new image).

**Note**: The following fields **cannot** be updated through this endpoint:

- `city`
- `address`
- `postalcode`

#### Example Request
```
{
  "name": "Alberto",
  "lastname": "Perez",
  "phone": "123456789",
  "email": "newemail@example.com"
}
```
### Response
The server will respond with a message indicating whether the update was successful.

#### Example Response
```
{
  "message": "User update",
  "user": {
    "_id": "672b7ffa7b87a0b8b323477d",
    "name": "Alberto",
    "lastname": "Perez",
    "avatar": "https://cdn-icons-png.flaticon.com/512/3541/3541871.png",
    "phone": "123456789",
    "email": "newemail@example.com",
    "password": "$2b$10$7fHiH0y2GbmIkG9y8Q.VBe7MHWrMiKrZaAIIIB.MA.HMCPY0FwDqe",
    "birthDate": "1992-05-11T00:00:00.000Z",
    "city": "Alicante",
    "address": "123 Main St",
    "postalcode": "03006",
    "lat": "38.3451509",
    "lon": "-0.504228",
    "roles": ["user"]
  }
}
```

#### Status Codes
- 200 OK: The user information was successfully updated.
- 400 Bad Request: Invalid fields or attempts to modify restricted fields like city, address, or postalcode.
- 404 Not Found: The user was not found, or an error occurred while processing the update.
- 500 Internal Server Error: A server error occurred.

#### Authentication
- This endpoint requires authentication. The user must be logged in, and the request must include a valid token in the headers for authorization.
- 

## Update Avatar

### Description
This endpoint allows the client to update the user's avatar. The request should include the new avatar image as part of a file upload. The old avatar will be deleted, and the new one will be stored in the user's profile.

### URL
PUT `https://developer-proyect-dana.vercel.app/secure/api/v1/user/update-avatar`

### Request Headers
- Authorization: (required) Include the JWT token of the authenticated user.
Authorization: Bearer <JWT_TOKEN>

### Request Body
The request should include the new avatar image as part of a form-data file upload.

- `avatar` (optional): The user's avatar image (can be an updated URL or a new image).

#### Example Request
```
{
  "avatar": "https://path-to-new-avatar-image.com",
}
```

### Response
The server will respond with the updated user information, including the new avatar.

#### Example Response
```
{
  "message": "Avatar actualizado.",
  "user": {
    "_id": "672b7ffa7b87a0b8b323477d",
    "name": "Alberto",
    "lastname": "Perez",
    "avatar": "https://path-to-new-avatar-image.com",
    "phone": "123456789",
    "email": "newemail@example.com",
    "password": "$2b$10$7fHiH0y2GbmIkG9y8Q.VBe7MHWrMiKrZaAIIIB.MA.HMCPY0FwDqe",
    "birthDate": "1992-05-11T00:00:00.000Z",
    "city": "Alicante",
    "address": "123 Main St",
    "postalcode": "03006",
    "lat": "38.3451509",
    "lon": "-0.504228",
    "roles": ["user"]
  }
}
```

#### Status Codes
- 200 OK: The avatar was successfully updated.
- 500 Internal Server Error: A server error occurred.

#### Authentication
- This endpoint requires authentication. The user must be logged in, and the request must include a valid token in the headers for authorization.


## Update Address

### Description
This endpoint allows the user to update their address information, including the city, address, and postal code. The system will also update the latitude (`lat`) and longitude (`lon`) based on the new address using the GeoCode API. The request is only permitted if the user is authenticated, and the address information is successfully updated in the database.

### URL
PUT `https://developer-proyect-dana.vercel.app/secure/api/v1/user/update-address`

### Request Headers
- Authorization: (required) Include the JWT token of the authenticated user.
Authorization: Bearer <JWT_TOKEN>

### Request Body
The request body should contain the following parameters:

- **`city`** (optional): The new city of the user.
- **`address`** (optional): The new street address of the user.
- **`postalcode`** (optional): The new postal code for the user's address.

### Example Request
```
{
  "city": "Valencia",
  "address": "Calle Nueva, 112",
  "postalcode": "08009"
}
```

### Response
The server will respond with a message confirming the update, along with the updated address information.

#### Example Response
{
  "message": "Address update",
  "address": {
    "_id": "672b7ffa7b87a0b8b323477d",
    "name": "Alberto",
    "lastname": "Perez",
    "avatar": "https://path-to-new-avatar-image.com",
    "phone": "123456789",
    "email": "newemail@example.com",
    "password": "$2b$10$7fHiH0y2GbmIkG9y8Q.VBe7MHWrMiKrZaAIIIB.MA.HMCPY0FwDqe",
    "birthDate": "1992-05-11T00:00:00.000Z",
    "city": "Valencia",
    "address": "Calle Nueva, 112",
    "postalcode": "08009",
    "lat": "38.3451509",
    "lon": "-0.504228",
    "roles": ["user"]
  }
}

#### Status Codes
- 201 OK: The address was updated successfully, and the server responds with the updated address information.
- 400 Bad Request: The provided address information could not be validated or there was an issue fetching the geolocation data.
- 404 Not Found: The user was not found, or there was an error updating the address.
- 500 Internal Server Error: A server error occurred while processing the request.

#### Authentication
- This endpoint requires authentication. The user must be logged in, and the request must include a valid token in the headers for authorization.




# Assistance Offer API Endpoints

**Server URL:** `https://developer-proyect-dana.vercel.app`

**Assistance Offer Endpoint:** `https://developer-proyect-dana.vercel.app/secure/api/v1/assistance-offer`

| HTTP Method | URL                                   | Headers                | Request Body Description                                                                                                                                      | Response                                                                                      |
|-------------|---------------------------------------|------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------|
| [**GET**](#get-assistance-offers)         | `/`                       | Optional: Bearer {token} | | Retrieves all available assistance offers.                                                                                                                 | `{ assistanceOffers }`                                                                          |
| [**GET**](#get-assistance-offer-by-id)    | `/get-assistance/:id`       | Optional: Bearer {token} | | Retrieves an assistance offer by its unique ID.                                                                                                            | `{ assistanceOffer }`                                                                           |
| [**POST**](#create-assistance-offer)     | `/create-assistance`        | Bearer {token}          | Content-Type: multipart/form-data <br> **Request body fields**: <br> `title`, `description`, `status`, `expires`, `city`, `address`, `postalcode`, `lat` (optional), `lon` (optional), `img` (optional)  | 201 OK: `{ message, assistanceOffer }` <br> 400 Bad Request: If the expiration date is less than 24 hours. |
| [**PUT**](#update-assistance-offer)      | `/update-assistance/:id`    | Bearer {token}          | Content-Type: multipart/form-data <br> **Request body fields**: <br> `title`, `description`, `status`, `expires`, `city`, `address`, `postalcode`, `lat` (optional), `lon` (optional), `img` (optional) | 200 OK: `{ message, assistanceOffer }` <br> 404 Bad Request: If the expiration date is less than 24 hours or invalid data is provided. |
| [**DELETE**](#delete-assistance-offer)   | `/delete-assistance/:id`    | Bearer {token}          | | Deletes an assistance offer by its unique ID.                                                                                                             | `{ message }`                                                                                 |
| [**GET**](#filter-assistance-offers)     | `/assistance-offers/filter` | Optional: Bearer {token} | Query Parameters: <br> `useLocation` (Boolean), `lat` (Number, required if `useLocation=true`), `lon` (Number, required if `useLocation=true`), `distance` (Number, required if `useLocation=true`), `location` (String, optional), `assistanceType` (String, optional), `page` (Number), `limit` (Number) | Retrieves a filtered list of assistance offers based on location, assistance type, or proximity to a geographical point. | `{ assistanceOffers, total, page, totalPages }` <br> 400 Bad Request: If required query parameters are missing or invalid. <br> 401 Unauthorized: If the user is not authorized. |

**⚠️ Warning:**

```
When creating a new assistance offer, if the user decides to submit the same address they used during registration, they must send the full address (city, address, postal code, lat, lon) to the endpoint. If the coordinates are not provided, a request will be made to the GeoCode API to retrieve the new coordinates.
```


## Get Assistance Offers

### Description
This endpoint allows the client to fetch a paginated list of assistance offers. The client can specify the page number and the number of results per page. If the user is authenticated (`isAuth`), the response includes additional user data (excluding sensitive information such as password and email) for each offer.

### URL
GET `https://developer-proyect-dana.vercel.app/secure/api/v1/assistance-offer/`

### Query Parameters
The client can pass the following query parameters in the URL for pagination:

- **`page`** (optional): The page number to retrieve. Default is `1` if not provided.
- **`limit`** (optional): The number of results per page. Default is `10` if not provided.

### Example Request:
- Get the first page with 10 results:
GET /api/assistance-offers?page=1&limit=10

- Get the second page with 20 results:
GET /api/assistance-offers?page=2&limit=20

- Get the first page with the default results per page (10):
GET /api/assistance-offers

### Request Headers
- **Authorization**: (optional) If the user is authenticated, include the `Authorization` header with the JWT token or session information.
Authorization: Bearer <JWT_TOKEN>

### Response
The server will respond with a JSON object containing the following data:

- **`assistancesOffers`**: An array of assistance offers. Each object in the array contains the offer details (e.g., title, description, type of offer, etc.).
- **`total`**: The total number of assistance offers available in the database (without pagination).
- **`page`**: The current page being requested.
- **`totalPages`**: The total number of pages based on the `limit` and `total` number of offers.

#### Example Response:
```
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
			"typeOffer": {
        type: "accommodation",
        quantity: 2
      }
			"createdAt": "2024-11-06T13:35:30.483Z",
			"updatedAt": "2024-11-06T13:35:30.483Z",
			"__v": 0
		}
	],
	"total": 1,
	"page": 1,
	"totalPages": 1
}
```
#### Status Codes:
- 200 OK: The request was successful and the data is returned.
- 400 Bad Request: The request was invalid (e.g., invalid query parameters).
- 401 Unauthorized: The user is not authorized to view the assistance offers.
- 500 Internal Server Error: A server error occurred while processing the request.

#### Authentication:
- If the client is authenticated (isAuth is true), the response will include additional user information (userId) related to each assistance offer. This can be used to identify the person who created the offer. If not authenticated, the response will only include the assistance offers without this user data.

#### Notes:
- Pagination is optional. If the page and limit parameters are not provided, the server will return the first page with 10 results by default.
- The total field in the response indicates the total number of assistance offers in the database, allowing the client to calculate the number of pages and implement pagination controls on the frontend.

## Get Assistance Offer by ID

### Description
This endpoint allows the client to retrieve a specific assistance offer by its ID. If the user is authenticated (`isAuth`), the response will include additional information about the user who created the offer, excluding sensitive data such as password and email.

### URL
GET `https://developer-proyect-dana.vercel.app/secure/api/v1/assistance-offer/get-assistance/:id`

### URL Parameters
- `id`: (required) The ID of the assistance offer to retrieve.

### Request Headers
- **Authorization**: (optional) If the user is authenticated, include the `Authorization` header with the JWT token or session information.
Authorization: Bearer <JWT_TOKEN>

### Response
The server will respond with a JSON object containing the specific assistance offer along with user information if the client is authenticated.

#### Example Response:
```
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
			"typeOffer": {
        type: "accommodation",
        quantity: 2
      }
			"createdAt": "2024-11-06T13:35:30.483Z",
			"updatedAt": "2024-11-06T13:35:30.483Z",
			"__v": 0
		}
```
#### Status Codes:
- 200 OK: The request was successful, and the requested assistance offer is returned.
- 400 Bad Request: The request was invalid (e.g., invalid offer ID).
- 401 Unauthorized: The user is not authorized to view the assistance offer.
- 500 Internal Server Error: A server error occurred while processing the request.

#### Authentication
- If the client is authenticated (isAuth is true), the response will include additional user information (userId) related to each assistance offer. This can be used to identify the person who created the offer. If not authenticated, the response will only include the assistance offers without this user data.

## Create Assistance Offer

### Description
This endpoint allows the client to create a new assistance offer. The user must provide the necessary details for the offer, such as expiration date, city, address, postal code, and geolocation data (latitude and longitude). If the geolocation data (latitude and longitude) is not provided, the server will attempt to fetch it using the user information. The expiration date must be at least 24 hours in the future.

### URL
POST `https://developer-proyect-dana.vercel.app/secure/api/v1/assistance-offer/create-assistance`

### Request Body
The request body should contain the following parameters:

- `title`: (required) The title of the assistance offer.
- `description`: (required) A description of the assistance offer.
- `status`: (optional) The status of the offer (default is `true`).
- `expires`: (required) The expiration date of the assistance offer (must be at least 24 hours in the future).
- `img`: (optional) A URL to an image representing the offer (defaults to a placeholder image if not provided).
- `city`: (optional) The city where the assistance is being offered. If not provided, the user's city will be used.
- `address`: (optional) The address where the assistance is provided. If not provided, the user's address will be used.
- `postalcode`: (optional) The postal code of the assistance location. If not provided, the user's postal code will be used.
- `lat`: (optional) Latitude of the location. If not provided, the server will attempt to fetch them based on the provided address, city, and postal code.
- `lon`: (optional) Longitude of the location. If not provided, the server will attempt to fetch them based on the provided address, city, and postal code.
- `typeOffer`: (required) An array of objects including the type and the quantity of the assistance offer. The quantity must be 1 or more and the type can be one of the following:
  - `'accommodation'`
  - `'hygiene'`
  - `'food'`
  - `'pet_fostering'`
  

#### Example Request:
```
{
  "title": "Free Accommodation in Alicante",
  "description": "We are offering free accommodation for those in need in Alicante.",
  "status": true,
  "userId": "6729dc82810229f45e0ff022",
  "expires": "2024-12-31",
  "img": "https://www.gisinfo.net/images/news_main/first_news_images/1940_image_400.jpg",
  "typeOffer": {
        type: "accommodation",
        quantity: 2
      }
}
```

### Request Headers
- **Authorization**: (required) The client must include the Authorization header with the JWT token or session information of the authenticated user.
Authorization: Bearer <JWT_TOKEN>

### Response
The server will respond with a JSON object containing the created assistance offer details.

#### Example Response:
```
{
  "message": "Assistance Offer successfully created",
  "assistanceOffer": {
    "location": {
				"type": "Point",
				"coordinates": [
					-0.504228,
					38.3451509
				]
			},
    "_id": "672aa137421157a5f26eac42",
    "title": "Free Accommodation in Alicante",
    "description": "We are offering free accommodation for those in need in Alicante.",
    "status": true,
    "userId": "6729dc82810229f45e0ff022",
    "expires": "2024-12-31T00:00:00.000Z",
    "img": "https://www.gisinfo.net/images/news_main/first_news_images/1940_image_400.jpg",
    "city": "Alicante",
    "address": "Pasaje metal 7, 5-8",
    "postalcode": "03006",
    "lat": "38.3451509",
    "lon": "-0.504228",
    "typeOffer": {
        type: "accommodation",
        quantity: 2
      }
    "publicationDate": "2024-11-05T22:50:31.605Z",
    "createdAt": "2024-11-05T22:50:31.606Z",
    "updatedAt": "2024-11-05T23:15:48.240Z",
    "__v": 0
  }
}
```
#### Status Codes:
- 201 Created: The assistance offer was successfully created.
- 400 Bad Request: The request was invalid (e.g., missing required parameters, invalid expiration date, or unable to fetch geolocation).
- 401 Unauthorized: The user is not authorized to create an assistance offer.
- 500 Internal Server Error: A server error occurred while processing the request.
  
#### Notes:
- If not provided, the server will try to fetch the latitude and longitude based on the provided address, city, and postal code using a geocoding service.
- If the address, city, or postalcode are not provided, the user's own information will be used.
- The expiration date provided must be at least 24 hours in the future to ensure the offer is not created with an expired date.

## Update Assistance Offer

### Description
This endpoint allows a user to update an existing assistance offer. The user must be the creator of the assistance offer to update it. The offer details (including expiration date, location, etc.) can be modified, and if the address is updated, geolocation data will be recalculated. 

### URL
PUT `https://developer-proyect-dana.vercel.app/secure/api/v1/assistance-offer/create-assistance/update-assistance/:id`

### URL Parameters
- `id`: (required) The ID of the assistance offer to be updated.

### Request Body
The request body should contain the following parameters:

- `title`: (optional) The title of the assistance offer (e.g., "Free accommodation").
- `description`: (optional) A description of the assistance offer.
- `status`: (optional) The status of the offer (default is `true`).
- `expires`: (optional) The expiration date of the assistance offer (must be at least 24 hours in the future).
- `img`: (optional) A URL to an image representing the offer (defaults to a placeholder image if not provided).
- `city`: (optional) The city where the assistance is being offered. If not provided, the user's city will be used.
- `address`: (optional) The address where the assistance is provided. If not provided, the user's address will be used.
- `postalcode`: (optional) The postal code of the assistance location. If not provided, the user's postal code will be used.
- `lat`: (optional) Latitude of the location. If not provided, the server will attempt to fetch it based on the provided address, city, and postal code.
- `lon`: (optional) Longitude of the location. If not provided, the server will attempt to fetch it based on the provided address, city, and postal code.
- `typeOffer`: (optional) An array of objects including the type and the quantity of the assistance offer. The quantity must be 1 or more and the type can be one of the following:
  - `accommodation`
  - `hygiene`
  - `food`
  - `pet_fostering`
  
### Request Headers
- **Authorization**: (required) The client must include the Authorization header with the JWT token or session information of the authenticated user.
Authorization: Bearer <JWT_TOKEN>

### Response
The server will respond with a JSON object containing the updated assistance offer details.

#### Example Response:
```
{
  "message": "Assistance Offer successfully updated",
  "assistanceOffer": {
    "location": {
				"type": "Point",
				"coordinates": [
					-0.504228,
					38.3451509
				]
			},
    "_id": "6729dc82810229f45e0ff022",
    "title": "Offer for Pet Fostering",
    "description": "Temporary care for pets in need.",
    "expires": "2024-11-07T00:00:00Z",
    "img": "https://www.gisinfo.net/images/news_main/first_news_images/1940_image_400.jpg",
    "city": "Alicante",
    "address": "Calle Ficticia 123",
    "postalcode": "03001",
    "lat": "38.3451509",
    "lon": "-0.504228",
    "typeOffer": {
        type: "pet_fostering",
        quantity: 1
      }
    "userId": "6729dc82810229f45e0ff022",
    "createdAt": "2024-11-05T22:50:31.605Z",
    "updatedAt": "2024-11-06T10:20:15.000Z"
  }
}
```
#### Status Codes:
- 201 Created: The assistance offer was successfully created.
- 400 Bad Request: The request was invalid (e.g., missing required parameters, invalid expiration date, or unable to fetch geolocation).
- 401 Unauthorized: The user is not authorized to create an assistance offer.
- 500 Internal Server Error: A server error occurred while processing the request.
  
#### Notes:
- If not provided, the server will try to fetch the latitude and longitude based on the provided address, city, and postal code using a geocoding service.
- The expiration date provided must be at least 24 hours in the future to ensure the offer is not created with an expired date.

## Delete Assistance Offer

### Description
This endpoint allows the client to delete an existing assistance offer by its unique ID. If the offer is successfully deleted, a 204 status code is returned. If the offer cannot be found, a 404 status code is returned.

### URL
DELETE `https://developer-proyect-dana.vercel.app/secure/api/v1/assistance-offer/create-assistance/delete-assistance/:id`

### URL Parameters
- `id` (required): The unique identifier of the assistance offer to be deleted.
  
### Request Headers
- **Authorization**: (required) The client must include the Authorization header with the JWT token or session information of the authenticated user.
Authorization: Bearer <JWT_TOKEN>

### Response
The server will respond with a JSON object containing the message indicating whether the deletion was successful or not.

#### Example Response:
```
{
  "message": "Assistance Offer successfully deleted",
}
```

#### Status Codes:
- 204 No Content: The assistance offer was successfully deleted.
- 404 Not Found: The assistance offer with the given ID does not exist.
- 500 Internal Server Error: A server error occurred while processing the request.

#### Authentication:
- If the client is authenticated (isAuth is true), the user’s credentials should be validated. If not authenticated, access to the deletion might be restricted depending on the application logic.

#### Notes_
- This endpoint permanently deletes an assistance offer from the database. Make sure the correct ID is provided.


## Filter Assistance Offers

### Description
This endpoint allows clients to retrieve a filtered list of assistance offers based on location, assistance type, or proximity to a geographical point. If useLocation=true, the client must provide lat, lon, and distance for a proximity search; otherwise, the client can specify a city using location.

### URL
- GET `https://developer-proyect-dana.vercel.app/secure/api/v1/assistance-offer/create-assistance/filter`

### Query Parameters
| Parameter       | Type     | Description                                                                                       |
|-----------------|----------|-------------------------------------------------------------------------------------------------- |
| `useLocation`   | Boolean  | Set to true to use current location coordinates for search.                                       |
| `lat`           | Number   | Latitude for proximity search. Required if `useLocation=true`. (lat should always be positive)    |
| `lon`           | Number   | Longitude for proximity search. Required if `useLocation=true`. (lon should always be negative)   |
| `distance`      | Number   | Radius in kilometers for the proximity search. Required if `useLocation=true`.                    |
| `location`      | String   | City or location name for a non-geographical search. Optional, used if `useLocation=false`.       |
| `assistanceType`| String   | Type of assistance required, e.g., `accommodation`, `hygiene`, `food`, `pet_fostering`. Optional. |
| `page`          | Number   | Page number for pagination. Default is 1.                                                         |
| `limit`         | Number   | Number of results per page for pagination. Default is 10.                                         |

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

```
{
	"assistanceOffers": [
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
			"description": "Tengo disponible una habitación para dormir.",
			"status": true,
			"userId": "672953991f7f64ac65037a94",
			"expires": "2024-11-08T00:00:00.000Z",
			"img": "https://www.gisinfo.net/images/news_main/first_news_images/1940_image_400.jpg",
			"city": "Alicante",
			"address": "Pasaje metal 7, 5-A",
			"postalcode": "03006",
			"typeOffer": {
        type: "accommodation",
        quantity: 2
      }
			"createdAt": "2024-11-06T13:35:30.483Z",
			"updatedAt": "2024-11-06T13:35:30.483Z",
			"__v": 0
		}
	],
	"total": 1,
	"page": 1,
	"totalPages": 1
}
```

#### Status Codes
- 200 OK: The request was successful, and the results are returned.
- 400 Bad Request: Missing or invalid parameters (e.g., lat, lon, distance required with useLocation=true).
- 401 Unauthorized: User is not authorized to view assistance offers.
- 500 Internal Server Error: An error occurred on the server.

#### Error Handling
- Missing Required Parameters: If useLocation=true is set without lat, lon, or distance, a 400 error will be returned.
- Invalid Parameters: A 400 error will be returned if parameters are of an incorrect type or outside expected bounds.
