const spawn = require('child_process').spawn;

module.exports = (script, args, config = {}) => {
	const [
		task,
		...commandArgsScript
	] = args;

	if (config[task]) {
		const runParams = config[task];

		const command = runParams['command'];
		const commandArgs = runParams['args'] || [];
		const commandEnv = runParams['env'];

		const comm = spawn(
			command,
			[
				...commandArgs,
				...commandArgsScript
			],
			{
				env: commandEnv
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
