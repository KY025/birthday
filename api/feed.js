export default async function handler(req, res) {
  // 设置 CORS 跨域许可
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Cache-Control', 's-maxage=5, stale-while-revalidate=10');

  try {
    // 由 Vercel 后端（带 User-Agent）直接抓取 Padlet 的 XML 接口
    const padletUrl = 'https://padlet.com/padlets/s0249qqz2xgdaa5ag50b/podcast.xml';
    const response = await fetch(padletUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    });

    if (!response.ok) {
      throw new Error(`Padlet 响应状态错误: ${response.status}`);
    }

    const xmlData = await response.text();
    res.setHeader('Content-Type', 'text/xml; charset=utf-8');
    res.status(200).send(xmlData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
