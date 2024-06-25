"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const cors_1 = __importDefault(require("cors"));
const emails_routes_1 = __importDefault(require("./src/routes/emails.routes"));
// Added cors
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)({
    origin: process.env.NODE_ENV === 'production' ? 'https://daniel-web-dev.netlify.app' : 'http://localhost:3333'
}));
// Use rate limit to minimise the number of the requestssss
const apiLimiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 15,
    message: 'Too many requests from this IP, please try again after 15 minutes'
});
// Home page
app.get('/', (req, res) => res.send('Hello World!'));
app.use('/email', apiLimiter);
app.use('/email', emails_routes_1.default);
// 404 route
app.use((req, res, next) => res.status(404).send('Not Found'));
// Error handler route
app.use((err, req, res, next) => {
    console.error(err);
    res.status(err.status || 500).send(err.message || 'Internal Server Error');
});
exports.default = app;
