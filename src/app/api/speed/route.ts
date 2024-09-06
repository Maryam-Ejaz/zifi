// import { NextResponse } from 'next/server';
// import { Readable } from 'stream';
// import speedTest from 'speedtest-net';

// // Define the GET handler
// export async function GET(request: Request): Promise<Response> {
//   const headers = new Headers({
//     'Content-Type': 'text/event-stream',
//     'Cache-Control': 'no-cache',
//     'Connection': 'keep-alive',
//   });

//   // Create a readable stream
//   const stream = new Readable({
//     read() {} // Implement the read method to avoid issues
//   });

//   const test = speedTest({ maxTime: 5000 });

//   // Define event handlers with proper typing
//   test.on('config', () => {
//     stream.push(`data: ${JSON.stringify({ event: 'config', progress: test.progress })}\n\n`);
//   });

//   test.on('log', (message: string) => {
//     stream.push(`data: ${JSON.stringify({ event: 'log', message })}\n\n`);
//   });

//   test.on('testStart', () => {
//     stream.push(`data: ${JSON.stringify({ event: 'testStart', progress: test.progress })}\n\n`);
//   });

//   test.on('ping', (pingData: { ping: number; progress: number }) => {
//     stream.push(`data: ${JSON.stringify({ event: 'ping', ...pingData, progress: test.progress })}\n\n`);
//   });

//   test.on('download', (downloadData: { download: number; progress: number }) => {
//     stream.push(`data: ${JSON.stringify({ event: 'download', ...downloadData, progress: test.progress })}\n\n`);
//   });

//   test.on('upload', (uploadData: { upload: number; progress: number }) => {
//     stream.push(`data: ${JSON.stringify({ event: 'upload', ...uploadData, progress: test.progress })}\n\n`);
//   });

//   test.on('error', (error: Error) => {
//     console.error(`Error: ${error.message}`);
//     stream.push(`data: ${JSON.stringify({ event: 'error', error: error.message })}\n\n`);
//     stream.push(null); // Close the stream
//   });

//   test.on('end', () => {
//     stream.push(`data: ${JSON.stringify({ event: 'end', progress: 1 })}\n\n`);
//     stream.push(null); // Close the stream
//   });

//   // Return the response
//   return NextResponse.json({}, { headers });
// }
