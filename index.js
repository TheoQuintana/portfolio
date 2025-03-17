import {
	CreateArianeList,
	UpdateAriane,
	UpdateArianeList,
	arianeScroll,
} from "./ariane.js";

const jobEl = document.getElementById("job");
const ColorModeToggle = document.getElementById("toggle");

const isNavigatorDark =
	window.matchMedia &&
	window.matchMedia("(prefers-color-scheme: dark)").matches;
let darkMode = localStorage.getItem("theme") == "Light" ? true : false;
setTheme(darkMode);

export let SendTextDebug = false;

const Jobs = ["étudiant", "future ingénieur", "développeur software"];
var currentJob = 0;
const animDuration = 5000;

function UpdateHash() {
	const hash =
		window.location.hash.substring(1) != ""
			? window.location.hash.substring(1)
			: anchorsNames[0];

	UpdateAriane(hash);
}

async function UpdateJob() {
	const FullDuration = 1000;
	const latency = 100;

	setTimeout(() => {
		if (SendTextDebug) console.log("text disappearing");
		textDisappear(jobEl, FullDuration / 2);
	}, latency);

	setTimeout(() => {
		if (SendTextDebug) console.log("text appearing");
		textAppear(jobEl, FullDuration / 2, Jobs[currentJob % Jobs.length]);
	}, FullDuration - latency);

	currentJob += 1;
	setTimeout(() => UpdateJob(), animDuration);
}

function textDisappear(el, duration) {
	if (duration <= 0) {
		if (SendTextDebug) console.log("stopped disappearing");
		return;
	}
	var interval = duration / el.innerText.length;
	el.innerText = el.innerText.slice(0, -1);

	duration -= interval;
	setTimeout(() => {
		textDisappear(el, duration);
	}, interval);
}

function textAppear(el, duration, finalText, iteration = 1) {
	if (iteration > finalText.length) {
		if (SendTextDebug) console.log("stopped appearing");
		return;
	}
	var interval = duration / (finalText.length - el.innerText.length);
	el.innerText = finalText.slice(0, iteration);

	duration -= interval;
	iteration += 1;
	setTimeout(() => {
		textAppear(el, duration, finalText, iteration);
	}, interval);
}

document.addEventListener("DOMContentLoaded", async (e) => {
	CreateArianeList();

	UpdateHash();
	arianeScroll();

	UpdateJob();
});

ColorModeToggle.addEventListener("click", (e) => {
	console.log(ColorModeToggle.checked);
	setTheme(!ColorModeToggle.checked);
});

function setTheme(isDark) {
	ColorModeToggle.checked = !isDark;
	document.body.dataset.theme = isDark ? "Dark" : "Light";
}

window.addEventListener("scroll", () => {
	arianeScroll();
});
