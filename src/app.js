import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import passport from 'passport';

import routes from './routes/index';

dotenv.config();

const app = express();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));

const port = process.env.PORT ? process.env.PORT : 3000;

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  // res.setHeader('Access-Control-Allow-Origin', process.env.ACCESS_CONTROL_ALLOW_ORIGIN);
  res.setHeader('Vary', 'Origin');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization, Set-Cookie');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  res.setHeader('Access-Control-Expose-Headers', 'Authorization');
  next();
});

app.use(cors({
  origin: ['https://localhost:8080', 'https://localhost:3000']
}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());

app.use('/api/v1', routes);


app.get('/', (req, res) => res.status(200).send({
  message: 'Welcome to Team-032 SGD Goal4 project'
}));


// eslint-disable-next-line no-console
app.listen(port, () => console.log(`Server running on PORT ${port}`));

export default app;
