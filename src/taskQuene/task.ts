import { Email } from '../entity/email';
import { sendLogger } from '../logging';
import { mg } from '../mailgun';

export async function testTask(id: number) {
  const email = await Email.findOneById(id);
  if (!email) {
    sendLogger.info('sendTestMail', { error: `ERROR: id ${id} not found` });
    return;
  }
  if (email.message_id) {
    sendLogger.info('sendTestMail', { error: `SKIP: id ${id} has been send.` });
    return;
  }
  console.log(email.id);
  sendLogger.info('sendTestMail', { data: JSON.stringify(email) });
}

/** 发送指定id邮件 */
export async function sendEmail(id: number) {
  try {
    const email = await Email.findOneById(id);
    if (!email) {
      sendLogger.info('sendTestMail', { error: `ERROR: id ${id} not found` });
      return;
    }
    if (email.message_id) {
      sendLogger.info('sendTestMail', { error: `SKIP: id ${id} has been send.` });
      return;
    }

    const X_Mailgun_Variables = JSON.stringify({
      Timer: `https://${process.env.API_BASE}/api/timer/${email.id}.png`,
      Name: email.last_name,
      FounderName: email.foundername,
      Advantage2: email.advantage2,
      University2: email.university2,
      Website: email.website
    });

    const data = {
      from: `${email.sender_name} <${email.send_address}>`,
      to: email.recv_address,
      subject: email.subject,
      template: email.template,
      'v:id': email.id,
      'h:X-Mailgun-Variables': X_Mailgun_Variables
    };

    console.log('send email to: ', email.recv_address);
    mg.messages().send(data, (error, body) => {
      // '<xxx@mail.xxx>' => 'xxx@mail.xxx'
      if (body.id) {
        email.message_id = body.id.slice(1, -1);
        console.log(body);
      } else {
        email.message_id = 'Invalid data';
        console.log('Invalid data');
      }
      email.save();
      sendLogger.info('sendTestMail', { body, data, error });
    });
  } catch (e) {
    sendLogger.info('sendTestMail', { error: e });
  }
}