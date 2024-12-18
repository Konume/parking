# Parking Management System
> A web-based parking management system that allows users to reserve parking spaces, manage users, and send notifications.  
> Live demo [_coming soon_].

## Table of Contents
* [General Info](#general-information)
* [Technologies Used](#technologies-used)
* [Features](#features)
* [Screenshots](#screenshots)
* [Setup](#setup)
* [Usage](#usage)
* [Project Status](#project-status)
* [Room for Improvement](#room-for-improvement)
* [Acknowledgements](#acknowledgements)
* [Contact](#contact)

## General Information
The **Parking Management System** streamlines parking space management for administrators and end-users. Users can:
- View available parking spaces,
- Reserve a spot,
- Manage reservations and send notifications (e.g., "You are blocking my car").

### Purpose:
The goal was to create an intuitive, modern system for efficient parking space allocation while providing tools for communication between users and administrators.

---

## Technologies Used
- **Frontend**:
  - React.js
  - Tailwind CSS
  - Bulma
  - Axios
- **Backend**:
  - Node.js with Express.js
  - MongoDB (Mongoose for ODM)
- **Authentication**:
  - JSON Web Tokens (JWT)
- **Tools**:
  - Visual Studio Code
  - Postman for API testing

---

## Features
- 🚗 **View Available Parking Spaces**: Users can see real-time data of free and occupied spaces.
- ✅ **Reserve Parking Spaces**: Authenticated users can reserve a spot.
- 🔄 **Change Space Status**: Admins can change space status (occupied ↔ free).
- 👥 **User Management**: Admins can view all users and their reserved spaces.
- 📩 **Notifications**: Users can send notifications (e.g., "Your car is blocking mine").
- 🔒 **Secure Authentication**: JWT-based authentication system for secure access.
- 🛠️ **Dynamic Notifications Bar**: Users see live notifications in the app header.

---

## Screenshots

### Dashboard
![Parking Dashboard](./img/dashboard.png)

### Notifications
![Notifications View](./img/notifications.png)

### User Management
![User Management](./img/user_management.png)

---

## Setup

### Requirements:
- Node.js v16+
- MongoDB installed locally or remote instance (Mongo Atlas)
- Browser (Chrome/Edge/Firefox)

### Installation Steps:
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/parking-management-system.git
   cd parking-management-system
2. Install dependencies for backend:
  ```bash
cd backend
npm install

3.Install dependencies for frontend:

```bash
Skopiuj kod
cd frontend
npm install

4.Run backend:

```bash
cd backend
npm start
# Backend runs on: http://localhost:5001

5.Run frontend:
```bash
cd frontend
npm start
# Frontend runs on: http://localhost:3000

6. Connect MongoDB:

Add MongoDB URI to backend/.env:
```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
