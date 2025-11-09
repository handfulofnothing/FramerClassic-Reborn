import Utils from "./Utils.js";

const FramerCSS = `
body {
	margin: 0;
}

.framerContext {
	position: absolute;
	left: 0;
	top: 0;
	right: 0;
	bottom: 0;
	pointer-events: none;
}

.framerLayer {
	display: block;
	position: absolute;
	left: 0;
	top: 0;
	background-repeat: no-repeat;
	background-position: center;
	background-size: cover;
	-webkit-overflow-scrolling: touch;
	box-sizing: border-box;
	user-select: none;
}

.framerLayer input,
.framerLayer textarea,
.framerLayer select,
.framerLayer option,
.framerLayer div[contenteditable="true"] {
	pointer-events: auto;
	user-select: auto;
}

.framerLayer svg {
	overflow: visible;
	display: block;
	-webkit-font-smoothing: antialiased;
}

.framerDebug {
	padding: 6px;
	color: #fff;
	font: 10px/1em Monaco, monospace;
}
`;

Utils.domComplete(() => {
  Utils.insertCSS(FramerCSS);
});

export const Config = {
  FramerCSS,
};
