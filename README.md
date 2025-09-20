Typescript & Expess backend 

The next set of tasks are to demonstrate how we could implement a simple REST API.
The API will have the following endpoints:
GET /users
POST /users

GET /users/{id}
DELETE /users/{id}
PUT /users/{id}
The base uri will be /api/v1

The first two endpoints are to the set of resources. 
The second two endpoints have a parameter. They are called on an individual resource. The id of the resource is at the end of the uri
We won’t worry for the moment about what data we store for a user. But note that the POST and PUT requests will include data to be stored on the server.
Task 1: Create the controllers
The controllers will handle the logic of the request and be responsible for sending back the response. For now we will just send back a response without interacting with the data.
Add a folder called controllers and a file within that called users.ts
import { Request, Response } from 'express';

export const getUsers = (req: Request, res: Response) => {
    //to do: get all users from the database
  res.json({"message": "getUsers received"})
};

export const getUserById = (req: Request, res: Response) => {
  // get a single  user by ID from the database
  let id:string = req.params.id;
  res.json({"message": `get a user ${id} received`})
};

export const createUser = (req: Request, res: Response) => {
  // create a new user in the database

  console.log(req.body); //for now just log the data

  res.json({"message": `create a new user with data from the post message`})
};

export const updateUser = (req: Request, res: Response) => {
  
  console.log(req.body); //for now just log the data

  res.json({"message": `update user ${req.params.id} with data from the post message`})
};

export const deleteUser = (req: Request, res: Response) => {
  // logic to delete user by ID from the database

  res.json({"message": `delete user ${req.params.id} from the database`})
};

The code above is defining five functions. Each of which is a request handling function. The function takes two parameters, a request and a response.

Note in the code above the request object contains a property params. This is populated with a key value pair, where the key will be the name used for the parameter and the value is the value given with uri. 
Task 2: Set up the route handling
Next we want to add a router to our application.

Create a folder called routes and a file called users.ts in this folder.
Add the following code:

import express, {Router} from 'express';
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from '../controllers/users';

const router: Router = express.Router();

router.get('/', getUsers);
router.get('/:id', getUserById);
router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;

This file exports a ROUTER object which maps requests onto the controller for handling the request. Take note of the syntax for a route parameter the :id indicates that what ever value appears in the route will be added as a value to the id key in the req.params object.

Task 3: 

Edit the index.ts file to import the routes from the routes/users:
import userRoutes from './routes/users';

Tell the application to use this router:

app.use('/api/v1/users', userRoutes)

Now any request to /api/v1/users will be sent to the appropriate router from the ./routes/users file.
Be careful: The app.use code should be below the app.use(morgan(“tiny”)) code and above the app.listen code.
Task 4: Testing

When we enter a url into a browser a get request is sent to the server
We can test the get requests from our browser.

Start the server in development mode: npm run dev
Open a browser and type in the uri:  http://localhost:3000/api/v1/users

What response do you get?
Change the uri to: http://localhost:3000/api/v1/users/una
What response do you get now?
Testing the POST, DELETE and PUT requests is a little more difficult. There are a number of tools we can use to create these REQUESTS and send them to the server. Curl, postman are two examples which you may have used already.
We will use a VS Code extension called REST Client


Install the VS Code Extension Rest Client.
Then create a new folder called tests and a file called contacts.http within this folder.
Add the following code to the contact.http file.
###
### POST Request for a contact 
## Expected result is ........
POST http://localhost:3000/contacts HTTP/1.1
content-type: application/json

{ "name" : "John Doe",
   "phonenumber" : "0871234567",
   "email": "jdoe123@gmail.com"}


To run this you hit the grey Send Request.

 

The response we get is as expected but we are also logging the data received in the console and you will notice the word undefined.

This is because the app does not yet know how to parse the JSON it received in the body of the request. We need to add this functionality explicitly to the application. This is done by adding middleware to decode the request body when json is received. It needs to be added before the route handlers.

app.use(express.json());

Check what happens when this line is added to your code.
What happens if you move it to below this line:
app.use('/api/v1/users', userRoutes)

