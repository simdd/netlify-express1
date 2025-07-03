import type { Handler } from "@netlify/functions";
import * as cfg from '../config';
import * as fs from 'fs';
import * as path from 'path';

export const handler: Handler = async (event, context) => {
    cfg.setName(cfg.getName() + 'sim222');

    // 定义 /tmp 目录
    const tmpDir = '/tmp';
    const filePath = path.join(tmpDir, 'sim.md');
    let readContent = '';
    let filesList: string[] = [];

    try {
        // 确保 /tmp 目录存在
        if (fs.existsSync(tmpDir)) {
            // 列出 /tmp 目录下的所有文件
            filesList = fs.readdirSync(tmpDir);
            
            // 尝试读取 sim.md 文件（如果存在）
            if (fs.existsSync(filePath)) {
                readContent = fs.readFileSync(filePath, 'utf8');
            } else {
                readContent = 'File sim.md does not exist';
            }
        } else {
            return {
                body: `handle on netlify ${cfg.getName()}\n\n` +
                    `Directory /tmp does not exist\n` +
                    `File content: null`,
                statusCode: 200,
            }
        }

        // 构建文件列表的详细信息
        const filesDetails = filesList.map(file => {
            const fullPath = path.join(tmpDir, file);
            let stats;
            try {
                stats = fs.statSync(fullPath);
                return {
                    name: file,
                    isDirectory: stats.isDirectory(),
                    size: stats.size,
                    modified: stats.mtime.toISOString()
                };
            } catch (err) {
                return {
                    name: file,
                    error: 'Could not read file stats'
                };
            }
        });

        return {
            body: `handle on netlify ${cfg.getName()}\n\n` +
                `Files in /tmp directory:\n${JSON.stringify(filesDetails, null, 2)}\n\n` +
                `sim.md content: ${readContent}`,
            statusCode: 200,
        }

    } catch (error) {
        return {
            body: `handle on netlify ${cfg.getName()}\n\n` +
                `error: ${error instanceof Error ? error.message : String(error)}`,
            statusCode: 500,
        }
    }
}