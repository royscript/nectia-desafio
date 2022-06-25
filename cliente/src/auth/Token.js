export const getToken = ()=>{
    const lSToken = localStorage.getItem('token');
    if(lSToken){
        return lSToken;
    }
    return false;
}
export const setToken = async (token)=>{
    localStorage.clear();
    sessionStorage.clear();
    localStorage.setItem('token', token);
    sessionStorage.setItem('token', token);
    return token;
}
