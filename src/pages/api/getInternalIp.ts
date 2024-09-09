import type { NextApiRequest, NextApiResponse } from 'next';
import { internalIpV4, internalIpV6 } from 'internal-ip';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Get internal IPv4 and IPv6 addresses
    const ipv4 = await internalIpV4();
    const ipv6 = await internalIpV6();

    // Return the IP addresses in the response
    res.status(200).json({ ipv4, ipv6 });
  } catch (error) {
    console.error('Error fetching internal IP addresses:', error);
    res.status(500).json({ error: 'Failed to retrieve internal IP addresses' });
  }
}
