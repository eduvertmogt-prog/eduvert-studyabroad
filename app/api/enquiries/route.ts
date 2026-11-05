import { sql } from "../../../lib/db";

const limits = {
  name: 120,
  email: 200,
  mobile: 40,
  destination: 80,
  message: 2000,
};

function text(value: unknown, max: number) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Send the enquiry as JSON." }, { status: 400 });
  }

  const input = body && typeof body === "object" ? (body as Record<string, unknown>) : {};
  const name = text(input.name, limits.name);
  const email = text(input.email, limits.email);
  const mobile = text(input.mobile, limits.mobile);
  const destination = text(input.destination, limits.destination);
  const message = text(input.message, limits.message);

  if (!name || !email || !mobile || !email.includes("@")) {
    return Response.json({ error: "Name, email, and mobile are required." }, { status: 400 });
  }

  try {
    const rows = await sql()`
      insert into enquiries (name, email, mobile, destination, message)
      values (${name}, ${email}, ${mobile}, ${destination || null}, ${message || null})
      returning id
    `;
    return Response.json({ id: rows[0]?.id ?? null }, { status: 201 });
  } catch {
    return Response.json({ error: "The enquiry could not be saved." }, { status: 500 });
  }
}
