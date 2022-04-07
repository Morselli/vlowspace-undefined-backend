import 'reflect-metadata'
import express, { Request, Response, NextFunction, response } from 'express';

import './database'

const app = express();
const port = 3000;

app.use(express.json())
app.listen(port, () => console.log(`Server listening on port ${port}`))