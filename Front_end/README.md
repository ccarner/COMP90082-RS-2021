# There are two different ways to setup frontend


### 1. Setting up frontend without Docker

#### Installing Dependecies
We first need to install yarn for node.js dependency management
Yarn installation instruction can be found here in this [link](https://classic.yarnpkg.com/en/docs/install/)

### `yarn install`
Run the above command to install all the dependencies for frontend app.

#### Running the app
### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

### 2. Setting up frontend with Docker
Docker is an open platform for developing, shipping, and running applications. Docker enables you to separate your applications from your infrastructure so you can deliver software quickly.

Docker setup instructions can be found here in this [link](https://docs.docker.com/get-docker/)
After that start the docker deamon.To see whether docker daemon is started or not you can type docker in the commandline.


#### `docker build -t image_name .` 
Run the above command with your own image_name to build docker image
For more information about building docker image check this [link](https://docs.docker.com/engine/reference/commandline/build/)

#### `docker run -d -p 3000:3000 --env BACKENDURL=backendurl image_name`
By default the app will use the setup backend url that we use in our project but in the future when setting up your own environment you have have to provide backend url as the environment variable.

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
For more information about building docker image check this  [link](https://docs.docker.com/engine/reference/commandline/run/)