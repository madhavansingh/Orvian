# 🌌 Orvian – 3D Design & Collaboration Platform (MVP)

Orvian is a **full-stack browser-based 3D design and collaboration platform** inspired by tools like Spline and Figma, but built with a distinct UI and interaction model.  
It enables designers, engineers, and teams to **create, edit, animate, and collaborate on 3D scenes directly in the browser** — no heavy installs required.  

---

## ✨ Features

### 🎨 Editor (Frontend)
- Interactive **3D editor** built with **React + Three.js (react-three-fiber)**  
- Basic primitives: cube, sphere, plane, cylinder  
- Transform controls: move, rotate, scale, snap-to-grid  
- Orbit / pan / zoom camera with perspective & orthographic toggle  
- Grouping, hierarchy tree, copy/duplicate objects  
- Materials: color, metalness, roughness, textures  
- Scene export: `.json` and `.glTF`  
- Undo/redo stack  

### 🤝 Realtime Collaboration
- Multi-user editing powered by **CRDTs (Y.js)**  
- WebSocket / WebRTC sync engine  
- Live cursors & selection highlights  
- Comments & object-based threads  
- Presence awareness (see who’s online & editing)  

### 🔐 Backend & Persistence
- **Authentication & User Management** (JWT)  
- **Project CRUD** (create, save, load, delete, clone)  
- PostgreSQL + JSONB for scene storage  
- Redis for presence & session cache  
- Version history (save snapshots & rollbacks)  
- Secure asset upload via S3 signed URLs  

### 🌍 Deployment
- Frontend: React app deployed on **Vercel/Netlify**  
- Backend: Node.js + PostgreSQL + Redis on **Render/AWS/GCP**  
- Containerized with **Docker + docker-compose**  
- HTTPS & CORS configured  

---

## 🛠️ Tech Stack

- **Frontend:** React, TypeScript, TailwindCSS, react-three-fiber, Zustand  
- **3D Rendering:** Three.js, glTF loader, DRACO compression  
- **Backend:** Node.js (Express), PostgreSQL, Redis, Y.js provider  
- **Realtime:** WebSockets / WebRTC + CRDT sync  
- **Storage:** AWS S3 (for assets & textures)  
- **Deployment:** Docker, Vercel/Netlify, Render/AWS  

---

## 🚀 Getting Started

### Prerequisites
- Node.js >= 18  
- PostgreSQL >= 14  
- Redis >= 7  
- Docker (optional but recommended)  

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/orvian.git
cd orvian
