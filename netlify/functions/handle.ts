import type { Handler } from "@netlify/functions";
import * as cfg from '../config';

export const handler: Handler = async (event, context) => {
    cfg.setName(cfg.getName() + 'sim222');
    return {
        body: `"handle netlify" ${cfg.getName()}`,
        statusCode: 200,
    }
}
