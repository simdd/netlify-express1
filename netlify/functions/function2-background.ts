import { Context } from '@netlify/functions';
import { execSync } from 'child_process'
import { writeFileSync, appendFile, appendFileSync } from 'fs'


async function w() {
    return new Promise((resolve) => {
        writeFileSync("/tmp/sim.md", '开始写入数据...\n', 'utf8');

        // 每分钟写入一次数据
        const interval = setInterval(() => {
            const data = `当前时间: ${new Date().toISOString()}\n`;
            appendFile('/tmp/sim.md', data, (err) => {
                if (err) console.error('写入失败:', err);
                else console.log('已写入:', data.trim());
            });
        }, 1 * 1000); // 60秒 = 1分钟

        // 10分钟后停止
        setTimeout(() => {
            clearInterval(interval);
            appendFileSync('/tmp/sim.md', '写入结束\n');
            resolve(true);
        }, 4 * 60 * 1000); // 10分钟 = 60秒
    })
}

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
    if (body.w) {
        // context.waitUntil(w())
        w()
    }
    const ret = await run(body.command);
    const text = ret.join("\n")
    const result = text.split('\n').filter(e => e);
    return new Response(JSON.stringify(result, null, 2));
}
