Note: You should be able to copy and paste between the code here and your code in Visual Studio Code. 

We will be building our backend using transcript.

Typescript transpiles to javascript.

When you learned Angular last year you used the Angular development tools. These tools do a lot in the background. We will be using Typescript and Express  for our backend and we will have to set up more stuff ourselves. This will be slower, however this should help give us a deeper understanding of the whole code development process

Note: Remember write your code on the C: drive not on the OneDrive. Use Github to store the code. If you have difficulty with github please ask for help. It is important that you master its use.
In preparing this worksheet I used some material and ideas from these two tutorials. They both go further than this worksheet.
https://medium.com/ms-club-of-sliit/building-rest-api-with-express-js-typescript-and-swagger-387a9c731717
https://auth0.com/blog/node-js-and-typescript-tutorial-build-a-crud-api/
Section 1:

Task 1

Create a folder for your project call this folder InitalSetUp.
Open this folder in visual studio code and open a terminal.
Type git init to set up git for this application.
What happens?
Add a file called .gitignore with the following:

# npm
node_modules
package-lock.json
*.log
*.gz

# build folder

build


Question:
Do you know what the .gitignore file does. Why is it important (two reasons).



Type npm init -y
You have just created a package.json file, open it and look at the contents. 

You can read more about package.json here: https://heynode.com/tutorial/what-packagejson/


Type npm i express

Notice your package.json file has changed. It should now include a dependency to express. 

Type npm i -D typescript
Notice your package.json file now contains a development dependency to Typescript.

Type npm i -D @types/express @types/node 
This adds the types which are used by express and node.
Create a new file called tsconfig.json. This file in a folder indicates that the folder is the root of a TypeScript project. The tsconfig.json file specifies the root files and the compiler options required to compile the project. You can read more about the tsconfig file here: https://www.typescriptlang.org/tsconfig/


We will add the following to the tsconfig.json file.
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "CommonJS",
    "outDir": "./build",
    "rootDir": "src",
    "strict": true,
    "esModuleInterop": true
  }
}

  
This configuration specifies that TypeScript should transpile our code to ES2020, use CommonJS for modules and output to a build directory.

Next we will create our first code file. Create a folder in the root director called src and add a new file index.ts to this folder.
Add the code below to the index.ts file.

import express, {Application, Request, Response} from "express" ;

const PORT = process.env.PORT || 3000;

const app: Application = express();

app.get("/ping", async (_req : Request, res: Response) => {
    res.json({
    message: "hello from Una - changed",
    });
});

app.listen(PORT, () => {
    console.log("Server is running on port", PORT);
    });



Next we will edit our package.json file to define the scripts we use for building and starting our code.
Add the following values to the scripts key in package.json
    "build": "tsc",
    "start": "node build/index.js"


Then build the application:
npm run build
You should see a new folder and file have been created in build/index.js. This file contains the javascript which has been compiled from the typescript. You should never edit this javascript directly/

Next run the application type
npm start in the terminal.
What happens?
Visit localhost:3000/ping in your browser to see what happens when a GET request is sent to localhost:3000/ping
This is your first application built using Express. 
Note: When you type npm build/index in the terminal you are starting a node web server, this is listening at localhost:3000 it will continue running until you press ctrl-c.

- Start of Rant
Some students write code and forget to run it and test that it does what they expect.
You haven’t finished this worksheet unless you start up a web browser and go to localhost:3000.
Ideally you would then “play” a bit. Change the message that gets sent, change the port number etc.
In each case we need to save our changes, use ctrl-c to stop the web server and node index to restart it.
If you cannot get this to work please ask for help.
End of Rant ----

Change the “hello message” to use your own name and message and change the port to something other than 3000. Then take a screenshot of your web browser and upload it to Moodle.
Task 2

You will notice if you play with your code that you need to save the file (unless you have autosave on in VS), you also need to stop the server, rebuild the code and rerun start. This can get tedious.
We will improve our development environment.

Enter the following in the terminal
npm i -D ts-node nodemon
To install nodemon and ts-node as development dependencies,
Ts-node lets you exectute typescript on Node without precompiling.
Nodemon is a monitor looks for changes in the src folder and if it finds them rebuilds the code and executes it.

Then edit the package.json file as follows:
 Add the following to the scripts key:
"dev": "nodemon"

And add a new top level key:
  "nodemonConfig": {
    "watch": [
    "src"
    ],
    "ext": "ts",
    "exec": "ts-node src/index.ts"
    }
  

Now when you type npm run dev you are running a monitoring program which looks for changes in the src folder and if it finds them rebuilds the code and executes it.
You will still need to refresh the browser if you make changes to what the request returns.

Add a second “route” to your program and test that it works by going to localhost:3000/bananas
app.get('/bananas', async (_req : Request, res: Response)
=>
  res.send('hello world, this is bananas'));



Add some silly extra routes of your own.

Task 3

Next we want to add some middleware to our application. 

Add some very simple logging to the application.
Add the logging module morgan to the application:
npm i morgan
npm i -D @types/morgan 
Then add the following code to your index.ts file.
Import the logging module:
import morgan from "morgan";

Tell the application to use logging.
app.use(morgan("tiny"));

Note: Whether or not a request is logged depends on whether the code to handle the request appears before or after the code which tells the application to use morgan.
This is because morgan is middleware which takes a request, does something and passes it on to the next part of the request handling.
The app.get(…) code is a request handler. This sends a response to the request and the request processing stops.

Note:
What happens if the code telling the server to use logging middleware is after the code with the route handler ?