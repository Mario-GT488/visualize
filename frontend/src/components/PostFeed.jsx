import { useEffect, useState } from "react";
import { getPosts } from "../services/api";
import PostCard from "./PostCard";

function PostFeed({ refreshKey, currentUser, onPostChanged }) {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadPosts() {
      try {
        setError("");
        const data = await getPosts();
        setPosts(data);
      } catch (err) {
        setError(err.message);
      }
    }

    loadPosts();
  }, [refreshKey]);

  if (error) {
    return <p className="text-danger text-center">{error}</p>;
  }

  if(posts.length === 0) {
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
    </section>
  );
}

export default PostFeed;