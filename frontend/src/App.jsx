import { useState } from "react";
import PostFeed from "./components/PostFeed";
import PostForm from "./components/PostForm";
import UserSessionForm from "./components/UserSessionForm";
import "bootstrap/dist/css/bootstrap.min.css";

function App(){
  const [currentUser, setCurrentUser] = useState(sessionStorage.getItem("currentUser") || "");

  const [refreshKey, setRefreshKey] = useState(0);

  function handlePostCreated(){
    setRefreshKey(refreshKey + 1);
  }

  return(
    <>
      <header className="bg-dark text-white py-4">
        <div className="container">
          <h1 className="mb-0">Visualize</h1>
          <p className="mb-0">Guarda y descubre inspiración visual</p>
        </div>
      </header>

      <main>

        <UserSessionForm 
          currentUser={currentUser}
          onUserChange={setCurrentUser}
        />

        <PostForm 
          currentUser={currentUser}
          onPostCreated={handlePostCreated}
        />

        <PostFeed 
          refreshKey={refreshKey}
          currentUser={currentUser}
          onPostChanged={handlePostCreated}
        />

      </main>
    </>
  );
}

export default App;