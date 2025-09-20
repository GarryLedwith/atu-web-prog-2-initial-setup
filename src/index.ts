import express, {Application, Request, Response} from "express" ;
import userRoutes from './routes/users';
import morgan from "morgan";

const PORT = process.env.PORT || 3000;

const app: Application = express();

app.use(morgan('tiny'));

app.use(express.json()); //middleware to parse json request body

app.use('/api/v1/users', userRoutes)

app.get("/ping", async (_req : Request, res: Response) => {
  res.json({
 message: "hello from Garry Ledwith - changed",
 });
});

app.get('/bananas', async (_req : Request, res: Response) =>
    res.send('hello world, this is bananas'));

app.get('/awesome', async (_req : Request, res: Response) =>
    res.send('hello Una, this is awesome'));

app.listen(PORT, () => {
 console.log("Server is running on port", PORT);
 });
