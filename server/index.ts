import { type Operation, SchemaOperation } from "./schema";

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


			if(typeof message !== "string"){
				console.error(`ws(message): buffers are not supported`);
				return;
			};

			const rawJSON = safeParseJSON(message);

			if(rawJSON === null){
				console.error(`ws(message): invalid json`);
				return;
			}


			const parsed = SchemaOperation.safeParse(rawJSON);

			if(parsed.error){
				console.error(`ws(message): invalid data`, parsed.error.errors);
				return;
			}

			const operation: Operation = parsed.data;

			console.log("ws(message):", operation);
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


const safeParseJSON = (x: string): unknown | null => {
	try {
		return JSON.parse(x);
	} catch(error) {
		return null;
	}
}