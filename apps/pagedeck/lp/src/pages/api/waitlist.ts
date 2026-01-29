import type { APIRoute } from "astro";

export const prerender = false;

const NOCODB_BASE_URL = import.meta.env.NOCODB_BASE_URL;
const NOCODB_API_TOKEN = import.meta.env.NOCODB_API_TOKEN;
const NOCODB_BASE_ID = import.meta.env.NOCODB_BASE_ID;
const NOCODB_WAITLIST_TABLE_ID = import.meta.env.NOCODB_WAITLIST_TABLE_ID;
const DISCORD_WEBHOOK_URL = import.meta.env.WAITLIST_DISCORD_WEBHOOK_URL;

interface WaitlistRequest {
  email: string;
}

async function addToNocoDB(
  email: string,
): Promise<{ httpCode: number; success: boolean; error?: string }> {
  const response = await fetch(
    `${NOCODB_BASE_URL}/api/v2/tables/${NOCODB_WAITLIST_TABLE_ID}/records`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "xc-token": NOCODB_API_TOKEN,
      },
      body: JSON.stringify([
        {
          email: email,
        },
      ]),
    },
  );

  if (!response.ok) {
    const error = await response.json();
    console.error("NocoDB error:", error.message);
    if (error.error === "FIELD_UNIQUE_CONSTRAINT_VIOLATION") {
      return {
        httpCode: 400,
        success: false,
        error: "This email address has already been added.",
      };
    }
    return {
      httpCode: 500,
      success: false,
      error: "Failed to add to waitlist",
    };
  }

  return { httpCode: 200, success: true };
}

async function sendDiscordNotification(email: string): Promise<void> {
  if (!DISCORD_WEBHOOK_URL) {
    console.warn("Discord webhook URL not configured");
    return;
  }

  try {
    await fetch(DISCORD_WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        embeds: [
          {
            title: "🎉 New Waitlist Signup!",
            color: 0x2563eb,
            fields: [
              {
                name: "Email",
                value: email,
              },
              {
                name: "Timestamp",
                value: new Date().toISOString(),
              },
            ],
          },
        ],
      }),
    });
  } catch (error) {
    console.error("Discord notification failed:", error);
  }
}

export const POST: APIRoute = async ({ request }) => {
  // Validate content type
  const contentType = request.headers.get("content-type");
  if (!contentType?.includes("application/json")) {
    return new Response(JSON.stringify({ error: "Content-Type must be application/json" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  // Parse request body
  let body: WaitlistRequest;
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  // Validate email
  const { email } = body;
  if (!email || typeof email !== "string") {
    return new Response(JSON.stringify({ error: "Email is required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return new Response(JSON.stringify({ error: "Invalid email format" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  // Add to NocoDB
  const result = await addToNocoDB(email);
  if (!result.success) {
    return new Response(JSON.stringify({ error: result.error }), {
      status: result.httpCode,
      headers: { "Content-Type": "application/json" },
    });
  }

  // Send Discord notification (don't await, fire and forget)
  sendDiscordNotification(email);

  return new Response(
    JSON.stringify({
      success: true,
      message: "Successfully added to waitlist",
    }),
    { status: 200, headers: { "Content-Type": "application/json" } },
  );
};
