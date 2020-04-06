import fs from 'fs';

import { BaseContext } from 'koa';
import { sleep } from '../utils';
import { Email } from '../entity/email';
import { trackLogger } from '../logging';
import { UserActivity } from 'src/entity/user-activity';

const CHUNK_SIZE = +process.env.CHUNK_SIZE;
export default class TimerController {

  public static async stayTime(ctx: BaseContext) {
    try {
      const start = Date.now();
      const img = fs.readFileSync('./timer.png');
      const chunks = [];
      const len = img.length;
      const id = ctx.params[0];

      let i = 0;
      while (i < len) {
        chunks.push(img.slice(i, i += CHUNK_SIZE));
      }

      ctx.type = 'image/png';
      ctx.respond = false;
      ctx.res.writeHeader(200);

      ctx.res.on('close', () => {
        ctx.res.end();
        // 估计请求耗时（ms）
        const time = Date.now() - start + 10;
        Email.findOneById(id).then((email) => {
          trackLogger.log('info', `stayTime: ${time}; id: ${id}`);
          email.stay_time = time;
          email.save();

          const userActivity = new UserActivity();
          userActivity.stay_time = time;
          userActivity.action_type = 'clickTimer';
          userActivity.send_address = email.send_address;
          userActivity.recv_address = email.recv_address;
          userActivity.uniqueid = email.uniqueid;
          userActivity.save();
        }).catch((err) => {
          trackLogger.log('error', `stayTime: ${err}`);
        });
      });

      for (const chunk of chunks) {
        await sleep(100);
        if (ctx.res.writableEnded) {
          break;
        }
        ctx.res.write(chunk);
      }
    } catch (err) {
      trackLogger.log('error', 'stayTime', err);
    }
  }
}
