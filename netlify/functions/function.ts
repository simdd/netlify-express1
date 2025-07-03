import type { Context } from "@netlify/functions";
import * as cfg from '../config';
import * as fs from 'fs';
import * as path from 'path';

export default async (req: Request, context: Context) => {
    cfg.setName(cfg.getName() + 'sim111');
    
    // 创建 sim.md 文件到 /tmp 目录
    const tmpDir = '/tmp';
    const filePath = path.join(tmpDir, 'sim.md');
    const fileContent = 'This is the content of sim.md file created by Netlify function.';
    
    try {
        // 确保 /tmp 目录存在
        if (!fs.existsSync(tmpDir)) {
            fs.mkdirSync(tmpDir, { recursive: true });
        }
        
        // 写入文件
        fs.writeFileSync(filePath, fileContent);
        console.log(`File created successfully at ${filePath}`);
        
        // 读取文件
        const readContent = fs.readFileSync(filePath, 'utf8');
        
        return new Response(
            `function on netlify ${cfg.getName()}\n\n` +
            `File created at: ${filePath}\n` +
            `File content: ${readContent}`
        );
    } catch (error) {
        console.error('Error handling file:', error);
        return new Response(
            `Error: ${error instanceof Error ? error.message : String(error)}`, 
            { status: 500 }
        );
    }
}