# Blog Platform with Role-Based Access Control (RBAC)

## 📝 Overview

A full-stack blog platform with authentication and role-based authorization. Users can register, login, and interact with blog posts based on their roles (Admin/User). Admins have additional privileges to manage all content and users.

## ✨ Features

### 🔐 Authentication & Authorization
- User registration and login
- JWT token-based authentication
- Role-based access control (Admin/User)
- Protected routes for authenticated users
- Admin dashboard for privileged operations

### 📚 Blog Management
- Create, read, update, and delete blog posts
- View all blogs or individual blog details
- Rich text content support
- Author attribution and timestamps

### 👥 User Management
- User profile management
- Admin can view all users
- Role assignment/updating (Admin only)
- Account deletion

### 🖥️ UI/UX
- Responsive design
- Clean, modern interface
- Loading states and error handling
- Intuitive navigation

## 🛠️ Tech Stack

### Frontend
- React.js
- React Router
- React Bootstrap
- Context API (State management)
- Axios (HTTP client)

### Backend
- Node.js
- Express.js
- MongoDB (Database)
- Mongoose (ODM)
- JWT (Authentication)

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v16+ recommended)
- MongoDB (local or Atlas cluster)
- Git (optional)

### Backend Setup

1. Clone the repository:
```bash
git clone https://github.com/yourusername/blog-platform-rbac.git
cd blog-platform-rbac/backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the backend directory:
```env
DB_URI=mongodb://localhost:27017/blog-platform
JWT_SECRET=your_strong_jwt_secret_here
JWT_EXPIRY=1h
PORT=5000
```

4. Start the backend server:
```bash
npm start
```

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd ../frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the frontend directory:
```env
REACT_APP_API_URL=http://localhost:5000/api
```

4. Start the frontend development server:
```bash
npm start
```

## 🌐 Running the Application

1. Start both backend and frontend servers (in separate terminals):
   - Backend: `npm start` (from backend directory)
   - Frontend: `npm start` (from frontend directory)

2. Open your browser and visit:
```
http://localhost:3000
```

## 📂 Project Structure

```
blog-platform-rbac/
├── backend/
│   ├── config/         # Configuration files
│   ├── controllers/    # Route controllers
│   ├── middlewares/    # Custom middlewares
│   ├── models/         # MongoDB models
│   ├── routes/         # API routes
│   ├── .env           # Environment variables
│   └── app.js         # Main backend file
│
├── frontend/
│   ├── public/         # Static files
│   ├── src/
│   │   ├── components/ # React components
│   │   ├── context/    # Context providers
│   │   ├── pages/      # Page components
│   │   ├── services/   # API service modules
│   │   ├── App.js      # Main frontend file
│   │   └── index.js    # Frontend entry point
│   ├── .env           # Frontend environment variables
│   └── package.json   # Frontend dependencies
│
└── README.md          # This file
```

## 👨‍💻 Usage Guide

### For Regular Users
1. Register an account or login
2. View all blog posts
3. Create your own blog posts
4. Edit/delete your own posts
5. Update your profile

### For Admin Users
1. Login with admin credentials
2. Access Admin Dashboard from navigation
3. Manage all blog posts (edit/delete any)
4. View and manage user accounts
5. Assign/update user roles

## 🤝 Contributing

Contributions are welcome! Please follow these steps:
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

---

**Happy Blogging!** 🎉