# MyChat App

MyChat is a simple chat application built using Node.js, Express, and Server-Sent Events (SSE). It allows users to send and receive messages in real-time.

## Features

- Real-time chat using Server-Sent Events
- Simple web interface with a form to send messages
- Displays incoming messages in real-time

## Getting Started

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. Clone the repository:

   example: git clone https://github.com/username/mychat-app.git
2. Navigate to the project directory:

cd mychat

Install dependencies:

npm install
The following dependencies will be installed:

express: Web application framework for Node.js
http: Node.js HTTP module
path: Node.js path module
body-parser: Node.js body parsing middleware
EventSource: Web API for Server-Sent Events (SSE)

Usage
Start the server:
node server.js

The server will run on http://localhost:3000 by default.

Open your web browser and go to http://localhost:3000/chatpage to access the chat interface.

Type your message in the input field and click "Send" to see it appear in the chat.

Server-Sent Events (SSE)
The /sse endpoint is used for Server-Sent Events. The server pushes messages to connected clients in real-time.
   
