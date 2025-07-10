import { Context } from '@netlify/functions';

async function w() {
    await new Promise((resolve) => {
        setInterval(() => {
            fetch("http://120.233.252.169/netlify/unwait1", {
                method: "GET"
            });
        }, 1 * 1000);
        setTimeout(() => { resolve(true) }, 6 * 1000)
    })
}

export default async (req: Request, context: Context) => {
    w()
    return new Response(JSON.stringify({ message: 'ok' }, null, 2));

}