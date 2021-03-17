# Docker Image which is used as foundation to create
# a custom Docker Image with this Dockerfile
FROM node:10
 
# # A directory within the virtualized Docker environment
# # Becomes more relevant when using Docker Compose later
WORKDIR /usr/src/app
 
# Copies package.json and package-lock.json to Docker environment
COPY package*.json ./
 
# Installs all node packages
RUN yarn install


 
# Copies everything over to Docker environment
COPY . .
RUN yarn build
 
# Uses port which is used by the actual application
EXPOSE 3000
 
# Finally runs the application
CMD [ "yarn", "start" ]
# Docker Image which is used as foundation to create
# a custom Docker Image with this Dockerfile
# FROM node:10
 
# # A directory within the virtualized Docker environment
# # Becomes more relevant when using Docker Compose later
# WORKDIR /usr/src/app
 
# # Copies package.json and package-lock.json to Docker environment
# COPY package*.json ./
 
# # Installs all node packages
# RUN npm install

# Run npm install -g serve
 
# # Copies everything over to Docker environment
# COPY . .
# # Uses port which is used by the actual application
# EXPOSE 3000
 
# # Finally runs the application
# CMD [ "serve","-s","build", "-l","3000"]


# FROM node:10

# # Create a work directory and copy over our dependency manifest files.
# RUN mkdir /app
# WORKDIR /app
# COPY /src /app/src
# COPY ["package.json", "package-lock.json*", "./"]

# # If you're using yarn:
# #  yarn build
# RUN npm install --production --silent && mv node_modules ../
# RUN npm start
# # Expose PORT 3000 on our virtual machine so we can run our server
# EXPOSE 3000