performComplexOperation = (name) => {
	for (let i = 0; i < 1e8; i++) {
		Math.pow(Math.random(), Math.random());
	}
	return `${name} done`;
}

self.addEventListener('message', (e) => {
	self.postMessage(performComplexOperation(e.data));
});
