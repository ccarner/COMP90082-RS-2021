# There are two different ways to setup the backend system. 
One is by using npm, and the other is by using Docker.
Though docker is a promising technique for deploying system, most of the public space requires money.
Therefore, we do not consider this method for deploying the system.


### 1. Setting up the backend system

#### Installing Dependecies
First need to install npm for node.js dependency management

### `npm install`

#### Running the app
There are 2 ways for running the backend system
### `node index.js `

Runs the app in the development mode.<br />
Open [http://localhost:4000](http://localhost:4000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

Alternatively, this can also run 
### `nodemon index.js`

By using this way, after saving the change, the system will restart automatically.
This way is suitable for developing the system without repeatedly typing command.


#### Use node environment variable to switch execution mode 
To separate the different work modes, the environment variable is introduced to reach the purpose. 
By using this way, it is possible for the system not to execute the experimental code section or conduct the automation test under the specified condition.
There are 3 options currently: `development`, `production`, and `test`. Where production mode is used for running the release version of the system
#### How to switch?
### Windows:
in cmd, give command set NODE_ENV=development

### Linux, MacOS:
in terminal, use export NODE_ENV= value. where value can be development, production, or test


#### Running integration test for the backend system
To enhance the quality of the system, the integration test has been adopted to the backend system

How to run integration test?

use `npm test ./tests/integration [test script file]`
currently, there are three available tests: login.test.js, register.test.js, subject.test.js




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