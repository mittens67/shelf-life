# 🧴 Shelf Life

**Shelf Life** is an interactive, narrative-driven experience where every choice defines your journey. Navigate through a blend of visual storytelling and engaging mini-games as you decide between rediscovering your artistic flair, embarking on a nomadic leap of faith, or simply finding solace in a pint of ice cream.

---

## 🌟 Key Features

-   **Interactive Narrative**: A branching dialogue system where your decisions directly impact the story's direction.
-   **Engaging Mini-Games**:
    -   **Card Match**: Test your memory to unlock paths in the Hobby and Nomad routes.
    -   **Wheel of Fortune**: Let fate decide your outcome in the Ice Cream route.
-   **Atmospheric Experience**: Immersive background music, sound effects, and curated visual assets for every node.
-   **Robust Asset Preloading**: A custom-built preloading system ensures smooth transitions between game phases without flickering.
-   **Global Sound Control**: Toggle audio on the fly at any point in your journey.

---

## 🛠️ Tech Stack

### Frontend
-   **React 19** with **TypeScript**
-   **TailwindCSS** for modern, responsive UI
-   **Custom ECS (Entity Component System)**: Powers the game logic for flexible node management.
-   **Axios**: For seamless communication with the backend.

### Backend
-   **Node.js & Express**: A high-performance RESTful API.
-   **MongoDB & Mongoose**: Flexible document storage for game entities and state.
-   **Security & Optimization**: Integrated with **Helmet** for security, **Morgan** for logging, and **Compression** for faster data delivery.

---

## 🚀 Getting Started

### Prerequisites
-   Node.js (v18+)
-   pnpm (recommended) or npm
-   MongoDB (local or Atlas)

### Installation

1.  **Clone the Repository**
    ```bash
    git clone https://github.com/your-username/shelf-life.git
    cd shelf-life
    ```

2.  **Server Setup**
    ```bash
    cd server
    cp .env.example .env
    # Edit .env with your MongoDB URI
    pnpm install
    pnpm run dev
    ```

3.  **Client Setup**
    ```bash
    cd ../client
    cp .env.example .env
    # Edit .env with your VITE_API_URL
    pnpm install
    pnpm run dev
    ```

---

## 🎨 Project Structure

-   `/client`: React application containing game systems, hooks, and UI components.
-   `/server`: Express API managing game nodes and persistence.
-   `/assets`: Curated images and audio providing the game's atmosphere.

---

## 📜 License

Distributed under the ISC License.
