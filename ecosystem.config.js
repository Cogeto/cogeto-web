module.exports = {
  apps: [
    {
      name: "cogeto-website",
      script: "node_modules/next/dist/bin/next",
      args: "start -p 3000",
      exec_mode: "cluster",
      instances: 1,
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
