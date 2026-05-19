import { useEffect, useState } from "react";
import { getPosts } from "../services/api";

function PostFeed({ refreshKey }) {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadPosts() {
      try {
        const data = await getPosts();
        setPosts(data);
        setError("");
      } catch (err) {
        setError(err.message);
      }
    }

    loadPosts();
  }, [refreshKey]);

  if (error) {
    return <p className="text-danger">{error}</p>;
  }

  return (
    <section className="container py-4">
      <h2 className="mb-4">Feed de inspiración</h2>

      <div className="row g-4">
        {posts.map((post) => (
          <div className="col-12 col-md-6 col-lg-4" key={post.id}>
            <div className="card h-100 shadow-sm">
              <img
                src={post.image_url}
                className="card-img-top"
                alt={post.description}
              />

              <div className="card-body">
                <h5 className="card-title">{post.username}</h5>
                <p className="card-text">{post.description}</p>
                <p className="text-muted">{post.tags}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default PostFeed;