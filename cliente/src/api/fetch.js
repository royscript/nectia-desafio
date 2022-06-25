export const privateFetch = async (metodo,url,parametros) =>{
    return await fetch('http://localhost:3001/api'+url, { 
        method: metodo, 
        headers: new Headers({
          'Authorization': localStorage.getItem('token'), 
          'Content-Type': 'application/json'
        }), 
        body: JSON.stringify(parametros)
      });
}