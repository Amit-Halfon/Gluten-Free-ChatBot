# Gluten-Free ChatBot

A full-stack TypeScript app that answers questions about gluten-free diets.  
Built with React (frontend) and a Node/Express API (backend). Auth is provided in two variants:
- **Tag `authentication-v1`:** custom JWT-based auth (learning build).
- **Tag `auth0-v1`:** Auth0 OIDC login (current).

## Monorepo layout

frontend/ # React + Vite + TypeScript + MUI (Header, Logo, NavigationLink, Chat pages)
backend/ # Node + Express + TypeScript (controllers, routes, token utils, validators)

## Features
- Secure login (Auth0 version) with redirect-based flow and protected routes.
- Chat page with responsive layout, Enter-to-send, and a send button.
- Structured server API for chat and user operations.
- Centralized validation & error handling on the backend.
