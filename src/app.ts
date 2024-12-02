import express, { Request, Response } from 'express';
import https from 'https';
import fs from 'fs';

const app = express();
const port = 8080;

app.use(express.json());

// Example routes
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'ok' });
});

app.get('/api/users', (req: Request, res: Response) => {
  const users = [
    { id: 1, name: 'John' },
    { id: 2, name: 'Jane' }
  ];
  res.json(users);
});

app.post('/api/users', (req: Request, res: Response) => {
  const { name } = req.body;
  res.status(201).json({ id: 3, name });
});

const options = {
  key: fs.readFileSync('server.key'),
  cert: fs.readFileSync('server.cert')
};

https.createServer(options, app).listen(port, () => {
  console.log(`Server running at https://localhost:${port}`);
}); 
