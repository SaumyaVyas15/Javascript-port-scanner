const fs = require("fs");
const path = require("path");

function validateInput(startPort, endPort, timeout) {

    if (!Number.isInteger(startPort) ||
        !Number.isInteger(endPort)) {
        return "Ports must be whole numbers.";
    }

    if (startPort < 1 || endPort > 65535) {
        return "Ports must be between 1 and 65535.";
    }

    if (startPort > endPort) {
        return "Starting port cannot be greater than ending port.";
    }

    if (!Number.isInteger(timeout) || timeout <= 0) {
        return "Timeout must be a positive number.";
    }

    return null;
}


function printSummary(
    host,
    startPort,
    endPort,
    results,
    duration
) {

    const openPorts = results.filter(
        result => result.status === "OPEN"
    );

    console.log("\n========================================");
    console.log("              SCAN SUMMARY");
    console.log("========================================");

    console.log(`Target:          ${host}`);
    console.log(`Port range:      ${startPort}-${endPort}`);
    console.log(`Ports scanned:   ${results.length}`);
    console.log(`Open ports:      ${openPorts.length}`);
    console.log(`Scan duration:   ${duration} ms`);

    console.log("========================================\n");
}


function exportJSON(results, host) {

    const resultsDirectory = path.join(
        __dirname,
        "..",
        "result"
    );

    if (!fs.existsSync(resultsDirectory)) {
        fs.mkdirSync(resultsDirectory, {
            recursive: true
        });
    }

    const filename = `scan-${Date.now()}.json`;

    const filePath = path.join(
        resultsDirectory,
        filename
    );

    const output = {
        target: host,
        scannedAt: new Date().toISOString(),
        results: results
    };

    fs.writeFileSync(
        filePath,
        JSON.stringify(output, null, 2)
    );

    return filePath;
}


function exportCSV(results, host) {

    const resultsDirectory = path.join(
        __dirname,
        "..",
        "result"
    );

    if (!fs.existsSync(resultsDirectory)) {
        fs.mkdirSync(resultsDirectory, {
            recursive: true
        });
    }

    const filename = `scan-${Date.now()}.csv`;

    const filePath = path.join(
        resultsDirectory,
        filename
    );

    let csv = "Target,Port,Status,Service\n";

    for (const result of results) {

        csv += `"${host}",${result.port},"${result.status}","${result.service}"\n`;

    }

    fs.writeFileSync(filePath, csv);

    return filePath;
}


module.exports = {
    validateInput,
    printSummary,
    exportJSON,
    exportCSV
};