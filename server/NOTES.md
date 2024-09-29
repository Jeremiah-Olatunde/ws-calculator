Using wscat to test websocket server

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