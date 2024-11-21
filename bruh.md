# 🐈 Test Task: EPAM-async-race

🏆 Score: 400/400

🌐 [Deployed UI Link](https://async-race-seygorin.netlify.app/)

## 🎥 Demo Video

[Demo video](https://youtu.be/Z7TZ3PD8X94)

## 🖥️ Server Setup

To interact with the API, you need to set up the server:

1. 📂 Clone the repository:
   [server repository link](https://github.com/mikhama/async-race-api)
2. 📦 Install dependencies: `npm install`
3. 🚀 Run the server: `npm start`

The server provides a mock API for managing the car collection, controlling engines, and
handling race statistics.

## 📝 Project Description

This Single Page Application allows users to manage a collection of cats 🐈, operate their
engines ❤️, and view race statistics 📊. It simulates a racing competition to determine
the fastest cat.

The application features:

- 🐈‍⬛ Cat management (create, update, delete)
- 💙 Heart control (start, stop)
- 🏁 Racing simulations
- 🏆 Winners statistics

Goal - is to create an intuitive and efficient interface for cat management and racing,
along with smooth API handling. Aim to deliver a performance application that provides an
exhilarating racing experience while ensuring seamless interaction with the backend
services.

## 📋 Checklist 400/400 pts

### 🚀 UI Deployment

- [x] **Deployment Platform:** Successfully deploy the UI on one of the following
      platforms: GitHub Pages, Netlify, Vercel, Cloudflare Pages, or a similar service.

### ✅ Requirements to Commits and Repository

- [x] **Commit guidelines compliance:** All commits follow the specified commit
      guidelines.
- [x] **Checklist included in README.md:** Project checklist included in README.md with
      implemented features marked.
- [x] **Score calculation:** Score calculated and placed at the top of README.md.
- [x] **UI Deployment link in README.md**: Link to deployed UI placed at the top of
      README.md.

### 🏗️ Basic Structure (80 points)

- [x] **Two Views (10 points):** Implement two primary views: "Garage" and "Winners".
- [x] **Garage View Content (30 points):** The "Garage" view displays required content.
- [x] **Winners View Content (10 points):** The "Winners" view displays required content.
- [x] **Persistent State (30 points):** View state remains consistent when navigating
      between views.

### 🏠 Garage View (90 points)

- [x] **Car Creation And Editing Panel. CRUD Operations (20 points):** Users can create,
      update, and delete cars.
- [x] **Color Selection (10 points):** Color selection from an RGB palette implemented.
- [x] **Random Car Creation (20 points):** Button to create random cars implemented.
- [x] **Car Management Buttons (10 points):** Buttons for updating and deleting cars
      provided.
- [x] **Pagination (10 points):** Pagination for the "Garage" view implemented.
- [x] **EXTRA POINTS (20 points):**
  - [x] **Empty Garage** Empty garage handled with user-friendly message.
  - [x] **Empty Garage Page** Last car removal moves user to previous page.

### 🏆 Winners View (50 points)

- [x] **Display Winners (15 points):** Winners displayed in the "Winners view" table.
- [x] **Pagination for Winners (10 points):** Pagination for the "Winners" view
      implemented.
- [x] **Winners Table (15 points):** Winners table includes required columns and
      functionality.
- [x] **Sorting Functionality (10 points):** Table sorting by wins and best time
      implemented.

### 🚗 Race (170 points)

- [x] **Start Engine Animation (20 points):** Start engine animation implemented
      correctly.
- [x] **Stop Engine Animation (20 points):** Stop engine animation implemented correctly.
- [x] **Responsive Animation (30 points):** Car animations are fluid and responsive on
      small screens.
- [x] **Start Race Button (10 points):** Start race button functionality implemented.
- [x] **Reset Race Button (15 points):** Reset race button functionality implemented.
- [x] **Winner Announcement (5 points):** Winner announcement message implemented.
- [x] **Button States (20 points):** Correct button states implemented during races.
- [x] **Actions during the race (50 points):** Control over actions during a running race
      implemented.

### 🎨 Prettier and ESLint Configuration (10 points)

- [x] **Prettier Setup (5 points):** Prettier correctly set up with required scripts.
- [x] **ESLint Configuration (5 points):** ESLint configured with Airbnb style guide and
      required script.

## 🌟 P.S.

Thank you for taking the time to review this project. As you can see, a lot of effort and
dedication went into creating this racing management system. It's a testament to the fact
that with persistence and hard work can achieve nice results.

However, it's important to note that the code still has room for improvement, and
Interacting with the server isn't the most optimal. There are a few subtle bugs related to
timing and parallel server requests, plus the time calculation isn't entirely accurate.
These challenges remind us that development is an ongoing process of refinement and
optimization. But there is not always enough time.
