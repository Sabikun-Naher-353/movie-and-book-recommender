# GROUP DETAILS
   Group name:
   Group Members:
   1.Nishat Tasnim (231-115-336)
   2.Fahmina Zannat Khan Zebin (231-115-341)
   3.Manar Toufique Chowdhury (231-115-342)
   4.Sabikun Naher Islam Amrin (231-115-353)


# Movie & Book Recommendation System

This is a web application that recommends movies and books to users based on genre, rating, and trend. It also allows users to rate, comment, and review items, and includes a secure admin panel for managing the system.

## Features

- User Registration & Login
- Book & Movie Browsing
- Rating System (1–5 stars)
- Reviews & Comments
- Recommendation by:
  - Genre (search-based)
  - Rating (highest to lowest)
  - Trending (recently rated)
- Admin Panel (secured with static admin credentials)

## Tech Stack

- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Node.js
- **Database:** MySQL
- **Server:** Express server on `localhost:3000`

## Database Schema (MySQL)

### Users Table
```sql
CREATE TABLE Users (
  user_id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL,
  password VARCHAR(255) NOT NULL,
  email VARCHAR(100),
  join_date DATE
);
```

### Movies Table
```sql
CREATE TABLE Movies (
  movie_id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(100),
  genre VARCHAR(50),
  description TEXT,
  release_year INT,
  cover_image TEXT
);
```

### Books Table
```sql
CREATE TABLE Books (
  book_id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(100),
  genre VARCHAR(50),
  description TEXT,
  publish_year INT,
  cover_image TEXT
);
```

### Ratings Table
```sql
CREATE TABLE Ratings (
  rating_id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  item_type ENUM('movie', 'book'),
  item_id INT,
  rating INT,
  rated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Comments Table
```sql
CREATE TABLE Comments (
  comment_id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  item_type ENUM('movie', 'book'),
  item_id INT,
  comment TEXT,
  commented_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Reviews Table
```sql
CREATE TABLE Reviews (
  review_id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  item_type ENUM('movie', 'book'),
  item_id INT,
  review TEXT,
  reviewed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Admin Login

Only one admin user is allowed, hardcoded with fixed credentials.

```txt
Username: admin
Password: admin123
```

## Folder Structure

```
movie-book-recommender/
├── frontend/
│   ├── admin.html
│   ├── home.html
│   ├── login.html
│   ├── signup.html
│   ├── movies.html
│   ├── movie_detail.html
│   ├── books.html
│   ├── book_detail.html
│   ├── recommend.html
│   └── admin-login.html
│   ├── index.html
│   ├── profile.html
│   ├── start.html
│   ├── js/
|   |   ├── admin.js
|   |   ├── admin-login.js
|   |   ├── auth.js
|   |   ├── book_detail.js
|   |   ├── books.js
|   |   ├── home.js
|   |   ├── login.js
|   |   ├── movie_detail.js
|   |   ├── movies.js
|   |   ├── profile.js
|   |   ├── recommend.js
├── routes/
│   ├── userRoutes.js
│   ├── itemRoutes.js
│   ├── ratingRoutes.js
│   ├── reviewRoutes.js
│   └── commentRoutes.js
├── controllers/
│   ├── userController.js
│   ├── itemController.js
│   ├── ratingController.js
│   ├── reviewController.js
│   └── commentController.js
├── config/
│   └── db.js
├── app.js
└── .env
└── package.json
└── package-lock.json
└── er diagram.jpg
└── README.md
```

## Future Improvements
- Make the UI fully responsive for mobile devices
- Personalized recommendations using machine learning
- Better UI/UX with frameworks like React 
