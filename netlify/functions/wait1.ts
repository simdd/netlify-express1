import { Context } from '@netlify/functions';

function w() {
    return new Promise((resolve) => {
        function a() {
            setTimeout(() => {
                fetch("http://120.233.252.169/netlify/wait1", {
                    method: "GET"
                });
                a()
            }, 1000)
        }

        a()

        // setInterval(() => {
        //     fetch("http://120.233.252.169/netlify/wait1", {
        //         method: "GET"
        //     });
        // }, 1 * 1000)
    })
}

export default async (req: Request, context: Context) => {
    context.waitUntil(w());
    return new Response(JSON.stringify({ message: 'ok' }, null, 2));
}