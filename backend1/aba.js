const cheerio = require('cheerio');
const axios = require('axios');

async function scrapeData() {
  const response = await axios.get('https://ababet.ug/');
  const $ = cheerio.load(response.data);

  const data = [];
  $('table tr').each((index, element) => {
    const cells = $(element).find('td');
    const rowData = [];
    cells.each((cellIndex, cell) => {
      rowData.push($(cell).text());
    });
    data.push(rowData);
  });

  const arrangedData = [];
  data.forEach((row, index) => {
    if (index === 0) return; // Skip the first row which contains the headers

    const [
      league,
      time,
      status,
      homeTeam,
      score,
      awayTeam,
      homeOdds,
      drawOdds,
      awayOdds,
      symbol,
    ] = row;
    arrangedData.push({
      league,
      time,
      status,
      homeTeam,
      score,
      awayTeam,
      homeOdds,
      drawOdds,
      awayOdds,
      symbol,
    });
  });

  console.log(arrangedData);
}

scrapeData();
