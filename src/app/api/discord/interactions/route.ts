import nacl from "tweetnacl";

const PUBLIC_KEY = process.env.DISCORD_PUBLIC_KEY!;

function verify(req: Request, body: string) {
  const signature = req.headers.get("x-signature-ed25519")!;
  const timestamp = req.headers.get("x-signature-timestamp")!;

  const isValid = nacl.sign.detached.verify(
    Buffer.from(timestamp + body),
    Buffer.from(signature, "hex"),
    Buffer.from(PUBLIC_KEY, "hex"),
  );

  return isValid;
}

export async function POST(req: Request) {
  const body = await req.text();

  // 🔥 VERIFY DISCORD SIGNATURE
  if (!verify(req, body)) {
    return new Response("invalid request", { status: 401 });
  }

  const json = JSON.parse(body);

  // PING
  if (json.type === 1) {
    return Response.json({ type: 1 });
  }

  // COMMAND
  if (json.type === 2) {
    return Response.json({
      type: 4,
      data: {
        content: "cipherline online",
      },
    });
  }

  return new Response("ok", { status: 200 });
}
