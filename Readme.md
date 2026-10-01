# The Data Hub – RESTful API Server

The Data Hub is a RESTful API server built using **Node.js, Express.js, MongoDB Atlas, and Mongoose** as part of the Full Stack Engineering Residency.

This project extends the original Blog API by introducing cloud-based database storage, allowing data to persist beyond server restarts. It provides CRUD operations for blog posts and users, establishes relationships between users and posts, and uses Mongoose population and MongoDB aggregation to retrieve related and recent data.

The project focuses on understanding backend architecture, RESTful API development, database integration, data relationships, and API testing.

## 🚀 Project Overview

The Data Hub provides a backend system for managing blog posts and user records through RESTful APIs.

Unlike the previous version, which stored data in a temporary in-memory array, this version uses **MongoDB Atlas** for persistent cloud storage and **Mongoose** as an Object Data Modeling (ODM) library to define schemas and interact with the database.

## 🚀 Live Demo

**Live API:** https://the-data-hub-u2u2.onrender.com

**GitHub Repository:** https://github.com/shahira-sohail/The-Data-Hub

## 🛠️ Tech Stack

- **Node.js** – JavaScript runtime for server-side development
- **Express.js** – Web framework for building RESTful APIs
- **MongoDB Atlas** – Cloud-based NoSQL database
- **Mongoose** – ODM library for schema definition, validation, and database operations
- **JavaScript** – Backend programming language
- **dotenv** – Environment variable management
- **Postman** – API testing and request validation
- **Git & GitHub** – Version control and source code hosting

## ✨ Features

- RESTful API architecture
- CRUD operations for blog posts
- User creation and retrieval APIs
- MongoDB Atlas cloud database integration
- Persistent data storage
- Mongoose schemas and validation
- User–Post relationship using ObjectId references
- Mongoose `populate()` to retrieve related user details
- MongoDB aggregation pipeline for retrieving the three most recent posts
- `$lookup` and `$unwind` for joining related documents
- JSON request and response handling
- Custom logging middleware for monitoring incoming requests
- Mock login endpoint with a sample token
- API testing using Postman
- Environment variables for secure database configuration

## 📁 Project Structure

```text
The-Data-Hub/
│
├── models/
│   ├── Post.js
│   └── User.js
│
├── node_modules/
│
├── .env
├── .gitignore
├── package.json
├── package-lock.json
└── server.js
```

### Project Files

- **server.js** – Configures the Express server, database connection, middleware, and API routes.
- **models/Post.js** – Defines the Post schema, including title, content, creation date, and the reference to its author.
- **models/User.js** – Defines the User schema with name and email fields.
- **.env** – Stores environment variables such as the MongoDB connection URI.
- **.gitignore** – Excludes sensitive and generated files from Git tracking.

`node_modules` is generated when dependencies are installed and is excluded from GitHub.

## ⚙️ Installation and Setup

### 1. Clone the repository

```bash
git clone https://github.com/shahira-sohail/The-Data-Hub.git
```

### 2. Navigate to the project directory

```bash
cd The-Data-Hub
```

### 3. Install dependencies

```bash
npm install
```

### 4. Configure environment variables

Create a `.env` file in the project root:

```env
MONGO_URI=your_mongodb_atlas_connection_string
PORT=5000
```

Replace the placeholder with your MongoDB Atlas connection string.

**Important:** Never share your MongoDB connection string or commit your `.env` file to GitHub.

### 5. Start the server

```bash
npm start
```

Alternatively, if no start script is configured in `package.json`:

```bash
node server.js
```

The server runs locally at:

```text
http://localhost:5000
```

When the MongoDB connection succeeds, the server starts listening for incoming requests.

## ☁️ MongoDB Atlas Integration

The project uses **MongoDB Atlas** as its cloud database.

Mongoose establishes the connection using the `MONGO_URI` environment variable stored in `.env`.

MongoDB Atlas stores the project's documents in collections, including:

- **users** – Stores user details such as name and email.
- **posts** – Stores blog posts, their content, creation timestamps, and references to their authors.

This allows the application to maintain data even after the backend server restarts.

## 🗂️ Database Schemas

### User Schema

The User schema defines the structure of user records.

| Field | Type | Description |
|---|---|---|
| `_id` | ObjectId | Automatically generated unique identifier |
| `name` | String | User's name |
| `email` | String | User's email address; must be unique |

### Post Schema

The Post schema defines the structure of blog posts.

| Field | Type | Description |
|---|---|---|
| `_id` | ObjectId | Automatically generated unique identifier |
| `title` | String | Title of the post; required |
| `content` | String | Main content of the post; required |
| `authorId` | ObjectId | Reference to a User document |
| `createdAt` | Date | Automatically assigned creation timestamp |

The `authorId` field uses Mongoose's `ObjectId` type with a reference to the `User` model. This establishes a relationship between posts and their authors.

## 📡 API Endpoints

Base URL for local development:

```text
http://localhost:5000
```

| Method | Endpoint | Description |
|---|---|---|
| GET | `/` | Check API status, if configured |
| GET | `/posts` | Retrieve all posts with populated author details |
| GET | `/posts/recent` | Retrieve the three most recent posts with author details |
| GET | `/posts/:id` | Retrieve a post by its ID |
| POST | `/posts` | Create a new post |
| PUT | `/posts/:id` | Update an existing post |
| DELETE | `/posts/:id` | Delete a post by its ID |
| GET | `/users` | Retrieve all users |
| POST | `/users` | Create a new user |
| POST | `/login` | Return a mock login response |

## 📝 API Usage Examples

The following examples use the local development server. Replace `http://localhost:5000` with the appropriate base URL if testing a deployed version.

### 1. Create a User

**POST** `/users`

Request body:

```json
{
  "name": "Shahira Sohail",
  "email": "shahira.test@example.com"
}
```

The API creates a new user in MongoDB Atlas and returns the saved document, including its generated `_id`.

Email addresses must be unique.

### 2. Get All Users

**GET** `/users`

Retrieves user documents stored in the MongoDB Atlas database.

### 3. Create a Blog Post

**POST** `/posts`

Request body:

```json
{
  "title": "Learning Backend",
  "content": "Understanding Node.js, Express, and MongoDB.",
  "authorId": "YOUR_USER_OBJECT_ID"
}
```

Replace `YOUR_USER_OBJECT_ID` with the `_id` of an existing user.

The API validates the submitted data and creates a post in MongoDB Atlas.

### 4. Get All Blog Posts

**GET** `/posts`

Retrieves all posts stored in the database.

The endpoint uses Mongoose's `populate("authorId")` to retrieve the related user details, such as the author's name and email, instead of returning only the author's ObjectId.

### 5. Get a Blog Post by ID

**GET** `/posts/:id`

Example:

```text
GET http://localhost:5000/posts/POST_OBJECT_ID
```

Retrieves a specific post using its MongoDB ObjectId.

If the requested post does not exist, the API returns a `404 Not Found` response.

### 6. Update a Blog Post

**PUT** `/posts/:id`

Request body:

```json
{
  "title": "Learning Express.js",
  "content": "Exploring REST APIs and database integration."
}
```

Updates an existing post using its ID. The API uses Mongoose's `findByIdAndUpdate()` with validation enabled and returns the updated document.

If the post does not exist, the API returns a `404 Not Found` response.

### 7. Delete a Blog Post

**DELETE** `/posts/:id`

Example:

```text
DELETE http://localhost:5000/posts/POST_OBJECT_ID
```

Deletes the specified post from MongoDB Atlas and returns a confirmation response.

If the post does not exist, the API returns a `404 Not Found` response.

### 8. Get the Three Most Recent Posts

**GET** `/posts/recent`

Retrieves up to three of the most recently created posts using the MongoDB aggregation pipeline.

The aggregation uses:

- `$sort` – Sorts posts by `createdAt` in descending order.
- `$limit` – Restricts the result to the three most recent posts.
- `$lookup` – Joins the posts collection with the users collection using `authorId`.
- `$unwind` – Converts the matching author array into a single `authorDetails` object.

The response includes the post information along with the related author's details where a matching user exists.

### 9. Mock Login

**POST** `/login`

Request body:

```json
{
  "username": "Shahira",
  "password": "123456"
}
```

This endpoint returns a mock login response with a sample token for demonstration purposes.

**Note:** The endpoint does not perform actual credential verification or generate a real, signed JWT. It is intended only to demonstrate a basic authentication response.

## 🔗 User–Post Relationship

The project establishes a relationship between users and blog posts through the `authorId` field.

Each post stores the ObjectId of the user who authored it. The `ref: "User"` property in the Post schema informs Mongoose which model the reference points to.

Mongoose's `populate()` method retrieves the referenced user details when fetching posts.

This avoids duplicating the author's name and email in every post document and allows related data to be retrieved when needed.

## 📊 MongoDB Aggregation

The project uses a MongoDB aggregation pipeline to retrieve the three most recent posts and their associated author details.

The pipeline consists of:

1. **Sorting:** Orders posts by creation date, with the newest first.
2. **Limiting:** Selects only the first three posts.
3. **Joining:** Uses `$lookup` to match `authorId` with `_id` in the users collection.
4. **Unwinding:** Uses `$unwind` to produce a single author details object for each matching post.

This demonstrates how MongoDB can process and combine related documents directly through an aggregation pipeline.

## 🔍 Middleware

The project includes custom logging middleware to monitor incoming HTTP requests.

It records:

- HTTP method
- Request path
- Timestamp

Example terminal output:

```text
[GET] /posts - 10:05:10 AM
[POST] /posts - 10:06:20 AM
[DELETE] /posts/1 - 10:07:15 AM
```

This helps monitor API activity during development and debugging.

## 🧪 API Testing

The APIs were tested using **Postman** to verify request handling, database operations, and response behavior.

The following operations were tested:

- Creating users using POST
- Retrieving users using GET
- Creating blog posts with an `authorId` reference
- Retrieving posts with populated author details
- Retrieving posts by ID
- Updating existing posts
- Deleting posts
- Retrieving the three most recent posts through aggregation
- Testing the mock login endpoint
- Checking error responses for invalid or missing data
- Verifying database persistence through MongoDB Atlas

The MongoDB Atlas dashboard was also used to confirm that user and post documents were successfully stored in the cloud database.

## 🔐 Environment Variables and Security

The project uses environment variables to keep database connection details outside the source code.

The `.env` file contains the MongoDB connection URI and is excluded from version control using `.gitignore`.

The mock login endpoint is for demonstration only and should not be used as production authentication.

## ☁️ Deployment

The original Data Hub API was deployed on Render:

**Previous live API:**  
https://the-data-hub-u2u2.onrender.com

The current sprint introduces MongoDB Atlas and Mongoose integration. The live URL should only be considered the database-backed version after the updated code has been deployed and verified in the hosting environment.

## 🗄️ Data Storage

This version uses **MongoDB Atlas for persistent cloud-based data storage**, replacing the in-memory JavaScript array used in the previous sprint.

User and post documents are stored in their respective MongoDB collections and can be retrieved after the server restarts, provided the cloud database is accessible.

Mongoose schemas provide structure and validation for the application's data.

## 🎯 Learning Outcomes

Through this sprint, I gained practical experience with:

- Integrating MongoDB Atlas with a Node.js backend
- Connecting Express.js applications to a cloud database
- Understanding Mongoose and Object Data Modeling
- Creating schemas and models
- Defining relationships using ObjectId references
- Performing database CRUD operations
- Using Mongoose validation
- Retrieving related data with `populate()`
- Understanding MongoDB aggregation pipelines
- Using `$sort`, `$limit`, `$lookup`, and `$unwind`
- Managing environment variables with dotenv
- Testing REST APIs using Postman
- Verifying persistent data in MongoDB Atlas
- Debugging database connection and validation errors

## 👩‍💻 Author

**Shahira Sohail**

- GitHub: https://github.com/shahira-sohail
- LinkedIn: https://linkedin.com/in/shahira-sohail-a106b0310

---

Developed as part of the **Full Stack Engineering Residency**.