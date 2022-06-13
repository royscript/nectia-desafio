const NavBar = ({nombreMantenedor,dondeEstoy,mensajeInicial})=>{
    return (
        <header>
                <div className="d-flex flex-column flex-md-row align-items-center pb-3 mb-4 border-bottom">
                <div href="/" className="d-flex align-items-center text-dark text-decoration-none">
                    <span className="fs-4">Desafio Nectia</span>
                </div>
                <nav className="d-inline-flex mt-2 mt-md-0 ms-md-auto">
                    <div className="me-3 py-2 text-dark text-decoration-none">Usuarios</div>
                    <div className="me-3 py-2 text-dark text-decoration-none">Permisos</div>
                </nav>
                </div>

                <div className="pricing-header p-3 pb-md-4 mx-auto text-center">
                <h1 className="display-4 fw-normal">{nombreMantenedor}</h1>
                <p className="fs-5 text-muted">{mensajeInicial}</p>
                </div>
            </header>
    );
}
export default NavBar;