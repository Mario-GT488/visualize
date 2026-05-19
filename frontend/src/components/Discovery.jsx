import { use, useState } from "react";
import { getDiscoveryImages, createPost } from "../services/api";

function Discovery({ currentUser, onPostCreated }){
    const [query, setQuery] = useState("nature");
    const [images, setImages] = useState([]);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    async function handleSearch(event){
        event.preventDefault();

        try {
            setError("");
            setSuccess("");

            const data = await getDiscoveryImages(query, 6);
            setImages(data);
        } catch (err) {
            setError(err.message);
        }
    }

    async function handleSaveImage(image){
        if(!currentUser){
            setError("Primero guarda un usuario actual");
            setSuccess("");
            return;
        }

        try {
            setError("");
            setSuccess("");

            const postData = {
                username: currentUser,
                image_url: image.image_url,
                tags: query,
                description: image.description,
            };

            await createPost(postData, currentUser);
            onPostCreated();
        } catch (err){
            setError(err.message);
        }
    }

    return (
        <section className="container py-4">
        <div className="bg-white rounded-4 shadow-sm p-4">
            <h2 className="h4 mb-3">Descubrir inspiración</h2>

            <form className="row g-2 mb-3" onSubmit={handleSearch}>
            <div className="col-12 col-md-9">
                <input
                type="text"
                className="form-control"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Busca inspiración: nature, architecture, fashion..."
                />
            </div>

            <div className="col-12 col-md-3">
                <button type="submit" className="btn btn-dark w-100">
                Buscar
                </button>
            </div>
            </form>

            {error && <p className="text-danger">{error}</p>}
            {success && <p className="text-success">{success}</p>}

            <div className="row g-4">
            {images.map((image) => (
                <div className="col-12 col-md-6 col-lg-4" key={image.id}>
                <div className="card h-100 shadow-sm">
                    <img
                    src={image.image_url}
                    className="card-img-top"
                    alt={image.description}
                    />

                    <div className="card-body">
                    <h3 className="h6">{image.description}</h3>

                    <p className="text-muted small mb-2">
                        Foto por {image.author} en {image.source}
                    </p>

                    <a
                        href={image.source_url}
                        target="_blank"
                        rel="noreferrer"
                        className="btn btn-outline-secondary btn-sm me-2"
                    >
                        Ver fuente
                    </a>

                    <button
                        type="button"
                        className="btn btn-dark btn-sm"
                        onClick={() => handleSaveImage(image)}
                    >
                        Guardar como post
                    </button>
                    </div>
                </div>
                </div>
            ))}
            </div>
        </div>
        </section>
    );
}

export default Discovery;