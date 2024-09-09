import type { NextApiRequest, NextApiResponse } from 'next';
import wifi from 'node-wifi';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // Initialize wifi module
  wifi.init({
    iface: null, 
  });

  // Scan networks
  wifi.scan((error: Error | null, networks: any[]) => {
    if (error) {
      console.error('Error scanning networks:', error);
      return res.status(500).json({ error: 'Failed to scan networks' });
    }

    const ssidList = networks.map((network) => ({
      ssid: network.ssid,
      signal_level: network.signal_level,
      security: network.security,
      mac: network.mac,
    }));

    res.status(200).json({ networks: ssidList });
  });
}
