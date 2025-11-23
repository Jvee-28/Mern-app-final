@echo off
title MERN Journal - Start
start cmd /k "cd server && npm install && npm run dev"
start cmd /k "cd client && npm install && npm run dev"
echo Started backend and frontend.
pause
