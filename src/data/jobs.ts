// Generated from the deployed portal bundle; dates are relative to today so the demo always reads as live.
import { daysFrom, fmtMonDay, fmtNumeric, fmtUtc18, today } from '../lib/dates'

// ----- Addresses used on the tracking legs (name · street address) -----
const A = {
  clinigenUk: 'Clinigen Healthcare Ltd · Pitcairn House, Crown Square, Centrum 100, Burton upon Trent DE14 2WW',
  clinigenIe: 'Clinigen Ireland Ltd · Citywest Business Campus, Saggart, Co. Dublin D24',
  azMacc: 'AstraZeneca Macclesfield · Charter Way, Hurdsfield Industrial Estate, Macclesfield SK10 2NA',
  wcLondon: 'World Courier (UK) Ltd · Unit 3 Canada Road, Byfleet, Surrey KT14 7JL',
  wcDublin: 'World Courier Ireland · Dublin Airport Logistics Park, Swords, Co. Dublin',
  wcFrankfurt: 'World Courier Deutschland · CargoCity Süd, 60549 Frankfurt am Main',
  wcFraDepot: 'World Courier Clinical Depot · CargoCity Süd, Gebäude 538, 60549 Frankfurt am Main',
  wcBerlin: 'World Courier Berlin · Flughafen BER, Cargo Center, 12529 Schönefeld',
  wcMumbai: 'World Courier India · Sahar Cargo Complex, Andheri East, Mumbai 400099',
  wcSgDepot: 'World Courier Clinical Depot · Changi Airfreight Centre, Airport Cargo Road, Singapore 819462',
  lhr: 'Heathrow Airport · Cargo Terminal, Shoreham Road East, Hounslow TW6 3AA',
  dub: 'Dublin Airport · Cargo Terminal 1, Corballis Road, Swords, Co. Dublin',
  fra: 'Frankfurt Airport · Lufthansa Cargo Center, Tor 25, Gebäude 451, 60546 Frankfurt am Main',
  ber: 'Berlin Brandenburg Airport (BER) · Cargo Center, 12529 Schönefeld',
  gru: 'São Paulo/Guarulhos (GRU) · TECA bonded cargo terminal, Rodovia Hélio Smidt s/n, Guarulhos SP 07190-100',
  poa: 'Porto Alegre Salgado Filho (POA) · TECA, Av. Severo Dullius 90010, Porto Alegre RS 90200-310',
  gig: 'Rio de Janeiro/Galeão (GIG) · TECA RIOgaleão, Av. Vinte de Janeiro s/n, Ilha do Governador, Rio de Janeiro RJ 21941-900',
  bom: 'Mumbai CSMIA · Air Cargo Complex, Sahar, Andheri East, Mumbai 400099',
  dornelles: 'Hospital Ernesto Dornelles · Nuclear Medicine, Av. Ipiranga 1801, Azenha, Porto Alegre RS 90160-092',
  inca: 'INCA Hospital do Câncer I · Pharmacy, Praça Cruz Vermelha 23, Centro, Rio de Janeiro RJ 20230-130',
  unicamp: 'Hospital de Clínicas da Unicamp · Rua Vital Brasil 251, Cidade Universitária, Campinas SP 13083-888',
  einstein: 'Hospital Israelita Albert Einstein · Av. Albert Einstein 627, Morumbi, São Paulo SP 05652-900',
  charite: 'Charité – Universitätsmedizin Berlin · Nuclear Medicine, Charitéplatz 1, 10117 Berlin',
  chariteCvk: 'Charité Campus Virchow-Klinikum · Site 014 Pharmacy, Augustenburger Platz 1, 13353 Berlin',
  tata: 'Tata Memorial Hospital · Dr. E Borges Road, Parel, Mumbai 400012',
  marsden: 'The Royal Marsden · Downs Road, Sutton SM2 5PT',
  guys: 'Guy’s Cancer Centre · Great Maze Pond, London SE1 9RT',
  nccs: 'National Cancer Centre Singapore · 30 Hospital Boulevard, Singapore 168583',
}
const at = (day: number, time: string, tz: string) => `${fmtMonDay(daysFrom(day))} ${time} ${tz}`
type LegStatus = 'done' | 'current' | 'pending'
const leg = (id: string, mode: 'truck' | 'plane' | 'broker', provider: string, eta: string, from: string, to: string, status: LegStatus, issue?: string) => ({ id, mode, provider, eta, from, to, status, ...(issue ? { issue } : {}) })

// Lane for job 261408871CL once proactive shipment intelligence has re-routed it via Berlin (see lib/live.ts)
export const REROUTED_261408871CL = {
  leg: 3,
  eta: `${fmtMonDay(daysFrom(1))}, 10 AM GMT+2`,
  etaFull: `${fmtNumeric(daysFrom(1))} 10:10:00 CEST`,
  legs: [
    leg('218788001M', 'truck', 'WC LONDON', at(0, '02:40', 'GMT'), A.azMacc, A.wcLondon, 'done'),
    leg('218788002M', 'truck', 'WC LONDON', at(0, '06:05', 'GMT'), A.wcLondon, A.lhr, 'done'),
    leg('218788011M', 'plane', 'BRITISH AIRWAYS · BA 992', at(0, '21:35', 'CEST'), A.lhr, A.ber, 'current', 'Re-routed via Berlin'),
    leg('218788014M', 'truck', 'WC BERLIN · DEDICATED VEHICLE', at(1, '10:10', 'CEST'), A.ber, A.charite, 'pending'),
  ],
  issues: [
    { kind: 'delay', title: 'Re-routed via Berlin', age: 'just now', body: 'Storm cell forecast over Frankfurt 22:00–04:00. Proactive shipment intelligence moved the shipment to BA 992 London → Berlin with a dedicated vehicle to Charité; ETA 10:10 CEST inside the 08:00–12:00 window, decay margin 5 h 50 m. No action needed.' },
  ],
}

export const JOBS = [
  {
    number: "261396071CL",
    client: "CLINIGEN HEALTHCARE LTD",
    clientShort: "CLINIGEN HEAL\u2026",
    destination: "Hospital Ernesto Dornelles",
    destShort: "Hospital Ernesto Dor\u2026",
    members: 2,
    eta: `${fmtMonDay(daysFrom(2))}, 3 PM GMT-3`,
    etaFull: `${fmtNumeric(daysFrom(2))} 15:00:00 CDT`,
    leg: 4,
    deliveryStatus: "On Time",
    temp: "14\u00b0C",
    battery: "19%",
    product: "PHARMACEUTICAL - FINISHED PRODUCT",
    service: "Radiopharma \u00b7 Critical tier",
    tempRange: "2 C to 8 C Refrigerated",
    sensorId: "30141672",
    origin: [-0.46, 51.33],
    via: [-46.47, -23.43],
    dest: [-51.22, -30.03],
    isOpenAlert: true,
    issues: [
      {
        kind: "temperature",
        title: "Temperature excursion",
        age: "21 hrs ago",
        body: `Internal temperature of the packaging of device 30141672 for 261396071CL at 8.2 °C is outside the allowable range of 2 - 8 °C while in transit to destination for over 0 mins, with the temperature excursion occurring at ${fmtUtc18(daysFrom(-1))}. Please contact the controlling office to check the latest device location and temperature, contact the client if the excursion is confirmed, and consider replenishment if allowed.`
      },
      {
        kind: "temperature",
        title: "Temperature excursion",
        age: "2 days ago",
        body: `Internal temperature of the packaging of device 30141672 for 261396071CL at 8.4 °C was outside the allowable range of 2 - 8 °C for 12 mins during the handover at Heathrow Airport on ${fmtUtc18(daysFrom(-2))}. The controlling office has confirmed the device returned to range.`
      },
      {
        kind: "battery",
        title: "Low battery",
        age: "6 hrs ago",
        body: "Device 30141672 battery is at 19%. At the current reporting interval the device will stop transmitting in approximately 31 hours, before the planned delivery. Consider asking the customer appointed broker to replace the logger at S\u00e3o Paulo."
      }
    ],
    legs: [
      leg('218767631M', 'truck', 'WC LONDON', at(-3, '14:30', 'GMT'), A.clinigenUk, A.wcLondon, 'done'),
      leg('218776012M', 'truck', 'WC LONDON', at(-2, '06:10', 'GMT'), A.wcLondon, A.lhr, 'done', 'Temperature excursion'),
      leg('218776014M', 'plane', 'LATAM AIRLINES GROUP · LA 8085', at(-1, '05:45', 'BRT'), A.lhr, A.gru, 'done', 'Temperature excursion'),
      leg('218776015M', 'broker', 'CUSTOMER APPOINTED BROKER · CUSTOMS', at(1, '12:00', 'BRT'), A.gru, A.gru, 'current', 'Low battery'),
      leg('218776017M', 'plane', 'LATAM AIRLINES GROUP · LA 3290', at(2, '09:20', 'BRT'), A.gru, A.poa, 'pending'),
      leg('218776019M', 'truck', 'CUSTOMER APPOINTED BROKER', at(2, '15:00', 'BRT'), A.poa, A.dornelles, 'pending'),
    ]
  },
  {
    number: "261416022CL",
    client: "CLINIGEN IRELAND LTD",
    clientShort: "CLINIGEN IREL\u2026",
    destination: "Instituto Nacional do Cancer (INCA)",
    destShort: "Instituto Nacional d\u2026",
    members: 2,
    eta: `${fmtMonDay(daysFrom(2))}, 3 PM GMT-3`,
    etaFull: `${fmtNumeric(daysFrom(2))} 15:00:00 CDT`,
    leg: 3,
    deliveryStatus: "On Time",
    temp: "5\u00b0C",
    battery: "11%",
    product: "BIOLOGICAL SAMPLES - UN3373",
    service: "Central Lab & Biostorage \u00b7 Optimised tier",
    tempRange: "2 C to 8 C Refrigerated",
    sensorId: "30141688",
    origin: [-6.26, 53.35],
    via: [-43.25, -22.81],
    dest: [-43.19, -22.9],
    isOpenAlert: true,
    issues: [
      {
        kind: "battery",
        title: "Low battery",
        age: "3 hrs ago",
        body: "Device 30141688 battery is at 11%. The device is expected to stop transmitting in approximately 18 hours. The customer appointed broker in Rio de Janeiro has been asked to swap the logger on arrival."
      }
    ],
    legs: [
      leg('218790112M', 'truck', 'WC DUBLIN', at(-1, '16:40', 'GMT'), A.clinigenIe, A.dub, 'done'),
      leg('218790114M', 'plane', 'AER LINGUS CARGO · EI 178', at(-1, '21:05', 'GMT'), A.dub, A.lhr, 'done'),
      leg('218790115M', 'plane', 'BRITISH AIRWAYS · BA 249', at(0, '07:30', 'BRT'), A.lhr, A.gig, 'current', 'Low battery'),
      leg('218790118M', 'broker', 'CUSTOMER APPOINTED BROKER · CUSTOMS', at(2, '10:00', 'BRT'), A.gig, A.gig, 'pending'),
      leg('218790121M', 'truck', 'CUSTOMER APPOINTED BROKER', at(2, '15:00', 'BRT'), A.gig, A.inca, 'pending'),
    ]
  },
  {
    number: "261402288CL",
    client: "CLINIGEN HEALTHCARE LTD",
    clientShort: "CLINIGEN HEAL\u2026",
    destination: "Universidade Estadual de Campinas",
    destShort: "Universidade Estadu\u2026",
    members: 2,
    eta: `${fmtMonDay(daysFrom(2))}, 2 PM GMT-3`,
    etaFull: `${fmtNumeric(daysFrom(2))} 14:00:00 CDT`,
    leg: 4,
    deliveryStatus: "At Risk",
    temp: "8\u00b0C",
    battery: "64%",
    product: "PHARMACEUTICAL - FINISHED PRODUCT",
    service: "Central Lab & Biostorage \u00b7 Critical tier",
    tempRange: "2 C to 8 C Refrigerated",
    sensorId: "30141701",
    origin: [-0.46, 51.33],
    via: [-46.47, -23.43],
    dest: [-47.06, -22.82],
    isOpenAlert: true,
    issues: [
      {
        kind: "temperature",
        title: "Temperature excursion",
        age: "4 hrs ago",
        body: `Internal temperature of the packaging of device 30141701 for 261402288CL at 8.6 °C is outside the allowable range of 2 - 8 °C during tarmac dwell at São Paulo (GRU) for over 14 mins, occurring at ${fmtUtc18(today())}. Please contact the controlling office to check the latest device location and temperature.`
      },
      {
        kind: "delay",
        title: "Delay risk",
        age: "5 hrs ago",
        body: "Customs clearance at GRU is running 6 hours behind the median. The predicted time of arrival is now 2 hours after the agreed delivery window. The customer appointed broker has been alerted."
      }
    ],
    legs: [
      leg('218781203M', 'truck', 'WC LONDON', at(-3, '15:10', 'GMT'), A.clinigenUk, A.wcLondon, 'done'),
      leg('218781205M', 'truck', 'WC LONDON', at(-2, '05:50', 'GMT'), A.wcLondon, A.lhr, 'done'),
      leg('218781207M', 'plane', 'LATAM AIRLINES GROUP · LA 8085', at(-1, '05:40', 'BRT'), A.lhr, A.gru, 'done', 'Temperature excursion'),
      leg('218781210M', 'broker', 'CUSTOMER APPOINTED BROKER · CUSTOMS', at(1, '18:00', 'BRT'), A.gru, A.gru, 'current', 'Delay risk'),
      leg('218781214M', 'truck', 'CUSTOMER APPOINTED BROKER', at(2, '14:00', 'BRT'), A.gru, A.unicamp, 'pending'),
    ]
  },
  {
    number: "261405510CL",
    client: "CLINIGEN HEALTHCARE LTD",
    clientShort: "CLINIGEN HEAL\u2026",
    destination: "Hospital Israelita Albert Einstein",
    destShort: "Hospital Israelita A\u2026",
    members: 2,
    eta: `${fmtMonDay(daysFrom(3))}, 11 AM GMT-3`,
    etaFull: `${fmtNumeric(daysFrom(3))} 11:00:00 CDT`,
    leg: 3,
    deliveryStatus: "On Time",
    temp: "4\u00b0C",
    battery: "82%",
    product: "PHARMACEUTICAL - FINISHED PRODUCT",
    service: "Central Lab & Biostorage \u00b7 Optimised tier",
    tempRange: "2 C to 8 C Refrigerated",
    sensorId: "30141733",
    origin: [-0.46, 51.33],
    via: [-46.47, -23.43],
    dest: [-46.71, -23.6],
    isOpenAlert: true,
    issues: [
      {
        kind: "temperature",
        title: "Temperature excursion",
        age: "9 hrs ago",
        body: `Internal temperature of the packaging of device 30141733 for 261405510CL at 1.6 °C is below the allowable range of 2 - 8 °C for over 8 mins while in transit, occurring at ${fmtUtc18(today())}. Please check whether the coolant configuration matches the lane qualification for this season.`
      },
      {
        kind: "temperature",
        title: "Temperature excursion",
        age: "1 day ago",
        body: "A brief 2 min excursion to 1.9 \u00b0C was recorded during loading at Byfleet. The device returned to range without intervention."
      }
    ],
    legs: [
      leg('218783301M', 'truck', 'WC LONDON', at(-1, '13:20', 'GMT'), A.clinigenUk, A.wcLondon, 'done', 'Temperature excursion'),
      leg('218783303M', 'truck', 'WC LONDON', at(0, '04:30', 'GMT'), A.wcLondon, A.lhr, 'done'),
      leg('218783305M', 'plane', 'LATAM AIRLINES GROUP · LA 8085', at(1, '05:40', 'BRT'), A.lhr, A.gru, 'current', 'Temperature excursion'),
      leg('218783308M', 'broker', 'CUSTOMER APPOINTED BROKER · CUSTOMS', at(2, '12:00', 'BRT'), A.gru, A.gru, 'pending'),
      leg('218783311M', 'truck', 'CUSTOMER APPOINTED BROKER', at(3, '11:00', 'BRT'), A.gru, A.einstein, 'pending'),
    ]
  },
  {
    number: "261408871CL",
    client: "ASTRAZENECA UK LTD",
    clientShort: "ASTRAZENECA\u2026",
    destination: "Charit\u00e9 \u2013 Universit\u00e4tsmedizin Berlin",
    destShort: "Charit\u00e9 \u2013 Universit\u00e4\u2026",
    members: 3,
    eta: `${fmtMonDay(daysFrom(1))}, 9 AM GMT+2`,
    etaFull: `${fmtNumeric(daysFrom(1))} 09:00:00 CEST`,
    leg: 3,
    deliveryStatus: "On Time",
    temp: "-19\u00b0C",
    battery: "77%",
    product: "RADIOPHARMACEUTICAL - CLASS 7 UN2915",
    service: "Radiopharma \u00b7 Critical tier",
    tempRange: "-25 C to -15 C Frozen",
    sensorId: "30141760",
    origin: [-1.33, 51.76],
    dest: [13.38, 52.53],
    isOpenAlert: true,
    issues: [
      {
        kind: "delay",
        title: "Delay risk",
        age: "1 hr ago",
        body: "Storms forecast around Frankfurt tonight may delay the road leg to Berlin by up to 90 minutes. The decay window still has 6 hours of margin. A contingency vehicle is on standby at FRA."
      }
    ],
    legs: [
      leg('218788001M', 'truck', 'WC LONDON', at(0, '02:40', 'GMT'), A.azMacc, A.wcLondon, 'done'),
      leg('218788002M', 'truck', 'WC LONDON', at(0, '06:05', 'GMT'), A.wcLondon, A.lhr, 'done'),
      leg('218788004M', 'plane', 'LUFTHANSA CARGO · LH 8341', at(0, '21:40', 'CEST'), A.lhr, A.fra, 'current', 'Delay risk'),
      leg('218788007M', 'truck', 'WC FRANKFURT', at(1, '09:00', 'CEST'), A.fra, A.charite, 'pending'),
    ]
  },
  {
    number: "261410034CL",
    client: "CLINIGEN HEALTHCARE LTD",
    clientShort: "CLINIGEN HEAL\u2026",
    destination: "Tata Memorial Hospital",
    destShort: "Tata Memorial Hosp\u2026",
    members: 2,
    eta: `${fmtMonDay(daysFrom(3))}, 6 PM GMT+5:30`,
    etaFull: `${fmtNumeric(daysFrom(3))} 18:00:00 IST`,
    leg: 3,
    deliveryStatus: "On Time",
    temp: "6\u00b0C",
    battery: "58%",
    product: "PHARMACEUTICAL - FINISHED PRODUCT",
    service: "Central Lab & Biostorage \u00b7 Optimised tier",
    tempRange: "2 C to 8 C Refrigerated",
    sensorId: "30141775",
    origin: [-0.46, 51.33],
    dest: [72.87, 19.07],
    isOpenAlert: true,
    issues: [
      {
        kind: "battery",
        title: "Low battery",
        age: "40 min ago",
        body: "Device 30141775 battery is at 58% but is draining faster than expected (cold ambient at altitude). It will last the journey; no action required."
      }
    ],
    legs: [
      leg('218791501M', 'truck', 'WC LONDON', at(-1, '12:45', 'GMT'), A.clinigenUk, A.wcLondon, 'done'),
      leg('218791503M', 'truck', 'WC LONDON', at(0, '05:20', 'GMT'), A.wcLondon, A.lhr, 'done'),
      leg('218791504M', 'plane', 'BRITISH AIRWAYS · BA 139', at(1, '01:30', 'IST'), A.lhr, A.bom, 'current', 'Low battery'),
      leg('218791507M', 'broker', 'WC MUMBAI · CUSTOMS', at(2, '16:00', 'IST'), A.bom, A.bom, 'pending'),
      leg('218791510M', 'truck', 'WC MUMBAI', at(3, '18:00', 'IST'), A.wcMumbai, A.tata, 'pending'),
    ]
  },
  {
    number: "261380004CL",
    client: "ASTRAZENECA UK LTD",
    clientShort: "ASTRAZENECA\u2026",
    destination: "Royal Marsden Hospital",
    destShort: "Royal Marsden Hos\u2026",
    members: 3,
    eta: `${fmtMonDay(daysFrom(-24))}, 10 AM GMT+1`,
    etaFull: `${fmtNumeric(daysFrom(-24))} 10:00:00 BST`,
    leg: 2,
    deliveryStatus: "Delivered",
    temp: "-21\u00b0C",
    battery: "\u2014",
    product: "RADIOPHARMACEUTICAL - CLASS 7 UN2915",
    service: "Radiopharma \u00b7 Critical tier",
    tempRange: "-25 C to -15 C Frozen",
    sensorId: "30141590",
    origin: [-1.33, 51.76],
    dest: [-0.19, 51.34],
    isOpenAlert: false,
    issues: [],
    legs: [
      leg('218760001M', 'truck', 'WC LONDON', at(-24, '03:50', 'BST'), A.azMacc, A.wcLondon, 'done'),
      leg('218760004M', 'truck', 'WC LONDON', at(-24, '09:40', 'BST'), A.wcLondon, A.marsden, 'done'),
    ]
  },
  {
    number: "261421770CL",
    client: "ASTRAZENECA UK LTD",
    clientShort: "ASTRAZENECA\u2026",
    destination: "Guy\u2019s Cancer Centre",
    destShort: "Guy\u2019s Cancer Centre",
    members: 3,
    eta: `${fmtMonDay(daysFrom(1))}, 7 AM GMT+1`,
    etaFull: `${fmtNumeric(daysFrom(1))} 07:00:00 BST`,
    leg: 0,
    deliveryStatus: "Not departed",
    temp: "\u2014",
    battery: "100%",
    product: "RADIOPHARMACEUTICAL - CLASS 7 UN2915",
    service: "Radiopharma \u00b7 Critical tier",
    tempRange: "-25 C to -15 C Frozen",
    sensorId: "30141802",
    origin: [-1.33, 51.76],
    dest: [-0.09, 51.5],
    isOpenAlert: false,
    issues: [],
    legs: [
      leg('218799001M', 'truck', 'WC LONDON', at(1, '02:30', 'BST'), A.azMacc, A.wcLondon, 'pending'),
      leg('218799004M', 'truck', 'WC LONDON', at(1, '07:00', 'BST'), A.wcLondon, A.guys, 'pending'),
    ]
  },
  {
    number: "261423115CL",
    client: "ASTRAZENECA UK LTD",
    clientShort: "ASTRAZENECA\u2026",
    destination: "Charit\u00e9 \u2013 Universit\u00e4tsmedizin Berlin \u00b7 Site 014",
    destShort: "Charit\u00e9 \u00b7 Site 014",
    members: 3,
    eta: `${fmtMonDay(daysFrom(1))}, 7 AM GMT+2`,
    etaFull: `${fmtNumeric(daysFrom(1))} 07:00:00 CEST`,
    leg: 1,
    deliveryStatus: "On Time",
    temp: "4\u00b0C",
    battery: "96%",
    product: "CLINICAL TRIAL MATERIAL - IMP \u00b7 LOT 24K118",
    service: "Clinical Supply Logistics \u00b7 Critical tier \u00b7 AZ-ONC-301",
    tempRange: "2 C to 8 C Refrigerated",
    sensorId: "30141855",
    origin: [8.68, 50.11],
    dest: [13.38, 52.53],
    isOpenAlert: false,
    issues: [],
    legs: [
      leg('218801001M', 'truck', 'WC FRANKFURT DEPOT', at(0, '22:30', 'CEST'), A.wcFraDepot, A.wcBerlin, 'current'),
      leg('218801004M', 'truck', 'WC BERLIN', at(1, '07:00', 'CEST'), A.wcBerlin, A.chariteCvk, 'pending'),
    ]
  },
  {
    number: "261424402CL",
    client: "ASTRAZENECA UK LTD",
    clientShort: "ASTRAZENECA\u2026",
    destination: "National Cancer Centre Singapore \u00b7 Site 102",
    destShort: "NCC Singapore \u00b7 Site 102",
    members: 2,
    eta: `${fmtMonDay(daysFrom(2))}, 11 AM GMT+8`,
    etaFull: `${fmtNumeric(daysFrom(2))} 11:00:00 SGT`,
    leg: 0,
    deliveryStatus: "Not departed",
    temp: "\u2014",
    battery: "100%",
    product: "CLINICAL TRIAL MATERIAL - IMP \u00b7 LOT 24M204",
    service: "Clinical Supply Logistics \u00b7 Optimised tier \u00b7 AZ-CORE-201",
    tempRange: "2 C to 8 C Refrigerated",
    sensorId: "30141871",
    origin: [103.99, 1.36],
    dest: [103.84, 1.28],
    isOpenAlert: false,
    issues: [],
    legs: [
      leg('218803001M', 'truck', 'WC SINGAPORE DEPOT', at(2, '11:00', 'SGT'), A.wcSgDepot, A.nccs, 'pending'),
    ]
  }
]
