
const server = Bun.serve({
	fetch(request, server) {
		if (server.upgrade(request)) {
			return;
		}

		console.error("ws: upgrade failed");
		return new Response(null, { status: 400, statusText: "Websocket upgrade failed" });
	},
	websocket: {
		message(_ws, message) {
			console.log("ws(message): message received ->", message);
		},
		open(_ws) {
			console.log("ws(open): connection established");
		},
		close(_ws, _code, _reason) {
			console.log("ws(close): connection closed");
		},
	}
})

console.log(`SERVER RUNNING |  hostname: ${server.hostname} | port: ${server.port}`);