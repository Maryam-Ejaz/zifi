// app/api/speedtest/route.ts

import { exec } from 'child_process';

// Define the GET handler
export async function GET(request: Request): Promise<Response> {
  return new Promise((resolve) => {
    // Run the 'fast' command with the '--upload' and '--json' options
    exec('fast --upload --json', (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        resolve(new Response(JSON.stringify({ error: 'Failed to run speed test' }), { status: 500 }));
        return;
      }

      if (stderr) {
        console.error(`stderr: ${stderr}`);
        resolve(new Response(JSON.stringify({ error: 'Error in speed test' }), { status: 500 }));
        return;
      }

      try {
        // Parse the JSON output from the command
        const speedTestResult = JSON.parse(stdout);

        // Send the parsed result back as a JSON response
        resolve(new Response(JSON.stringify(speedTestResult), { status: 200, headers: { 'Content-Type': 'application/json' } }));
      } catch (parseError) {
        console.error(`parse error: ${parseError}`);
        resolve(new Response(JSON.stringify({ error: 'Failed to parse speed test result' }), { status: 500 }));
      }
    });
  });
}
