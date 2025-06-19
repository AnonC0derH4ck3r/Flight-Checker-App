# ✈️ Flight Info Viewer

A full-stack web application that lets you search for real-time flight information by flight code, including departure/arrival times in local timezones.

## 🧰 Tech Stack

- **Frontend**: React (Vite)
- **Backend**: Node.js + Express
- **API**: AviationStack API
- **Time Conversion**: Luxon (server-side)

---

## 🔍 Features

- Search flights by flight number (IATA code)
- View:
  - Airline & flight code
  - Live status (en-route, landed, delayed, etc.)
  - Departure & arrival airports
  - Terminal, gate, IATA codes
  - **Local time** of both departure and arrival
- Timezone handling with backend API proxy

---

## 🚀 How to Run Locally

### 1. Clone the repo

```bash
git clone https://github.com/yourusername/flight-info-app.git
cd flight-info-app
```

### 2. Backend Setup

```bash
cd backend
npm install
```
Create a `.env` file:
```
AVIATIONSTACK_API_KEY=your_real_api_key_here
```
Run server:
```bash
node server.js
```

### 3. Frontend Setup

```bash
cd ../frontend
npm install
npm run dev
```

Visit: [http://localhost:5173](http://localhost:5173)

---

## 🌐 Deployment

- Host frontend on [Netlify](https://www.netlify.com/)
- Host backend on [Render](https://render.com/) or Railway
- Remember to store your API key securely on the backend

---

## 📦 Folder Structure

```
flight-info-app/
├── frontend/        # React + Vite UI
└── backend/         # Express API & timezone logic
```

---

MIT © 2025 Huzefa Khalil Dayanji
