# MERN Mental Journal — Full Functional Submission

This package contains a full MERN app (production-ready starter) with styled CSS frontend.

## Contents
- server/ : Express + Mongoose + JWT auth + entries CRUD + analytics endpoint
- client/ : Vite + React, styled with plain CSS (pastel theme)
- docker-compose.yml for local full-stack run
- start.bat for Windows one-click start
- Included uploaded file reference: /mnt/data/index.html (copied into client/public/assets/original_index.html: True)

## Quick start (local)
1. Ensure Node.js and npm are installed.
2. Ensure MongoDB is running (or run `docker compose up`).
3. Backend:
   cd server
   npm install
   npm run dev
4. Frontend:
   cd client
   npm install
   npm run dev


---
## Submission package final notes
- Uploaded asset included (as requested): **/mnt/data/index.html** copied into `client/public/assets/user_uploaded_index.html`
  - Use this path as the asset URL when referencing the uploaded file in your submission.
- To run locally (quick):
  1. Backend: `cd server && npm install && npm run dev`
  2. Frontend: `cd client && npm install && npm run dev`
  3. Seed sample data (optional): `cd server && npm run seed`
- One-click start: `start.bat` (root)
