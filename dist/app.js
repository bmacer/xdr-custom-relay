"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const https_1 = __importDefault(require("https"));
const fs_1 = __importDefault(require("fs"));
const app = (0, express_1.default)();
const port = 8080;
app.use(express_1.default.json());
// Example routes
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok' });
});
app.get('/api/users', (req, res) => {
    const users = [
        { id: 1, name: 'John' },
        { id: 2, name: 'Jane' }
    ];
    res.json(users);
});
app.post('/api/users', (req, res) => {
    const { name } = req.body;
    res.status(201).json({ id: 3, name });
});
const options = {
    key: fs_1.default.readFileSync('server.key'),
    cert: fs_1.default.readFileSync('server.cert')
};
https_1.default.createServer(options, app).listen(port, () => {
    console.log(`Server running at https://localhost:${port}`);
});
