const readline = require("readline");

function getUserInput() {

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    const question = (text) => {
        return new Promise((resolve) => {
            rl.question(text, resolve);
        });
    };

    return (async () => {

        const host = await question("Target host/IP: ");
        const startPort = Number(
            await question("Starting port: ")
        );
        const endPort = Number(
            await question("Ending port: ")
        );

        const timeoutInput = await question(
            "Timeout in milliseconds [500]: "
        );

        const timeout =
            timeoutInput.trim() === ""
                ? 500
                : Number(timeoutInput);

        rl.close();

        return {
            host: host.trim(),
            startPort,
            endPort,
            timeout
        };
    })();
}

module.exports = {
    getUserInput
};