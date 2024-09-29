Using wscat to test websocket server

```bash
# start server
bun run index.ts

# connect
bunx wscat --connect "ws://localhost:3000"

# send message
hello websocket
```