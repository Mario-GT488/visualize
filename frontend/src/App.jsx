import PostFeed from "./components/PostFeed";
import "bootstrap/dist/css/bootstrap.min.css";

function App(){
  return(
    <>
      <header className="bg-dark text-white py-4">
        <div className="container">
          <h1 className="mb-0">Visualize</h1>
          <p className="mb-0">Guarda y descubre inspiración visual</p>
        </div>
      </header>

      <main>
        <PostFeed />
      </main>
    </>
  );
}

export default App;