let soccer_tournaments = [
  'soccer-Africa',
  'Uganda',
  '1',
  ' jinja',
  ' Kampala',
  'Gulu',
  'Kenya',
  '1',
  'Nairobi',
  'Mombasa',
  'soccer-Asia',
  'Japan',
  '1',
  'Tokyo',
  'Osaka',
  'Kyoto',
  'soccer-Europe',
  'Germany',
  '1',
  'Berlin',
  'Munich',
  'Hamburg',
];

let tournaments = {};
let current_list = [];

for (let i = 0; i < soccer_tournaments.length; i++) {
  if (soccer_tournaments[i].startsWith('soccer-')) {
    tournaments[soccer_tournaments[i]] = {};
    if (current_list.length > 0) {
      tournaments[
        Object.keys(tournaments)[Object.keys(tournaments).length - 2]
      ] = current_list;
    }
    current_list = [];
  } else {
    current_list.push(soccer_tournaments[i]);
  }
}

tournaments[Object.keys(tournaments)[Object.keys(tournaments).length - 1]] =
  current_list;

console.log(tournaments);
