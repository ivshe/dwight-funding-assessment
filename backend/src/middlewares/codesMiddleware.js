import fetch from 'node-fetch';

export default async function codesMiddleware(req, res) {
  try {
    const url = `${process.env.EXCHANGE_RATE_API_URL}/${process.env.EXCHANGE_RATE_API_KEY}/codes`;
    const response = await fetch(url);
    const data = await response.json();

    const { supported_codes: supportedCodes } = data;

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.write(JSON.stringify(supportedCodes));
    res.end();

  } catch (error) {
    res.send(error.stack);
  }
}
