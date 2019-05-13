import BaseController from './BaseController';
import Models from '../models';

class DeviceController extends BaseController {
  list = async (req, res, next) => {
    try {
      const devices = await Models.Device.findAll();
      res.json(devices);
    } catch (e) {
      console.error(e);
      next();
    }
  }

  get = async (req, res, next) => {
    try {
      const id = req.params.id || 0;
      const device = await Models.Device.findOne({ where: { id: id } });

      if (device) res.json(device);
      else res.status(404).end();
    } catch (e) {
      console.error(e);
      next();
    }
  }

  add = async (req, res, next) => {
    const body = req.body;
    try {
      const device = await Models.Device.findOne({ where: { uuid: body.uuid } });
      if (device) {
        if (device.registerKey !== body.registerKey) {
          Object.keys(body).forEach(key => {
            if (device.dataValues.hasOwnProperty(key)) {
              if (key != 'id' && key != 'created_at' && key != 'updated_at') {
                device[key] = body[key];
              }
            }
          });
  
          res.json(await device.save());
        } else {
          res.json(device);
        }
      } else {
        res.json(await Models.Device.create({
          uuid: body.uuid,
          registerKey: body.registerKey,
          platform: body.platform,
        }))
      }
    } catch (e) {
      console.error(e);
      next();
    }
  }
}

export default new DeviceController();