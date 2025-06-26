import type { Context } from "@netlify/edge-functions";

export default async function handler(req: Request, context: Context) {
    return new Response("edge handle netlify")
}
