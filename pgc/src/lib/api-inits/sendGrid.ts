import sgMail from '@sendgrid/mail';
import { config } from '../../config';

sgMail.setApiKey(config.sgKey);

export default sgMail; // import sgMail from '<PathTo>/lib/sendGrid';