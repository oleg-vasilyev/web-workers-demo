const numberOfExecutions = 10;

const performComplexOperation = (name) => {
	for (let i = 0; i < 1e8; i++) {
		Math.pow(Math.random(), Math.random());
	}
	return `${name} done`;
}

const executeSeveralTimesSync = (numberOfExecutions) => {
	console.log('consecutive execution initiated');
	
	const label = 'consecutive execution time: ';
	console.time(label);

	for (let i = 0; i < numberOfExecutions; i++) {
		console.log(`${i + 1}/${numberOfExecutions} init`);
		const output = performComplexOperation(`${i + 1}/${numberOfExecutions}`);
		console.log(output);
	}
	console.timeEnd(label);
}
executeSeveralTimesSync(numberOfExecutions);


const executeSeveralTimesAsync = (numberOfExecutions) => {
	console.log('parallel execution initiated');
	
	const label = 'parallel execution time: ';
	console.time(label);

	const executionPromiseSet = [];
	for (let i = 0; i < numberOfExecutions; i++) {
		const promiseOfExecution = new Promise((resolve) => {
			const worker = new Worker('./worker.js');

			worker.addEventListener('message', (e) => {
				const output = e.data;
				console.log(output);
				resolve(output);
			});
			console.log(`${i + 1}/${numberOfExecutions} init`);
			worker.postMessage(`${i + 1}/${numberOfExecutions}`);
		});
		executionPromiseSet.push(promiseOfExecution);
	}
	Promise.all(executionPromiseSet).then(() => {
		console.timeEnd('parallel execution time: ');
	});
}
executeSeveralTimesAsync(numberOfExecutions);


