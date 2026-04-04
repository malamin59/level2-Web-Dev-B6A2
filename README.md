# 🚗 Vehicle Booking System API

A backend API for managing vehicle bookings with role-based access control. Built using Node.js, Express, TypeScript, and MongoDB (Mongoose).

---

# ✨ Features

* 🔐 **Authentication & Authorization** (JWT-based)
* 👤 **Role-based Access Control**

  * Admin
  * Customer
* 🚗 **Vehicle Management**

  * Add / Update vehicles
  * Track availability status
* 📅 **Booking System**

  * Create booking with start & end date
  * Automatic price calculation (daily rate × duration)
  * Prevent booking unavailable vehicles
* ❌ **Cancel Booking (Customer)**

  * Only before start date
* ✅ **Return Booking (Admin)**

  * Updates vehicle status to available
* ⏱️ **Auto Return System**

  * Automatically marks booking as returned after end date
* 📊 **Timestamps Support**

  * createdAt & updatedAt tracking

---

# 🛠️ Technology Stack

* **Backend:** Node.js, Express.js
* **Language:** TypeScript
* **Database:** MongoDB
* **ODM:** Mongoose
* **Authentication:** JWT (JSON Web Token)
* **Validation:** Mongoose Schema Validation
* **Scheduler:** node-cron (for auto return system)

---

# 📁 Project Structure

```
src/
 ├── modules/
 │    ├── booking/
 │    │    ├── booking.model.ts
 │    │    ├── booking.service.ts
 │    │    ├── booking.controller.ts
 │    │    └── booking.route.ts
 │    │
 │    ├── vehicle/
 │    │    ├── vehicle.model.ts
 │    │    ├── vehicle.service.ts
 │    │    ├── vehicle.controller.ts
 │    │    └── vehicle.route.ts
 │
 ├── middleware/
 │    └── auth.ts
 │
 ├── app.ts
 └── server.ts
```

---

# ⚙️ Setup & Usage Instructions

## 1️⃣ Clone Repository

```bash
git clone https://github.com/your-username/vehicle-booking-api.git
cd vehicle-booking-api
```

---

## 2️⃣ Install Dependencies

```bash
npm install
```

---

## 3️⃣ Setup Environment Variables

Create a `.env` file in root directory:

```env
PORT=5000
DATABASE_URL=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

---

## 4️⃣ Run the Server

### Development

```bash
npm run dev
```

### Production

```bash
npm run build
npm start
```

---

## 5️⃣ API Endpoints

### 🔹 Booking

| Method | Endpoint             | Access         | Description           |
| ------ | -------------------- | -------------- | --------------------- |
| POST   | /api/v1/bookings     | Customer/Admin | Create booking        |
| GET    | /api/v1/bookings     | Role-based     | Get bookings          |
| PUT    | /api/v1/bookings/:id | Role-based     | Cancel/Return booking |

---

### 🔹 Vehicle

| Method | Endpoint         | Description      |
| ------ | ---------------- | ---------------- |
| POST   | /api/v1/vehicles | Add vehicle      |
| GET    | /api/v1/vehicles | Get all vehicles |

---

# 🚀 Future Improvements

* 🔍 Search & filter bookings
* 📊 Admin dashboard analytics
* 💳 Payment integration
* 📱 Frontend (React)

---

# 👨‍💻 Author

**Al Amin Patwary (EPB)**

---

# ⭐ Support

If you like this project, give it a ⭐ on GitHub!
