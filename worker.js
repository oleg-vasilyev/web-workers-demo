onmessage = e => {
	importScripts(e.data.funcURL);

	const message = eval(`${e.data.funcName}('${e.data.name}');`);
	postMessage(message);
};
