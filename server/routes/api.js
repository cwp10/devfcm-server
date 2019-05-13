import { Router } from 'express';
import DeviceController from '../controllers/DeviceController';
import PushController from '../controllers/PushController';

const routes = new Router();

routes.get('/devices', DeviceController.list);
routes.get('/devices/:id', DeviceController.get);
routes.post('/devices', DeviceController.add);

routes.post('/send', PushController.send);

export default routes;