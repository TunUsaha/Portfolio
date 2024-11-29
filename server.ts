import { serve } from "https://deno.land/std@0.192.0/http/server.ts";

const handler = async (req: Request): Promise<Response> => {
    const url = new URL(req.url);

    // จัดการคำขอ API
    if (url.pathname === "/api" && req.method === "GET") {
        return new Response(JSON.stringify({ message: "Hello from API" }), {
            headers: { "content-type": "application/json" },
        });
    }

    // จัดการ Static Files
    let filePath = url.pathname === "/" ? "/index.html" : url.pathname;

    try {
        const file = await Deno.readFile(`.${filePath}`);
        const contentType = {
            ".html": "text/html",
            ".css": "text/css",
            ".js": "text/javascript",
            ".png": "image/png",
            ".jpg": "image/jpeg",
        }[filePath.slice(filePath.lastIndexOf("."))] || "text/plain";

        return new Response(file, {
            headers: { "content-type": contentType },
        });
    } catch {
        return new Response("404 Not Found", { status: 404 });
    }
};

console.log("Server running at http://localhost:8000/");
serve(handler, { port: 8000 });