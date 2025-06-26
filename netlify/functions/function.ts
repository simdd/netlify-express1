import type { Context } from "@netlify/functions";

export default async (req: Request, context: Context) => {
    return new Response("function on netlify")
}
