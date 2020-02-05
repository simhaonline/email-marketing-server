import Router from 'koa-router';
import controller = require('./controller');

const unprotectedRouter = new Router();

// Hello World route
unprotectedRouter.get('/', controller.general.helloWorld);

unprotectedRouter.get(/\/api\/timer\/(\d+).png/, controller.timer.stayTime);

unprotectedRouter.get('/api/sendTestMail', controller.general.sendTestMail);
unprotectedRouter.get('/api/addTestJob', controller.general.addTestJob);

unprotectedRouter.post('/api/mailgun-webhooks/opened', controller.general.openedHandler);
unprotectedRouter.post('/api/mailgun-webhooks/clicked', controller.general.clickedHandler);
unprotectedRouter.post('/api/mailgun-webhooks/complained', controller.general.complainedHandler);
unprotectedRouter.post('/api/mailgun-webhooks/failed', controller.general.failedHandler);
unprotectedRouter.post('/api/mailgun-webhooks/delivered', controller.general.deliveredHandler);

export { unprotectedRouter };