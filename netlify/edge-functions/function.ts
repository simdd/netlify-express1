import * as cfg from '../config';

export default () => {
    cfg.setName(cfg.getName() + 'sim111');
    return new Response(`edge function netlify ${cfg.getName()}`);
}
