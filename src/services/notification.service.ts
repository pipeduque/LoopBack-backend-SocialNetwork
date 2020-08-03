import {NotificationDatasource} from '../datasources/notification.datasource';
import {twilioConfig} from '../datasources/twilio.datasource.config';
import {EmailNotification} from '../models';
import {SmsNotification} from '../models/sms-notification.model';

const twilio = require('twilio');
const sgMail = require('@sendgrid/mail');

export class NotificationService {
  async SmsNotification(notification: SmsNotification): Promise<boolean> {
    try {
      // const accountSid = NotificationDatasource.TWILIO_SID;
      // const authToken = NotificationDatasource.TWILIO_AUTH_TOKEN;
      const client = twilio(twilioConfig.accountSid, twilioConfig.authToken);

      client.messages
        .create({
          body: notification.body,
          // body: 'hola mundo',
          from: NotificationDatasource.TWILIO_FROM,
          // from: '+17029048899',
          to: notification.to,
        })
        .then((message: any) => {
          console.log(message.sid);
        });
      return true;
    } catch (error) {
      return false;
    }
  }

  async MailNotification(notification: EmailNotification): Promise<boolean> {
    try {
      sgMail.setApiKey(process.env.SENDGRID_API_KEY);
      const msg = {
        to: notification.to,
        from: process.env.SENDGRID_FROM,
        subject: notification.subject,
        text: notification.textBody,
        html: notification.htmlBody,
      };
      console.log(`msg is : ${msg}`);
      sgMail.send(msg).then(
        (data: any) => {
          console.log(data);
          return true;
        },
        function (error: any) {
          console.log(error);
          return false;
        },
      );
      return true;
    } catch (err) {
      return false;
    }
  }
}
