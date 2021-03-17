# There are two different ways to setup frontend


### 1. Setting up backend without Docker

#### Installing Dependecies
We first need to install yarn for node.js dependency management
Yarn installation instruction can be found here in this [link](https://classic.yarnpkg.com/en/docs/install/)

### `npm install`
Run the above command to install all the dependencies for frontend app.

#### Running the app
### `node index.js `

Runs the app in the development mode.<br />
Open [http://localhost:4000](http://localhost:4000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.



### 2. Setting up backend with Docker
Docker is an open platform for developing, shipping, and running applications. Docker enables you to separate your applications from your infrastructure so you can deliver software quickly.

Docker setup instructions can be found here in this [link](https://docs.docker.com/get-docker/)
After that start the docker deamon.To see whether docker daemon is started or not you can type docker in the commandline.


#### `docker build -t image_name .` 
Run the above command with your own image_name to build docker image
For more information about building docker image check this [link](https://docs.docker.com/engine/reference/commandline/build/)

#### `docker run -d -p 4000:4000 --env MONGODB_URI=dburl image_name`
By default the app will use the setup backend url that we use in our project but in the future when setting up your own environment you have have to provide backend url as the environment variable.

Open [http://localhost:4000](http://localhost:4000) to view it in the browser.
For more information about building docker image check this  [link](https://docs.docker.com/engine/reference/commandline/run/)