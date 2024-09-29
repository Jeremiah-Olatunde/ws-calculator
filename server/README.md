# Websocket Calculator
A simple full stack calculator application using the websocket protocol


# Tech Stack
- [Bun](https://bun.sh/)
- [zod](https://zod.dev/)
- [React](https://react.dev/)
- [wscat](https://www.npmjs.com/package/wscat)

# Resources
- [bun docs](https://bun.sh/docs/api/websockets)
- [wscat homepage](https://www.npmjs.com/package/wscat)
- [javascript.info websockets](https://tr.javascript.info/websocket)
- [MDN websocket](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket)


# Usage
```bash
# start server
bun run dev

# connect to server
bun run connect

# send message
{ "operation": "ADD(+)", "addend": 10, "augend": 20 }
{ "operation": "DIV(/)", "dividend": 51, "divisor": 17 }
{ "operation": "SUB(-)", "minuend": 95, "subtrahend": 50 }
{ "operation": "MUL(*)", "multiplicand": 10, "multiplier": 10 }
```