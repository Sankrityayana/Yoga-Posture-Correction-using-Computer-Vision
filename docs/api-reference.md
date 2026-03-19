# API Reference

Base URL (development): http://localhost:8000

Interactive API docs: /docs

## GET /

Health-style root endpoint.

Response:

```json
{
  "message": "Sankrityayana Yoga API is running",
  "docs": "/docs"
}
```

## GET /health

Simple health check.

Response:

```json
{
  "status": "ok",
  "service": "yoga-posture-correction"
}
```

## POST /analyze-pose

Secondary server-side evaluation endpoint (frontend mostly uses local evaluation).

Request:

```json
{
  "pose_id": "tadasana",
  "landmarks": [
    { "x": 0.5, "y": 0.3, "z": 0.0, "visibility": 0.99 }
  ]
}
```

Response:

```json
{
  "score": 84,
  "is_good_pose": true,
  "feedback": ["Keep your right leg straight"],
  "joint_results": [
    {
      "name": "Right Knee",
      "angle": 170.2,
      "ideal": 175,
      "deviation": 4.8,
      "score": 90,
      "feedback": null
    }
  ],
  "message": "Great form!"
}
```

## POST /save-session

Persists completed session summary.

Expected request schema (snake_case):

```json
{
  "pose_name": "Tadasana",
  "pose_id": "tadasana",
  "score": 82,
  "best_score": 91,
  "duration": 126,
  "timestamp": "2026-03-19T12:45:30.000Z"
}
```

Successful response:

```json
{
  "status": "saved",
  "session_id": "uuid"
}
```

Fallback response when DB unavailable:

```json
{
  "status": "saved_locally",
  "note": "error details"
}
```

## GET /history

Returns recent sessions. Query param: limit (default 50).

Response:

```json
{
  "sessions": [
    {
      "session_id": "uuid",
      "pose_name": "Tadasana",
      "pose_id": "tadasana",
      "score": 82,
      "best_score": 91,
      "duration": 126,
      "timestamp": "2026-03-19T12:45:30.000Z"
    }
  ],
  "count": 1
}
```

## GET /history/{user_id}

Currently behaves like global history endpoint and does not filter by user_id.

## Error Behavior

- Unhandled backend exceptions return status 500 with:

```json
{
  "message": "Internal Server Error",
  "detail": "..."
}
```

## Integration Note

Frontend currently posts camelCase keys in some flows (for example poseName). Backend schema expects snake_case (pose_name). If persistence is critical, align frontend payload naming or add schema aliases in backend.

