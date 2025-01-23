# Movie Management System | [**View Live**](https://movie-management-backend-topaz.vercel.app/)

### Project Building Time 28 hours

## Technology Stack

- **Backend**: Node.js, Express.js, TypeScript.
- **Database**: MongoDB with Mongoose.
- **Authentication**: JWT-based.
---

## Features

### 1. Task Requirement
- Try to maintain all requirements of task

### 2. Proper validation of schema
- Try to proper validation like movie duration, is exists movie like this

### 3. Mongoose advanced features
- Use indexing
- Use pre, and post hooks
- Mongoose methods
- Mongoose Virtual
- Aggregate middleware

### 4. Additional Requirements
- Proper validation and error handling for all endpoints.
- Modular design for scalability and maintainability.

---

## Project Run

1. Clone the repository:
   ```bash
   git clone https://github.com/Ubaidullah-Hasan/movie-management-system-backend.git
   cd movie-management-system-backend
2. Set environment variables: (optional => .env have to the project folder)
   ```bash
   PORT=3000
   NODE_ENV=development
   DATABASE_URL="mongodb+srv://lavel_2:Moon$Star$Sun1@cluster0.clipjzr.mongodb.net/movie_management_system?retryWrites=true&w=majority&appName=Cluster0"
   SALT_ROUND=12
   JWT_ACCESS_SECRET="1888cc385ec74b79e53432e770c938bf7f04a045888ac991091237d8566a89aa8af67cc64d99db95af1b02a2229edbecdb921f302d2cc8ff5dbe1e6b642f3330"
   JWT_REFRESH_SECRET="9063557f7b6e0480156c0dd183484e12deae66664645b556e35e5d4403b1860d6358d45a89ea5c0baea7ab215bac3c64405a87e5f428e102c3fdf2969f4d8047"
   JWT_ACCESS_EXPIRES_IN=10d
   JWT_REFRESH_EXPIRES_IN=365d
    ```
3. Set environment variables:
   ```bash
   npm install
    ```
4. Set environment variables:
   ```bash
   npm run dev
    ````

## TESTING PROJECT
#### I am provide the postman with my task submission email. please exchange the environment variables of postman (project api route) 

## API Endpoints

### 1. Authentication APIs

| **Method** | **Endpoint**     | **Description**   |
| ---------- | ---------------- | ----------------- |
| POST       | `/users/create-user` | User registration |
| POST       | `/auth/login`    | User login        |


### 2. Super Admin APIs

| **Method** | **Endpoint**        | **Description**           |
| ---------- | ------------------- | ------------------------- |
| GET        | `/reports`            | Get All Reports |
| GET        | `/reports/:reportID(6791b84e570c96c1e546e465)`  | Change Report Status |


### 3. User APIs

| **Method** | **Endpoint**        | **Description**                               |
| ---------- | ------------------- | --------------------------------------------- |
| POST        | `/movies/create-movies`            | Create a movie      |
| GET        | `/movies`            | View all Movies       |
| GET        | `/movies/:movieId(679104c0bde569e5c0ec0197)`            | View single Movie  |
| PATCH        | `/movies/:movieId(679104c0bde569e5c0ec0197)`            | Update single Movie  |
| POST        | `/ratings`            | Create & update ratings |
| GET        | `/ratings/movies-rating/:movieId(679104c0bde569e5c0ec0197)`            | Get Single Movies All Rating |
| POST        | `/reports`            | Create All Reports |


## View Live

You can view the live version of the project at:

[**View Live**](https://movie-management-backend-topaz.vercel.app/)