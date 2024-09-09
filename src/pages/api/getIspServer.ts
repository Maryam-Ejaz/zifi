import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
      const response = await fetch('https://api.fast.com/netflix/speedtest/v2?https=true&token=YXNkZmFzZGxmbnNkYWZoYXNkZmhrYWxm&urlCount=1');
      const data = await response.json();
      console.log(data);
  
      // Extract client ISP and first server city
      const clientIsp = data.client?.isp || 'LOADING..';
      const firstServerCity = data.targets[0]["location"].city || 'LOADING..';
      console.log(firstServerCity);
  
      res.status(200).json({ clientIsp, firstServerCity });
    } catch (error) {
      console.error('Error fetching speed test data:', error);
      res.status(500).json({ clientIsp: 'LOADING..', firstServerCity: 'LOADING..' });
    }
  }
  