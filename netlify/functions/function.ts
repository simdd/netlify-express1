import type { Context } from "@netlify/functions";
import * as cfg from '../config';

export default async (req: Request, context: Context) => {
    cfg.setName(cfg.getName() + 'sim111');
    return new Response(`function on netlify ${cfg.getName()}`)
}
