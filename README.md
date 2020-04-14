![Logo](https://cs.intelix.biz/logo/pic.png "InteliX")
# Mapeo de Conocimiento (Backend)
## v-1.0.0


## 1. Introducción.

Este repositorio contiene el backend de la aplicacion "Mapeo de Conocimiento",
la cual permitira ingresar las habilidades del colaborador en cuestión, permitiendo asi mantener 
una gestión actualizada de los mismos para futuros usos.


## 2. Funcionalidad.

Mapeo de conocimientos es un aplicación web diseñada únicamente para los colaboradores de la empresa.
Con el objetivo de facilitar a nuestro equipo de gestión y métodos la recolección de habilidades de cada integrante 
de la empresa para así potenciar el proceso de selección de un proyecto manejado desde la plataforma de Resource Guru.


## 3. Tipos de conexión.

-  La aplicacion realiza las peticiones (API) en el puerto **4080**.
- Las rutas para metodos "GET" en el servidor virtual son:
  - Ruta "/rg/resources/ids".
      - Retorna en formato de JSON las ids de los usuarios.
  - Ruta "/rg/resources/:id".
      - Requiere "id"(id del usuario) en la url.
      - Retorna las respectivas skills al id de usuario asociado en formato de JSON.
  - Ruta "/rg/resources//skills".
      - Retorna todas las skills en formato de JSON.
- Las rutas para metodos "POST" en el servidor virtual son:
	- Ruta "/rg/resources/emails" metodo para obtener los emails relacionados a las "ids" enviados en la consulta.
    	- Requiere "ids"(ids de los usuarios) en la consulta.
    	- Retorna los respectivos correos en formato de JSON.
	- Ruta "/rg/resources/edit/:id" metodo para actualizar los skills del usuario relacionados a la "id" enviado en la URL.
    	- Requiere "id"(id del usuario) por url y "skills"(ids de las skills) en la consulta.
    	- Retorna el resultado de la consulta en formato de JSON.
	- Ruta "/bd/data" .
    	- Requiere "email"(email del usuario) en la consulta.
    	- Retorna el resultado de la consulta en formato de JSON.
	- Ruta "/bd/update" .
    	- Requiere "email"(email del usuario) y "create"(bandera para crear registro en la base de datos) en la consulta.
    	- Retorna el resultado de la consulta en forma de texto: (0: Registro sin errores) o (1: Error en la ejecucion del registro).


## 4. Generalidades sobre la implementación.

- Esta aplicacion ha sido desarrollada con Node.js usando los siguientes modulos:
  - axios
  - express
  - mysql
  - nodemailer
  - passport
  - passport-oauth2
  - request

- Arbol de la aplicación:

	```
    back-end
    │   README.md
    │   package.json   
    │   package-lock.json   
    │   index.js
    │   database.js 
    │
    └───routes
    │   │   auth.js
    │   │   mysql_bd.js
    │   │   resource:guru.js
    │   │   sendEmail.js
    │  
    └───config
        │   key.js
        │   keyDB.js
    ```
	
- Nivel de conocimiento: Bajo.


## 5. Configuración y Despliegue.

Aspectos a considerar:

- Se describe el proceso de instalación y despliegue para la aplicación.
- Seguirlo paso a paso debería garantizar la correcta instalación y posterior despliegue o puesta en funcionamiento de los servicios. 
- Cualquier tipo de contingencia o caso atípico que se pudiera presentar durante el despliegue en un ambiente determinado será documentado en esta fase en el punto **5.4 Resolución de problemas**.

### 5.1. Prerrequisitos.

**Se deben tener configurados los siguientes entornos:**

- NodeJS

### 5.2. Instalación y configuración.

1. Clonar el repositorio con `git`.
2. Acceder a la carpeta donde se haya descargado todo el código fuente del servicio.
3. Ejecutar `npm install` para instalar todas las dependencias necesarias del servicio.

#### Configuraciones en el codigo *(Solo de ser necesario)*
Editar el archivo `key.js` que se encuentran en la ruta `back-end/config` en el 
cual se configurara las credenciales de acceso de Resource Guru:

```javascript
  // key.js
  module.exports = {
    EMAIL: '',
    PASS: ''
}
```
  en donde `EMAIL` es la direccion de correo electronico para manejo de la informacion en Resource Guru y `PASS` la contraseña del correo electronico

### 5.3. Configuración de base de datos.

Editar el archivo `keyDB.js` que se encuentran en la ruta `back-end/config` en el 
cual se configurara las credenciales de acceso a la base de datos en MySQL:

```javascript
  // keyDB.js
module.exports = {
    database:{
        host: '',
        port: 3306,
        user: '',
        password : '',
        database : '',
        timezone: "+00:00",
        connectionLimit: 10,
        acquireTimeout: 30000
    }
};;
```
  En donde: 
  - `host` es la direccion donde esta alojado el servidor de Mysql.
  - `port` es el puerto para la ejecucion de consultas **(default: 3306)**.
  - `user` es el usuario para acceder a la base de datos.
  - `password` es la contraseña para acceder a la base de datos.
  - `database` es el nombre de la base de datos a la cual se quiere acceder.
  - `timezone` es la zona horaria designada para el registro de las fechas **NO ALTERAR ESTE PARAMETRO**.
  - `connectionLimit` es el limite de consultas simultaneas, las consultas de exceso entraran en cola y luego en ejecucion **(default: 10)**.
  - `acquireTimeout` es el tiempo en que se refresca la conexion con la base de datos, expresado en milisegundos **(default: 30000)**.

### 5.4. Ejecución.

**Importante**.
*(Se recomienda leer mas en los README.me en el directorio Keycloak y en el repositorio "front-end")*.

En esta sección se deben considerar los siguientes pasos:

1. Inicializa el servidor `npm start`

2. Una vez desplegado, ejecutar consultas en [http://localhost:4080](http://localhost:4080)

### 5.5. Resolución de problemas.

- En el caso de en la sección de perfil, puede ocurrir que nunca se renderize el componente de las categorias y las 
habilidades, si este es el caso, verificar la consola web, además de que las credenciales de Resource Guru esten actualizadas.
Luego se recomienda reiniciar la consola del backend y recargar la pagina.

- Puede ocurrir que al momento de iniciar sesion en el Login mediante el boton de Google+ este servicio no pueda comprobar
la identidad del usuario, si este es el caso, verificar las configuraciones en la consola de administración de Keycloak (Kerberos).

---
_(c) 2019 Intelix Synergy C.A. Documentación técnica de aplicación **v1.0.0**_