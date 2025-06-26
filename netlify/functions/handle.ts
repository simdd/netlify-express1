import type { Handler } from "@netlify/functions";

export const handler: Handler = async (event, context) => {
    return {
        body: JSON.stringify({ message: "handle netlify" }),
        statusCode: 200,
    }
}
