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
git clone https://github.com/madhavan-singh/orvian.git
cd orvian

## 🚀 Getting Started

### Backend Setup
cd backend
cp .env.example .env   # add your DB, Redis, S3 keys
npm install
npm run dev

### Frontend Setup
cd frontend
cp .env.example .env   # add backend API URL + WebSocket URL
npm install
npm run dev

### Run with Docker (optional)
docker-compose up --build

---

## 📅 Roadmap

- **Phase 1 (MVP):**  
  - Core 3D editor (primitives, transforms, save/load)  
  - User authentication & project CRUD  
  - Scene export  

- **Phase 2:**  
  - Realtime collaboration (Y.js + WebSockets)  
  - Presence & live cursors  
  - Comments & chat  

- **Phase 3:**  
  - Asset library (models, materials, textures)  
  - Versioning system  
  - Performance optimization  

- **Phase 4 (Advanced):**  
  - Animation timeline  
  - AI-assisted object generation (text → 3D mesh)  
  - Embeddable viewer & public share links  

---

## 🧑‍💻 Contributing

Contributions are welcome! Please fork this repo, create a feature branch, and submit a PR.  
Check out our **issues** tab for open tasks.  

---

## 📜 License

This project is licensed under the MIT License.  

---

## 🎥 Demo & Screenshots

🔗 [Live Demo](https://orvian.app) *(coming soon)*  
📸 Screenshots will be added after MVP launch.  

---

## 🙌 Acknowledgements
- Inspired by **Spline** and **Figma**  
- Built with **Three.js**, **React**, and **Y.js**  
- Special thanks to the open-source community ❤️
