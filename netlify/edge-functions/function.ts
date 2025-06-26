// import * as cfg from '../config';

export default async function handler(req: Request) {
    // cfg.setName(cfg.getName() + 'sim111');
    // return new Response(`edge function netlify ${cfg.getName()}`);
    return new Response(`edge function netlify`);
}
