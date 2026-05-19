import { useState } from "react";
import { updatePost, deletePost} from "../services/api"

function PostCard({ post, currentUser, onPostChanged }){
    const [isEditing, setIsEditing] = useState(false);
    const [editData, setEditData] = useState({
        username: post.username,
        image_url: post.image_url,
        tags: post.tags,
        description: post.description,
    });

    const [error, setError] = useState("");

    const canModify = currentUser === post.created_by;

    function handleChange(event){
        const { name, value} = event.target;

        setEditData({
            ...editData,
            [name]: value,
        });
    }

    async function handleUpdate(event) {
        event.preventDefault()

        try{
            setError("");

            const cleanData = {
                username: editData.username.trim(),
                image_url: editData.image_url.trim(),
                tags: editData.tags.trim(),
                description: editData.description.trim(),
            };

            await updatePost(post.id, cleanData, currentUser);
            setIsEditing(false);
            onPostChanged();
        }catch (err){
            setError(err.message);
        }
    }

    async function handleDelete(){
        const confirmDelete = window.confirm("¿Seguro que quieres eliminar este post?");

        if(!confirmDelete){
            return;
        }

        try{
            setError("");
            await deletePost(post.id, currentUser);
            onPostChanged();
        }catch (err){
            setError(err.message);
        }
    }

    if(isEditing){
        return (
        <div className="card h-100 shadow-sm">
            <div className="card-body">
            <h3 className="h5 mb-3">Editar post</h3>

            {error && <p className="text-danger">{error}</p>}

            <form onSubmit={handleUpdate}>
                <div className="mb-2">
                <label className="form-label">Usuario visible</label>
                <input
                    type="text"
                    className="form-control"
                    name="username"
                    value={editData.username}
                    onChange={handleChange}
                    required
                />
                </div>

                <div className="mb-2">
                <label className="form-label">URL de imagen</label>
                <input
                    type="url"
                    className="form-control"
                    name="image_url"
                    value={editData.image_url}
                    onChange={handleChange}
                    required
                />
                </div>

                <div className="mb-2">
                <label className="form-label">Etiquetas</label>
                <input
                    type="text"
                    className="form-control"
                    name="tags"
                    value={editData.tags}
                    onChange={handleChange}
                    required
                />
                </div>

                <div className="mb-3">
                <label className="form-label">Descripción</label>
                <textarea
                    className="form-control"
                    name="description"
                    value={editData.description}
                    onChange={handleChange}
                    rows="3"
                    required
                />
                </div>

                <div className="d-flex gap-2">
                <button type="submit" className="btn btn-dark w-100">
                    Guardar
                </button>

                <button
                    type="button"
                    className="btn btn-outline-secondary w-100"
                    onClick={() => setIsEditing(false)}
                >
                    Cancelar
                </button>
                </div>
            </form>
            </div>
        </div>
        );
    }

    return (
        <div className="card h-100 shadow-sm">
        <img
            src={post.image_url}
            className="card-img-top"
            alt={post.description}
        />

        <div className="card-body text-center">
            <h5 className="card-title">{post.username}</h5>
            <p className="card-text">{post.description}</p>
            <p className="text-muted">{post.tags}</p>

            <p className="small text-secondary">
            Creado por: {post.created_by}
            </p>

            {error && <p className="text-danger">{error}</p>}

            {canModify && (
            <div className="d-flex gap-2 justify-content-center">
                <button
                type="button"
                className="btn btn-outline-dark btn-sm"
                onClick={() => setIsEditing(true)}
                >
                Editar
                </button>

                <button
                type="button"
                className="btn btn-outline-danger btn-sm"
                onClick={handleDelete}
                >
                Eliminar
                </button>
            </div>
            )}
        </div>
        </div>
    );
}

export default PostCard;