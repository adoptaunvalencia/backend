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
  "name": "John",
  "lastname": "Doe",
  "email": "john.doe@example.com",
  "password": "your_password",
  "age": 30
}
```
Example Response

```json
{
  "message": "User registered successfully."
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
  "token": "your_generated_jwt_token"
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
  "name": "John",
  "lastname": "Doe",
  "email": "john.doe@example.com",
  "age": 30,
  "roles": ["user"],
  "createdAt": "2024-11-03T12:34:56.789Z",
  "updatedAt": "2024-11-03T12:34:56.789Z"
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
Example Response

```json
{
  "message": "Access granted.",
  "user": {
    "name": "John",
    "lastname": "Doe",
    "email": "john.doe@example.com",
    "age": 30
  }
}

```

## ENV
- CONNECT_DDBB
- JWT_SECRET
- EMAIL_USER
- EMAIL_PASS