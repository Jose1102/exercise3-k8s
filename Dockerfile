#Usamos imagen oficial de Node.js ligera como base
FROM node:18-alpine

#Establecemos el directorio de trabajo
WORKDIR /app

#Copiamos los archivos de de dependencias
COPY package*.json ./

#Instalamos las dependencias de la aplicacion
RUN npm install

#Copiamos el resto del codigo
COPY . .

#Exponemos el puerto que usa nuestra aplicación
EXPOSE 3000

#Comando por defecto para iniciar el microservicio
CMD ["npm", "start"]

