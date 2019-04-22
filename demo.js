const numberOfExecutions = 5;

function performComplexOperation(name) {
	for (let i = 0; i < 1e8; i++) {
		Math.pow(Math.random(), Math.random());
	}
	return `${name} done`;
}

const executeSeveralTimes = (numberOfExecutions) => {
	console.log('consecutive execution initiated');

	const label = 'consecutive execution time: ';
	console.time(label);

	const executionPromiseSet = [];
	for (let i = 0; i < numberOfExecutions; i++) {
		const promiseOfExecution = new Promise((resolve) => {
			setTimeout(() => {
				console.log(`${i + 1}/${numberOfExecutions} init`);

				const output = performComplexOperation(`${i + 1}`);
				console.log(output);

				resolve();
			}, 0);
		});
		executionPromiseSet.push(promiseOfExecution);
	}
	Promise.all(executionPromiseSet).then(() => {
		console.timeEnd(label);
	});
}
executeSeveralTimes(numberOfExecutions);


const executeSeveralTimesAsync = (numberOfExecutions) => {
	console.log('parallel execution initiated');

	const functionBlob = new Blob([performComplexOperation], { type: 'text/javascript' });
	const functionUrl = URL.createObjectURL(functionBlob);

	const label = 'parallel execution time: ';
	console.time(label);

	const executionPromiseSet = [];
	for (let i = 0; i < numberOfExecutions; i++) {
		const promiseOfExecution = new Promise((resolve) => {
			const worker = new Worker('./worker.js');
			worker.onmessage = e => {
				const output = e.data;
				console.log(output);
				resolve();
			};

			console.log(`${i + 1}/${numberOfExecutions} init`);

			const message = {
				name: `${i + 1}`,
				funcName: 'performComplexOperation',
				funcURL: functionUrl
			};

			worker.postMessage(message);
		});
		executionPromiseSet.push(promiseOfExecution);
	}
	Promise.all(executionPromiseSet).then(() => {
		console.timeEnd(label);
	});
}
executeSeveralTimesAsync(numberOfExecutions);


