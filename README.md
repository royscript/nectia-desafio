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

<br><b>Cliente : </b> Contiene los modulos programados en React JS. El unico archivo configurable se encuentra en <a href="https://github.com/royscript/nectia-desafio/blob/master/cliente/src/api/config.js"><b>src/api/config.js</b></a>, en el cual se debe configurar donde estará la ruta del servidor.
```
const BASE_URL = 'http://localhost:3001/api';
export default BASE_URL;

```

<br><b>bd :</b> Esta carpeta es la que tiene el <a href="https://github.com/royscript/nectia-desafio/blob/master/bd/base.sql">script de base de datos</a> junto con una <a href="https://github.com/royscript/nectia-desafio/blob/master/bd/bd.png?raw=true">foto</a> del MER realizado en Power Designer.
<br><b>Datos de prueba :</b>
```
Usuario administrador : 
Usuario : 16428927-3
Contraseña : 164289273

Usuario solicitante : 
Usuario : 8370986-3
Contraseña : 123456
```
<br><b>Como Instalarlo : </b>
<br>Instalar el script <b>base.sql</b> en tu gestor de base de datos mysql. Si utilizas XAAMP, recuerda que no utiliza contraseña. En este caso dejar en comentario la siguiente linea de codigo en <b>servidor/conexiones/conexionMysql.js
  
```
constructor(){
    this.conexion = mysql.createPool({
        host : process.env.HOST_MYSQL,
        user : process.env.USER_MYSQL,
        //password : process.env.PASSWORD_MYSQL,
        database : process.env.DATABASE_MYSQL
    });
};

```
<br><b>Instalar dependencias :</b> Ingresar con tu linea de comandos a la carpeta principal, escribir los siguientes comandos
```
  cd servidor
  npm install
  
  cd cliente
  npm install
```
  <br><b>Ejecutar :</b>
```
  cd cliente
  npm start
  
  cd servidor
  node index.js
```
 
