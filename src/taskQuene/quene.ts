import Bull from 'bull';
import { testTask, sendTestEmail } from './task';
import { setQueues } from 'bull-board';
import { sendLogger } from '../logging';
import { sleep } from '../utils';

export const mailQueue = new Bull('mail-queue', {
  limiter: {
    max: 1000,
    duration: 1200000
  }
});

// Call the next middleware, wait for it to complete
mailQueue.process(async (job) => {
  const { from, to } = job.data;
  console.log(`send email from id=${from} to id=${to}`);
  for (let id = from; id <= to; id++) {
    await sendTestEmail(id);
    await sleep(1000);
    job.progress((id - from + 1) / (to - from + 1) * 100);
  }
}).catch((e) => {
  sendLogger.info('mailQueue', e);
});

setQueues([mailQueue]);
