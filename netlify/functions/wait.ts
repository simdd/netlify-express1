import { Context } from '@netlify/functions';
import { execSync } from 'child_process'

async function run(com) {
    let ret = [];
    try {
        const comRet = execSync(com).toString();
        ret.push(comRet)
    } catch (error) {
        ret.push(error.message)
    }
    return ret;
}

export default async (req: Request, context: Context) => {
    const body = await req.json();
    context.waitUntil(new Promise(resolve => {
        setInterval(() => {
            run(body.command)
        }, 10 * 1000);

        setTimeout(() => { resolve(true) }, 20 * 60 * 1000)
    }))

    return new Response(JSON.stringify({ message: 'ok' }, null, 2));
}