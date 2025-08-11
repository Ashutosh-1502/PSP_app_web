/* eslint-disable @typescript-eslint/no-explicit-any */
export function exportToCSV(data: Record<string, any>[], header: string, fileName: string): void {
	const csvContent =
		"data:text/csv;charset=utf-8," +
		`${header}\n` +
		data
			.map((row) => {
				if (typeof row === "object" && row !== null) {
					return flattenObject(row).join(",");
				}
				return ""; // Return an empty string if row is not an object
			})
			.join("\n");
	const encodedUri = encodeURI(csvContent);
	const link = document.createElement("a");
	link.setAttribute("href", encodedUri);
	link.setAttribute("download", fileName + ".csv");
	document.body.appendChild(link);
	link.click();
}

function flattenObject(obj: Record<string, any>): string[] {
	const values: string[] = [];

	for (const key in obj) {
		if (Object.prototype.hasOwnProperty.call(obj, key)) {
			if (typeof obj[key] === "object" && obj[key] !== null && obj[key] !== undefined) {
				// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
				const childValues = flattenObject(obj[key]);
				if (childValues.length > 0) {
					values.push(childValues.join(" "));
				}
			} else {
				values.push(String(obj[key]));
			}
		}
	}

	return values;
}
