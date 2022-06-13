const NavBarLogin = ({nombreMantenedor,mensajeInicial})=>{
    return(
        <header>
            <div className="d-flex flex-column flex-md-row align-items-center pb-3 mb-4 border-bottom">
                <a href="/" className="d-flex align-items-center text-dark text-decoration-none">
                    <span className="fs-4">Desafio Nectia</span>
                </a>
            </div>

            <div className="pricing-header p-3 pb-md-4 mx-auto text-center">
            <h1 className="display-4 fw-normal">{nombreMantenedor}</h1>
            <p className="fs-5 text-muted">{mensajeInicial}</p>
            </div>
        </header>
    );
}
export default NavBarLogin;