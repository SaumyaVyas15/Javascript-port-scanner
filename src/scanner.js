const net = require("net");
const { getServiceName } = require("./services");

function scanPort(host, port, timeout) {
    return new Promise((resolve) => {

        const socket = new net.Socket();
        let finished = false;

        function finish(status) {
            if (finished) return;

            finished = true;
            socket.destroy();

            resolve({
                port: port,
                status: status,
                service: getServiceName(port)
            });
        }

        socket.setTimeout(timeout);

        socket.once("connect", () => {
            finish("OPEN");
        });

        socket.once("timeout", () => {
            finish("TIMED OUT");
        });

        socket.once("error", (error) => {

            if (error.code === "ECONNREFUSED") {
                finish("CLOSED");
            } else {
                finish("NO RESPONSE");
            }

        });

        socket.connect(port, host);
    });
}


async function scanPorts(
    host,
    startPort,
    endPort,
    timeout,
    concurrency
) {

    const results = [];
    let nextPort = startPort;

    async function worker() {

        while (true) {

            const port = nextPort++;

            if (port > endPort) {
                return;
            }

            const result = await scanPort(
                host,
                port,
                timeout
            );

            results.push(result);

            if (result.status === "OPEN") {
                console.log(
                    `Port ${result.port} | ` +
                    `${result.status} | ` +
                    `${result.service}`
                );
            }
        }
    }

    const workers = [];

    const workerCount = Math.min(
        concurrency,
        endPort - startPort + 1
    );

    for (let i = 0; i < workerCount; i++) {
        workers.push(worker());
    }

    await Promise.all(workers);

    results.sort((a, b) => a.port - b.port);

    return results;
}


module.exports = {
    scanPort,
    scanPorts
};