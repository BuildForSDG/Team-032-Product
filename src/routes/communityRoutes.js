import express from 'express';
import { check } from 'express-validator';

import registration from '../controllers/communityController';

const routes = express();

routes.post('/reg', [
  // Fields should not be empty
  check('name').not().isEmpty().trim()
    .escape(),
  check('town').not().isEmpty().trim()
    .escape(),
  check('lga').not().isEmpty().trim()
    .escape(),
  check('state').not().isEmpty().trim()
    .escape(),
  check('country').not().isEmpty().trim()
    .escape()
  /*
remaining:
        '${req.body.total_population}',
        '${req.body.children_population}',
        '${req.body.youth_population}',
        '${req.body.middle_aged_population}',
        '${req.body.elderly_population}',
        */

],
registration);


export default routes;
