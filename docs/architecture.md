# Sankrityayana - System Architecture

Sankrityayana is a modern, real-time AI Yoga Coach designed with Indian Knowledge Systems (IKS) principles and built using a robust client-server architecture.

## High-Level Overview
The system relies on the client's device to perform heavy machine-learning workloads (Computer Vision inference) to ensure absolute privacy, low-latency scoring, and zero server-side GPU costs. The backend is designed as a lightweight telemetry and session management API.

### 1. Frontend (Client-Side AI)
**Tech Stack:** React 19, Vite V8, Tailwind CSS v4, MediaPipe
- **Computer Vision Pipeline:** We load the official Google MediaPipe Pose models explicitly via jsDelivr CDN to bypass standard ES module bundler issues and guarantee cross-device compatibility.
- **Local Inference:** The webcam stream (`navigator.mediaDevices.getUserMedia` at targeted 60 FPS) never leaves the user's browser. The video frames are pumped natively into the MediaPipe engine which executes locally via WebAssembly/WebGL.
- **Glassmorphic UI:** Styled using Tailwind CSS v4 with bespoke components simulating an immersive IKS-themed environment (saffron and indigo).

### 2. Backend (Session & Storage)
**Tech Stack:** FastAPI, Python 3, Motor (Async MongoDB), Uvicorn/Gunicorn
- **Stateless API:** Engineered for high scalability. It receives asynchronous requests containing JSON payloads of user scores and session durations.
- **Database:** Connects asynchronously to a MongoDB cluster to store historical records.
- **Security:** Strict Cross-Origin Resource Sharing (CORS) is mapped out via the `CORS_ORIGINS` environment setup to prevent unauthorized tracking requests.

## Data Flow
1. User activates the webcam on the React frontend.
2. The browser captures 60 FPS video and feeds it to the MediaPipe Pose module locally.
3. MediaPipe returns 33 3D coordinate landmarks per frame.
4. The React application calculates joint angles mathematically to evaluate the specific Asana constraint bounds.
5. Realtime feedback, skeleton overlays, and a dynamic 0-100 score are drawn onto a canvas layer instantly.
6. Upon concluding the session, React compiles the telemetry and fires an HTTP POST to the FastAPI backend.
7. FastAPI logs the session to MongoDB.
