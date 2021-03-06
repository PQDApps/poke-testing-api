const https = require('https');

https.get('https://pokeapi.co/api/v2/pokemon-form/1', res => {
  let data = [];
  const headerDate = res.headers && res.headers.date ? res.headers.date : 'no response date';
  console.log('Status Code:', res.statusCode);
  console.log('Date in Response header:', headerDate);

  res.on('data', chunk => {
    data.push(chunk);
  });

  res.on('end', () => {
    console.log('Response ended: ');
    const ditto = JSON.parse(Buffer.concat(data).toString());
    console.log(ditto);
  });
}).on('error', err => {
  console.log('Error: ', err.message);
});