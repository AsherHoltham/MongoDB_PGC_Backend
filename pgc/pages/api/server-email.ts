import type { NextApiRequest, NextApiResponse } from 'next';
import sgMail from '../../lib/api-inits/sendGrid';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        res.setHeader('Allow', ['POST']);
        return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
    }
    console.log(req.body);

    const to = req.body;

    //GET code from db
    
    const msg = {
      to,
      from: 'no-reply@pgcoutthechat.com',
      subject: 'PGC email verification code',
      text: "code",
      html: '<strong>This is an HTML body</strong>',
    };
  
    try {
      await sgMail.send(msg);
      res.status(200).json({ message: 'Email sent successfully' });
    } catch (error: any) {
      console.error(error.response.body);
      res.status(500).json({ error: 'Failed to send email' });
    }
}