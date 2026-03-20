# Backend API Reference

Sankrityayana implements a minimalist FastAPI backend for telemetry storage. Below is the active routing table.

## Base URL

The backend standard port in development is `http://localhost:8000`. This should map to `VITE_API_URL` on the frontend.

---

### `POST /save-session`

Saves a completed yoga session to the database.

**Request Body (JSON):**

```json
{
  "asana_name": "string",
  "average_score": "float",
  "duration_seconds": "integer",
  "issues_detected": ["string"],
  "timestamp": "ISO-8601 string"
}
```

**Response (200 OK):**

```json
{
  "status": "success",
  "session_id": "string"
}
```

---

### `GET /history`

Retrieves past yoga sessions for the user dashboard.

**Response (200 OK):**

```json
[
  {
    "session_id": "string",
    "asana_name": "Tadasana",
    "average_score": 92.5,
    "duration_seconds": 300,
    "timestamp": "2024-03-24T12:00:00Z"
  }
]
```

## Global Error Handling

The backend is enclosed in a global middleware exception interceptor. Any uncaught Python exception (`500 Internal Server Error`) gracefully returns a standardized JSON structure ensuring frontend integrations never crash blindly:

```json
{
  "detail": "An unexpected server error occurred: [Root Cause]"
}
```
