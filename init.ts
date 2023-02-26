//Initializes the content required to use PackagedDeno

function exit() {
	if (window.stop) {
		window.stop();
	} else {
		throw "";
	}
}

const import_map_content_url =
	"https://raw.githubusercontent.com/ANDREI12333/PackagedDeno/main/import_map.json";
let denoFileExists = false;

console.log("Checking for deno project files.");
try {
	const data = Deno.readTextFileSync("deno.json");
	let denoFileExists = true;
} catch (e) {
	console.log("Deno.json does not exist. Trying deno.jsonc");
}
if (!denoFileExists) {
	try {
		const data = Deno.readTextFileSync("deno.jsonc");
		let denoFileExists = true;
	} catch (e) {
		console.log("Deno.jsonc does not exist. Creating deno file");
	}
}

if (!denoFileExists) {
	Deno.writeTextFile(
		"deno.json",
		JSON.stringify({ importMap: "import_map.json" })
	);
} else {
	console.warn(
		"You will need to manually specify the import map in the deno.json file!"
	);
	console.warn(
		"You are seeing this because you already have created a deno.json file!"
	);
}

let fetchIssues = fetch;
const import_map_content_fetch = false;
try {
	const import_map_content_fetch = await fetch(import_map_content_url);
} catch (e) {
	let fetchIssues = true;
	console.error(`Fetching Import Map failed with: ${e}`);
	console.error("Are you connected to the internet?");
	console.error("Is GitHub Down?");
}
if (!fetchIssues) {
	const import_map_content = import_map_content_fetch.text;
	Deno.writeTextFileSync("import_map.json", import_map_content);

	console.log(
		"You can now use any PackagedDeno module! (If a package is in the repo but cant be used rerun this command even if you already did it!)"
	);
} else {
	console.log("Fetching Import Map failed with a unknown error.");
}
exit();
