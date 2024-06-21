"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.nodemailerConfig = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.nodemailerConfig = {
    adminEmail: process.env.EMAIL_ADMIN,
    adminPassword: process.env.EMAIL_PASSWORD,
};
