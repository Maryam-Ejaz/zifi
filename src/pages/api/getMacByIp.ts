import type { NextApiRequest, NextApiResponse } from 'next';
var arp = require('node-arp');

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { ip } = req.query;

  if (!ip) {
    return res.status(400).json({ error: 'IP address is required' });
  }

  try {
    // Use a Promise to handle the asynchronous nature of arp.getMAC
    const getMacAddress = (ip: string): Promise<string> => {
      return new Promise((resolve, reject) => {
        arp.getMAC(ip, (err: Error | null, mac: string) => {
          if (err) {
            return reject(err);
          }
          console.log(mac);
          resolve(mac);
        });
      });
    };

    const mac = await getMacAddress(ip as string);

    res.status(200).json({ ip, mac });
  } catch (error) {
    console.error('Error retrieving MAC address:', error);
    res.status(500).json({ error: 'Failed to retrieve MAC address' });
  }
}
