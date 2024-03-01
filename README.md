--- Cajero Automatico ---

Arquitectura de la Aplicación:
-----------------------------

Frontend: 
React v18.2.0 + Vite
Tailwind: v3.4.1

----

Backend: 
.NET Core 8.0.2
Entity Framework para el acceso a base de datos
Patron de Repositorio para el diseño
Base de Datos Relacional: MS SQL Server

----

Como levantar el proyecto:
-------------------------
ACLARACIÓN: Debe tener instalado en su equipo lo siguietne:
- Git, Nodejs, npm, compiladores como Visual Studio Code para el frontend y Visual Studio 2022 para el backend, Base de Datos SQL Server

Una vez instalado eso, ya se puede levantar el proyecto.

- Abra una terminal o bloque de comando, ubiquese sobre una carpeta vacia y escriba: git clone https://github.com/tebgallery/CajeroAutomatico.git
ACLARACIÓN: no hace falta cambiar de rama, los ultimos cambios estan subidos a master.

Levantar el Front:
----------
1) Parese sobre la carpeta CajeroAutomatico/CajeroAutomaticoWeb/cajero-automatico-web (puede entrar en las carpetas por consola, con el comando cd "nombreCarpeta"
2) dentro de la carpeta "cajero-automatico-web" escribir el comando 'npm install' para instalar todas las dependencias
3) Una vez instaladas, con el comando 'npm run dev' se podrá ver la interfaz en la url que le marca, ej: http://localhost:5173/

Levantar el backend:
----------
1) Abra la solucion del proyecto que se encuentra dentro de CajeroAutomatico/CajeroAutomaticoAPI con Visual Studio
2) Una vez dentro, elija la forma de compilar "IIS Express" en la parte superior
3) Compile la solucion. Al compilarlo se creara la base de datos con sus respectivas tablas y datos de prueba


COSAS A TENER EN CUENTA:
En caso de que no vea reflejada la creación de la base de datos al ejecutar la API, validar si el archivo appsettings.json de CajeroAutomaticoAPI esta configurado el ConnectionString de acuerdo a su conexión.
Lo mismo pasa con el frontend, si la dirección en donde esta la API es otra, el front no va a poder traer sus servicios. 
Eso lo puede validar en CajeroAutomatico/CajeroAutomaticoWeb/cajero-automatico-web/src/config.json

Si desea consultarme cualquier duda estare dejando mi mail debajo
estebanrafsanchez@gmail.com
