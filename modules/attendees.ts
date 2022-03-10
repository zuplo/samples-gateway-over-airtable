import { ZuploContext, ZuploRequest } from "@zuplo/runtime";
import env from "@app/environment";

export default async function (request: ZuploRequest, context: ZuploContext) {
  const body = await request.json();

  const data = {
    records: [
      {
        fields: {
          Name: body.name,
          Email: body.email,
        },
      },
    ],
  };

  const response = await fetch(env.ATTENDEES_TABLE_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    return new Response("Error calling AirTable!", {
      status: 500,
    });
  }
  return new Response("Success", {
    status: 200,
  });
}