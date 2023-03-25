import http from "http";
import httpProxy from "http-proxy";

const proxy = httpProxy.createProxyServer({
target: "https://tess-coquilhat.fr",
changeOrigin: true,
});

export const server = http.createServer((req, res) => {
proxy.web(req, res);
});

server.listen(3000, () => {
console.log("Server running on port 3000");
});

