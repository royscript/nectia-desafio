import { useEffect, useState } from "react";
import NumeroPaginas from "./NumeroPaginas";
import axiosPrivate from "../../api/axiosPrivate";

const TablePagination = ({head,mostrarDatos,data,setCantPorPag,setPagSiguiente,funcionDeDatos,placeHolderSearch,eliminar, busquedaExtra, styleSearch}) => {
    const [registros, setRegistros] = useState([]);
    const [paginaActual, setPaginaActual] = useState(1);
    const [paginaClick, setPaginaClick] = useState(1);
    const [totalPaginas, setTotalPaginas] = useState();
    const [totalRegistros, setTotalRegistros] = useState();
    const [cantPPag, setCantPPag] = useState(5);
    const [search, setSearch] = useState();

    const eliminarRegistro = async (id)=>{
        try {
            const resultSet = await axiosPrivate.post(eliminar.url, {id});
            alert("Datos eliminados correctamente");
            funcionDeDatos();
        } catch (error) {
            alert(error);
        }
        
    }

    function handleChange(event) {
        setCantPorPag(event.target.value);
        setCantPPag(event.target.value);
    }
    useEffect(()=>{
        
    },[])
    useEffect(()=>{
        if(data.cantidad){
            setTotalRegistros(data.cantidad[0].cantidad);
            setRegistros(data.datos);
            setTotalPaginas(Math.ceil(parseInt(totalRegistros)/parseInt(cantPPag)));
        }
    },[data])
    useEffect(()=>{
        if(data.cantidad){
        setTotalRegistros(data.cantidad[0].cantidad);
        setTotalPaginas(Math.ceil(parseInt(totalRegistros)/parseInt(cantPPag)));
        }
    },[registros])
    useEffect(()=>{
        //listarProductos();
        
        setPagSiguiente(paginaClick);
    },[paginaClick])
    const estiloSearch = ()=>{
        return {
            ...{'width':'40%'},
            ...styleSearch
        }
    }
    return(
        <>
            <div className="table-responsive">
                <div className="row" style={{'marginLeft' : '5px', 'marginTop' : '5px'}}>
                    <b>Cant &nbsp;
                    <select style={{'width': '60px'}} onChange={handleChange}>
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="15">15</option>
                    </select>
                    &nbsp;
                    Buscar : &nbsp;
                    <input type="search" name="search" style={estiloSearch()} onChange={(e)=>setSearch(e.target.value)} placeholder={placeHolderSearch}/>
                    {busquedaExtra}
                    &nbsp;
                    <button onClick={async ()=>{
                        await funcionDeDatos(search)
                    }} type="button" className="btn btn-primary btn-sm" style={{'marginTop':'-5px'}}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                        </svg>
                    </button>
                    </b>

                </div>
                
                <table className="table">
                    <thead>{head}</thead>
                    <tbody>
                        {registros.map((value,index)=>mostrarDatos(value,index,eliminarRegistro))}
                    </tbody>
                </table>
            </div>
            <nav>
                <NumeroPaginas cant={totalPaginas} paginaSeleccionada={setPaginaClick} paginaClick={paginaClick} totalRegistros={totalRegistros}/>
            </nav>
        </>
        
    )
}
export default TablePagination;