import express from 'express';

import communityRoutes from './communityRoutes';

const routes = express();

routes.use('/community', communityRoutes);


export default routes;
