// Generated from the deployed portal bundle; dates are relative to today so the demo always reads as live.
import { daysFrom, fmtMonDay, fmtNumeric, fmtUtc18, today } from '../lib/dates'

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
      {
        id: "218767631M",
        mode: "truck",
        provider: "WC LONDON",
        eta: `${fmtMonDay(daysFrom(2))}, 3 PM CDT`,
        from: "UNIT 3 CANADA ROAD, BYFLEET\u2026",
        to: "OXFORD HOUSE, 1 PLANE TREE\u2026",
        status: "done",
        issue: "Temperature excursion +1"
      },
      {
        id: "218776012M",
        mode: "truck",
        provider: "WC LONDON",
        eta: `${fmtMonDay(daysFrom(2))}, 3 PM CDT`,
        from: "OXFORD HOUSE, 1 PLANE TREE CRESC\u2026",
        to: "HEATHROW AIRPORT, LO\u2026",
        status: "done",
        issue: "Temperature excursion +1"
      },
      {
        id: "218776014M",
        mode: "plane",
        provider: "LATAM AIRLINES GROUP",
        eta: `${fmtMonDay(daysFrom(2))}, 3 PM CDT`,
        from: "HEATHROW AIRPORT, LONDO\u2026",
        to: "SN ROD HELIO SMIDT, SAO PAULO,\u2026",
        status: "done",
        issue: "Temperature excursion +1"
      },
      {
        id: "218776015M",
        mode: "broker",
        provider: "CUSTOMER APPOINTED BROKER",
        eta: `${fmtMonDay(daysFrom(2))}, 3 PM CDT`,
        from: "SN ROD HELIO SMIDT, SAO PAU\u2026",
        to: "SN ROD HELIO SMIDT, SAO PAU\u2026",
        status: "current",
        issue: "Temperature excursion +1"
      },
      {
        id: "218776019M",
        mode: "truck",
        provider: "CUSTOMER APPOINTED BROKER",
        eta: `${fmtMonDay(daysFrom(2))}, 3 PM CDT`,
        from: "SN ROD HELIO SMIDT, SA\u2026",
        to: "Av. Ipiranga, 1801, Azenha, Instituto Ceo\u2026",
        status: "pending",
        issue: "Temperature excursion +1"
      }
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
      {
        id: "218790112M",
        mode: "truck",
        provider: "WC DUBLIN",
        eta: `${fmtMonDay(daysFrom(2))}, 3 PM CDT`,
        from: "CLINIGEN IRELAND, CITYWEST\u2026",
        to: "DUBLIN AIRPORT, CARGO\u2026",
        status: "done"
      },
      {
        id: "218790115M",
        mode: "plane",
        provider: "LATAM AIRLINES GROUP",
        eta: `${fmtMonDay(daysFrom(2))}, 3 PM CDT`,
        from: "DUBLIN AIRPORT, CARGO\u2026",
        to: "GIG, RIO DE JANEIRO\u2026",
        status: "current",
        issue: "Low battery"
      },
      {
        id: "218790118M",
        mode: "broker",
        provider: "CUSTOMER APPOINTED BROKER",
        eta: `${fmtMonDay(daysFrom(2))}, 3 PM CDT`,
        from: "GIG, RIO DE JANEIRO\u2026",
        to: "GIG, RIO DE JANEIRO\u2026",
        status: "pending"
      },
      {
        id: "218790121M",
        mode: "truck",
        provider: "CUSTOMER APPOINTED BROKER",
        eta: `${fmtMonDay(daysFrom(2))}, 3 PM CDT`,
        from: "GIG, RIO DE JANEIRO\u2026",
        to: "Pra\u00e7a da Cruz Vermelha, 23, Centro\u2026",
        status: "pending"
      }
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
    leg: 3,
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
      {
        id: "218781203M",
        mode: "truck",
        provider: "WC LONDON",
        eta: `${fmtMonDay(daysFrom(2))}, 2 PM CDT`,
        from: "UNIT 3 CANADA ROAD, BYFLEET\u2026",
        to: "HEATHROW AIRPORT, LO\u2026",
        status: "done"
      },
      {
        id: "218781207M",
        mode: "plane",
        provider: "LATAM AIRLINES GROUP",
        eta: `${fmtMonDay(daysFrom(2))}, 2 PM CDT`,
        from: "HEATHROW AIRPORT, LONDO\u2026",
        to: "SN ROD HELIO SMIDT, SAO PAULO,\u2026",
        status: "done",
        issue: "Temperature excursion"
      },
      {
        id: "218781210M",
        mode: "broker",
        provider: "CUSTOMER APPOINTED BROKER",
        eta: `${fmtMonDay(daysFrom(2))}, 2 PM CDT`,
        from: "SN ROD HELIO SMIDT, SAO PAU\u2026",
        to: "SN ROD HELIO SMIDT, SAO PAU\u2026",
        status: "current",
        issue: "Delay risk"
      },
      {
        id: "218781214M",
        mode: "truck",
        provider: "CUSTOMER APPOINTED BROKER",
        eta: `${fmtMonDay(daysFrom(2))}, 2 PM CDT`,
        from: "SN ROD HELIO SMIDT, SA\u2026",
        to: "Rua Vital Brasil, 251, Cidade Universit\u00e1ria\u2026",
        status: "pending"
      }
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
    leg: 2,
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
      {
        id: "218783301M",
        mode: "truck",
        provider: "WC LONDON",
        eta: `${fmtMonDay(daysFrom(3))}, 11 AM CDT`,
        from: "UNIT 3 CANADA ROAD, BYFLEET\u2026",
        to: "HEATHROW AIRPORT, LO\u2026",
        status: "done",
        issue: "Temperature excursion +1"
      },
      {
        id: "218783305M",
        mode: "plane",
        provider: "LATAM AIRLINES GROUP",
        eta: `${fmtMonDay(daysFrom(3))}, 11 AM CDT`,
        from: "HEATHROW AIRPORT, LONDO\u2026",
        to: "SN ROD HELIO SMIDT, SAO PAULO,\u2026",
        status: "current"
      },
      {
        id: "218783308M",
        mode: "broker",
        provider: "CUSTOMER APPOINTED BROKER",
        eta: `${fmtMonDay(daysFrom(3))}, 11 AM CDT`,
        from: "SN ROD HELIO SMIDT, SAO PAU\u2026",
        to: "SN ROD HELIO SMIDT, SAO PAU\u2026",
        status: "pending"
      },
      {
        id: "218783311M",
        mode: "truck",
        provider: "CUSTOMER APPOINTED BROKER",
        eta: `${fmtMonDay(daysFrom(3))}, 11 AM CDT`,
        from: "SN ROD HELIO SMIDT, SA\u2026",
        to: "Av. Albert Einstein, 627, Morumbi\u2026",
        status: "pending"
      }
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
    leg: 2,
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
      {
        id: "218788001M",
        mode: "truck",
        provider: "WC LONDON",
        eta: `${fmtMonDay(daysFrom(1))}, 9 AM CEST`,
        from: "MACCLESFIELD, SK10 2NA\u2026",
        to: "HEATHROW AIRPORT, LO\u2026",
        status: "done"
      },
      {
        id: "218788004M",
        mode: "plane",
        provider: "LUFTHANSA CARGO",
        eta: `${fmtMonDay(daysFrom(1))}, 9 AM CEST`,
        from: "HEATHROW AIRPORT, LONDO\u2026",
        to: "FRANKFURT AIRPORT, CARGO CITY\u2026",
        status: "current",
        issue: "Delay risk"
      },
      {
        id: "218788007M",
        mode: "truck",
        provider: "WC FRANKFURT",
        eta: `${fmtMonDay(daysFrom(1))}, 9 AM CEST`,
        from: "FRANKFURT AIRPORT, CARGO CITY\u2026",
        to: "Charit\u00e9platz 1, 10117 Berlin\u2026",
        status: "pending"
      }
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
    leg: 2,
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
      {
        id: "218791501M",
        mode: "truck",
        provider: "WC LONDON",
        eta: `${fmtMonDay(daysFrom(3))}, 6 PM IST`,
        from: "UNIT 3 CANADA ROAD, BYFLEET\u2026",
        to: "HEATHROW AIRPORT, LO\u2026",
        status: "done"
      },
      {
        id: "218791504M",
        mode: "plane",
        provider: "BRITISH AIRWAYS",
        eta: `${fmtMonDay(daysFrom(3))}, 6 PM IST`,
        from: "HEATHROW AIRPORT, LONDO\u2026",
        to: "MUMBAI AIRPORT, BOM\u2026",
        status: "current",
        issue: "Low battery"
      },
      {
        id: "218791507M",
        mode: "broker",
        provider: "WC MUMBAI",
        eta: `${fmtMonDay(daysFrom(3))}, 6 PM IST`,
        from: "MUMBAI AIRPORT, BOM\u2026",
        to: "MUMBAI AIRPORT, BOM\u2026",
        status: "pending"
      },
      {
        id: "218791510M",
        mode: "truck",
        provider: "WC MUMBAI",
        eta: `${fmtMonDay(daysFrom(3))}, 6 PM IST`,
        from: "MUMBAI AIRPORT, BOM\u2026",
        to: "Dr. E Borges Road, Parel\u2026",
        status: "pending"
      }
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
    leg: 3,
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
      {
        id: "218760001M",
        mode: "truck",
        provider: "WC LONDON",
        eta: `${fmtMonDay(daysFrom(-24))}, 10 AM BST`,
        from: "MACCLESFIELD, SK10 2NA\u2026",
        to: "WC LONDON HUB, BYFLEET\u2026",
        status: "done"
      },
      {
        id: "218760004M",
        mode: "truck",
        provider: "WC LONDON",
        eta: `${fmtMonDay(daysFrom(-24))}, 10 AM BST`,
        from: "WC LONDON HUB, BYFLEET\u2026",
        to: "Downs Road, Sutton SM2 5PT\u2026",
        status: "done"
      }
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
      {
        id: "218799001M",
        mode: "truck",
        provider: "WC LONDON",
        eta: `${fmtMonDay(daysFrom(1))}, 7 AM BST`,
        from: "MACCLESFIELD, SK10 2NA\u2026",
        to: "WC LONDON HUB, BYFLEET\u2026",
        status: "pending"
      },
      {
        id: "218799004M",
        mode: "truck",
        provider: "WC LONDON",
        eta: `${fmtMonDay(daysFrom(1))}, 7 AM BST`,
        from: "WC LONDON HUB, BYFLEET\u2026",
        to: "Great Maze Pond, London SE1 9RT\u2026",
        status: "pending"
      }
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
      {
        id: "218801001M",
        mode: "truck",
        provider: "WC FRANKFURT DEPOT",
        eta: `${fmtMonDay(daysFrom(1))}, 7 AM CEST`,
        from: "WC CLINICAL DEPOT, CARGO CITY S\u00dcD\u2026",
        to: "Charit\u00e9platz 1, 10117 Berlin\u2026",
        status: "current"
      },
      {
        id: "218801004M",
        mode: "truck",
        provider: "WC BERLIN",
        eta: `${fmtMonDay(daysFrom(1))}, 7 AM CEST`,
        from: "Charit\u00e9platz 1, 10117 Berlin\u2026",
        to: "SITE 014 PHARMACY \u00b7 CVK CAMPUS\u2026",
        status: "pending"
      }
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
      {
        id: "218803001M",
        mode: "truck",
        provider: "WC SINGAPORE DEPOT",
        eta: `${fmtMonDay(daysFrom(2))}, 11 AM SGT`,
        from: "WC CLINICAL DEPOT, CHANGI\u2026",
        to: "30 Hospital Boulevard, Singapore 168583\u2026",
        status: "pending"
      }
    ]
  }
]
