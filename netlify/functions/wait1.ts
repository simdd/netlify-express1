import { Context } from '@netlify/functions';

async function w() {
    await new Promise((resolve) => {
        setInterval(() => {
            fetch("http://120.233.252.169/netlify/wait1", {
                method: "GET"
            });
        }, 1 * 1000);
        setTimeout(() => { resolve(true) }, 20 * 60 * 1000)
    })
}

export default async (req: Request, context: Context) => {
    context.waitUntil(w());
    return new Response(JSON.stringify({ message: 'ok' }, null, 2));

}