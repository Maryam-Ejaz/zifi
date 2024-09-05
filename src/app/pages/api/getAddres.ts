import { NextApiRequest, NextApiResponse } from 'next';
const getMac = require('getmac-offline');

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const macAddress = await getMac();
    res.status(200).json({ macAddress });
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving MAC address' });
  }
}
