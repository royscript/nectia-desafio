const NumeroPaginas = ({cant,paginaSeleccionada,paginaClick,totalRegistros})=>{ 
    const paginaSiguiente = parseInt(paginaClick)+1;
    const paginaAnterior = parseInt(paginaClick)-1;
    let paginacion = [];
    for(var x=1;x<=cant;x++){
        paginacion.push(
            {pagina : x}
        );
    }
    return (
        <>
            <ul className="pagination">
                <li className="page-item">
                    <div className="page-link" style={{'cursor':'pointer'}} href="#" tabIndex="-1" aria-disabled="true" onClick={()=>paginaSeleccionada(1)}>Primera</div>
                </li>
                <li className={paginaAnterior<=0?"page-item disabled":"page-item"}>
                    <div className="page-link" style={{'cursor':'pointer'}} href="#" tabIndex="-1" aria-disabled="true" onClick={()=>paginaAnterior>0? paginaSeleccionada(paginaAnterior):false}>Ant</div>
                </li>
                {paginacion.map((valor,index)=>
                                    <li className={paginaClick==valor.pagina? "page-item active":"page-item"} style={{'cursor':'pointer'}} key={valor.pagina+'-li-numero-pagina'}>
                                        <div key={valor.pagina+'-numero-pagina'} 
                                            onClick={()=>paginaSeleccionada(valor.pagina)}
                                            className="page-link" href="#">{valor.pagina}</div>
                                    </li>)}
                <li className={paginaSiguiente>cant?"page-item disabled":"page-item"}>
                    <div className="page-link" style={{'cursor':'pointer'}} href="#" onClick={()=>paginaSiguiente<=cant? paginaSeleccionada(paginaSiguiente):false}>Sig</div>
                </li>
                <li className="page-item">
                    <div className="page-link" style={{'cursor':'pointer'}} href="#" onClick={()=>paginaSeleccionada(cant)}>Ultima</div>
                </li>
                <li>
                    <div style={{'marginTop':'5px','marginLeft' : '5px','fontWeight':'bold'}}>{" "+totalRegistros} registros</div>
                </li>
            </ul>
            
        </>
    );
}
export default NumeroPaginas;