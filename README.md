# Adopta un Valenciano

- Node.js
- Express
- MongoDB y Mongoose
- Nodemailer
- Bcrypt
- JSON Web Tokens (JWT)
- CORS
- Dotenv
- Nodemon

```
├── src
│ ├── config
│ │ └── db.js
│ ├── controllers
│ ├── middlewares
│ ├── models
│ ├── routes
│ └── utils
├── index.js
├── .gitignore
├── README.md
```

## Middleware Functions

#### `registerUser` (Register Middleware)

Handles user registration by performing the following steps:

1. Checks if the provided email is already registered.
2. If the email is unique, creates a new user instance with the provided data (`name`, `lastname`, `email`, `password`, `age`).
3. Saves the user in the database and returns a success message.

Example Request

```http
POST /users/register
Content-Type: application/json

{
    {
    "email": "test123@test123.com",
		"password":"11111111",
		"name":"Daniele",
		"lastname":"Mazzola",
		"birthDate":"1987-02-19",
		"city":"Alicante",
		"address":"Pasaje metal 7, 5-B",
		"postalcode":"03006"
}
}
```

Example Response

```json
{
	"message": "User successfully created.",
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
		"roles": [
			"user"
		],
		"lat": "38.3451509",
		"lon": "-0.504228",
		"createdAt": "2024-11-04T22:39:57.280Z",
		"updatedAt": "2024-11-04T22:39:57.280Z",
		"__v": 0
	}
}
```

#### `loginUser` (Login Middleware)

Handles user login by performing the following steps:

1. Searches the user by email in the database.
2. If found, compares the provided password with the hashed password stored in the database.
3. If the password matches, generates a JWT and returns it to the client.

Example Request

```http
POST /users/login
Content-Type: application/json

{
  "email": "john.doe@example.com",
  "password": "your_password"
}
```

Example Response

```json
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
		"roles": [
			"user"
		],
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

```http
GET /api/users/profile

```

Example Response

```json
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
	"roles": [
		"user"
	],
	"lat": "38.3451509",
	"lon": "-0.504228",
	"createdAt": "2024-11-04T22:39:57.280Z",
	"updatedAt": "2024-11-04T22:39:57.280Z",
	"__v": 0
}
```

#### `forgotPassword` (Forgot Password Middleware)

Handles password reset requests by performing the following steps:

1. Extracts the email from the request body.
2. Searches for the user by email in the database.
3. If the user exists, generates a password reset token and stores it in the user document.
4. Sends a password reset email with the generated token.

Example Request

```http
POST /users/forgot-password
Content-Type: application/json

{
  "email": "john.doe@example.com"
}

```

Example Response

```json
{
  "message": "Token sent to your email."
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

```http
GET /protected-route
Authorization: Bearer your_jwt_token

```

## ENV

- CONNECT_DDBB
- JWT_SECRET
- EMAIL_HOST
- OAUTH_CLIENTID
- OAUTH_CLIENT_SECRET
- OAUTH_REFRESH_TOKEN
- GEO_API_KEY

# API Documentation

## User API Endpoints

**Server URL:** `https://backend-eta-umber.vercel.app`  
**User Endpoint:** `https://backend-eta-umber.vercel.app/secure/api/v1/user`

| HTTP Method | URL                                   | Headers          | Request Body                                   | Description                                                                |
| ----------- | ------------------------------------- | ---------------- | ---------------------------------------------- | -------------------------------------------------------------------------- | ------------- |
| GET         | `/secure/api/v1/user/`                | Bearer `{token}` |                                                | Get user profile information                                               | Return {user} |
| POST        | `/secure/api/v1/user/register-user`   |                  | `{name, lastname, birthDate, email, password, city, address, postalcode}` | Registers a new user in the database. Return {user}                        |
| POST        | `/secure/api/v1/user/login-user`      |                  | `{email, password}`                            | Logs in a user, creating a session. Return {user, token}                   |
| POST        | `/secure/api/v1/user/forgot-password` |                  | `{email}`                                      | Sends a reset password link to the user. Return message: "Code send" mail. |
| POST        | `/secure/api/v1/user/comprove-token`  |                  | `{token}`                                      | Verifies the reset password token. Return Boolean.                         |
| PUT         | `/secure/api/v1/user/create-password` |                  | `{token, password}`                            | Updates the user’s password. Return {user}.                                |
