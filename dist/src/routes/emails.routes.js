"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
const express_1 = require("express");
const nodemailer_config_1 = require("../config/nodemailer.config");
const emailRouter = (0, express_1.Router)();
let transporter = nodemailer_1.default.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: nodemailer_config_1.nodemailerConfig.adminEmail,
        pass: nodemailer_config_1.nodemailerConfig.adminPassword
    }
});
emailRouter.post('/send', (req, res) => {
    try {
        const { subject, content } = req.body;
        // test for empty fields
        if (!subject || !content || subject.trim().length < 5 || content.trim().length < 5)
            return res.status(400).json({ message: 'Missing required fields' });
        let mailOptions = {
            from: nodemailer_config_1.nodemailerConfig.adminEmail,
            to: nodemailer_config_1.nodemailerConfig.adminEmail,
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
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Error sending email' });
    }
});
exports.default = emailRouter;
