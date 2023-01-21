import fetch from 'node-fetch';

export default async function exchangeMiddleware(req, res) {
  try {
    const { amount, sourceCurrency, targetCurrency } = req.body;
    if (!amount) throw new Error('missing amount');
    if (!sourceCurrency) throw new Error('missing source currency');
    if (!targetCurrency) throw new Error('missing target currency');
    
    const url = `${process.env.EXCHANGE_RATE_API_URL}/${process.env.EXCHANGE_RATE_API_KEY}/pair/${sourceCurrency}/${targetCurrency}`;
    const response = await fetch(url);
    const data = await response.json();
    
    const { conversion_rate: conversionRate } = data;
    const result = amount * conversionRate;

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.write(JSON.stringify(result));
    res.end();

  } catch (error) {
    res.send(error.stack);
  }
}
