# 🎬 CineNexus

CineNexus is a full-stack movie discovery and watchlist application built using a modern React Native (Expo) frontend and a Node.js + Express backend. The app allows users to search for movies, explore trending content, view detailed movie information, and manage a personalized watchlist with authentication.

---

# 🚀 Features

## 🔐 Authentication System

* User registration and login using email & password
* JWT-based authentication
* Persistent login using AsyncStorage
* Secure protected routes in backend
* Logout functionality with instant UI update

## 🎥 Movie Browsing

* Trending movies
* Popular movies
* Top-rated movies
* Real-time search functionality
* Search suggestions while typing

## 📄 Movie Details Screen

* Full movie information
* Poster, title, release date, rating
* Overview and cast (via credits API)
* Add/remove from watchlist directly

## ⭐ Watchlist System

* Add movies to personal watchlist
* Remove movies from watchlist
* Sync watchlist with backend (user-specific)
* UI state reflects watchlist instantly across app

## 🔎 Search Experience

* Live search suggestions
* Genre-based browsing (Spotify-style UI)
* Clean grid layout for results
* Navigation to movie details from results

## 👤 Profile Section

* Displays user details
* Logout functionality
* Expandable section for future features (About/Services)

---

# 🧱 Tech Stack

## Frontend (Mobile App)

* React Native (Expo)
* Expo Router (File-based navigation)
* Axios (API calls)
* AsyncStorage (Token persistence)
* React Context API (State management)
* React Native Toast Message (Notifications)

## Backend (Server)

* Node.js
* Express.js
* MongoDB (Database)
* Mongoose (ODM)
* JSON Web Token (JWT) for authentication
* Bcrypt.js (Password hashing)

---

# 🗂️ Project Structure

```
CineNexus/
│
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── middleware/
│   ├── models/
│   ├── config/
│   └── server.js
│
├── mobile-expo/
│   ├── app/
│   │   ├── (tabs)/
│   │   ├── auth/
│   │   ├── movie/
│   │   └── _layout.tsx
│   │
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── screens/
│   │   └── hooks/
│   │
│   ├── assets/
│   └── package.json
```

---

# 🧠 Backend Architecture (Detailed)

## 🔹 Models

### User Model

* Fields:

  * `name`
  * `email`
  * `password` (hashed)
  * `watchlist` (array of movie objects)
  * `ratings` (optional)
* Watchlist is embedded inside user document (no separate collection)

---

## 🔹 Controllers

### Auth Controller

Handles:

* User registration
* User login
* JWT token generation

### Watchlist Controller

Handles:

* Add movie to watchlist
* Remove movie
* Fetch user watchlist

### Movie Controller

Handles:

* Fetch trending movies
* Search movies
* Fetch movie details
* Fetch genres
* Fetch credits

---

## 🔹 Middleware

### protect middleware

* Verifies JWT token
* Extracts user from database
* Attaches user to request (`req.user`)

---

## 🔹 Routes

### Auth Routes

```
POST /api/auth/register
POST /api/auth/login
GET  /api/auth/me
```

### Movie Routes

```
GET /api/movies/trending
GET /api/movies/popular
GET /api/movies/top-rated
GET /api/movies/search
GET /api/movies/:id
GET /api/movies/:id/credits
GET /api/movies/genres
```

### Watchlist Routes

```
GET    /api/watchlist
POST   /api/watchlist/add
DELETE /api/watchlist/remove/:movieId
```

---

# 📱 Frontend Architecture (Detailed)

## 🔹 Navigation (Expo Router)

* `(tabs)` → Main app (Home, Search, Watchlist, Profile)
* `auth/` → Login & Signup screens
* `movie/[id].tsx` → Dynamic movie details screen
* `_layout.tsx` → Root navigation controller

---

## 🔹 Contexts

### AuthContext

* Manages user authentication state
* Stores JWT token in AsyncStorage
* Provides:

  * `login`
  * `signup`
  * `logout`
  * `user`
  * `loading`

### WatchlistContext

* Manages watchlist globally
* Syncs with backend
* Provides:

  * `addMovie`
  * `removeMovie`
  * `isInWatchlist`

---

## 🔹 Key Components

### MovieCard

* Displays movie poster + title
* Add to watchlist button
* Navigation to details screen

### SearchSuggestions

* Displays real-time suggestions

---

## 🔹 Screens

### Home Screen

* Displays trending, popular, top-rated movies
* Horizontal scroll sections

### Search Screen

* Input-based search
* Suggestions dropdown
* Genre grid UI (Spotify-inspired)

### Watchlist Screen

* Displays saved movies
* Remove button with consistent UI alignment

### Profile Screen

* User info
* Logout button
* Expandable section for future features

### Movie Detail Screen

* Full movie info
* Watchlist toggle
* Credits display

---

# 🔄 Data Flow

1. User logs in → JWT stored in AsyncStorage
2. Axios interceptor attaches token to every request
3. Backend verifies token → returns user data
4. Watchlist is synced from backend
5. UI updates globally via Context

---

# 🔐 Authentication Flow

1. User logs in/signup
2. Backend returns JWT token
3. Token stored locally
4. On app start:

   * Token is read
   * `/auth/me` is called
   * User is restored
5. Navigation redirects based on auth state

---

# ⚙️ API Handling

* Axios instance configured with base URL
* Request interceptor injects JWT token
* Centralized API structure (`src/api/api.js`)

---

# 📦 Installation & Setup

## Backend

```
cd backend
npm install
npm run dev
```

## Frontend

```
cd mobile-expo
npm install
npx expo start
```

---

# 📌 Notes

* No Firebase used (pure MongoDB auth)
* Watchlist stored inside user document
* Expo managed workflow (no native Android/iOS folders required)

---

# 🧩 Future Enhancements

* Ratings system
* Reviews
* Social sharing
* Recommendation engine
* Dark/light theme toggle
