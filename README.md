# Remote‑Touchless

> Control your desktop from a distance—no touch required.

## 🚀 Project Overview & Motivation

**Remote‑Touchless** lets you drive your machine (keyboard, mouse, media controls) via a lightweight client/server over WebSockets.  
Inspired by the need for hands‑free interaction in presentations, accessibility scenarios, and IoT demos.

- **Server** runs on your machine, exposes a secure WebSocket endpoint and maps incoming messages to OS events.
- **Client** can be any browser or embedded device—simply point it at your server URL, authenticate, and start sending commands.

## ⚡ Quick Start

1. **Clone**  
   ```bash
   git clone https://github.com/Stunitz/remote-touchless.git
   cd remote-touchless
   ```

Install dependencies
  - npm install

Build and run server
  - npm run start
  
Then copy and paste the url on the client device to control your machine
