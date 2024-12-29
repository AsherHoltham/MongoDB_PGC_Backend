import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
    message: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        res.setHeader('Allow', ['POST']);
        return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
    }
    console.log(req.body);


    /**
    const { to, subject, text, html } = req.body;

    const msg = {
      to, // Recipient's email address
      from: {
        email: 'no-reply@yourdomain.com', // Your authenticated sender email
        name: 'Your App Name',            // Your sender name
      },
      subject,
      text,
      html,
    };
  
    try {
      await sgMail.send(msg);
      res.status(200).json({ message: 'Email sent successfully' });
    } catch (error: any) {
      console.error(error.response.body);
      res.status(500).json({ error: 'Failed to send email' });
    }
    */
}