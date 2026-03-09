# Hotel Booking Room Management System

A polished Angular hotel booking platform with guest booking flows, admin room management, occupancy tracking, authentication, route guards, Angular Material UI, and a JSON Server mock API.

## Overview

This project includes:

- hotel discovery with search and filters
- dynamic hotel detail pages with room-category child routes
- booking flow with reactive forms and confirmation dialog
- guest dashboard for booking history and cancellations
- admin dashboard for bookings, rooms, and occupancy monitoring
- template-driven login and signup
- route guards for guest and admin access
- custom pipes and directives
- HTTP interceptor with logging, loading state, and API error handling

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
- `/book/:id` - booking form
- `/dashboard` - user dashboard
- `/admin` - admin panel
- `/login` - login
- `/signup` - signup

## Demo Credentials

- Admin
  - username: `admin`
  - password: `admin123`
- Guest
  - username: `maya`
  - password: `guest123`

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

## One-Command Start

This project also includes:

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
- `GET /bookings`
- `POST /bookings`
- `DELETE /bookings/:id`
- `GET /users`
- `POST /users`

## Feature Highlights

### Guest Experience

- search hotels by location, price, and rating
- browse room categories using nested routes
- see pricing with Angular pipes
- book rooms with validation and confirmation dialog
- cancel bookings from the dashboard

### Admin Experience

- manage room inventory with a reactive form
- view booking records in Material tables
- monitor occupancy across hotels
- review room availability and pricing in one panel

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

- If Angular cache errors happen inside OneDrive, delete the `.angular` folder and restart the dev server.
- If port `4200` or `3000` is already in use, stop the old process first.

## License

This project is licensed under the terms in [LICENSE](./LICENSE).
