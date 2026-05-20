import { useEffect, useState } from "react";
import { getPosts } from "../services/api";
import PostCard from "./PostCard";

const POSTS_CACHE_KEY = "visualize_posts_cache";
const POSTS_CACHE_TIMESTAMP_KEY = "visualize_posts_cache_timestamp";

function PostFeed({ refreshKey, currentUser, onPostChanged }) {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const limit = 6; 
  const [loadedFromCache, setLoadedFromCache] = useState(false);

  useEffect(() => {
    setPage(1);
  }, [refreshKey])

  useEffect(() => {
    async function loadPosts() {
      try {
        setError("");
        setLoadedFromCache(false);

        const data = await getPosts(page, limit);

        setPosts(data);

        localStorage.setItem(POSTS_CACHE_KEY, JSON.stringify(data));
        localStorage.setItem(POSTS_CACHE_TIMESTAMP_KEY, new Date().toISOString());
      } catch (err) {
        const cachedPosts = localStorage.getItem(POSTS_CACHE_KEY);

        if (cachedPosts) {
          setPosts(JSON.parse(cachedPosts));
          setLoadedFromCache(true);
          setError("No se pudo conectar con la API. Mostrando datos guardados localmente.");
        } else {
          setError(err.message);
        }
      }
    }

    loadPosts();
  }, [refreshKey, page]);

  if (error && posts.length === 0) {
    return <p className="text-danger text-center">{error}</p>;
  }

  if (posts.length === 0) {
    return (
      <section className="container py-4">
        <div className="text-center bg-white rounded-4 shadow-sm p-5">
          <h2 className="h4">Todavía no hay posts</h2>
          <p className="text-muted mb-0">
            Crea tu primera publicación visual para empezar tu mosaico.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="container py-4">
      <h2 className="mb-4 text-center">Feed de inspiración</h2>

      {loadedFromCache && (
        <div className="alert alert-warning text-center" role="alert">
          {error}
        </div>
      )}

      <div className="row g-4">
        {posts.map((post) => (
          <div className="col-12 col-md-6 col-lg-4" key={post.id}>
            <PostCard
              post={post}
              currentUser={currentUser}
              onPostChanged={onPostChanged}
            />
          </div>
        ))}
      </div>

      <div className="d-flex justify-content-center gap-2 mt-4">
        <button
          type="button"
          className="btn btn-outline-dark"
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
        >
          Anterior
        </button>

        <span className="d-flex align-items-center px-3">
          Página {page}
        </span>

        <button
          type="button"
          className="btn btn-dark"
          onClick={() => setPage(page + 1)}
          disabled={posts.length < limit}
        >
          Siguiente
        </button>
      </div>
    </section>
  );
}

export default PostFeed;