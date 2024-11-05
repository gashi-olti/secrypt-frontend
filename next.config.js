import withTwin from "./withTwin.mjs";

export default withTwin({
  reactStrictMode: true,
  serverRuntimeConfig: {
    backendUrl: process.env.BACKEND_URL,
  },
  env: {
    BUILD_ENV: process.env.BUILD_ENV,
  },
  webpack: (config) => {
    // Unset client-side javascript that only works server-side
    config.resolve.fallback = { fs: false, module: false };

    return config;
  },
});
