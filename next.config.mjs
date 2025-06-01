const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/chatbot/:path*", // Proxy all WebSocket requests under /chatbot
        destination: "http://localhost:3010/chatbot/:path*", // Your NestJS backend URL
      },
    ];
  },
};

export default nextConfig;