import http from 'http';
import app from './app';
const port = process.env.PORT || 8888;


const server = http.createServer(app);


server.listen(port, () => console.log(`Server running at port: ${port}`));