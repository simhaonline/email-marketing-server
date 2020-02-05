import Bull from 'bull';
import { testTask, sendTestEmail } from './task';
import { setQueues } from 'bull-board';
import { sendLogger } from '../logging';

export const mailQueue = new Bull('mail-queue', {
  limiter: {
    max: 1000,
    duration: 1000
  }
});

// Call the next middleware, wait for it to complete
mailQueue.process(async (job) => {
  const { from, to } = job.data;
  console.log(`send email from id=${from} to id=${to}`);
  for (let id = from; id <= to; id++) {
    await sendTestEmail(id);
    job.progress(id / (to - from + 1) * 100);
  }
}).catch((e) => {
  sendLogger.info('mailQueue', e);
});

setQueues([mailQueue]);
