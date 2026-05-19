import { useState } from "react";

function UserSessionForm({ currentUser, onUserChange}){
    const [username, setUsername] = useState(currentUser || "");

    function handleSubmit(event){
        event.preventDefault();

        if(!username.trim()){
            return;
        }

        sessionStorage.setItem("currentUser", username.trim());
        onUserChange(username.trim());
    }

    function handleClearUser(){
        sessionStorage.removeItem("currentUser");
        setUsername("");
        onUserChange("");
    }
    return (
        <section className="container py-3">
        <div className="card shadow-sm">
            <div className="card-body">
            <h2 className="h5 mb-3">Usuario actual</h2>

            <form className="row g-2" onSubmit={handleSubmit}>
                <div className="col-12 col-md-8">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Escribe tu usuario"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                />
                </div>

                <div className="col-12 col-md-4 d-flex gap-2">
                <button type="submit" className="btn btn-dark w-100">
                    Guardar
                </button>

                <button
                    type="button"
                    className="btn btn-outline-secondary w-100"
                    onClick={handleClearUser}
                >
                    Limpiar
                </button>
                </div>
            </form>

            {currentUser && (
                <p className="mt-3 mb-0 text-muted">
                Sesión activa como <strong>{currentUser}</strong>
                </p>
            )}
            </div>
        </div>
        </section>
    );
}

export default UserSessionForm;