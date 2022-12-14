import 'reflect-metadata';
import express, { Request, Response, NextFunction, } from 'express';
import "dotenv/config";
import "express-async-errors";
import { router } from './routes';
import { createConnection } from './database';
import './container';
import { AppError } from './errors/AppError';

createConnection();

const app = express();
app.use(express.json());
app.use(router);


app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
        return response.status(err.statusCode).json({
            message: err.message
        })
    }

    return response.status(500).json({
        status: "error",
        message: `Internal Server Error ${err.message}`,
    })
});

app.listen(3333, () => console.log("Server is running"));