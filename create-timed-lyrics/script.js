
const lyrics = await (await fetch("./lyrics-split.txt", { cache: "reload" })).text();

let linesWithSyllables = lyrics.split("\n\n").map(line => line.split("\n").map(syllable => ({ text: syllable, time: 0 })));
// linesWithSyllables = linesWithSyllables.slice(0, 17);

let /** @type {number} */ startTime;
onclick = () => {
	startTime = performance.now();
};

const createFile = () => {
	let fileString = linesWithSyllables.map(line => line.map(syllable =>
		`${Math.floor(syllable.time / 1000 / 60).toString().padStart(2, "0")}:${((syllable.time / 1000) % 60).toFixed(2).padStart(5, "0")} ${syllable.text}`
	).join("\n")).join("\n\n");
	console.log(fileString);
	{
		const anchor = document.createElement("a");
		anchor.download = "lyrics-timed.txt";
		anchor.href = URL.createObjectURL(new Blob([fileString], { type: "text/plain;charset=utf-8" }));
		anchor.click();
	}
};

const syllableIterator = (function* () {
	for (const line of linesWithSyllables) {
		for (const syllable of line) {
			syllable.time = performance.now() - startTime;
			console.log(syllable);
			yield;
		}
	}
	console.log(JSON.stringify(linesWithSyllables));

	createFile();
})();

onkeydown = ({ key }) => {
	if (key === "ArrowUp") {
		syllableIterator.next();
	}
};

export { };
