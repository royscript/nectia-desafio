import Footer from "../footer/Footer";
import NavBar from "../header/NavBar";
const Inicio = ({usuarioLogeado})=>{
    
    return (
        <div className="container py-3">
            <NavBar nombreMantenedor="Inicio" dondeEstoy="Inicio" mensajeInicial={"Bienvenido "+usuarioLogeado} usuarioLogeado={usuarioLogeado}/>
            <main>
                
            
            </main>
            <Footer/>
            </div>
    );
}
export default Inicio;