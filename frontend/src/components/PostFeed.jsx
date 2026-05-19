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