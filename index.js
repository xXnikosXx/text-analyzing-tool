const fs = require("fs");
const readline = require("readline");

async function processLineByLine() {
	const fileStream = fs.createReadStream("./input.txt");

	const rl = readline.createInterface({
		input: fileStream,
		crlfDelay: Infinity,
	});
	// Note: we use the crlfDelay option to recognize all instances of CR LF
	// ('\r\n') in input.txt as a single line break.

	let trigger = false;

	for await (const line of rl) {
		// Each line in input.txt will be successively available here as `line`.
		console.log(`Line from file: ${line}`);
		if (line.includes("YOU DID THIS TO MY BOI LIM#7483") == true) {
			console.log("true");
			trigger = true;
		}
		else if (trigger == true) {
			console.log(`Line sent by user: ${line}`);

			fs.appendFile("output.txt", line + " ", (err) => {
				// throws an error, you could also catch it here
				if (err) throw err;

				// success case, the file was saved
				console.log("line saved");
			});

			trigger = false;
		}
	}
}

processLineByLine();
