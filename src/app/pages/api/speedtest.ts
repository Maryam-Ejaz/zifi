// import { NextApiRequest, NextApiResponse } from 'next';
// const speedTest = require('speedtest-net');

// // Define types based on the shape of the data returned by speedtest-net
// interface SpeedTestResult {
//   timestamp: Date;
//   ping: { jitter: number; latency: number };
//   download: { bandwidth: number; bytes: number; elapsed: number };
//   upload: { bandwidth: number; bytes: number; elapsed: number };
//   packetLoss: number;
//   isp: string;
//   interface: {
//     internalIp: string;
//     name: string;
//     macAddr: string;
//     isVpn: boolean;
//     externalIp: string;
//   };
//   server: {
//     id: number;
//     host_functional: string;
//     name: string;
//     location: string;
//     country: string;
//     host: string;
//     port: number;
//     ip: string;
//   };
//   result: {
//     id: string;
//     url: string;
//   };
// }

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method !== 'GET') {
//     res.setHeader('Allow', ['GET']);
//     return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
//   }

//   try {
//     // Run the speed test
//     const test = speedTest({ acceptLicense: true });
//     const result = await new Promise<SpeedTestResult>((resolve, reject) => {
//       test.on('data', resolve);
//       test.on('error', reject);
//     });

//     // Send the final result back as a JSON response
//     return res.status(200).json({
//       timestamp: result.timestamp,
//       ping: result.ping,
//       download: result.download,
//       upload: result.upload,
//       packetLoss: result.packetLoss,
//       isp: result.isp,
//       interface: result.interface,
//       server: result.server,
//       result: result.result,
//     });
//   } catch (error: any) {
//     // If there is an error, send a 500 response
//     return res.status(500).json({ message: error.message });
//   }
// }




import { NextApiRequest, NextApiResponse } from 'next';
import { exec } from 'child_process';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // Run the 'fast' command with the '--upload' and '--json' options
  exec('fast --upload --json', (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      res.status(500).json({ error: 'Failed to run speed test' });
      return;
    }

    if (stderr) {
      console.error(`stderr: ${stderr}`);
      res.status(500).json({ error: 'Error in speed test' });
      return;
    }

    try {
      // Parse the JSON output from the command
      const speedTestResult = JSON.parse(stdout);

      // Send the parsed result back as a JSON response
      res.status(200).json(speedTestResult);
    } catch (parseError) {
      console.error(`parse error: ${parseError}`);
      res.status(500).json({ error: 'Failed to parse speed test result' });
    }
  });
}
