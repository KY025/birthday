export default async function handler(req, res) {
  // 设置允许跨域
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');

  try {
    const padletRes = await fetch('https://padlet.com/padlets/s0249qqz2xgdaa5ag50b/podcast.xml');
    const xml = await padletRes.text();
    res.setHeader('Content-Type', 'text/xml');
    res.status(200).send(xml);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch Padlet feed' });
  }
}