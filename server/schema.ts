import z from "zod";

const SchemaAdd = z.object({
	operation: z.literal("ADD(+)"),
	augend: z.number(),
	addend: z.number(),
});

export type Add = z.infer<typeof SchemaAdd>;



const SchemaSub = z.object({
	operation: z.literal("SUB(-)"),
	minuend: z.number(),
	subtrahend: z.number(),
});

export type Sub = z.infer<typeof SchemaSub>;



const SchemaMul = z.object({
	operation: z.literal("MUL(*)"),
	multiplicand: z.number(),
	multiplier: z.number(),
});

export type Mul = z.infer<typeof SchemaMul>;



const SchemaDiv = z.object({
	operation: z.literal("DIV(/)"),
	dividend: z.number(),
	divisor: z.number(),
});

export type Div = z.infer<typeof SchemaDiv>;



export const SchemaOperation = z.discriminatedUnion("operation", [
	SchemaAdd,
	SchemaSub,
	SchemaMul,
	SchemaDiv,	
]);

export type Operation = z.infer<typeof SchemaOperation>;
