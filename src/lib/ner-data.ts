export type Risk = 'safe' | 'watch' | 'critical';

export interface DistrictData {
  id: string;
  name: string;
  state: 'Assam' | 'Arunachal Pradesh' | 'Manipur' | 'Meghalaya' | 'Mizoram' | 'Nagaland' | 'Sikkim' | 'Tripura';
  score: number; // 0-100 disruption risk
  status: Risk;
  x: number; // 0-100 relative SVG position
  y: number;
  access: number; // 0-100 accessibility index
  elevation: string;
  rainfall24h: number; // mm
  passStatus: 'Clear' | 'Restricted' | 'Blocked';
  depotStatus: 'Adequate' | 'Critical Reserves' | 'Stockpile Low';
  nearestNdrf: string;
  activeIncidents: number;
  hazardCluster: 'Cluster A' | 'Cluster B'; // Cluster A: Mountain Landslides | Cluster B: Riverine Floods & Islands
}

export const districts: DistrictData[] = [
  { id: 'DH', name: 'Dima Hasao', state: 'Assam', score: 86, status: 'critical', x: 49, y: 50, access: 32, elevation: '1,108 m', rainfall24h: 124, passStatus: 'Restricted', depotStatus: 'Critical Reserves', nearestNdrf: 'Silchar (1st Bn)', activeIncidents: 3, hazardCluster: 'Cluster A' },
  { id: 'KA', name: 'Karbi Anglong', state: 'Assam', score: 62, status: 'watch', x: 55, y: 43, access: 68, elevation: '410 m', rainfall24h: 81, passStatus: 'Clear', depotStatus: 'Adequate', nearestNdrf: 'Guwahati (1st Bn)', activeIncidents: 1, hazardCluster: 'Cluster A' },
  { id: 'KM', name: 'Kamrup Metro (Guwahati)', state: 'Assam', score: 28, status: 'safe', x: 41, y: 39, access: 94, elevation: '55 m', rainfall24h: 38, passStatus: 'Clear', depotStatus: 'Adequate', nearestNdrf: 'Patgaon Base HQ', activeIncidents: 0, hazardCluster: 'Cluster B' },
  { id: 'MJ', name: 'Majuli River Island', state: 'Assam', score: 74, status: 'watch', x: 64, y: 31, access: 42, elevation: '84 m', rainfall24h: 112, passStatus: 'Restricted', depotStatus: 'Stockpile Low', nearestNdrf: 'Jorhat Water Rescue', activeIncidents: 2, hazardCluster: 'Cluster B' },
  { id: 'DHB', name: 'Dhubri (Brahmaputra)', state: 'Assam', score: 55, status: 'watch', x: 31, y: 41, access: 71, elevation: '34 m', rainfall24h: 88, passStatus: 'Clear', depotStatus: 'Adequate', nearestNdrf: 'Jogighopa NDRF Post', activeIncidents: 1, hazardCluster: 'Cluster B' },
  { id: 'TW', name: 'Tawang', state: 'Arunachal Pradesh', score: 38, status: 'safe', x: 43, y: 19, access: 74, elevation: '3,048 m', rainfall24h: 46, passStatus: 'Clear', depotStatus: 'Adequate', nearestNdrf: 'Tezpur Staging', activeIncidents: 0, hazardCluster: 'Cluster A' },
  { id: 'IT', name: 'Papum Pare (Itanagar)', state: 'Arunachal Pradesh', score: 48, status: 'safe', x: 62, y: 22, access: 80, elevation: '750 m', rainfall24h: 62, passStatus: 'Clear', depotStatus: 'Adequate', nearestNdrf: 'Hollongi Unit', activeIncidents: 1, hazardCluster: 'Cluster A' },
  { id: 'MG', name: 'Mangan', state: 'Sikkim', score: 71, status: 'watch', x: 21, y: 37, access: 54, elevation: '1,604 m', rainfall24h: 106, passStatus: 'Restricted', depotStatus: 'Stockpile Low', nearestNdrf: 'Gangtok Unit (2nd Bn)', activeIncidents: 2, hazardCluster: 'Cluster A' },
  { id: 'GT', name: 'East Sikkim (Gangtok)', state: 'Sikkim', score: 44, status: 'safe', x: 24, y: 44, access: 82, elevation: '1,650 m', rainfall24h: 58, passStatus: 'Clear', depotStatus: 'Adequate', nearestNdrf: 'Gangtok 2nd Bn', activeIncidents: 0, hazardCluster: 'Cluster A' },
  { id: 'EKH', name: 'East Khasi Hills', state: 'Meghalaya', score: 78, status: 'critical', x: 39, y: 55, access: 48, elevation: '1,496 m', rainfall24h: 98, passStatus: 'Restricted', depotStatus: 'Stockpile Low', nearestNdrf: 'Shillong Sector HQ', activeIncidents: 2, hazardCluster: 'Cluster A' },
  { id: 'WGH', name: 'West Garo Hills', state: 'Meghalaya', score: 41, status: 'safe', x: 31, y: 53, access: 78, elevation: '650 m', rainfall24h: 44, passStatus: 'Clear', depotStatus: 'Adequate', nearestNdrf: 'Tura Quick Response', activeIncidents: 0, hazardCluster: 'Cluster B' },
  { id: 'KO', name: 'Kohima', state: 'Nagaland', score: 43, status: 'safe', x: 70, y: 47, access: 82, elevation: '1,444 m', rainfall24h: 54, passStatus: 'Clear', depotStatus: 'Adequate', nearestNdrf: 'Dimapur (12th Bn)', activeIncidents: 1, hazardCluster: 'Cluster A' },
  { id: 'MO', name: 'Mokokchung', state: 'Nagaland', score: 58, status: 'watch', x: 74, y: 39, access: 69, elevation: '1,325 m', rainfall24h: 72, passStatus: 'Clear', depotStatus: 'Adequate', nearestNdrf: 'Dimapur Detachment', activeIncidents: 1, hazardCluster: 'Cluster A' },
  { id: 'IW', name: 'Imphal West', state: 'Manipur', score: 66, status: 'watch', x: 65, y: 62, access: 76, elevation: '786 m', rainfall24h: 69, passStatus: 'Clear', depotStatus: 'Adequate', nearestNdrf: 'Koirengei Post', activeIncidents: 1, hazardCluster: 'Cluster B' },
  { id: 'CC', name: 'Churachandpur', state: 'Manipur', score: 69, status: 'watch', x: 61, y: 69, access: 61, elevation: '922 m', rainfall24h: 78, passStatus: 'Restricted', depotStatus: 'Stockpile Low', nearestNdrf: 'Koirengei SDRF', activeIncidents: 2, hazardCluster: 'Cluster A' },
  { id: 'AZ', name: 'Aizawl', state: 'Mizoram', score: 32, status: 'safe', x: 54, y: 74, access: 87, elevation: '1,132 m', rainfall24h: 42, passStatus: 'Clear', depotStatus: 'Adequate', nearestNdrf: 'Durtlang Post', activeIncidents: 0, hazardCluster: 'Cluster A' },
  { id: 'LU', name: 'Lunglei', state: 'Mizoram', score: 49, status: 'safe', x: 52, y: 84, access: 73, elevation: '722 m', rainfall24h: 63, passStatus: 'Clear', depotStatus: 'Adequate', nearestNdrf: 'Lunglei District Team', activeIncidents: 1, hazardCluster: 'Cluster A' },
  { id: 'WT', name: 'West Tripura (Agartala)', state: 'Tripura', score: 35, status: 'safe', x: 40, y: 72, access: 81, elevation: '38 m', rainfall24h: 49, passStatus: 'Clear', depotStatus: 'Adequate', nearestNdrf: 'Agartala (1st Bn)', activeIncidents: 0, hazardCluster: 'Cluster B' },
];

export interface StrategicChokepoint {
  id: string;
  name: string;
  category: 'Strategic Corridor' | 'Multimodal Hub' | 'Riverine Crossing' | 'Border Gateway';
  x: number; // SVG x
  y: number; // SVG y
  status: 'Open' | 'Congested' | 'High Alert' | 'Multi-Modal Shift';
  trafficLoad: string;
  description: string;
  alternativeRoute: string;
  significance: string;
}

export const strategicChokepoints: StrategicChokepoint[] = [
  {
    id: 'CHK-01',
    name: 'Siliguri Corridor ("Chicken\'s Neck")',
    category: 'Strategic Corridor',
    x: 18,
    y: 48,
    status: 'Congested',
    trafficLoad: '4,200 Trucks / 24h',
    description: '22 km narrow land bridge connecting mainland India with all 8 North Eastern states. Any disruption here isolates the entire region.',
    alternativeRoute: 'NFR Broad Gauge Freight Rail + Bangladesh Transit Protocol (PIWT)',
    significance: 'Single Continental Supply Lifeline for 45M Citizens',
  },
  {
    id: 'CHK-02',
    name: 'Jogighopa Multimodal Logistics Park (MMLP)',
    category: 'Multimodal Hub',
    x: 33,
    y: 40,
    status: 'Multi-Modal Shift',
    trafficLoad: 'Active Rail-River Ro-Ro Transfer',
    description: 'India\'s premier multimodal logistics park on Brahmaputra river connecting Rail, National Waterway-2, and NH-17.',
    alternativeRoute: 'Inland Waterway Barge to Pandu (Guwahati) + Broad Gauge Rail',
    significance: 'Primary Redundancy Hub when Highland Roads are Blocked',
  },
  {
    id: 'CHK-03',
    name: 'Majuli Island Ferry Crossing (NW-2)',
    category: 'Riverine Crossing',
    x: 64,
    y: 31,
    status: 'High Alert',
    trafficLoad: 'Ro-Pax Ferry Operating at 40% Capacity',
    description: 'World\'s largest inhabited riverine island on Brahmaputra. Swelling monsoon waters threaten ferry logistics and medical transfers.',
    alternativeRoute: 'Nimati Ghat to Aphalamukh Ro-Pax + Emergency Air Drop',
    significance: 'Cluster B Riverine Vulnerability Testing Benchmark',
  },
  {
    id: 'CHK-04',
    name: 'Srirampur & Boxirhat Border Gateways',
    category: 'Border Gateway',
    x: 28,
    y: 42,
    status: 'Open',
    trafficLoad: '2,850 Commercial Vehicles / 24h',
    description: 'Assam-West Bengal interstate border checkpoint where automated RFID / FASTag logistics profiling screens cargo entering NER.',
    alternativeRoute: 'Alipurduar Railway Interchange Bypass',
    significance: 'Entry Telemetry Gate for All Commercial Inflow',
  },
  {
    id: 'CHK-05',
    name: 'Jatinga Escarpment KM 148 (NH-27)',
    category: 'Strategic Corridor',
    x: 49,
    y: 50,
    status: 'High Alert',
    trafficLoad: 'Restricted to Emergency Essential Convoys Only',
    description: 'Steep sedimentary slope in Dima Hasao where 124mm rainfall triggered InSAR slope displacement of 14mm.',
    alternativeRoute: 'Umrangso → Lanka Highland Bypass (+42 min)',
    significance: 'Sole Direct Road Link to Silchar, Tripura, Mizoram & Manipur',
  },
  {
    id: 'CHK-06',
    name: 'Sonapur Tunnel Southern Axis (NH-06)',
    category: 'Strategic Corridor',
    x: 39,
    y: 55,
    status: 'High Alert',
    trafficLoad: 'Single-Lane Escort with BRO Bulldozers on Standby',
    description: 'Flash mudflow chute on Shillong-Silchar mountain highway. Heavy rain causes repeated landslide damming.',
    alternativeRoute: 'Jowai → Dawki → Badarpur Relief Diversion (+36 min)',
    significance: 'Secondary Lifeline into Southern NER Valleys',
  },
];

export interface CorridorData {
  id: string;
  name: string;
  focus: string;
  risk: number;
  rainfall: number;
  elevation: string;
  status: Risk;
  bypass: string;
  extra: string;
  impact: string;
  series: number[]; // 7-day risk trend
  distanceKm: number;
  avgSpeed: number; // km/h
  blockagePoint?: string;
  passCoords: [number, number]; // x, y for map visualization
  hazardCluster: 'Cluster A' | 'Cluster B';
}

export const corridors: CorridorData[] = [
  {
    id: 'NH-27',
    name: 'Guwahati → Silchar (East-West Corridor)',
    focus: 'Dima Hasao · Jatinga Hill Segment',
    risk: 86,
    rainfall: 124,
    elevation: '1,108 m',
    status: 'critical',
    bypass: 'Umrangso → Lanka Expressway Bypass',
    extra: '+42 min',
    impact: 'Life-saving Medical Supplies & Petroleum Fuel',
    series: [42, 47, 53, 49, 66, 74, 86],
    distanceKm: 341,
    avgSpeed: 28,
    blockagePoint: 'KM 148+200 Jatinga Escarpment',
    passCoords: [49, 50],
    hazardCluster: 'Cluster A',
  },
  {
    id: 'NH-06',
    name: 'Shillong → Silchar (Barak Valley Link)',
    focus: 'East Khasi Hills · Jowai Descent',
    risk: 78,
    rainfall: 98,
    elevation: '1,496 m',
    status: 'critical',
    bypass: 'Jowai → Dawki → Badarpur Relief Corridor',
    extra: '+36 min',
    impact: 'PDS Foodgrain & Baby Care Commodities',
    series: [38, 42, 49, 55, 61, 70, 78],
    distanceKm: 218,
    avgSpeed: 32,
    blockagePoint: 'Sonapur Tunnel Southern Approach',
    passCoords: [39, 55],
    hazardCluster: 'Cluster A',
  },
  {
    id: 'NH-10',
    name: 'Siliguri → Gangtok → Mangan Lifeline',
    focus: 'Teesta Valley · Mangan Upper Reach',
    risk: 71,
    rainfall: 106,
    elevation: '1,604 m',
    status: 'watch',
    bypass: 'Singtam → Dikchu → Phodong Bypass',
    extra: '+31 min',
    impact: 'Vaccine Consignments & Emergency Disaster Kits',
    series: [34, 38, 49, 58, 63, 57, 71],
    distanceKm: 145,
    avgSpeed: 24,
    blockagePoint: '29th Mile Slump Area',
    passCoords: [21, 37],
    hazardCluster: 'Cluster A',
  },
  {
    id: 'AS-21',
    name: 'Diphu → Haflong Border Highway',
    focus: 'Karbi Anglong Hill Slopes',
    risk: 62,
    rainfall: 81,
    elevation: '720 m',
    status: 'watch',
    bypass: 'Nagaon → Lumding Single-Lane Diversion',
    extra: '+58 min',
    impact: 'Fertilizers, Construction Hardware & Seeds',
    series: [27, 34, 37, 42, 53, 58, 62],
    distanceKm: 172,
    avgSpeed: 38,
    blockagePoint: 'Diyungbra River Crossing',
    passCoords: [55, 43],
    hazardCluster: 'Cluster A',
  },
  {
    id: 'NH-02',
    name: 'Dimapur → Kohima → Imphal Highway',
    focus: 'Kohima Gap · Senapati Transit',
    risk: 43,
    rainfall: 54,
    elevation: '1,444 m',
    status: 'safe',
    bypass: 'Standard Transit Corridor Clear',
    extra: '0 min',
    impact: 'Commercial Goods, Electronic Appliances & Perishables',
    series: [30, 35, 39, 34, 46, 41, 43],
    distanceKm: 214,
    avgSpeed: 44,
    passCoords: [70, 47],
    hazardCluster: 'Cluster A',
  },
];

export interface VehicleTelemetry {
  id: string;
  route: string;
  cargo: 'Medical' | 'Food' | 'Fuel' | 'Relief';
  cargoDetail: string;
  driverName: string;
  driverContact: string;
  eta: string;
  status: 'On schedule' | 'Rerouted' | 'Weather hold' | 'Priority transit';
  risk: Risk;
  progress: number; // percentage
  delay: number; // in minutes
  currentSpeed: string;
  satelliteFix: 'NavIC L5 Synced' | 'GPS Dual-Band' | 'Offline Beacon';
  destinationDepot: string;
}

export const vehicles: VehicleTelemetry[] = [
  {
    id: 'NER-MED-042',
    route: 'Guwahati → Haflong',
    cargo: 'Medical',
    cargoDetail: 'Insulin, Anti-venom & ICU Oxygen Cylinders',
    driverName: 'Suraj Sonowal',
    driverContact: '+91 94350-XXXXX',
    eta: '2h 18m',
    status: 'Rerouted',
    risk: 'watch',
    progress: 64,
    delay: 42,
    currentSpeed: '32 km/h',
    satelliteFix: 'NavIC L5 Synced',
    destinationDepot: 'Haflong Civil Hospital',
  },
  {
    id: 'NER-FOD-118',
    route: 'Dimapur → Imphal',
    cargo: 'Food',
    cargoDetail: 'Fortified Rice & Pulses (FCI Buffer Stock)',
    driverName: 'K. Angami',
    driverContact: '+91 98621-XXXXX',
    eta: '1h 42m',
    status: 'On schedule',
    risk: 'safe',
    progress: 78,
    delay: 0,
    currentSpeed: '46 km/h',
    satelliteFix: 'NavIC L5 Synced',
    destinationDepot: 'Imphal West State Granary',
  },
  {
    id: 'NER-FUL-071',
    route: 'Silchar → Aizawl',
    cargo: 'Fuel',
    cargoDetail: '18,000L High-Speed Diesel (IOCL Convoy)',
    driverName: 'M. Lalrindika',
    driverContact: '+91 97740-XXXXX',
    eta: '3h 05m',
    status: 'Weather hold',
    risk: 'critical',
    progress: 38,
    delay: 85,
    currentSpeed: '0 km/h (Halted)',
    satelliteFix: 'NavIC L5 Synced',
    destinationDepot: 'Aizawl POL Terminal',
  },
  {
    id: 'NER-MED-209',
    route: 'Gangtok → Mangan',
    cargo: 'Medical',
    cargoDetail: 'Universal Immunization Vaccines & Syringes',
    driverName: 'Tenzing Bhutia',
    driverContact: '+91 94340-XXXXX',
    eta: '54m',
    status: 'Priority transit',
    risk: 'watch',
    progress: 82,
    delay: 18,
    currentSpeed: '28 km/h',
    satelliteFix: 'GPS Dual-Band',
    destinationDepot: 'Mangan District Health Office',
  },
  {
    id: 'NER-REL-034',
    route: 'Shillong → Jowai',
    cargo: 'Relief',
    cargoDetail: 'Tarpaulins, Water Purification Sachets & Rations',
    driverName: 'B. Marbaniang',
    driverContact: '+91 98560-XXXXX',
    eta: '1h 12m',
    status: 'On schedule',
    risk: 'safe',
    progress: 56,
    delay: 0,
    currentSpeed: '41 km/h',
    satelliteFix: 'NavIC L5 Synced',
    destinationDepot: 'Jowai Flood Relief Depot',
  },
  {
    id: 'NER-FOD-176',
    route: 'Agartala → Silchar',
    cargo: 'Food',
    cargoDetail: 'Wheat Flour & Edible Mustard Oil',
    driverName: 'Pranab Debbarma',
    driverContact: '+91 94361-XXXXX',
    eta: '4h 10m',
    status: 'On schedule',
    risk: 'safe',
    progress: 41,
    delay: 0,
    currentSpeed: '52 km/h',
    satelliteFix: 'NavIC L5 Synced',
    destinationDepot: 'Silchar Railhead Storage',
  },
  {
    id: 'NER-REL-091',
    route: 'Tezpur → Tawang',
    cargo: 'Relief',
    cargoDetail: 'Extreme Winter Thermal Blankets & Generator Gensets',
    driverName: 'Tashi Dorjee',
    driverContact: '+91 94020-XXXXX',
    eta: '5h 28m',
    status: 'Rerouted',
    risk: 'watch',
    progress: 29,
    delay: 55,
    currentSpeed: '22 km/h',
    satelliteFix: 'Offline Beacon',
    destinationDepot: 'Tawang BRO Logistics Staging',
  },
];

export interface OperationalAlert {
  id: string;
  title: string;
  place: string;
  time: string;
  status: Risk;
  category: 'Landslide' | 'Inundation' | 'Bridge Structural' | 'Convoy Escort' | 'Clearance';
  sourceAgency: string;
  description: string;
  suggestedAction: string;
  voiceText?: string;
}

export const alerts: OperationalAlert[] = [
  {
    id: 'ALT-1092',
    title: 'High Landslide Probability & Slope Instability',
    place: 'NH-27 · KM 148 Jatinga Slump (Dima Hasao)',
    time: '4 min ago',
    status: 'critical',
    category: 'Landslide',
    sourceAgency: 'Geological Survey of India & IMD Telemetry',
    description: 'InSAR ground displacement of 14mm detected after 124mm rainfall in 18 hrs. Escarpment saturated.',
    suggestedAction: 'Enforce Umrangso → Lanka diversion for heavy multi-axle freight immediately.',
    voiceText: 'Critical landslide warning on National Highway 27 at Jatinga Escarpment. Heavy vehicles are being diverted via Umrangso.',
  },
  {
    id: 'ALT-1091',
    title: 'Single-Lane Traffic Restored with BRO Escort',
    place: 'NH-10 · 29th Mile Segment (Mangan Axis)',
    time: '12 min ago',
    status: 'watch',
    category: 'Clearance',
    sourceAgency: 'Border Roads Organisation (Project Swastik)',
    description: 'Debris clearing dozer operating on right bank. Light passenger and emergency medical vehicles permitted.',
    suggestedAction: 'Prioritize medical vehicle NER-MED-209 through escort checkpost.',
    voiceText: 'Notice for Sikkim highway: Single-lane traffic restored at 29th Mile under Border Roads Organisation escort.',
  },
  {
    id: 'ALT-1090',
    title: 'Priority Medical Convoy Rerouted via Dawki',
    place: 'NH-06 · Jowai Descent Bypass (Meghalaya)',
    time: '18 min ago',
    status: 'watch',
    category: 'Convoy Escort',
    sourceAgency: 'State Disaster Management Authority (SDMA)',
    description: 'Mudflow near Sonapur tunnel approach prompted preventative bypass activation.',
    suggestedAction: 'Notify Barak Valley civil hospital of 36 min revised arrival estimate.',
    voiceText: 'Meghalaya corridor alert: Mudflow near Sonapur tunnel. Emergency convoys diverted via Dawki route.',
  },
  {
    id: 'ALT-1089',
    title: 'Road Clearance Confirmed & Rock-Net Secured',
    place: 'NH-02 · Zubza Pass (Kohima)',
    time: '31 min ago',
    status: 'safe',
    category: 'Clearance',
    sourceAgency: 'Nagaland PWD (National Highways)',
    description: 'All fallen boulders cleared; slope-net retention intact. Both dual carriageways operational.',
    suggestedAction: 'Resume standard freight dispatch schedule for Imphal Valley.',
    voiceText: 'Nagaland Kohima update: Zubza Pass cleared. Full double lane operation restored.',
  },
  {
    id: 'ALT-1088',
    title: 'Flash Flood Watch for Low-Lying Crossings',
    place: 'Diyung River Basin · Karbi Anglong Border',
    time: '45 min ago',
    status: 'watch',
    category: 'Inundation',
    sourceAgency: 'Central Water Commission (CWC)',
    description: 'Water level at 0.8m below danger mark with continuous catchment precipitation.',
    suggestedAction: 'Issue caution notice to heavy petroleum carriers on AS-21.',
    voiceText: 'Central Water Commission watch: Diyung river rising. Heavy tankers advised caution.',
  },
];

export const weekly = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export interface PlatformPillar {
  title: string;
  subtitle: string;
  badge: string;
  description: string;
  metrics: string;
  iconName: string;
}

export const platformPillars: PlatformPillar[] = [
  {
    title: 'AI Disruption Forecasting',
    subtitle: 'Physics-informed terrain risk models',
    badge: 'InSAR + IMD Radar',
    description: 'Integrates real-time satellite radar interferometry, precipitation grid data, and geological slope contours to forecast landslide likelihood 24 hours in advance.',
    metrics: '91.4% Early Warning Accuracy',
    iconName: 'ShieldAlert',
  },
  {
    title: 'Dynamic Multi-Modal Routing',
    subtitle: 'Adaptive terrain rerouting engine',
    badge: 'PM Gati Shakti',
    description: 'Automatically calculates safest alternate highland passes and valley detours for critical medical, POL (petroleum) and foodgrain freight upon route hazard detection.',
    metrics: '-38% Transit Bottleneck Delays',
    iconName: 'Navigation',
  },
  {
    title: 'NavIC Real-Time Telemetry',
    subtitle: 'Indigenous satellite fleet tracking',
    badge: 'ISRO NavIC L5',
    description: 'High-precision indigenous satellite tracking engineered specifically for steep Himalayan shadow canyons where conventional GPS frequently loses constellation locks.',
    metrics: 'Sub-3 Meter High-Mountain Accuracy',
    iconName: 'Radio',
  },
  {
    title: 'Offline-First Field Mesh',
    subtitle: 'Zero-connectivity resilience',
    badge: 'SQLite + WebWorkers',
    description: 'Allows drivers, field officers and district magistrates to capture road blockages, upload georeferenced photos, and view pre-cached advisories without cellular network.',
    metrics: '100% Offline Caching Capability',
    iconName: 'WifiOff',
  },
  {
    title: '230+ Regional Language UI',
    subtitle: 'Voice & text accessible for drivers',
    badge: 'Bhashini AI Core',
    description: 'Localized audio turn-by-turn road alerts in Assamese, Bodo, Meitei, Bengali, Khasi, Garo, Mizo, Nagamese and Hindi for grassroots truck pilots.',
    metrics: 'Zero-Literacy Voice Nav Mode',
    iconName: 'Languages',
  },
  {
    title: 'Verified Responder Network',
    subtitle: 'Secure institutional identity',
    badge: 'DigiLocker / Aadhaar',
    description: 'Cryptographically authenticated field dispatch and crowd verification ensuring reports from PWD, BRO, SDRF, and registered convoy drivers remain spoof-proof.',
    metrics: 'Official Government Verification',
    iconName: 'CheckCircle2',
  },
  {
    title: 'RAG Decision Co-Pilot',
    subtitle: 'Grounded logistics intelligence',
    badge: 'SLM + Vector Index',
    description: 'Natural language strategic command interface that synthesizes road passes, weather radars, fuel depots and hospital inventories into concise executive SITREPs.',
    metrics: '<1.2s Intelligence Response Time',
    iconName: 'Bot',
  },
  {
    title: 'Unified Command Interop',
    subtitle: 'MDoNER · NDMA · State SDMAs',
    badge: 'National Data Protocol',
    description: 'Single-pane-of-glass dashboard connecting New Delhi central command, 8 state secretariats, and 64 border district magistrate war rooms simultaneously.',
    metrics: '8 North East States Unified',
    iconName: 'Building2',
  },
];

export interface MultimodalOption {
  mode: 'Road Highland Bypass' | 'NFR Rail Cargo Shuttle' | 'IWAI Inland Waterway (NW-2)';
  name: string;
  route: string;
  travelTime: string;
  delayVsStandard: string;
  capacity: string;
  riskScore: number;
  status: 'Recommended' | 'Standby' | 'Active Transit';
  transitCostIndex: string;
  carbonOffset: string;
  agency: string;
}

export const multimodalFallbackOptions: Record<string, MultimodalOption[]> = {
  'NH-27': [
    {
      mode: 'Road Highland Bypass',
      name: 'Umrangso → Lanka Hill Diversion',
      route: 'Guwahati → Lanka → Umrangso → Haflong → Silchar',
      travelTime: '7h 12m',
      delayVsStandard: '+42 min',
      capacity: 'Up to 24 MT Multi-Axle Trucks',
      riskScore: 48,
      status: 'Recommended',
      transitCostIndex: 'Standard +8%',
      carbonOffset: '+12 kg CO2/ton',
      agency: 'Assam PWD (NH) & State Highway Patrol',
    },
    {
      mode: 'NFR Rail Cargo Shuttle',
      name: 'NFR Lumding–Badarpur Hill Section Ro-Ro',
      route: 'Guwahati Depot → Lumding Railhead → Badarpur Junction (Silchar)',
      travelTime: '5h 30m',
      delayVsStandard: '-1h 00m (Fast Freight)',
      capacity: '1,400 Metric Tonnes (42 BTPN Tankers / BoxN Wagons)',
      riskScore: 22,
      status: 'Active Transit',
      transitCostIndex: 'Bulk Subsidized (-18%)',
      carbonOffset: '-42% Carbon Emissions',
      agency: 'Northeast Frontier Railway (NFR) Disaster Ops',
    },
    {
      mode: 'IWAI Inland Waterway (NW-2)',
      name: 'Brahmaputra River Barge + Road Feeder',
      route: 'Pandu Multi-Modal Port (Guwahati) → Jogighopa Terminal → Dhubri Riverhead',
      travelTime: '9h 45m',
      delayVsStandard: '+3h 15m',
      capacity: '600 Metric Tonnes Heavy Ro-Pax Barge',
      riskScore: 16,
      status: 'Standby',
      transitCostIndex: 'Eco-Economic (-26%)',
      carbonOffset: '-58% Carbon Emissions',
      agency: 'Inland Waterways Authority of India (IWAI)',
    },
  ],
};

export interface BVSParameter {
  id: string;
  name: string;
  symbol: string;
  weight: number;
  description: string;
  currentValue: number;
  unit: string;
  min: number;
  max: number;
}

export const defaultBVSParameters: BVSParameter[] = [
  {
    id: 'geology',
    name: 'Geological Stratum Fragility',
    symbol: 'G',
    weight: 0.35,
    description: 'Sedimentary shale & sandstone shear weakness rating (GSI lithology database)',
    currentValue: 0.85,
    unit: 'Index [0-1]',
    min: 0.1,
    max: 1.0,
  },
  {
    id: 'slope',
    name: 'Mountain Slope Inclination',
    symbol: 'S',
    weight: 0.25,
    description: 'Digital Elevation Model (DEM) slope steepness angle',
    currentValue: 44,
    unit: 'Degrees (°)',
    min: 10,
    max: 75,
  },
  {
    id: 'rain',
    name: 'Dynamic 24h Rainfall Rate',
    symbol: 'R',
    weight: 0.25,
    description: 'IMD Doppler & AWS precipitation volume in catchment',
    currentValue: 124,
    unit: 'mm / 24h',
    min: 0,
    max: 250,
  },
  {
    id: 'moisture',
    name: 'InSAR Soil Saturation Index',
    symbol: 'M',
    weight: 0.15,
    description: 'Sentinel-1 InSAR soil moisture & pore-water pressure saturation',
    currentValue: 88,
    unit: '% Saturated',
    min: 0,
    max: 100,
  },
];

export interface VoiceAdvisory {
  language: 'English' | 'हिन्दी' | 'অসমীয়া' | 'বাংলা' | 'মৈতৈলোন্';
  langCode: string;
  region: string;
  announcement: string;
}

export const bhashiniVoiceAdvisories: VoiceAdvisory[] = [
  {
    language: 'English',
    langCode: 'en-IN',
    region: 'National Standard',
    announcement: 'NER-SARTHI Emergency Alert: Heavy landslide warning on National Highway 27 at Jatinga Escarpment. All commercial freight diverted via Umrangso.',
  },
  {
    language: 'हिन्दी',
    langCode: 'hi-IN',
    region: 'Central Command',
    announcement: 'एनईआर-सारथी आपातकालीन सूचना: राष्ट्रीय राजमार्ग 27 पर जतिंगा में भूस्खलन का भारी जोखिम है। सभी मालवाहक वाहनों को उमरांगसो मार्ग पर मोड़ा जा रहा है।',
  },
  {
    language: 'অসমীয়া',
    langCode: 'as-IN',
    region: 'Assam & Barak Valley',
    announcement: 'এনইআৰ-সাৰথি জৰুৰী সতৰ্কবাৰ্তা: ডিমা হাছাওৰ জাতিংগাত ভূমিস্খলনৰ উচ্চ আশংকা। গুৱাহাটী-শিলচৰ সংযোগী বাহনসমূহ উমৰাংচু বাইপাচেৰে প্ৰেৰণ কৰা হৈছে।',
  },
  {
    language: 'বাংলা',
    langCode: 'bn-IN',
    region: 'Tripura & Southern Assam',
    announcement: 'এনইআর-সারথি সতর্কবার্তা: জাতীয় সড়ক ২৭-এ জটিঙ্গা পাহাড়ে ধসের ঝুঁকি বৃদ্ধি পেয়েছে। শিলচর ও আগরতলাগামী সমস্ত ট্রাক উমরাংসো হয়ে যাত্রা করুন।',
  },
  {
    language: 'মৈতৈলোন্',
    langCode: 'mni-IN',
    region: 'Manipur Imphal Corridor',
    announcement: 'NER-SARTHI paorou: National Highway 27 da Jatinga maphamda leingak khaba themjinbire. Umrangso lambida gari maru oiba maram sing chatkhrasan.',
  },
];

// Live convoy simulation replay path points (Guwahati to Silchar via Umrangso)
export const convoySimulationPoints = [
  { x: 41, y: 39, name: 'Guwahati Central Depot', speed: '55 km/h', status: 'Departed Green Corridor', time: '06:00 IST' },
  { x: 47, y: 41, name: 'Lanka Inspection Checkpost', speed: '48 km/h', status: 'RFID FASTag Cleared', time: '07:35 IST' },
  { x: 50, y: 46, name: 'Umrangso Highland Detour Turnoff', speed: '34 km/h', status: 'Bypass Enforced (NH-27 KM 148 Blocked)', time: '08:50 IST' },
  { x: 51, y: 49, name: 'Diyung Valley Bridge Crossing', speed: '31 km/h', status: 'CWC Sensor Water Level Normal', time: '09:40 IST' },
  { x: 49, y: 50, name: 'Haflong Hill Outskirts', speed: '28 km/h', status: 'NavIC L5 Altitude 1,108m', time: '10:20 IST' },
  { x: 48, y: 54, name: 'Badarpur NFR Rail Interchange', speed: '42 km/h', status: 'Approaching Silchar Civil Hub', time: '11:15 IST' },
];

export const aiQueries = [
  {
    q: 'Which routes to Dima Hasao are at critical risk?',
    answer: 'NH-27 near Jatinga Escarpment is at critical landslide hazard (86/100) due to 124 mm accumulated rainfall and slope saturation. Harangajao approach is restricted by district PWD. Emergency cargo must utilize the Umrangso → Lanka alternate corridor, which adds approximately 42 minutes travel time.',
    confidence: 94,
    sources: ['IMD Rain Gauge Grid · Station DH-4', 'InSAR Satellite Soil Saturation · GSI', 'PWD Haflong Field SITREP #281'],
    action: 'Divert convoy NER-MED-042 and fuel carrier NER-FUL-071 via Umrangso before 17:30 IST.',
    routeToInspect: 'NH-27',
  },
  {
    q: 'Show status of life-saving medical shipments',
    answer: 'Two high-priority consignments are in motion: Convoy NER-MED-042 (Insulin & Oxygen) to Haflong has been actively diverted via Umrangso with revised ETA of 2h 18m. Convoy NER-MED-209 (Vaccines) to Mangan is proceeding under BRO escort on NH-10 with ETA of 54m.',
    confidence: 96,
    sources: ['Fleet NavIC Telemetry Feed', 'Civil Hospital Medical Store Registers', 'Project Swastik Escort Log'],
    action: 'Confirm green-corridor priority signal clearance with Assam Police at Lanka Checkpost.',
    routeToInspect: 'NH-10',
  },
  {
    q: 'What is the multimodal fallback if Siliguri Corridor or NH-27 closes completely?',
    answer: 'If the road corridor is fully severed, NER-SARTHI triggers the NFR Broad-Gauge Freight Railhead from Lumding to Badarpur (1,400 MT capacity, 5.5h) and activates IWAI National Waterway-2 Ro-Pax barge service between Pandu Port (Guwahati) and Jogighopa Terminal (600 MT per barge voyage).',
    confidence: 97,
    sources: ['PM Gati Shakti Intermodal Master Database', 'NFR Freight Division Maligaon', 'IWAI Regional Directive NW-2'],
    action: 'Switch dispatch manifest from Road to NFR Rail Freight rake #NER-RAIL-408 at Lumding.',
    routeToInspect: 'NH-27',
  },
  {
    q: 'What is the safest bypass route to Gangtok and Mangan?',
    answer: 'The primary Siliguri–Gangtok–Mangan NH-10 corridor is on watch (71/100) with single-lane clearance at 29th Mile. The validated diversion is via Singtam → Dikchu → Phodong Bypass (+31 min). Terrain stability model indicates heavy commercial vehicles over 16T should stage at Rangpo until 06:00 IST tomorrow.',
    confidence: 89,
    sources: ['Sikkim SDMA Highway Radar', 'BRO Project Swastik Clearance Notice', 'Teesta Basin Hydrology Model'],
    action: 'Signal Singtam diversion to all north-bound convoy pilots via SMS & IVR advisory.',
    routeToInspect: 'NH-10',
  },
  {
    q: 'Summarise today’s regional executive situation report (SITREP)',
    answer: '8 of 8 NER states are operational. 64 districts monitored with 6 classified under high disruption exposure (Dima Hasao, East Khasi Hills, Mangan, Churachandpur, Mokokchung, Karbi Anglong). 1,284 commercial & relief shipments active across 142 surveyed routes. Total on-time delivery rate is 72%, with 21% weather-delayed and 7% halted at mountain staging yards.',
    confidence: 98,
    sources: ['National Decision Support System Core', 'All 8 State Logistics Portals', 'Central Highway Telemetry Stream'],
    action: 'Export automated 10:00 IST Inter-Ministry SITREP PDF for MDoNER review.',
    routeToInspect: 'NH-27',
  },
  {
    q: 'Check fuel and POL reserves for Aizawl and Barak Valley',
    answer: 'Aizawl POL terminal reports 4.2 days of High-Speed Diesel buffer stock remaining. Tanker NER-FUL-071 (18,000L) is temporarily halted on the Silchar–Aizawl border due to heavy monsoon downpour. Silchar railhead depot buffer stands at 88% capacity. Tanker movement should resume under dawn escort at 05:30 IST.',
    confidence: 91,
    sources: ['IOCL Regional Logistics Tracker', 'Mizoram Civil Supplies Directorate', 'NH-06 Weather Radar'],
    action: 'Issue advisory to Aizawl fuel distributors to prioritize emergency ambulance fleets.',
    routeToInspect: 'NH-06',
  },
];

export const metadata = (title: string, description: string) => ({
  meta: [
    { title: `${title} | NER-SARTHI · Govt of India` },
    { name: 'description', content: description },
    { property: 'og:title', content: `${title} | NER-SARTHI` },
    { property: 'og:description', content: description },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ],
});
