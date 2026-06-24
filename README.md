# User Analytics Dashboard

A simple full-stack analytics platform that tracks user interactions on a website and visualizes them through an admin dashboard.

The application captures page views and click events, groups them into sessions, and provides insights through overview statistics, session timelines, and heatmap visualizations.

---

## Live Demo

### Frontend Dashboard
https://user-analytics-tau.vercel.app

### Backend API
https://user-analytics-7cif.onrender.com

---

## Features

### Event Tracking
- Track page view events
- Track click events
- Store events in MongoDB

### Session Analytics
- Session-based user tracking
- View all sessions
- Inspect complete user journey timeline
- Event breakdown by session

### Dashboard Overview
- Total Sessions
- Total Events
- Total Clicks
- Total Page Views

### Heatmap Visualization
- View click activity per page
- Visualize click coordinates
- Analyze user interaction patterns

---

## Tech Stack

### Frontend
- React.js
- React Router DOM
- Vite
- JavaScript

### Backend
- Node.js
- Express.js

### Database
- MongoDB Atlas
- Mongoose

### Deployment
- Vercel (Frontend)
- Render (Backend)

---

## Project Structure

```txt
User-Analytics
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── config/
│   ├── models/
│   ├── routes/
│   ├── tracker/
│   │   └── tracker.js
│   ├── server.js
│   └── package.json
│
├── demo/
│   └── index.html
│
└── README.md
```

---

## Setup Steps

### 1. Clone Repository

```bash
git clone https://github.com/Vinitkhandelwal01/User-Analytics.git
cd User-Analytics
```

---

## 2. Backend Setup

Move to backend directory:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

Start backend server:

```bash
npm start
```

Backend runs on:

```txt
http://localhost:5000
```

---

## 3. Frontend Setup

Move to frontend directory:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```env
VITE_API_URL=http://localhost:5000/api
```

Start frontend:

```bash
npm run dev
```

Frontend runs on:

```txt
http://localhost:5173
```

---

## 4. Demo Page Setup

A demo webpage is included inside the `demo` folder for testing analytics tracking.

Open the page using Live Server or any static file server.

Add the tracker script:

```html
<script
  src="http://localhost:5000/tracker/tracker.js"
  data-endpoint="http://localhost:5000">
</script>
```

Interact with the page by:
- Opening the page
- Clicking buttons
- Navigating sections

These interactions will appear in the dashboard.

---

## API Endpoints

### Events

#### Create Event

```http
POST /api/events
```

Stores tracked events.

Example payload:

```json
{
  "session_id": "123456",
  "event_type": "click",
  "page_url": "http://localhost:5500",
  "timestamp": "2025-06-24T12:00:00.000Z",
  "click_x": 250,
  "click_y": 400
}
```

---

### Sessions

#### Get All Sessions

```http
GET /api/sessions
```

Returns all tracked sessions.

#### Get Session Timeline

```http
GET /api/sessions/:sessionId/events
```

Returns complete event history for a session.

---

### Heatmap

#### Get Pages

```http
GET /api/heatmap/pages
```

Returns all pages containing click data.

#### Get Click Coordinates

```http
GET /api/heatmap?url=<page-url>
```

Returns click coordinates for the selected page.

---

### Dashboard Statistics

#### Get Overview Stats

```http
GET /api/stats
```

Returns:

```json
{
  "total_sessions": 12,
  "total_events": 95,
  "total_clicks": 41,
  "total_page_views": 54
}
```

---

## Assumptions

- Each browser session is identified using a generated session ID stored in localStorage.
- Only two event types are tracked:
  - page_view
  - click
- Click coordinates are captured relative to the browser viewport.
- MongoDB Atlas is available and accessible.
- Events are stored immediately after they occur.

---

## Trade-offs

### Session Storage
Session information is derived from event data instead of maintaining a separate Session collection. This reduces complexity but may require aggregation when retrieving sessions.

### Heatmap Rendering
Heatmap visualization uses simple coordinate plotting instead of a dedicated heatmap library to keep the implementation lightweight and dependency-free.

### Authentication
Authentication and authorization were intentionally omitted because the assignment focuses on analytics tracking and visualization functionality.

### Real-Time Updates
Dashboard data is refreshed through API requests instead of WebSockets or Server-Sent Events to keep implementation simple.

