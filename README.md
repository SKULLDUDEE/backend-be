# Hubly Backend API

This is the backend API for the Hubly Ticket Management System, a comprehensive solution for managing customer support tickets, team collaboration, and integrated chatbot functionality.

## 🛠️ Technology Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Password Security**: Bcrypt for hashing
- **Environment Variables**: Dotenv
- **CORS**: Cross-Origin Resource Sharing enabled

## 📋 Project Structure

```
Backend/
├── Controllers/       # Request handlers for different resources
│   ├── chatBotController.js
│   ├── teamController.js
│   ├── ticketController.js
│   └── userController.js
├── Middleware/        # Authentication and authorization middleware
│   ├── authMiddleware.js
│   └── authorize.js
├── Models/            # MongoDB schema definitions
│   ├── BotUser.js
│   ├── ChatBot.js
│   ├── Team.js
│   ├── Tickets.js
│   └── User.js
├── Routes/            # API route definitions
│   ├── UserRouter.js
│   ├── chatBotRouter.js
│   ├── teamRouter.js
│   └── ticketRouter.js
├── server.js          # Entry point for the application
└── package.json       # Project dependencies and scripts
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/hubly-ticket-management.git
   cd hubly-ticket-management/Backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables:
   ```
   PORT=5001
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   CLIENT_URL=http://localhost:5173
   ```

4. Start the server:
   ```bash
   # Development mode with nodemon
   npm run dev
   
   # Production mode
   npm start
   ```

## 📝 API Documentation

### Authentication Endpoints

#### Register a new user
- **URL**: `/users/register`
- **Method**: `POST`
- **Body**:
  ```json
  {
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "password": "securepassword"
  }
  ```
- **Response**: Returns user details and JWT token
- **Notes**: Automatically creates a team with the user as captain-admin

#### Login
- **URL**: `/users/login`
- **Method**: `POST`
- **Body**:
  ```json
  {
    "email": "john@example.com",
    "password": "securepassword"
  }
  ```
- **Response**: Returns user details and JWT token

#### Logout
- **URL**: `/users/logout`
- **Method**: `POST`
- **Headers**: `Authorization: Bearer {token}`
- **Response**: Success message

#### Get User Details
- **URL**: `/users/getUserDetails/:id`
- **Method**: `GET`
- **Headers**: `Authorization: Bearer {token}`
- **Response**: User details excluding password

#### Update User
- **URL**: `/users/updateRegister/:id`
- **Method**: `PUT`
- **Headers**: `Authorization: Bearer {token}`
- **Body**: Fields to update
- **Notes**: Password changes are restricted to captain-admin role

### Team Endpoints

#### Create Team
- **URL**: `/team`
- **Method**: `POST`
- **Headers**: `Authorization: Bearer {token}`
- **Body**:
  ```json
  {
    "name": "Support Team",
    "members": [{"userId": "user_id", "name": "Member Name", "role": "member"}]
  }
  ```

#### Get Team Details
- **URL**: `/team/:id`
- **Method**: `GET`
- **Headers**: `Authorization: Bearer {token}`

#### Update Team
- **URL**: `/team/:id`
- **Method**: `PUT`
- **Headers**: `Authorization: Bearer {token}`
- **Body**: Fields to update

#### Add Team Member
- **URL**: `/team/:id/members`
- **Method**: `POST`
- **Headers**: `Authorization: Bearer {token}`
- **Body**:
  ```json
  {
    "userId": "user_id",
    "name": "Member Name",
    "role": "member"
  }
  ```

### Ticket Endpoints

#### Create Ticket
- **URL**: `/tickets`
- **Method**: `POST`
- **Headers**: `Authorization: Bearer {token}`
- **Body**:
  ```json
  {
    "userId": "bot_user_id",
    "query": "Initial ticket message"
  }
  ```
- **Notes**: Automatically assigns to captain-admin

#### Get Tickets for User
- **URL**: `/tickets/:userid`
- **Method**: `GET`
- **Headers**: `Authorization: Bearer {token}`
- **Response**: List of tickets assigned to the user

#### Get Tickets by Status
- **URL**: `/tickets/:userid/status/:status`
- **Method**: `GET`
- **Headers**: `Authorization: Bearer {token}`
- **Response**: List of tickets with specified status

#### Get Ticket Details
- **URL**: `/tickets/:userid/:id`
- **Method**: `GET`
- **Headers**: `Authorization: Bearer {token}`
- **Response**: Ticket details including messages

#### Add Message to Ticket
- **URL**: `/tickets/:id/messages`
- **Method**: `POST`
- **Headers**: `Authorization: Bearer {token}`
- **Body**:
  ```json
  {
    "sender": "user|agent",
    "text": "Message content"
  }
  ```

#### Update Ticket Status
- **URL**: `/tickets/:id/status`
- **Method**: `PUT`
- **Headers**: `Authorization: Bearer {token}`
- **Body**:
  ```json
  {
    "status": "open|resolved"
  }
  ```

#### Assign Ticket
- **URL**: `/tickets/:id/assign`
- **Method**: `PUT`
- **Headers**: `Authorization: Bearer {token}`
- **Body**:
  ```json
  {
    "assignedId": "user_id"
  }
  ```

### ChatBot Endpoints

#### Check or Create Bot User
- **URL**: `/chatbot/user`
- **Method**: `POST`
- **Body**:
  ```json
  {
    "name": "Visitor Name",
    "email": "visitor@example.com",
    "phone": "1234567890"
  }
  ```
- **Response**: User details and previous chats if existing

#### Get Bot User
- **URL**: `/chatbot/user/:id`
- **Method**: `GET`
- **Headers**: `Authorization: Bearer {token}`
- **Response**: Bot user details

#### Create or Get Ticket
- **URL**: `/chatbot/ticket`
- **Method**: `POST`
- **Body**:
  ```json
  {
    "email": "visitor@example.com",
    "query": "Help message"
  }
  ```
- **Response**: New or existing ticket details

## 🔐 Authentication & Authorization

The API uses JWT (JSON Web Tokens) for authentication. Protected routes require a valid JWT token in the Authorization header:

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

Tokens are issued during login and registration and expire after 24 hours.

### Role-Based Authorization

The system implements role-based access control with the following roles:
- **captain-admin**: Full access to all features, including team management and password changes
- **admin**: Administrative access without some captain-admin privileges
- **member**: Basic access to assigned tickets and limited team features

## 📊 Data Models

### User Model
```javascript
{
  firstName: String,
  lastName: String,
  email: String,
  username: String,
  password: String,
  teamId: ObjectId,
  role: String // 'captain-admin', 'admin', 'member'
}
```

### Team Model
```javascript
{
  name: String,
  captainId: ObjectId,
  members: [
    {
      userId: ObjectId,
      name: String,
      role: String
    }
  ],
  password: String
}
```

### Ticket Model
```javascript
{
  ticketNumber: String,
  raisedBy: ObjectId, // BotUser ID
  assignedTo: ObjectId, // User ID
  status: String, // 'open', 'resolved'
  messages: [
    {
      sender: String, // 'user', 'agent'
      text: String,
      timestamp: Date
    }
  ]
}
```

### BotUser Model
```javascript
{
  name: String,
  email: String,
  phone: String
}
```

## 🚀 Deployment

### Deploying to Render

1. Create a new Web Service on Render
2. Connect your GitHub repository
3. Configure the build:
   - Build Command: `npm install`
   - Start Command: `npm start`
4. Add environment variables:
   - `PORT`: 10000 (Render uses this port by default)
   - `MONGO_URI`: Your MongoDB connection string
   - `JWT_SECRET`: Your JWT secret key
   - `CLIENT_URL`: Your frontend URL

### Environment Variables for Production

Make sure to set these environment variables in your production environment:
- `PORT`: The port your server will run on
- `MONGO_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT token generation
- `CLIENT_URL`: URL of your frontend application for CORS

## 🧪 Testing

To run tests:
```bash
npm test
```

## 📝 License

This project is licensed under the ISC License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

