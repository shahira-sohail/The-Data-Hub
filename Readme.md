
# The Data Hub – RESTful API Server

The Data Hub is a RESTful API server built using **Node.js** and **Express.js** as part of the Full Stack Engineering Residency.

The project provides API endpoints to create, retrieve, update, and delete blog posts. It also includes custom logging middleware to monitor incoming HTTP requests and a mock login endpoint that demonstrates a basic authentication response.

## 🚀 Live Demo

**Live API:** https://the-data-hub-u2u2.onrender.com

**GitHub Repository:** https://github.com/shahira-sohail/The-Data-Hub

## 🛠️ Tech Stack

- **Node.js** – JavaScript runtime for server-side development
- **Express.js** – Web framework for building REST APIs
- **JavaScript** – Backend programming language
- **Thunder Client** – API testing tool
- **Render** – Cloud deployment platform
- **Git & GitHub** – Version control and source code hosting

## ✨ Features

- RESTful API architecture
- CRUD operations for blog posts
- In-memory data storage
- JSON request and response handling
- Custom logging middleware
- Mock login endpoint with a sample token
- API testing using Thunder Client
- Cloud deployment on Render

## 📁 Project Structure

```text
The-Data-Hub/
│
├── node_modules/
├── server.js
├── package.json
├── package-lock.json
└── .gitignore
```

> `node_modules` is generated when dependencies are installed and is excluded from GitHub using `.gitignore`.

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

### 4. Start the server

```bash
npm start
```

The server will run locally on:

```text
http://localhost:5000
```

The server uses the deployment platform's assigned port when available and falls back to port `5000` for local development.

## 📡 API Endpoints

Base URL:

```text
https://the-data-hub-u2u2.onrender.com
```

| Method | Endpoint | Description |
|---|---|---|
| GET | `/` | Check API status |
| GET | `/posts` | Retrieve all blog posts |
| GET | `/posts/:id` | Retrieve a post by ID |
| POST | `/posts` | Create a new blog post |
| PUT | `/posts/:id` | Update an existing post |
| DELETE | `/posts/:id` | Delete a post by ID |
| POST | `/login` | Return a mock login token |

## 📝 API Usage Examples

The following examples use the local server. Replace `http://localhost:5000` with the live base URL to test the deployed API.

### 1. Check API Status

**GET** `/`

```json
{
  "message": "The Data Hub API is running"
}
```

### 2. Create a Blog Post

**POST** `/posts`

Request body:

```json
{
  "id": 1,
  "title": "Learning Backend",
  "author": "Shahira"
}
```

The server adds the submitted post to the in-memory array and returns the created post.

### 3. Get All Blog Posts

**GET** `/posts`

Returns all blog posts currently stored in memory.

Example response:

```json
[
  {
    "id": 1,
    "title": "Learning Backend",
    "author": "Shahira"
  }
]
```

### 4. Get a Blog Post by ID

**GET** `/posts/1`

Returns the post matching the requested ID.

Example response:

```json
{
  "id": 1,
  "title": "Learning Backend",
  "author": "Shahira"
}
```

### 5. Update a Blog Post

**PUT** `/posts/1`

Request body:

```json
{
  "title": "Learning Express.js",
  "author": "Shahira"
}
```

The server updates the matching post and returns the updated data. If the post does not exist, the API returns a `404 Not Found` response.

### 6. Delete a Blog Post

**DELETE** `/posts/1`

Deletes the post matching the specified ID.

Example response:

```json
{
  "message": "Post deleted successfully"
}
```

If the post does not exist, the API returns a `404 Not Found` response.

### 7. Mock Login

**POST** `/login`

Request body:

```json
{
  "username": "Shahira",
  "password": "123456"
}
```

Example response:

```json
{
  "message": "Login successful",
  "username": "Shahira",
  "token": "mock-jwt-token-12345"
}
```

> This endpoint returns a mock token for demonstration purposes. It does not verify credentials or generate a real, signed JWT.

## 🔍 Middleware

The project includes custom logging middleware that records details of incoming HTTP requests.

It logs:
- HTTP method
- Request path
- Timestamp

Example terminal output:

```text
[GET] /posts - 10:05:10 AM
[POST] /posts - 10:06:20 AM
[DELETE] /posts/1 - 10:07:15 AM
```

This helps observe API activity during development and testing.

## 🧪 API Testing

The API was tested using **Thunder Client**, a REST API testing extension available in Visual Studio Code.

The following operations were tested:

- Creating blog posts using POST
- Retrieving posts using GET
- Updating posts using PUT
- Deleting posts using DELETE
- Testing the mock login endpoint
- Observing request logs in the server terminal

## ☁️ Deployment

The backend is deployed on **Render**.

**Live URL:** https://the-data-hub-u2u2.onrender.com

The server uses the `npm start` command to run the Express application in the deployment environment.

## 🗄️ Data Storage

This project currently uses an **in-memory JavaScript array** to store blog posts.

This approach is suitable for demonstrating CRUD operations and understanding backend API functionality. However, data is temporary and may be lost whenever the server restarts or the deployed instance is replaced.

Persistent database storage can be introduced in a future version.

## 🎯 Learning Outcomes

Through this project, I gained practical experience with:

- Setting up a Node.js backend environment
- Building RESTful APIs using Express.js
- Understanding HTTP methods and request-response handling
- Handling JSON request bodies
- Implementing CRUD operations
- Creating custom middleware
- Testing APIs using Thunder Client
- Deploying an Express server on Render
- Using Git and GitHub for version control

## 👩‍💻 Author

**Shahira Sohail**

- GitHub: https://github.com/shahira-sohail
- LinkedIn: https://linkedin.com/in/shahira-sohail-a106b0310

---

Developed as part of the **Full Stack Engineering Residency**.