// pages/api/getWifiNetworks.ts

import type { NextApiRequest, NextApiResponse } from 'next';
const wifi = require('node-wifi');

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // Initialize wifi module
  wifi.init({
    iface: null, // network interface, choose a random wifi interface if set to null
  });

  // Scan networks
  wifi.scan((error: Error | null, networks: any[]) => {
    if (error) {
      console.error('Error scanning networks:', error);
      return res.status(500).json({ error: 'Failed to scan networks' });
    }

    // Map the results to only include SSID information
    const ssidList = networks.map((network) => ({
      ssid: network.ssid,
      signal_level: network.signal_level,
      security: network.security,
      mac: network.mac,
    }));

    // Respond with the list of SSIDs
    res.status(200).json({ networks: ssidList });
  });
}
