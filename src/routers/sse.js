import express from "express";

const router = express.Router();

let dataSource = 0;

const updateDataSource = () => {
    const delta = Math.random();
    dataSource += delta;
}

router.get('/', function (req, res) {
    if (req.url === '/ticker') {
        res.statusCode = 200;
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Cache-Control", "no-cache");
        res.setHeader("connection", "keep-alive");
        res.setHeader("Content-Type", "text/event-stream");

        const intervalId = setInterval(() => {
            const data = JSON.stringify({ ticker: dataSource });
            res.write(`id: ${(new Date()).toLocaleTimeString()}\ndata: ${data}\n\n`);
        }, 1000);

        res.on('close', () => {
            console.log('client dropped me');
            clearInterval(intervalId);
            res.end();
        });
    } else {
        res.statusCode = 404;
        res.end("resource does not exist");
    }
});

export default router;