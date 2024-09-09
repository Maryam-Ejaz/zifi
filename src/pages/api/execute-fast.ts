import { NextApiRequest, NextApiResponse } from 'next';
import { exec } from 'child_process';
import { Readable } from 'stream';
import fs from 'fs';
import path from 'path';

const resultFilePath = path.resolve('data', 'speedTestResults.json');

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  const command = 'fast --json --upload';

  const child = exec(command, { cwd: process.cwd() });

  // Ensure stdout and stderr are not null
  if (child.stdout instanceof Readable) {
    child.stdout.on('data', (data) => {
      try {
        const jsonData = JSON.parse(data.toString());

        // Write the JSON data to a file
        fs.writeFileSync(resultFilePath, JSON.stringify(jsonData, null, 2));

        res.write(`data: ${JSON.stringify(jsonData)}\n\n`);
      } catch (e) {
        console.error('Error parsing JSON from stdout', e);
      }
    });
  }

  if (child.stderr instanceof Readable) {
    child.stderr.on('data', (data) => {
      console.error(`stderr: ${data}`);
      res.write(`data: ${data}\n\n`);
    });
  }

  child.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
    res.write(`data: [DONE] Process exited with code ${code}\n\n`);
    res.end();
  });

  req.on('close', () => {
    console.log('Client disconnected');
    child.kill();
    res.end();
  });
}
