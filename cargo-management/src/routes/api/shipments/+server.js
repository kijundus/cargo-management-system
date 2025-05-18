// src/routes/api/shipments/+server.js
let shipments = [];

export async function POST({ request }) {
  const data = await request.json();
  shipments.push(data);
  return new Response(JSON.stringify({ success: true }), { status: 200 });
}

export async function GET() {
  return new Response(JSON.stringify(shipments), { status: 200 });
}