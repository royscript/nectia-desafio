# nectia-desafio
<b>Solicitudes:</b>
Esta es una aplicacion que permite realizar solicitudes por parte de los usuarios.
<br>Tecnologías utilizadas:
<ul>
  <li>React Js - axios - formik - md5 - react-redux - react-router - react-router-dom</li>
  <li>Node Js - Express - cors - jsonwebtoken</li>
  <li>Mysql</li>
</ul>
<br>Instrucciones:
<br>Existen 3 carpetas:
<br><b>Servidor :</b> Contiene los modulos programados en Node JS. Tiene variables globales <b>.env</b> con las cuales se puede configurar el modulo para acceder a la bd mysql.
```
HOST_MYSQL=127.0.0.1
PORT_NODE=3001
USER_MYSQL=root
PASSWORD_MYSQL=164289273
DATABASE_MYSQL=solicitudes 
#PARAMETROS JSON WEBTOCKEN
ACCESS_TOKEN_SECRETO=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IlJveSBBbGV4IFN0YW5kZW4gQmFycmF6YSIsImlhdCI6MTUxNjIzOTAyMn0.DGp-MFF_7p9JE6kM3FLyLKziJ7efqxWZJ3FbBQ0i_k0
REFRESH_TOKEN_SECRETO=94e271e73c9b132848bb1675fc9b24ae064112554da1e794621b061d8defed67581df223973e6c53c747fbdc7606dc9dd76c54b1a895387d3815a65722293283

```
<br><b>Cliente : </b> Contiene los modulos programados en React JS. El unico archivo configurable se encuentra en <b>src/api/config.js</b>, en el cual se debe configurar donde estará la ruta del servidor.
```
const BASE_URL = 'http://localhost:3001/api';
export default BASE_URL;

```
 
