import type { Handler } from "@netlify/functions";
import * as cfg from '../config';
import * as fs from 'fs';
import * as path from 'path';

export const handler: Handler = async (event, context) => {
    cfg.setName(cfg.getName() + 'sim222');


    // 创建 sim.md 文件到 /tmp 目录
    const tmpDir = '/tmp';
    const filePath = path.join(tmpDir, 'sim.md');
    let readContent = '';

    try {
        // 确保 /tmp 目录存在
        if (fs.existsSync(tmpDir)) {
            // 读取文件
            readContent = fs.readFileSync(filePath, 'utf8');
        } else {
            return new Response(
                `handle on netlify ${cfg.getName()}\n\n` +
                `File created at: null\n` +
                `File content: null`
            );
        }

        return new Response(
            `handle on netlify ${cfg.getName()}\n\n` +
            `File created at: ${filePath}\n` +
            `File content: ${readContent}`
        );
    } catch (error) {
        return new Response(
            `handle on netlify ${cfg.getName()}\n\n` +
            `error: ${error}`
        );
    }
}
