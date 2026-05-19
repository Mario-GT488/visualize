import { useState } from "react";
import PostFeed from "./components/PostFeed";
import PostForm from "./components/PostForm";
import UserSessionForm from "./components/UserSessionForm";
import Navbar from "./components/Navbar";
import Discovery from "./components/Discovery";
import "bootstrap/dist/css/bootstrap.min.css";

function App(){
  const [currentUser, setCurrentUser] = useState(sessionStorage.getItem("currentUser") || "");

  const [refreshKey, setRefreshKey] = useState(0);

  function handlePostChanged(){
    setRefreshKey(refreshKey + 1);
  }

  return (
    <>
      <Navbar currentUser={currentUser} />

      <header className="hero-section text-center">
        <div className="container py-5">
          <p className="text-uppercase small fw-semibold mb-2">
            inspiración visual organizada
          </p>

          <h1 className="display-4 fw-bold mb-3">
            Visualize
          </h1>

          <p className="lead mb-0">
            Guarda imágenes, organízalas con etiquetas y construye tu propio mosaico de ideas.
          </p>
        </div>
      </header>

      <main className="bg-light min-vh-100">
        <UserSessionForm
          currentUser={currentUser}
          onUserChange={setCurrentUser}
        />

        <PostForm
          currentUser={currentUser}
          onPostCreated={handlePostChanged}
        />

        <Discovery 
          currentUser={currentUser}
          onPostCreated={handlePostChanged}
        />

        <PostFeed
          refreshKey={refreshKey}
          currentUser={currentUser}
          onPostChanged={handlePostChanged}
        />
      </main>
    </>
  );
}

export default App;