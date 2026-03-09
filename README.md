# Hotel Booking Room Management System

An Angular hotel booking platform with separate guest and admin login flows, luxury hotel listings, dark mode, booking management, and a JSON Server mock API.

## Overview

This project includes:

- separate `guest` and `admin` login pages
- guest hotel browsing, booking, and booking-history management
- admin-only access to hotel, room, booking, and customer management
- dark mode toggle with persisted theme
- luxury India hotel catalog with seeded rooms and bookings
- route guards for guest-only and admin-only pages
- Angular Material UI, reactive forms, pipes, directives, and interceptors

## Tech Stack

- Angular
- TypeScript
- Angular Material
- RxJS
- JSON Server

## Routes

- `/hotels` - hotel list
- `/hotel/:id` - hotel detail
- `/hotel/:id/standard` - standard rooms
- `/hotel/:id/deluxe` - deluxe rooms
- `/hotel/:id/suite` - suites
- `/book/:id` - guest booking form
- `/dashboard` - guest dashboard
- `/admin` - admin panel
- `/guest-login` - guest login
- `/admin-login` - admin login
- `/signup` - guest signup

## Demo Credentials

- Admin: `admin / admin123`
- Guest: `maya / guest123`

## Local Setup

Clone the repository:

```bash
git clone https://github.com/SanMaria28/Hotel_Booking_Room_Management_System.git
cd Hotel_Booking_Room_Management_System
```

Install dependencies:

```bash
npm install
```

Start the mock API:

```bash
npx json-server db.json --port 3000
```

Start the Angular app:

```bash
npm start
```

Open:

```text
http://localhost:4200
```

Then use:

- `http://localhost:4200/guest-login` for guest access
- `http://localhost:4200/admin-login` for admin access

## One-Command Start

```bash
npm run start:all
```

That starts JSON Server and the Angular dev server together.

## Scripts

- `npm start` - run Angular dev server
- `npm run start:api` - run JSON Server on port `3000`
- `npm run start:all` - start API and Angular together
- `npm run build` - production build
- `npm test -- --watch=false --browsers=ChromeHeadless` - headless test run

## JSON Server Data

The mock backend in [db.json](./db.json) includes:

- `hotels`
- `rooms`
- `users`
- `bookings`

Available endpoints:

- `GET /hotels`
- `GET /hotels/:id`
- `GET /rooms`
- `PATCH /rooms/:id`
- `GET /bookings`
- `POST /bookings`
- `DELETE /bookings/:id`
- `GET /users`
- `POST /users`
- `POST /hotels`

## Feature Highlights

### Guest Experience

- sign up and log in separately from admin
- search hotels by location, price, and rating
- browse room categories using nested routes
- reserve available rooms from the guest flow only
- see pricing with Angular pipes
- book rooms with validation and confirmation dialog
- cancel bookings from the dashboard and release room availability
- switch between light and dark mode

### Admin Experience

- log in through a dedicated admin-only page
- add new hotels with name, image, pricing, and amenities
- manage room inventory with a reactive form
- view booking records with customer details and booked room information
- monitor occupancy across hotels
- review guest directory, room availability, revenue, and pricing in one panel

## Seeded Hotel Catalog

The demo data includes these luxury properties:

- Raffles Udaipur
- ITC Grand Chola
- Rambagh Palace
- ITC Grand Chola Towers
- Taj Mahal Palace

### Angular Features Used

- Angular Router with route params and child routes
- dependency injection with feature services
- template-driven and reactive forms
- route guards
- custom pipes
- custom directives
- HTTP interceptor
- RxJS observables and reactive search behavior
- Angular Material components and responsive layouts

## Project Structure

```text
src/
  app/
    admin-panel/
    auth/
    booking-form/
    directives/
    guards/
    hotel-detail/
    hotel-list/
    interceptors/
    models/
    navbar/
    pipes/
    services/
    user-dashboard/
```

## Notes

- If you change [db.json](./db.json), restart JSON Server so the new seed data is loaded.
- If Angular cache errors happen inside OneDrive, delete the `.angular` folder and restart the dev server.
- If port `4200` or `3000` is already in use, stop the old process first.

## License

This project is licensed under the terms in [LICENSE](./LICENSE).
