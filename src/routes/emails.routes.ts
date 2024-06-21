import nodemailer from 'nodemailer';
import { Request, Response, Router } from 'express';
import { nodemailerConfig } from '../config/nodemailer.config';
const emailRouter = Router();



let transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: nodemailerConfig.adminEmail,
        pass: nodemailerConfig.adminPassword
    }
});






emailRouter.post('/send', (req: Request, res: Response) => {
    try {

        const { subject, content } = req.body;

        // test for empty fields
        if (!subject || !content || subject.trim().length < 5 || content.trim().length < 5)
            return res.status(400).json({ message: 'Missing required fields' });



        let mailOptions = {
            from: nodemailerConfig.adminEmail,
            to: nodemailerConfig.adminEmail,
            subject: `😃😃 - ${subject} - 😃😃`,
            text: content
        };

        transporter.sendMail(mailOptions, (err) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ message: 'Error sending email' });
            }
            else {
                console.log('Email sent successfully');
                return res.status(200).json({ message: 'Email sent successfully' });
            }
        })
    }

    catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Error sending email' });
    }
});


export default emailRouter;





