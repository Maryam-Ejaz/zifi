import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

const resultFilePath = path.resolve('data', 'speedTestResults.json');

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const data = fs.readFileSync(resultFilePath, 'utf8');
    const jsonData = JSON.parse(data);
    res.status(200).json(jsonData);
  } catch (error) {
    console.error('Error reading or parsing speed test results:', error);
    res.status(500).json({ error: 'Error retrieving speed test results' });
  }
}
