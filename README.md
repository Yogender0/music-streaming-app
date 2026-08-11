# 🎧 Streamify - Full-Stack Music & Podcast Streaming App

Streamify is a modern full-stack music and podcast streaming application built with React, Node.js, Express, WaveSurfer.js, and Supabase. The platform provides real-time audio playback with custom visual waveforms, user authentication, playlist management, podcast streaming, and track upload capabilities.

---

## 🚀 Key Features (Currently Implemented)

- **User Authentication & Route Guards**: Secure email and password sign-up/login via Supabase Auth with route protection (`ProtectedRoute`) guarding upload pages.
- **Interactive Waveform Player & Time Display**: Real-time visual audio waveform rendering using WaveSurfer.js with dynamic time display (`0:42 / 3:27`), audio error boundaries, and playback state recovery.
- **Global Playback Manager**: Persistent global audio player context with local storage persistence across navigation.
- **Track & Podcast Management**: Stream music tracks and podcasts with in-memory search filtering via reusable `SearchBar` and empty/loading states.
- **Playlist Management**: View, create, and delete playlists, and add/remove tracks from playlists with instant UI updates and error handling.
- **Persistent Like System**: Toggle likes on tracks and podcasts with instant UI updates and duplicate-like protection via reusable `LikeButton`.

---

## 🛠️ Technology Stack

### Frontend
- **Framework**: React 18 (Vite)
- **Routing**: React Router DOM v7
- **Styling**: Tailwind CSS
- **Audio Rendering**: WaveSurfer.js v7
- **Backend-as-a-Service**: Supabase Client JS

### Backend
- **Runtime**: Node.js (ES Modules)
- **Web Framework**: Express.js
- **Middleware**: CORS, dotenv
- **Database & Storage Integration**: Supabase JS (Service Role Client)

---

## 🏗️ Architecture Overview

The system is structured as a modular full-stack architecture separating client state, presentation components, API routing, and backend services.

```
[ Client (React + Vite) ]
          │
          ├── ProtectedRoute (Auth Guard)
          │
          ├── React Context (Auth, Player, Playlist)
          │
          ├── Supabase Client ───► [ Supabase Auth / Database / Storage ]
          │
          └── REST API HTTP ────► [ Backend API (Express.js) ]
```

Detailed technical documentation can be found in [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md).

---

## 📁 Project Structure

```
music-streaming-app/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── supabase.js
│   │   ├── routes/
│   │   │   ├── admin.routes.js
│   │   │   ├── playlists.routes.js
│   │   │   ├── podcasts.routes.js
│   │   │   └── tracks.routes.js
│   │   ├── app.js
│   │   └── server.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── common/
│   │   │   │   ├── Loader.jsx
│   │   │   │   ├── LogoutButton.jsx
│   │   │   │   ├── ProtectedRoute.jsx
│   │   │   │   └── SearchBar.jsx
│   │   │   ├── layout/
│   │   │   │   └── Navbar.jsx
│   │   │   ├── music/
│   │   │   │   └── LikeButton.jsx
│   │   │   └── player/
│   │   │       ├── GlobalPlayer.jsx
│   │   │       └── WavePlayer.jsx
│   │   ├── config/
│   │   │   └── supabase.js
│   │   ├── context/
│   │   │   ├── AuthContext.jsx
│   │   │   ├── PlayerContext.jsx
│   │   │   └── PlaylistContext.jsx
│   │   ├── pages/
│   │   │   ├── admin/
│   │   │   │   ├── AdminUpload.jsx
│   │   │   │   └── PodcastUpload.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Playlists.jsx
│   │   │   ├── Podcasts.jsx
│   │   │   └── Register.jsx
│   │   ├── services/
│   │   ├── utils/
│   │   │   └── formatTime.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   └── package.json
│
├── docs/
│   ├── API.md
│   ├── ARCHITECTURE.md
│   └── DEVELOPMENT.md
└── README.md
```

---

## 💻 Installation & Local Setup

### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn
- Supabase account & project

### 1. Environment Variable Setup

Create environment files from the provided templates:

#### Frontend (`frontend/.env`)
```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

#### Backend (`backend/.env`)
```env
PORT=5000
SUPABASE_URL=your_supabase_project_url
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

---

### 2. Frontend Development & Build Instructions

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev

# Build production bundle
npm run build
```

---

### 3. Backend Development Instructions

```bash
cd backend

# Install dependencies
npm install

# Start Express server (requires backend/.env)
npm start
```

---

## 📚 Documentation Links

- 📖 [API Documentation](docs/API.md) - Details on backend routes and payloads.
- 🏗️ [Architecture Guide](docs/ARCHITECTURE.md) - Detailed breakdown of component structure and data flows.
- 🛠️ [Development Guide](docs/DEVELOPMENT.md) - Project conventions and extension instructions.

---

## 🔒 Security & Validation Notes

- **Service-Role Keys**: Service-role keys are strictly kept on the backend environment and never exposed to client applications.
- **Route Protection**: Upload pages (`/upload-track`, `/upload-podcast`) are protected against unauthenticated access via `ProtectedRoute`.
- **Row Level Security (RLS)**: Authorization is expected to be enforced through Supabase Row Level Security policies configured in the Supabase project. RLS policies are outside this repository and were not runtime-verified.
- **Validation Status**: Backend static validation and documentation are complete. Runtime database behavior has not been verified in this environment because Supabase credentials are not configured.
- **Secret Hygiene**: All secrets and credentials are loaded via environment variables and excluded from version control via `.gitignore`.

---

## 🔮 Future Improvements

- Add server-side audio processing & transcoding.
- Expand backend REST API integration for full playlist CRUD functionality.
- Implement audio queues and next/previous track controls in the global player.
- Add user profile management and avatar uploads.

---

## 👤 Author

**Yogender Rawat**
- GitHub: [@Yogender0](https://github.com/Yogender0)
