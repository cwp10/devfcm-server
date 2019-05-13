import BaseController from './BaseController';
import FCM from 'fcm-node';
import Models from '../models';

require('dotenv').config();

const serverKey = process.env.FCM_SERVER_KEY;
const fcm = new FCM(serverKey);

class PushController extends BaseController {
  send = async (req, res, next) => {   
    const body = req.body;
    const deviceTokens = [];

    try {
      const devices = await Models.Device.findAll();
      devices.forEach(device => {
        deviceTokens.push(device.registerKey);
      });
    } catch (e) {
      console.error(e);
      next();
    }

    let push_data = {
      registration_ids: deviceTokens,
      
      notification: {
        title: body.title,
        body: body.message,
        sound: "default",
        click_action: "FCM_PLUGIN_ACTIVITY",
        icon: "ic_noticifation"
      },
    
      priority: "high",
      restricted_package_name: "com.fcmtest.choiwp10.fcmtest",
    
      data: {
        title: body.title,
        body: body.message,
      }
    }

    fcm.send(push_data, async (err, response) => {
      if (err) {
        console.error(err);
        next(err);
      } else {
        const data = JSON.parse(response);

        const result = {
          title: push_data.notification.title,
          message: push_data.notification.body,
          success: data.success,
          failure: data.failure,
        }

        try {
          const logData = await this.log(result);
          res.json(logData);
        } catch (e) {
          console.error(e);
          next();
        }
      }
    });
  }

  log = async (data) => {
    try {
      const logData = await Models.PushLog.create(data);
      return logData;
    } catch (e) {
      throw e;
    }
  }
}

export default new PushController();