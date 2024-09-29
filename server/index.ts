import { type Operation, SchemaOperation } from "./schema";
import { safeParseJSON } from "./utils";

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

			const solution = solve(operation);

			console.log("op: computed solution =", solution);

			ws.send(solve(operation).toString());
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


function solve(operation: Operation): number {
	switch(operation.operation){
		case "ADD(+)": return operation.augend + operation.addend;
		case "DIV(/)": return operation.dividend / operation.divisor;
		case "SUB(-)": return operation.subtrahend - operation.minuend;
		case "MUL(*)": return operation.multiplicand * operation.multiplier;
	}
}