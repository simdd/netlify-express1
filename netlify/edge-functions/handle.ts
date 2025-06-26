import type { Context } from "@netlify/edge-functions";
// import * as cfg from '../config';

export default async function handler(req: Request, context: Context) {
    // cfg.setName(cfg.getName() + 'sim222');
    // return new Response(`edge handle netlify ${cfg.getName()}`)
    return new Response(`edge handle netlify`)
}
