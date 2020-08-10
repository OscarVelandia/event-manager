# Dashboard de eventos


## Como correr cada proyecto
1. Usar la ultima version de node.js, si tiene instalado nvm, la version se instalara automaticamente  
2. correr ```yarn``` para instalar los paquetes, despues ```yarn start``` y ```yarn server``` para iniciar el proyecto 

## Suposiciones
* Para manejar las suscripciones, agregue un endpoint en json-server llamado "subscriptions"

### General
* Para mantener un estandar en el código agregué las herramientas: *Husky*, *lint-staged*, *Eslint* (con la guía de estilos de airbnb) y *Prettier*
* Agregué la configuración para usar el debugger de VSCode, para iniciarlo solo hay que oprimir *F5*.   
* Para las llamadas al servidor use el paquete use-http. 
