import { BaseContext } from 'koa';
import { description, request, summary, tagsAll } from 'koa-swagger-decorator';
import { Email } from '../entity/email';
import { mg } from '../mailgun';
import { sendLogger, trackLogger } from '../logging';
import { mailQueue } from '../taskQuene/quene';

@tagsAll(['General'])
export default class GeneralController {

  @request('get', '/')
  @summary('Welcome page')
  @description('A simple welcome message to verify the service is up and running.')
  public static async helloWorld(ctx: BaseContext) {
    ctx.body = 'Hello World!';
  }

  @request('post', '/api/mailgun-webhooks/opened')
  public static async openedHandler(ctx: BaseContext) {
    try {
      const eventData = ctx.request.body['event-data'];

      const userVar = eventData['user-variables'];
      const email = await Email.findOneById(userVar.id);
      email.open_time = new Date(eventData.timestamp * 1000);
      email.user_type = 'opened';
      await email.save();

      ctx.status = 200;
    } catch (e) {
      ctx.status = 500;
      trackLogger.log('error', 'opened', e);
    }
  }
  @request('post', '/api/mailgun-webhooks/clicked')
  public static async clickedHandler(ctx: BaseContext) {
    try {
      const eventData = ctx.request.body['event-data'];

      const userVar = eventData['user-variables'];
      const email = await Email.findOneById(userVar.id);
      email.click_time = new Date(eventData.timestamp * 1000);
      email.user_type = 'clicked';
      await email.save();

      ctx.status = 200;
    } catch (e) {
      ctx.status = 500;
      trackLogger.log('error', 'clicked', e);
    }
  }

  @request('post', '/api/mailgun-webhooks/delivered')
  public static async deliveredHandler(ctx: BaseContext) {
    try {
      const eventData = ctx.request.body['event-data'];

      const userVar = eventData['user-variables'];
      const email = await Email.findOneById(userVar.id);
      email.deliver_time = new Date(eventData.timestamp * 1000);
      email.user_type = 'delivered';
      await email.save();

      ctx.status = 200;
    } catch (e) {
      ctx.status = 500;
      trackLogger.log('error', 'delivered', e);
    }
  }

  @request('post', '/api/mailgun-webhooks/failed')
  public static async failedHandler(ctx: BaseContext) {
    try {
      const eventData = ctx.request.body['event-data'];

      const userVar = eventData['user-variables'];
      const email = await Email.findOneById(userVar.id);
      email.user_type = 'failed';
      await email.save();

      ctx.status = 200;
    } catch (e) {
      ctx.status = 500;
      trackLogger.log('error', 'failed', e);
    }
  }

  @request('post', '/api/mailgun-webhooks/complained')
  public static async complainedHandler(ctx: BaseContext) {
    try {
      const eventData = ctx.request.body['event-data'];

      const userVar = eventData['user-variables'];
      const email = await Email.findOneById(userVar.id);
      email.complain_time = new Date(eventData.timestamp * 1000);
      email.user_type = 'complained';
      await email.save();

      ctx.status = 200;
    } catch (e) {
      ctx.status = 500;
      trackLogger.log('error', 'clicked', e);
    }
  }

  @request('get', '/api/sendTestMail')
  public static async sendTestMail(ctx: BaseContext) {
    try {
      const email = await Email.findOneById(1);

      // const tempVar = JSON.parse(email.template_variables);

      // const X_Mailgun_Variables = JSON.stringify({ Timer: `https://${process.env.API_BASE}/api/timer/${email.id}.png`, ...tempVar });

      const data = {
        from: `${email.sender_name} <${email.send_address}>`,
        to: 'test-xmm5j4asf@mail-tester.com',
        subject: email.subject,
        template: email.template,
        'v:id': email.id,
        // 'h:X-Mailgun-Variables': X_Mailgun_Variables
      };

      mg.messages().send(data, (error, body) => {
        // '<xxx@mail.xxx>' => 'xxx@mail.xxx'
        email.message_id = body.id.slice(1, -1);
        email.save();
        sendLogger.info('sendTestMail', { body, data, error });
      });
      ctx.status = 200;
    } catch (e) {
      ctx.status = 500;
      sendLogger.info('sendTestMail', { error: e });
    }
  }

  @request('get', '/api/addTestJob')
  public static async addTestJob(ctx: BaseContext) {
    try {
      const from = +ctx.query.from;
      const to = +ctx.query.to;
      mailQueue.add({ from, to });
      ctx.status = 200;
    } catch (e) {
      ctx.status = 500;
      sendLogger.info('addTestJob', { error: e });
    }
  }
}