# GIS-labb

En demo-webbapp för diverse GIS-funktioner. Baseras på rjs & ol2.

## Installation

Använd [npm](https://www.npmjs.com/get-npm) för att kunna köra projektet lokalt. 

```bash
npm install
```

Ange lmToken (Lantmäteriet) i layers.js.


## Utvecklingsmiljö

Stöd finns för att köra en automatisk utvecklingsmiljö med lokal webbserver som laddar om det innehåll som uppdateras (s.k. "live reload").

```bash
npm start
```

Om man inte har en lokal instans av GeoServer, kan man använda en förkonfigurerad CORS-proxy för att komma åt en remote-instans.
Byt ut https://geoserver.url till den url där instansen återfinns och kör sedan: 

```bash
npm run start-with-proxy
```

## Licens
[ISC](https://choosealicense.com/licenses/isc/)