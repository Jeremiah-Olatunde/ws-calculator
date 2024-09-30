import { safeParseJSON } from "./utils";
import { type Operation, SchemaOperation, solve } from "./operation";

const server = Bun.serve({
	fetch(request, server) {
		if (server.upgrade(request)) {
			return;
		}

		console.error("ws: upgrade failed");
		return new Response(null, { status: 400, statusText: "Websocket upgrade failed" });
	},
	websocket: {
		message(ws, message) {
			console.log("ws(message): message received ->", message);


			if (typeof message !== "string") {
				console.error(`ws(message): websocket message must be a string`);

				ws.send(JSON.stringify({
					messageType: "ERROR",
					errorType: "MessageTypeError",
					reason: "websocket message must be a string",
				}));

				return;
			};

			const rawJSON = safeParseJSON(message);

			if (rawJSON === null) {
				console.error(`ws(message): invalid json`);
				ws.send(JSON.stringify({
					messageType: "ERROR",
					errorType: "JsonError",
					reason: "invalid json: unable to parse message"
				}));

				return;
			}


			const parsed = SchemaOperation.safeParse(rawJSON);

			if (parsed.error) {
				console.error(`ws(message): invalid data`, parsed.error.errors);
				ws.send(JSON.stringify({
					messageType: "ERROR",
					errorType: "ValidationError",
					reason: parsed.error.errors,
				}))

				return;
			}

			const operation: Operation = parsed.data;

			console.log("ws(message):", operation);

			const solution = solve(operation);

			console.log("op: computed solution =", solution);

			ws.send(JSON.stringify({
				messageType: "result",
				value: solve(operation)
			}));
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