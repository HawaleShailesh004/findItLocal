# 📍 FindItLocal – Local Business Directory (MERN Stack Project)

## 🔗 Live Demo  
*Coming Soon* — Deployment link will be added once hosted.

---

## 💻 Tech Stack Used

- **Frontend**: React, HTML, CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT, Role-Based (User/Business)
- **Deployment**: (Coming Soon)

---

## 📌 Project Description

**FindItLocal** is a local business directory platform that bridges the gap between **local users** and **local service providers**.  
Users can explore, search, and book services online, while businesses can register and promote their offerings with multiple services under a single listing.

✅ **Why I built it:**  
Built as an academic project, FindItLocal aims to bring technology to local discovery — helping small businesses get visibility and users find nearby services easily.

---

## 🖼️ Screenshots

| Home Page | Business Detail Page |
|-----------|----------------------|
| ![Home](business-directory/screenshots/home.png) | ![Business](business-directory/screenshots/business_detail.png) |

| Service Search | Service Detail |
|----------------|----------------|
| ![Search](business-directory/screenshots/service_search.png) | ![Service](business-directory/screenshots/service_detail.png) |

| Login Page | Register (User) |
|------------|------------------|
| ![Login](business-directory/screenshots/login.png) | ![Register](business-directory/screenshots/register_1.png) |

| Business Creation | Add New Service |
|-------------------|-----------------|
| ![Biz](business-directory/screenshots/business_creation.png) | ![Add](business-directory/screenshots/service_create.png) |

| Business Dashboard | Profile Page |
|--------------------|---------------|
| ![Dashboard](business-directory/screenshots/business_dashboard.png) | ![Profile](business-directory/screenshots/profile_page.png) |

| Booking Service | Booking Summary |
|-----------------|-----------------|
| ![Booking](business-directory/screenshots/service_booking.png) | ![Payment](business-directory/screenshots/payment_summary.png) |

| User Bookings | FAQ |
|----------------|-----|
| ![Bookings](business-directory/screenshots/user_bookings.png) | ![FAQ](business-directory/screenshots/faq.png) |

| About Us | Contact Us |
|-----------|------------|
| ![About](business-directory/screenshots/about_us.png) | ![Contact](business-directory/screenshots/contact_us.png) |

---

## ⭐ Features

- 🔍 **Browse & Search** local businesses and services
- 📄 **Business Detail View** with service listing and contact info
- 📆 **Book Services** as a user
- ✍️ **Business Registration** with support for multiple services
- 👥 **Role-Based Login/Register** for:
  - Users (service seekers)
  - Business Owners (service providers)
- 🧾 **Service Booking Summary** and **Booking History**
- 📁 **Business Dashboard** to manage profile and services
- ✅ Clean UI with dedicated routes like:
  - Home
  - Service Search
  - Business Detail
  - Contact Us
  - FAQs
  - About Us

---

## 🛠 Installation / Usage Instructions

Follow these steps to run the project locally:

---

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/HawaleShailesh004/findItLocal.git
cd business-directory
```

#### Setup Frontend
```bash
cd ../business-directory-frontend
npm install
```

#### Setup Backend 
```bash
cd business-directory-backend
npm install
```



### Setup environment variables (example .env)
#### 📄 Create a .env file inside business-directory-backend/ with the following content:
```bash
PORT=8080
DB_PASSWORD=your_mongodb_password
JWT_SECRET=your_jwt_secret
```

#### Update the MongoDB connection string (inside your code) to use:
```bash
const MONGO_URI = `mongodb+srv://shailesh:${process.env.DB_PASSWORD}@bdw-cluster.ugy3f.mongodb.net/BDW_Database`;
```

#### Run backend
```bash
npm run dev
```

#### Run frontend (in another terminal)
```bash
cd ../business-directory-frontend
npm start
```


## 🚧 Future Improvements / What I Learned

### 🔧 Planned Improvements:

- Make the app fully responsive for mobile devices  
- Add business rating & user reviews  
- Integrate maps for location-based browsing  
- Add filters like price range, availability, and categories  
- Admin panel for managing listings  
- Business verification & premium listing options  

### 📚 What I Learned:

- Building full-stack apps using the MERN stack  
- Handling role-based authentication and authorization  
- Connecting frontend and backend using secure APIs  
- Working with real-world directory-style data and business flows  
- Structuring scalable React apps with modular components  

---

## 🙋‍♂️ Author

**Shailesh Hawale**  
[GitHub Profile](https://github.com/HawaleShailesh004)  
Email: shaileshhawale004@gmail.com
