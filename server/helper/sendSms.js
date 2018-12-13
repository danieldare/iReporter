import Nexmo from 'nexmo';
import dotenv from 'dotenv';

dotenv.config();

const nexmo = new Nexmo({
  apiKey: process.env.apiKey,
  apiSecret: process.env.apiSecret
});

const from = 'iReporter record';

export default function sendSms(to, text) {
  return nexmo.message.sendSms(from, to, text);
}
