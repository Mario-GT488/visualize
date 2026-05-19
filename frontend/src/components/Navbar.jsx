function Navbar({ currentUser}){
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary border-bottom sticky-top">
        <div className="container">
            <a className="navbar-brand fw-bold" href="#">
            Visualize
            </a>

            <div className="d-flex align-items-center gap-2">
            {currentUser ? (
                <span className="badge text-bg-dark">
                Usuario: {currentUser}
                </span>
            ) : (
                <span className="badge text-bg-secondary">
                Sin usuario
                </span>
            )}
            </div>
        </div>
        </nav>
    );
}

export default Navbar;