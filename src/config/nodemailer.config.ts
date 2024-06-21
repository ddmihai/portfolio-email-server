import dotenv from 'dotenv';
dotenv.config();



export const nodemailerConfig = {
    adminEmail: process.env.EMAIL_ADMIN,
    adminPassword: process.env.EMAIL_PASSWORD,
}