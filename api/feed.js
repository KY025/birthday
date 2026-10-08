export default async function handler(req, res) {
  // 开启全域 CORS 许可，允许自己的前端读取
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');

  try {
    // 由 Vercel 后端直接向 Padlet 请求，模拟真实浏览器 Header
    const response = await fetch('https://padlet.com/padlets/s0249qqz2xgdaa5ag50b/podcast.xml', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    });

    if (!response.ok) {
      throw new Error(`Padlet returned status: ${response.status}`);
    }

    const xmlData = await response.text();
    res.setHeader('Content-Type', 'text/xml; charset=utf-8');
    res.status(200).send(xmlData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
