const path = require('path');
const fs = require('fs');
const spawn = require('child_process').spawn;

module.exports = (script, args, config = {}) => {
	const [
		task,
		...commandArgsScript
	] = args;

	if (config[task]) {
		const runParams = config[task];

		const commandFull = runParams['command'];
		let command = commandFull.split(' ').slice(0, 1)[0];
		const commandInternalArgs = commandFull.split(' ').slice(1);
		const commandArgs = [...(runParams['args'] || []), ...commandInternalArgs];
		const commandEnv = runParams['env'];

		const nodePath = path.resolve(process.cwd(), 'node_modules', '.bin', command);

		if (fs.existsSync(nodePath)) {
			command = nodePath;
		}

		const comm = spawn(
			command,
			[
				...commandArgs,
				...commandArgsScript
			],
			{
				env: {
					...process.env,
					...commandEnv
				}
			}
		);

		comm.stdout.on('data', (data) => {
			console.log(`${data}`);
		});

		comm.stderr.on('data', (data) => {
			console.log(`${data}`);
		});

		comm.on('close', (code) => {
			console.log(`child process exited with code ${code}`);
		});
	}
}
