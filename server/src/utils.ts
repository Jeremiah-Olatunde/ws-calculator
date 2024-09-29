
export const safeParseJSON = (x: string): unknown | null => {
	try {
		return JSON.parse(x);
	} catch(error) {
		return null;
	}
}