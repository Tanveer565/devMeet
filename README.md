# DevMeet Backend

A robust RESTful API built for **DevMeet**—a platform designed to help developers connect, network, and collaborate. This service handles secure user authentication, profile management, and connection request workflows.

## 🛠 Tech Stack

- **Runtime:** Node.js
    
- **Framework:** Express.js
    
- **Database:** MongoDB (via Mongoose ORM)
    
- **Authentication:** JSON Web Tokens (JWT) & bcrypt for password hashing
    

## ✨ Key Features

- **User Authentication:** Secure signup and login flow with encrypted password storage.
    
- **JWT Authorization:** Middleware protection for private routes using JWT headers/cookies.
    
- **Profile Management:** View, edit, and update developer profile details and skills.
    
- **Connection Request Lifecycle:** Send, accept, or reject connection requests between users.
    
- **Data Validation:** Strict payload validation to ensure database integrity.
    

## 🛣 API Endpoints

### 1. Auth Router (`authRouter`)

|   |   |   |   |
|---|---|---|---|
|**Method**|**Endpoint**|**Description**|**Auth Required**|
|`POST`|`/signup`|Register a new developer user account|No|
|`POST`|`/login`|Authenticate user credentials & return JWT|No|
|`POST`|`/logout`|Invalidate current user session|Yes|

### 2. Profile Router (`profileRouter`)

|   |   |   |   |
|---|---|---|---|
|**Method**|**Endpoint**|**Description**|**Auth Required**|
|`GET`|`/profile/view`|Fetch current user's profile details|Yes|
|`PATCH`|`/profile/edit`|Update profile details (bio, skills, etc.)|Yes|
|`PATCH`|`/profile/password`|Securely update account password|Yes|

### 3. Connection Request Router (`connectionRequestRouter`)

|   |   |   |   |
|---|---|---|---|
|**Method**|**Endpoint**|**Description**|**Auth Required**|
|`POST`|`/request/send/:status/:userId`|Send request to user (`status`: `interested` \| `ignored`)|Yes|
|`POST`|`/request/review/:status/:requestId`|Respond to request (`status`: `accepted` \| `rejected`)|Yes|
|`GET`|`/request/review/accepted/:requestId`|Fetch details of an accepted request|Yes|
|`GET`|`/request/review/rejected/:requestId`|Fetch details of a rejected request|Yes|

### 4. User Router (`userRouter`)

|            |                     |                                               |                   |
| ---------- | ------------------- | --------------------------------------------- | ----------------- |
| **Method** | **Endpoint**        | **Description**                               | **Auth Required** |
| `GET`      | `/user/connections` | Get all accepted developer connections        | Yes               |
| `GET`      | `/user/requests`    | View all pending received connection requests | Yes               |
| `GET`      | `/user/feed`        | Get dynamic developer recommendations feed    | Yes               |
## 🚀 Local Setup & Installation

### Prerequisites

- [Node.js](https://nodejs.org/ "null") (v16 or higher)
    
- [MongoDB](https://www.mongodb.com/ "null") (Local instance or MongoDB Atlas connection URI)
    

### Steps

1. **Clone the repository:**
    
    ```
    git clone https://github.com/Tanveer565/devMeet.git
    cd devmeet
    ```
    
2. **Install dependencies:**
    
    ```
    npm install
    ```
    
3. **Configure Environment Variables:** Create a `.env` file in the root directory and add the following:
    
    ```
    PORT=5000
    MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/devmeet
    JWT_SECRET=your_jwt_secret_key_here
    ```
    
4. **Start the server:**
    
    ```
    # Development mode with auto-reload
    npm run dev
    
    # Production mode
    npm start
    ```
    
5. **Server URL:** `http://localhost:5000`
