# Hotel Booking & Room Management System

A comprehensive web-based application designed to streamline hotel operations, including room booking, guest management, and administrative tasks. This system provides an intuitive interface for both guests to book their stays and hotel staff to manage the property efficiently.

## 🚀 Deployment

**Access the live website here:** [**Hotel Booking App**](https://hotel-booking-room-management-syste.vercel.app/)

---

## 📋 Website Details & Features

### **For Guests (User)**
* **Room Browsing:** View available rooms with images, descriptions, and pricing.
* **Booking History:** View past and upcoming reservations.

### **For Administrators (Staff)**
* **Dashboard:** Overview of total bookings, revenue, and room occupancy.
* **Room Management:** Add, update, or remove room listings (photos, prices, amenities)(only display as of now).


---

## 🛠️ Tech Stack

* **Frontend:** HTML, CSS, TypeScript, Angular 18
* **UI Framework:** Angular Material
* **Backend/Mock API:** JSON Server
* **Version Control:** Git & GitHub

---

## 👥 Team Members

* [R Jerphin](https://github.com/remijerphin-arch)
* [San Maria Joby](https://github.com/SanMaria28)
* [Sonal Joy](https://github.com/SonalJoy10)
* [Vinayak Vivek]()

---

## 📦 Prerequisites

Before running this project, ensure you have the following installed:

* **Node.js:** Version 18.x or higher
* **npm:** Version 9.x or higher
* **Angular CLI:** Version 18.x (will be installed with dependencies)

Check your versions:
```bash
node --version
npm --version
```

---

## ⚙️ Installation & Setup

To run this project locally, follow these steps:

### 1. **Clone the repository:**
```bash
git clone https://github.com/SanMaria28/Hotel_Booking_Room_Management_System.git
```

### 2. **Navigate to the project directory:**
```bash
cd hotel_booking_room_management
```

### 3. **Install dependencies:**
```bash
npm install
```

### 4. **Start the JSON Server (Backend/Mock API):**

Open a **new terminal** and run:
```bash
npx json-server db.json --port 3000
```

The JSON Server will run on `http://localhost:3000`

### 5. **Start the Angular Development Server:**

In another terminal, run:
```bash
npm start
# or
ng serve
```

The application will be available at `http://localhost:4200`

### 6. **Open your browser:**
Navigate to `http://localhost:4200` to view the application.

---

## 📁 Project Structure

```
hotel_booking_room_management/
├── src/
│   ├── app/
│   │   ├── admin-panel/          # Admin dashboard component
│   │   ├── booking-form/         # Room booking form
│   │   ├── hotel-detail/         # Hotel details view
│   │   ├── hotel-list/           # Hotel listing component
│   │   ├── models/               # Data models (Hotel, Room, Booking, User)
│   │   ├── navbar/               # Navigation bar
│   │   ├── user-dashboard/       # User dashboard
│   │   ├── app-routing.module.ts # Route configurations
│   │   ├── app.component.*       # Root component
│   │   └── app.module.ts         # Main module
│   ├── custom-theme.scss         # Angular Material custom theme
│   ├── index.html                # Main HTML file
│   ├── main.ts                   # Application entry point
│   └── styles.css                # Global styles
├── db.json                       # JSON Server database
├── angular.json                  # Angular configuration
├── package.json                  # Dependencies and scripts
└── README.md                     # Project documentation
```

---

## 📄 License

This project is licensed under the terms specified in the [LICENSE](LICENSE) file.

---

