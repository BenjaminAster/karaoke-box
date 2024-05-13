
const timedLyrics = await (await fetch(import.meta.resolve("./timed-lyrics/karma.txt"))).text();

const globalOffset = -100;

const linesWithSyllables = timedLyrics.split("\n\n").map(line => line.split("\n").map(syllable => {
	const matchGroups = syllable.match(/^(?<minutes>\d+):(?<seconds>\d+\.\d+) (?<text>.+)$/).groups;
	let minutes = +matchGroups.minutes;
	let seconds = +matchGroups.seconds;
	let text = matchGroups.text;
	return { text, time: (minutes * 60 + seconds) * 1000 + globalOffset };
}));

console.log(linesWithSyllables);
const lyricsRootElement = document.querySelector("#lyrics");
const songtextContanier = document.querySelector(".songtext-container");
const startButton = document.querySelector("button#start");


startButton.addEventListener("click", () => {
	document.documentElement.classList.add("running");

	for (const line of linesWithSyllables) {
		const lineElement = document.createElement("div");
		lineElement.classList.add("line");
		const ballElement = document.createElement("div");
		ballElement.classList.add("ball");
		ballElement.style.visibility = "hidden";
		lineElement.append(ballElement);
		setTimeout(async () => {
			const entryIndicatorElement = document.createElement("div");
			entryIndicatorElement.classList.add("entry-indicator");
			lineElement.append(entryIndicatorElement);
			await entryIndicatorElement.animate([
				{ translate: "-10em 0", offset: 0 },
				{ translate: "0em 0" },
			], { duration: 1000, easing: "linear" }).finished;
			entryIndicatorElement.remove();

			ballElement.style.visibility = "visible";

		}, line[0].time - 1000/*  - 7000 */);

		lyricsRootElement.append(lineElement);

		for (let i = 0; i < line.length; ++i) {
			const syllable = line[i];
			const syllableElement = document.createElement("span");
			syllableElement.textContent = syllable.text;
			syllableElement.classList.add("syllable");
			setTimeout(() => {
				const duration = i === line.length - 1 ? 300 : (line[i + 1].time - syllable.time);
				{
					syllableElement.classList.add("sung");
					syllableElement.style.setProperty("--duration", duration);
				}
				if (i < line.length - 1) {
					const sibling = /** @type {HTMLElement} */ (syllableElement.nextElementSibling);
					ballElement.style.setProperty("--duration", duration);
					ballElement.style.setProperty("--x", sibling.offsetLeft + sibling.clientWidth / 2)
				} else {
					setTimeout(() => {
						ballElement.remove();
						lineElement.style.opacity = "0";
					}, 300);
					songtextContanier.scroll(0, lineElement.offsetTop - 32);
				}
			}, syllable.time/*  - 7000 */);
			setTimeout(() => {
				ballElement.style.setProperty("animation", "none")
				requestAnimationFrame(() => requestAnimationFrame(() => ballElement.style.removeProperty("animation")));
			}, syllable.time - 40);
			lineElement.append(syllableElement);
			syllableElement.style.setProperty("--width", syllableElement.clientWidth);
			if (i === 0) {
				ballElement.style.setProperty("--x", syllableElement.offsetLeft + syllableElement.clientWidth / 2);
			}
		}
	}
});


{
	// color theme switcher code (copy-pasted from my other projects)

	const storage = new class {
		#pathname = new URL("./", location.href).pathname;
		get(/** @type {string} */ key) {
			try {
				return JSON.parse(localStorage.getItem(`${this.#pathname}:${key}`));
			} catch (error) {
				console.error(error);
				return null;
			}
		};
		set(/** @type {string} */ key, /** @type {any} */ value) {
			localStorage.setItem(`${this.#pathname}:${key}`, JSON.stringify(value));
		};
		remove(/** @type {string} */ key) {
			localStorage.removeItem(`${this.#pathname}:${key}`);
		};
	};

	{
		const button = document.querySelector("button#theme-switcher");

		// color theme
		const mediaMatch = window.matchMedia("(prefers-color-scheme: light)");
		const themeInStorage = storage.get("color-theme") ?? "os-default";
		let currentTheme = ((themeInStorage === "os-default" && mediaMatch.matches) || themeInStorage === "light") ? "light" : "dark";

		const updateTheme = () => {
			document.documentElement.dataset.theme = currentTheme === "light" ? "light" : "dark";
			// const themeColor = window.getComputedStyle(document.documentElement).backgroundColor.trim();
			// document.querySelector("meta[name=theme-color]").content = themeColor;
		};
		updateTheme();

		button.addEventListener("click", async () => {
			currentTheme = currentTheme === "dark" ? "light" : "dark";
			storage.set("color-theme", ((currentTheme === "light") === mediaMatch.matches) ? "os-default" : currentTheme);
			updateTheme();
		});

		mediaMatch.addEventListener("change", ({ matches }) => {
			currentTheme = matches ? "light" : "dark";
			storage.set("color-theme", "os-default");
			updateTheme();
		});
	}
}

export { };
