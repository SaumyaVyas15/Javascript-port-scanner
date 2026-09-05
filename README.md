# Node.js TCP Port Scanner

A beginner-friendly TCP port scanner built with JavaScript and Node.js.

The project checks a user-defined range of TCP ports on a target host and reports whether each port is open, closed, or timed out. It also displays commonly associated service names and exports scan results to JSON and CSV files.

**Ethical Use:** Use this scanner only against localhost, your own systems, lab environments, or systems for which you have explicit authorization.


## Features

- TCP port scanning using Node.js
- User-defined target host/IP
- Custom starting and ending ports
- Configurable connection timeout
- Detects:
  - OPEN
  - CLOSED
  - TIMED OUT
  - NO RESPONSE
- Common service-name mapping
- Concurrent/asynchronous scanning
- Scan statistics
- JSON report generation
- CSV report generation
- Input validation
- Error handling


## Technologies Used

- **JavaScript**
- **Node.js**
- Node.js `net` module
- Node.js `fs` module
- Node.js `readline` module

No external npm packages are required.

## Project Structure

```text
Port Scanner/
│
├── scanner.js
├── package.json
├── .gitignore
│
├── src/
│   ├── input.js
│   ├── scanner.js
│   ├── services.js
│   └── utils.js
│
└── result/