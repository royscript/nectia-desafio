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
USER_MYSQL=
PASSWORD_MYSQL=
DATABASE_MYSQL=solicitudes 
#PARAMETROS JSON WEBTOCKEN
ACCESS_TOKEN_SECRETO=
REFRESH_TOKEN_SECRETO=
```

<br><b>Cliente : </b> Contiene los modulos programados en React JS. El unico archivo configurable se encuentra en <b>src/api/config.js</b>, en el cual se debe configurar donde estará la ruta del servidor.
```
const BASE_URL = 'http://localhost:3001/api';
export default BASE_URL;

```
 
