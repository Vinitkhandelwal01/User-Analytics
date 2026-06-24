# User Analytics Dashboard

A simple analytics platform that tracks user interactions on a website and visualizes them through an admin dashboard.

## Features

- Track page view events
- Track click events
- Session-based user tracking
- Analytics overview dashboard
- Session activity timeline
- Click heatmap visualization

---

## Tech Stack

### Frontend
- React.js
- React Router
- Vite

### Backend
- Node.js
- Express.js

### Database
- MongoDB
- Mongoose

---

## Setup Steps

### 1. Clone the Repository

```bash
git clone <repository-url>
cd user-analytics-dashboard
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

Start backend:

```bash
npm start
```

Backend runs on:

```txt
http://localhost:5000
```

---

### 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on:

```txt
http://localhost:5173
```

---

### 4. Demo Page Setup

Open the demo page and include the tracker script:

```html
<script
  src="http://localhost:5000/tracker.js"
  data-endpoint="http://localhost:5000">
</script>
```

Interact with the page to generate events.

---

## API Endpoints

### Events

```http
POST /api/events
```

Store tracked events.

### Sessions

```http
GET /api/events
```

Get all tracked sessions.

```http
GET /api/events/:sessionId/events
```

Get all events for a specific session.

### Heatmap

```http
GET /api/heatmap/pages
```

Get tracked pages.

```http
GET /api/heatmap?url=<page-url>
```

Get click coordinates for a page.

### Stats

```http
GET /api/stats
```

Get dashboard statistics.

---

## Assumptions & Trade-offs

### Assumptions

- Each browser session is identified using a generated session ID.
- Only two event types are tracked:
  - page_view
  - click
- Click coordinates are captured relative to the browser viewport.
- MongoDB is available and running.

### Trade-offs

- Session information is derived from stored events instead of maintaining a separate Session collection.
- Heatmap rendering uses simple coordinate plotting instead of a dedicated heatmap library to keep the implementation lightweight.
- No authentication was added because the assignment focuses on analytics functionality.
- Data is fetched on page load instead of using WebSockets or real-time updates to reduce complexity.
