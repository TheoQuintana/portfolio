import { SendTextDebug } from "./index.js";

const anchors = document.querySelectorAll("[data-sec]");
const anchorsNames = [
	"home",
	"présentation",
	"parcours",
	"projets",
	"compétences",
	"veilles",
	"contact",
];
const pathEl = document.getElementById("path");

const ariane = document.getElementById("ariane");
var bodyRect = document.body.getBoundingClientRect();
var topEl = anchors[0];

function arianeScroll() {
	UpdateArianeList();

	UpdateAriane(
		topEl.attributes.getNamedItem("data-sec") != null
			? topEl.attributes.getNamedItem("data-sec").value
			: anchorsNames[0]
	);
}

function CreateArianeList() {
	anchorsNames.forEach((val) => {
		const el = document.createElement("a");
		el.href = "#" + val;

		const hr = document.createElement("hr");
		hr.classList.add("sec");
		el.append(hr);

		const span = document.createElement("span");
		span.textContent = val;
		el.append(span);

		ariane.append(el);
	});

	anchors.forEach((element) => {
		console.log(
			"anchor found : " +
				element.attributes.getNamedItem("data-sec").value +
				" at posY : " +
				(element.getBoundingClientRect().top - bodyRect.top) +
				" - " +
				(element.getBoundingClientRect().bottom - bodyRect.top)
		);
	});
}

function UpdateArianeList() {
	bodyRect = document.body.getBoundingClientRect();
	anchors.forEach((element) => {
		const elemRect = element.getBoundingClientRect();
		const screenCenterY = window.scrollY + window.innerHeight / 2;

		if (screenCenterY > elemRect.top - bodyRect.top) {
			topEl = element;
		} else {
			return;
		}

		if (SendTextDebug)
			console.log(
				"scroll : " +
					screenCenterY +
					"\nElement top: " +
					(elemRect.top - bodyRect.top) +
					"\n-> " +
					element.attributes.getNamedItem("data-sec").value
			);
	});
}

function UpdateAriane(hash) {
	hash = hash.toLowerCase();

	pathEl.innerText = hash != "" ? hash : anchorsNames[0];
	for (let index = 0; index < ariane.children.length; index++) {
		const element = ariane.children[index];

		if (hash == anchorsNames[index]) {
			element.classList.add("active");
		} else {
			element.classList.remove("active");
		}
	}
}

export { CreateArianeList, UpdateAriane, UpdateArianeList, arianeScroll };
