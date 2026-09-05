const { getUserInput } = require("./src/input");
const { scanPorts } = require("./src/scanner");

const {
    validateInput,
    printSummary,
    exportJSON,
    exportCSV
} = require("./src/utils");

async function main() {

    console.log(`
========================================
        NODE.JS TCP PORT SCANNER
========================================

Use this scanner only on localhost,
your own systems, lab environments,
or systems you are authorized to test.
`);

    try {

        const input = await getUserInput();

        const {
            host,
            startPort,
            endPort,
            timeout
        } = input;

        const validationError = validateInput(
            startPort,
            endPort,
            timeout
        );

        if (validationError) {
            console.error(`\nError: ${validationError}`);
            return;
        }

        console.log("\nStarting scan...\n");
        console.log("PORT  | STATUS    | SERVICE");
        console.log("-----------------------------");

        const startTime = Date.now();

        const results = await scanPorts(
            host,
            startPort,
            endPort,
            timeout,
            50
        );

        const duration = Date.now() - startTime;

        printSummary(
            host,
            startPort,
            endPort,
            results,
            duration
        );

        const jsonFile = exportJSON(results, host);
        const csvFile = exportCSV(results, host);

        console.log(`JSON report: ${jsonFile}`);
        console.log(`CSV report:  ${csvFile}`);

    } catch (error) {

        console.error(
            "\nUnexpected error:",
            error.message
        );
    }
}

main();