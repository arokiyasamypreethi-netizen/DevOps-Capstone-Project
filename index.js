const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

const homePage = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>DevOps Capstone Project</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: linear-gradient(135deg, #0f2027, #203a43, #2c5364);
      color: #f5f5f5;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 24px;
    }
    .card {
      background: rgba(255, 255, 255, 0.06);
      border: 1px solid rgba(255, 255, 255, 0.12);
      backdrop-filter: blur(10px);
      border-radius: 16px;
      padding: 48px 56px;
      max-width: 640px;
      width: 100%;
      box-shadow: 0 20px 60px rgba(0,0,0,0.35);
    }
    .status-dot {
      display: inline-block;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: #3ddc84;
      box-shadow: 0 0 8px #3ddc84;
      margin-right: 8px;
      animation: pulse 2s infinite;
    }
    @keyframes pulse {
      0%   { opacity: 1; }
      50%  { opacity: 0.4; }
      100% { opacity: 1; }
    }
    .badge {
      display: inline-flex;
      align-items: center;
      font-size: 13px;
      background: rgba(61, 220, 132, 0.12);
      border: 1px solid rgba(61, 220, 132, 0.4);
      color: #3ddc84;
      padding: 6px 14px;
      border-radius: 999px;
      margin-bottom: 24px;
      font-weight: 600;
      letter-spacing: 0.3px;
    }
    h1 {
      font-size: 32px;
      margin-bottom: 8px;
      background: linear-gradient(90deg, #ffffff, #b8d8ff);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .subtitle {
      color: #9fb3c8;
      font-size: 15px;
      margin-bottom: 32px;
      line-height: 1.5;
    }
    .stack {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-bottom: 32px;
    }
    .chip {
      font-size: 12.5px;
      background: rgba(255,255,255,0.08);
      border: 1px solid rgba(255,255,255,0.14);
      padding: 6px 12px;
      border-radius: 8px;
      color: #d6e4f0;
    }
    .flow {
      font-size: 13px;
      color: #7fa8c9;
      letter-spacing: 0.5px;
      border-top: 1px solid rgba(255,255,255,0.1);
      padding-top: 20px;
      margin-bottom: 24px;
    }
    .links {
      display: flex;
      gap: 12px;
      flex-wrap: wrap;
    }
    .links a {
      font-size: 13.5px;
      color: #cfe3f5;
      text-decoration: none;
      border: 1px solid rgba(255,255,255,0.18);
      padding: 8px 16px;
      border-radius: 8px;
      transition: all 0.2s ease;
    }
    .links a:hover {
      background: rgba(255,255,255,0.1);
      border-color: rgba(255,255,255,0.35);
    }
    footer {
      margin-top: 28px;
      font-size: 12px;
      color: #5f7f99;
    }
  </style>
</head>
<body>
  <div class="card">
    <div class="badge"><span class="status-dot"></span>Live &amp; Running</div>
    <h1>DevOps Capstone Project</h1>
    <p class="subtitle">
      A Node.js web application deployed through a fully automated CI/CD pipeline —
      built, containerized, and shipped to AWS without a single manual deploy step.
    </p>
    <div class="stack">
      <span class="chip">Node.js</span>
      <span class="chip">Express</span>
      <span class="chip">Docker</span>
      <span class="chip">Jenkins</span>
      <span class="chip">AWS EC2</span>
      <span class="chip">Prometheus</span>
      <span class="chip">Grafana</span>
    </div>
    <div class="flow">
      GitHub &nbsp;&rarr;&nbsp; Jenkins &nbsp;&rarr;&nbsp; Docker Hub &nbsp;&rarr;&nbsp; AWS EC2 &nbsp;&rarr;&nbsp; Prometheus &amp; Grafana
    </div>
    <div class="links">
      <a href="/health">Health Check</a>
      <a href="https://github.com/arokiyasamypreethi-netizen/DevOps-Capstone-Project" target="_blank">Source Code</a>
    </div>
    <footer>Deployed automatically via Jenkins CI/CD pipeline</footer>
  </div>
</body>
</html>
`;

app.get('/', (req, res) => {
  res.send(homePage);
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok', uptime: process.uptime() });
});

app.listen(PORT, () => console.log(`App listening on port ${PORT}`));