import { useState } from "react";
import { createPost } from "../services/api"

function PostForm({ currentUser, onPostCreated}){
    const [formData, setFormData] = useState({
        username: "",
        image_url: "",
        tags: "",
        description: ""
    });

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    function handleChange(event){
        const { name, value } = event.target;

        setFormData({
            ...formData,
            [name]: value,
        });
    }

    async function handleSubmit(event){
        event.preventDefault();

        if(!currentUser){
            setError("Primero guarda un usuario actual");
            setSuccess("");
            return;
        }

        try{
            setError("");
            setSuccess("");

            const postToCreate = {
                ...formData,
                username: formData.username || currentUser,
            };

            await createPost(postToCreate, currentUser);

            setFormData({
               username: "",
               image_url: "",
               tags: "",
               description: "", 
            });

            setSuccess("Post creado correctamente");
            onPostCreated();
        }catch (err){
            setError(err.message);
            setSuccess("");
        }
    }

    return (
        <section className="container py-4">
        <div className="card shadow-sm">
            <div className="card-body">
            <h2 className="h4 mb-3">Crear nuevo post</h2>

            {error && <p className="text-danger">{error}</p>}
            {success && <p className="text-success">{success}</p>}

            <form onSubmit={handleSubmit}>
                <div className="row g-3">
                <div className="col-12 col-md-6">
                    <label className="form-label">Usuario visible</label>
                    <input
                    type="text"
                    className="form-control"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder={currentUser || "mario"}
                    />
                </div>

                <div className="col-12 col-md-6">
                    <label className="form-label">Etiquetas</label>
                    <input
                    type="text"
                    className="form-control"
                    name="tags"
                    value={formData.tags}
                    onChange={handleChange}
                    placeholder="naturaleza, diseño, inspiración"
                    required
                    />
                </div>

                <div className="col-12">
                    <label className="form-label">URL de imagen</label>
                    <input
                    type="url"
                    className="form-control"
                    name="image_url"
                    value={formData.image_url}
                    onChange={handleChange}
                    placeholder="https://..."
                    required
                    />
                </div>

                <div className="col-12">
                    <label className="form-label">Descripción</label>
                    <textarea
                    className="form-control"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows="3"
                    placeholder="Describe la imagen..."
                    required
                    />
                </div>

                <div className="col-12">
                    <button type="submit" className="btn btn-dark">
                    Crear post
                    </button>
                </div>
                </div>
            </form>
            </div>
        </div>
        </section>
    );
}

export default PostForm;