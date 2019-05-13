import express from 'express';
import bodyParser from 'body-parser';
import routes, { api } from './routes';

import { sequelize } from './models';

const app = express();
sequelize.sync();

app.use(bodyParser.urlencoded({ 'extended': true }));
app.use(bodyParser.json());

app.use('/api', api);
app.use(routes);

app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기중');
});