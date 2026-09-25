/**
 * Smart Metro - Centralized Transit Data Architecture
 * Complete Prototype Network for Pune Metro (Purple Line & Aqua Line)
 * Connected via District Court Pune Interchange.
 */

export interface MetroStation {
  id: string;
  name: string;
  nameMarathi: string;
  line: 'Purple Line' | 'Aqua Line';
  lineColor: string; // Purple or Aqua
  lineCode: 'PL' | 'AL';
  order: number;
  isInterchange: boolean;
  interchangeLine?: string;
  facilities: string[];
  firstTrain: string;
  lastTrain: string;
  nextTrains: {
    destination: string;
    etaMinutes: number;
    platform: string;
  }[];
  description: string;
  address: string;
  gates: { number: string; name: string; landmark: string }[];
  popularNearby: string[];
  coordinates: { x: number; y: number }; // Relative coordinates for schematic map
}

// PURPLE LINE STATIONS (13 Stations: PCMC to Swargate)
export const PURPLE_LINE_STATIONS: MetroStation[] = [
  {
    id: 'pcmc',
    name: 'PCMC',
    nameMarathi: 'पिंपरी चिंचवड मनपा',
    line: 'Purple Line',
    lineColor: '#7C3AED',
    lineCode: 'PL',
    order: 1,
    isInterchange: false,
    facilities: ['Lift', 'Escalator', 'Washroom', 'Wi-Fi', 'Parking', 'Bicycle Stands'],
    firstTrain: '06:00 AM',
    lastTrain: '10:45 PM',
    nextTrains: [
      { destination: 'Swargate', etaMinutes: 4, platform: 'Platform 1' }
    ],
    description: 'Northern terminal of the Purple Line serving Pimpri-Chinchwad Municipal Corporation headquarters and industrial zones.',
    address: 'Old Mumbai-Pune Highway, Pimpri, Pune 411018',
    gates: [
      { number: 'Gate 1', name: 'PCMC Bhavan', landmark: 'Municipal Corporation Building' },
      { number: 'Gate 2', name: 'Highway North', landmark: 'Finolex Chowk' }
    ],
    popularNearby: ['PCMC Head Office', 'Pimpri Railway Station', 'Dr. D.Y. Patil Medical College', 'Finolex Chowk'],
    coordinates: { x: 200, y: 35 }
  },
  {
    id: 'sant-tukaram-nagar',
    name: 'Sant Tukaram Nagar',
    nameMarathi: 'संत तुकाराम नगर',
    line: 'Purple Line',
    lineColor: '#7C3AED',
    lineCode: 'PL',
    order: 2,
    isInterchange: false,
    facilities: ['Lift', 'Escalator', 'Washroom', 'Wi-Fi'],
    firstTrain: '06:03 AM',
    lastTrain: '10:48 PM',
    nextTrains: [
      { destination: 'Swargate', etaMinutes: 7, platform: 'Platform 1' },
      { destination: 'PCMC', etaMinutes: 3, platform: 'Platform 2' }
    ],
    description: 'Serving the central educational and healthcare hub in Pimpri, near Vallabh Nagar ST Bus Stand and YCM Hospital.',
    address: 'Near YCM Hospital, Sant Tukaram Nagar, Pimpri, Pune 411018',
    gates: [
      { number: 'Gate 1', name: 'YCM Hospital', landmark: 'YCM Hospital & Medical College' },
      { number: 'Gate 2', name: 'Vallabh Nagar Bus Stand', landmark: 'MSRTC Bus Terminal' }
    ],
    popularNearby: ['YCM Hospital', 'Vallabh Nagar ST Stand', 'D.Y. Patil Institute', 'Mahesh Nagar'],
    coordinates: { x: 200, y: 70 }
  },
  {
    id: 'nashik-phata',
    name: 'Nashik Phata',
    nameMarathi: 'नाशिक फाटा (भोसरी)',
    line: 'Purple Line',
    lineColor: '#7C3AED',
    lineCode: 'PL',
    order: 3,
    isInterchange: false,
    facilities: ['Lift', 'Escalator', 'Washroom', 'Wi-Fi', 'Parking'],
    firstTrain: '06:06 AM',
    lastTrain: '10:51 PM',
    nextTrains: [
      { destination: 'Swargate', etaMinutes: 9, platform: 'Platform 1' },
      { destination: 'PCMC', etaMinutes: 5, platform: 'Platform 2' }
    ],
    description: 'Major multi-level road flyover interchange connecting Old Mumbai-Pune Highway with Pune-Nashik National Highway.',
    address: 'Kasarwadi Flyover Junction, Nashik Phata, Pune 411034',
    gates: [
      { number: 'Gate 1', name: 'Nashik Highway Link', landmark: 'Bhosari MIDC Flyover' },
      { number: 'Gate 2', name: 'Kasarwadi Bridge', landmark: 'Kasarwadi Railway Station' }
    ],
    popularNearby: ['Bhosari Industrial Area', 'Kasarwadi Suburb', 'Govt Polytechnic', 'Indrayani Nagar Link'],
    coordinates: { x: 200, y: 105 }
  },
  {
    id: 'kasarwadi',
    name: 'Kasarwadi',
    nameMarathi: 'कासारवाडी',
    line: 'Purple Line',
    lineColor: '#7C3AED',
    lineCode: 'PL',
    order: 4,
    isInterchange: false,
    facilities: ['Lift', 'Escalator', 'Washroom', 'Wi-Fi'],
    firstTrain: '06:09 AM',
    lastTrain: '10:54 PM',
    nextTrains: [
      { destination: 'Swargate', etaMinutes: 12, platform: 'Platform 1' },
      { destination: 'PCMC', etaMinutes: 7, platform: 'Platform 2' }
    ],
    description: 'Suburban station serving Kasarwadi residential community, local railway halt, and nearby industrial hubs.',
    address: 'Near Kasarwadi Post Office, Mumbai Pune Road, Pune 411034',
    gates: [
      { number: 'Gate 1', name: 'Kasarwadi Main', landmark: 'Railway Station Road' }
    ],
    popularNearby: ['Kasarwadi Suburban Station', 'Century Enka', 'Alfa Laval', 'Old Highway Market'],
    coordinates: { x: 200, y: 140 }
  },
  {
    id: 'phugewadi',
    name: 'Phugewadi',
    nameMarathi: 'फुगेवाडी',
    line: 'Purple Line',
    lineColor: '#7C3AED',
    lineCode: 'PL',
    order: 5,
    isInterchange: false,
    facilities: ['Lift', 'Escalator', 'Washroom', 'Wi-Fi', 'Parking'],
    firstTrain: '06:12 AM',
    lastTrain: '10:57 PM',
    nextTrains: [
      { destination: 'Swargate', etaMinutes: 14, platform: 'Platform 1' },
      { destination: 'PCMC', etaMinutes: 9, platform: 'Platform 2' }
    ],
    description: 'Elevated station serving Phugewadi, Sandvik Asia, and local industrial manufacturing units.',
    address: 'Phugewadi Chowk, Mumbai Pune Road, Pune 411012',
    gates: [
      { number: 'Gate 1', name: 'Dapodi Border', landmark: 'Phugewadi Chowk' }
    ],
    popularNearby: ['Sandvik Asia', 'Phugewadi Toll Link', 'Harris Bridge North'],
    coordinates: { x: 200, y: 175 }
  },
  {
    id: 'dapodi',
    name: 'Dapodi',
    nameMarathi: 'दापोडी',
    line: 'Purple Line',
    lineColor: '#7C3AED',
    lineCode: 'PL',
    order: 6,
    isInterchange: false,
    facilities: ['Lift', 'Escalator', 'Washroom', 'Wi-Fi'],
    firstTrain: '06:15 AM',
    lastTrain: '11:00 PM',
    nextTrains: [
      { destination: 'Swargate', etaMinutes: 16, platform: 'Platform 1' },
      { destination: 'PCMC', etaMinutes: 11, platform: 'Platform 2' }
    ],
    description: 'Station connecting the military engineering cantonment, College of Military Engineering (CME), and Harris Bridge over Pavana River.',
    address: 'Near Harris Bridge, Dapodi, Pune 411012',
    gates: [
      { number: 'Gate 1', name: 'CME Gate', landmark: 'College of Military Engineering' },
      { number: 'Gate 2', name: 'Harris Bridge South', landmark: 'Pavana River Bridge' }
    ],
    popularNearby: ['College of Military Engineering (CME)', 'Harris Bridge', 'Dapodi Railway Station', '512 Army Base'],
    coordinates: { x: 200, y: 210 }
  },
  {
    id: 'bopodi',
    name: 'Bopodi',
    nameMarathi: 'बोपोडी',
    line: 'Purple Line',
    lineColor: '#7C3AED',
    lineCode: 'PL',
    order: 7,
    isInterchange: false,
    facilities: ['Lift', 'Escalator', 'Washroom', 'Wi-Fi'],
    firstTrain: '06:18 AM',
    lastTrain: '11:03 PM',
    nextTrains: [
      { destination: 'Swargate', etaMinutes: 18, platform: 'Platform 1' },
      { destination: 'PCMC', etaMinutes: 13, platform: 'Platform 2' }
    ],
    description: 'Transit access for Bopodi village, Spicer Adventist University, and Aundh Road connector.',
    address: 'Aundh Road Junction, Bopodi, Pune 411020',
    gates: [
      { number: 'Gate 1', name: 'Aundh Road', landmark: 'Spicer College Campus' }
    ],
    popularNearby: ['Spicer Adventist University', 'Aundh Road Connector', 'Bopodi Bazaar'],
    coordinates: { x: 200, y: 245 }
  },
  {
    id: 'khadki',
    name: 'Khadki',
    nameMarathi: 'खडकी',
    line: 'Purple Line',
    lineColor: '#7C3AED',
    lineCode: 'PL',
    order: 8,
    isInterchange: false,
    facilities: ['Lift', 'Escalator', 'Washroom', 'Wi-Fi', 'Parking'],
    firstTrain: '06:21 AM',
    lastTrain: '11:06 PM',
    nextTrains: [
      { destination: 'Swargate', etaMinutes: 20, platform: 'Platform 1' },
      { destination: 'PCMC', etaMinutes: 15, platform: 'Platform 2' }
    ],
    description: 'Serves the historic Khadki Cantonment, Ammunition Factory, and Khadki railway junction for suburban locals.',
    address: 'Khadki Bazaar Road, Cantonment Area, Pune 411003',
    gates: [
      { number: 'Gate 1', name: 'Khadki Railway Station', landmark: 'Khadki Railway Exit' },
      { number: 'Gate 2', name: 'Ordnance Gate', landmark: 'Khadki Cantonment Board' }
    ],
    popularNearby: ['Khadki Cantonment', 'Ammunition Factory Khadki', 'Khadki Railway Station', 'War Cemetery'],
    coordinates: { x: 200, y: 280 }
  },
  {
    id: 'shivajinagar',
    name: 'Shivajinagar',
    nameMarathi: 'शिवाजीनगर',
    line: 'Purple Line',
    lineColor: '#7C3AED',
    lineCode: 'PL',
    order: 9,
    isInterchange: false,
    facilities: ['Lift', 'Escalator', 'Washroom', 'Wi-Fi', 'First Aid', 'Parking'],
    firstTrain: '06:00 AM',
    lastTrain: '11:10 PM',
    nextTrains: [
      { destination: 'Swargate', etaMinutes: 3, platform: 'Platform 1' },
      { destination: 'PCMC', etaMinutes: 6, platform: 'Platform 2' }
    ],
    description: 'Crucial underground central station in the heart of Pune, integrated with Shivajinagar Railway Station and ST bus terminus.',
    address: 'Near Shivajinagar Railway Station, FC Road Link, Pune 411005',
    gates: [
      { number: 'Gate 1', name: 'FC Road / COEP', landmark: 'College of Engineering, Pune' },
      { number: 'Gate 2', name: 'Railway Station Link', landmark: 'Shivajinagar Railway Station' }
    ],
    popularNearby: ['Fergusson College Road', 'COEP Tech University', 'District Sessions Court', 'Sancheti Hospital'],
    coordinates: { x: 200, y: 315 }
  },
  {
    id: 'district-court-pune',
    name: 'District Court Pune',
    nameMarathi: 'जिल्हा न्यायालय पुणे',
    line: 'Purple Line',
    lineColor: '#7C3AED',
    lineCode: 'PL',
    order: 10,
    isInterchange: true,
    interchangeLine: 'Aqua Line (Vanaz ↔ Ramwadi)',
    facilities: ['Lift', 'Escalator', 'Washroom', 'Wi-Fi', 'Interchange Concourse', 'Customer Care', 'ATMs'],
    firstTrain: '06:00 AM',
    lastTrain: '11:15 PM',
    nextTrains: [
      { destination: 'Swargate', etaMinutes: 2, platform: 'Platform 1 (Underground)' },
      { destination: 'PCMC', etaMinutes: 4, platform: 'Platform 2 (Underground)' },
      { destination: 'Ramwadi', etaMinutes: 3, platform: 'Platform 3 (Elevated)' },
      { destination: 'Vanaz', etaMinutes: 5, platform: 'Platform 4 (Elevated)' }
    ],
    description: 'Premier Multi-Modal Interchange Hub of Pune Metro. Seamlessly transfers passengers between Purple Line (PCMC ↔ Swargate) and Aqua Line (Vanaz ↔ Ramwadi).',
    address: 'Juna Bazaar Chowk, Nyay Marg, Shivajinagar, Pune 411005',
    gates: [
      { number: 'Gate 1', name: 'District Court Main Gate', landmark: 'Pune District & Sessions Court' },
      { number: 'Gate 2', name: 'PMC Administrative Building', landmark: 'Pune Municipal Corporation' },
      { number: 'Gate 3', name: 'Kamgar Putala Link', landmark: 'Juna Bazaar Chowk' }
    ],
    popularNearby: ['District Court', 'PMC Head Office', 'COEP Boat Club', 'Juna Bazaar', 'Mutha Riverfront'],
    coordinates: { x: 200, y: 350 }
  },
  {
    id: 'kasba-peth',
    name: 'Kasba Peth',
    nameMarathi: 'कसबा पेठ',
    line: 'Purple Line',
    lineColor: '#7C3AED',
    lineCode: 'PL',
    order: 11,
    isInterchange: false,
    facilities: ['Lift', 'Escalator', 'Washroom', 'Wi-Fi'],
    firstTrain: '06:04 AM',
    lastTrain: '11:18 PM',
    nextTrains: [
      { destination: 'Swargate', etaMinutes: 5, platform: 'Platform 1' },
      { destination: 'PCMC', etaMinutes: 7, platform: 'Platform 2' }
    ],
    description: 'Underground station serving historical Kasba Peth, Kasba Ganpati, and the historic Lal Mahal in old Pune.',
    address: 'Near Lal Mahal, Kasba Peth, Pune 411011',
    gates: [
      { number: 'Gate 1', name: 'Lal Mahal Gate', landmark: 'Lal Mahal' },
      { number: 'Gate 2', name: 'Kasba Ganpati', landmark: 'Grama Daivat Kasba Ganpati' }
    ],
    popularNearby: ['Kasba Ganpati', 'Lal Mahal', 'Shaniwar Wada Heritage', 'Tambat Ali'],
    coordinates: { x: 200, y: 385 }
  },
  {
    id: 'mahatma-phule-mandai',
    name: 'Mahatma Phule Mandai',
    nameMarathi: 'महात्मा फुले मंडई',
    line: 'Purple Line',
    lineColor: '#7C3AED',
    lineCode: 'PL',
    order: 12,
    isInterchange: false,
    facilities: ['Lift', 'Escalator', 'Washroom', 'Wi-Fi'],
    firstTrain: '06:07 AM',
    lastTrain: '11:21 PM',
    nextTrains: [
      { destination: 'Swargate', etaMinutes: 3, platform: 'Platform 1' },
      { destination: 'PCMC', etaMinutes: 9, platform: 'Platform 2' }
    ],
    description: 'Underground station in the heart of Pune historic vegetable and fruit market, near Tulshibaug and Shanipar.',
    address: 'Mandai Chowk, Shukrawar Peth, Pune 411002',
    gates: [
      { number: 'Gate 1', name: 'Mandai Central Tower', landmark: 'Phule Mandai Market' },
      { number: 'Gate 2', name: 'Tulshibaug Lane', landmark: 'Tulshibaug Shopping Area' }
    ],
    popularNearby: ['Mahatma Phule Mandai', 'Tulshibaug', 'Dagadusheth Temple', 'Shanipar Chowk'],
    coordinates: { x: 200, y: 420 }
  },
  {
    id: 'swargate',
    name: 'Swargate',
    nameMarathi: 'स्वारगेट',
    line: 'Purple Line',
    lineColor: '#7C3AED',
    lineCode: 'PL',
    order: 13,
    isInterchange: false,
    facilities: ['Lift', 'Escalator', 'Washroom', 'Wi-Fi', 'MSRTC Bus Terminal Link', 'Parking'],
    firstTrain: '06:00 AM',
    lastTrain: '11:25 PM',
    nextTrains: [
      { destination: 'PCMC', etaMinutes: 2, platform: 'Platform 2' }
    ],
    description: 'Major southern underground terminal multimodal hub connected directly to Swargate MSRTC Bus Station and PMPML Hub.',
    address: 'Swargate Chowk, Satara Road, Pune 411042',
    gates: [
      { number: 'Gate 1', name: 'MSRTC Central Bus Stand', landmark: 'Swargate ST Terminal' },
      { number: 'Gate 2', name: 'Jedhe Chowk / Satara Road', landmark: 'Laxmi Narayan Cinema Link' }
    ],
    popularNearby: ['Swargate ST Stand', 'Sarasbaug Ganpati', 'Peshwe Park', 'Satara Road Commercial Hub'],
    coordinates: { x: 200, y: 455 }
  }
];

// AQUA LINE STATIONS (15 Stations: Vanaz to Ramwadi)
export const AQUA_LINE_STATIONS: MetroStation[] = [
  {
    id: 'vanaz',
    name: 'Vanaz',
    nameMarathi: 'वनाझ',
    line: 'Aqua Line',
    lineColor: '#008C8C',
    lineCode: 'AL',
    order: 1,
    isInterchange: false,
    facilities: ['Lift', 'Escalator', 'Washroom', 'Wi-Fi', 'Feeder Bus', 'Large Parking'],
    firstTrain: '06:00 AM',
    lastTrain: '11:00 PM',
    nextTrains: [
      { destination: 'Ramwadi', etaMinutes: 4, platform: 'Platform 1' }
    ],
    description: 'Western elevated terminal station along Paud Road equipped with a multi-level metro maintenance depot and park & ride.',
    address: 'Paud Road, Kothrud, Pune 411038',
    gates: [
      { number: 'Gate 1', name: 'Paud Road South', landmark: 'Vanaz Engineers' },
      { number: 'Gate 2', name: 'Kothrud Depot Link', landmark: 'PMPML Kothrud Depot' }
    ],
    popularNearby: ['Kothrud Stand', 'MIT World Peace University', 'Chandani Chowk Bypass', 'Paud Road Market'],
    coordinates: { x: 30, y: 350 }
  },
  {
    id: 'anand-nagar',
    name: 'Anand Nagar',
    nameMarathi: 'आनंद नगर',
    line: 'Aqua Line',
    lineColor: '#008C8C',
    lineCode: 'AL',
    order: 2,
    isInterchange: false,
    facilities: ['Lift', 'Escalator', 'Washroom', 'Wi-Fi'],
    firstTrain: '06:02 AM',
    lastTrain: '11:02 PM',
    nextTrains: [
      { destination: 'Ramwadi', etaMinutes: 6, platform: 'Platform 1' },
      { destination: 'Vanaz', etaMinutes: 2, platform: 'Platform 2' }
    ],
    description: 'Serves the bustling Anand Nagar and Ideal Colony residential colonies along Paud Road in Kothrud.',
    address: 'Near Ideal Colony, Paud Road, Kothrud, Pune 411038',
    gates: [
      { number: 'Gate 1', name: 'Ideal Colony', landmark: 'Ideal Colony Main Road' }
    ],
    popularNearby: ['Ideal Colony', 'Anand Nagar Chowk', 'MIT Campus Link'],
    coordinates: { x: 55, y: 350 }
  },
  {
    id: 'paud-phata',
    name: 'Paud Phata',
    nameMarathi: 'पौड फाटा (आयडियल कॉलनी)',
    line: 'Aqua Line',
    lineColor: '#008C8C',
    lineCode: 'AL',
    order: 3,
    isInterchange: false,
    facilities: ['Lift', 'Escalator', 'Washroom', 'Wi-Fi'],
    firstTrain: '06:05 AM',
    lastTrain: '11:05 PM',
    nextTrains: [
      { destination: 'Ramwadi', etaMinutes: 8, platform: 'Platform 1' },
      { destination: 'Vanaz', etaMinutes: 4, platform: 'Platform 2' }
    ],
    description: 'Key junction connecting Paud Road with Karve Road, serving Erandwane and Mayur Colony commuters.',
    address: 'Paud Phata Flyover, Karve Road, Pune 411038',
    gates: [
      { number: 'Gate 1', name: 'Mayur Colony', landmark: 'Karve Road Flyover' }
    ],
    popularNearby: ['Mayur Colony', 'Dashbhuja Ganpati Temple', 'Erandwane Commercial'],
    coordinates: { x: 80, y: 350 }
  },
  {
    id: 'sndt-college',
    name: 'SNDT College',
    nameMarathi: 'एसएनडीटी कॉलेज (नळ स्टॉप)',
    line: 'Aqua Line',
    lineColor: '#008C8C',
    lineCode: 'AL',
    order: 4,
    isInterchange: false,
    facilities: ['Lift', 'Escalator', 'Washroom', 'Wi-Fi'],
    firstTrain: '06:08 AM',
    lastTrain: '11:08 PM',
    nextTrains: [
      { destination: 'Ramwadi', etaMinutes: 10, platform: 'Platform 1' },
      { destination: 'Vanaz', etaMinutes: 6, platform: 'Platform 2' }
    ],
    description: 'Unique two-tier flyover station at Nal Stop on Karve Road, providing access to SNDT Women’s University and Law College Road.',
    address: 'Nal Stop Chowk, Karve Road, Pune 411004',
    gates: [
      { number: 'Gate 1', name: 'SNDT Campus', landmark: 'SNDT Women’s University' },
      { number: 'Gate 2', name: 'Law College Road', landmark: 'Nal Stop Flyover' }
    ],
    popularNearby: ['SNDT Women’s University', 'Law College Road', 'ILS Law College', 'Film and Television Institute (FTII)'],
    coordinates: { x: 105, y: 350 }
  },
  {
    id: 'garware-college',
    name: 'Garware College',
    nameMarathi: 'गरवारे कॉलेज',
    line: 'Aqua Line',
    lineColor: '#008C8C',
    lineCode: 'AL',
    order: 5,
    isInterchange: false,
    facilities: ['Lift', 'Escalator', 'Washroom', 'Wi-Fi', 'Bicycle Stands'],
    firstTrain: '06:11 AM',
    lastTrain: '11:11 PM',
    nextTrains: [
      { destination: 'Ramwadi', etaMinutes: 12, platform: 'Platform 1' },
      { destination: 'Vanaz', etaMinutes: 8, platform: 'Platform 2' }
    ],
    description: 'High-footfall youth hub along Karve Road serving students and residents of Deccan, Prabhat Road, and Erandwane.',
    address: 'Karve Road, Deccan Gymkhana area, Pune 411004',
    gates: [
      { number: 'Gate 1', name: 'Garware College Campus', landmark: 'MES Abasaheb Garware College' },
      { number: 'Gate 2', name: 'Prabhat Road Corner', landmark: 'Deccan Gymkhana' }
    ],
    popularNearby: ['Abasaheb Garware College', 'Deccan Gymkhana', 'Prabhat Road', 'Bhandarkar Oriental Research Institute'],
    coordinates: { x: 130, y: 350 }
  },
  {
    id: 'deccan-gymkhana',
    name: 'Deccan Gymkhana',
    nameMarathi: 'डेक्कन जिमखाना',
    line: 'Aqua Line',
    lineColor: '#008C8C',
    lineCode: 'AL',
    order: 6,
    isInterchange: false,
    facilities: ['Lift', 'Escalator', 'Washroom', 'Wi-Fi'],
    firstTrain: '06:14 AM',
    lastTrain: '11:14 PM',
    nextTrains: [
      { destination: 'Ramwadi', etaMinutes: 14, platform: 'Platform 1' },
      { destination: 'Vanaz', etaMinutes: 10, platform: 'Platform 2' }
    ],
    description: 'Historic sports, cultural, and commercial heart of Pune, near Fergusson College, sports clubs, and Hong Kong Lane.',
    address: 'Goodluck Chowk / FC Road corner, Deccan, Pune 411004',
    gates: [
      { number: 'Gate 1', name: 'FC Road / Goodluck Chowk', landmark: 'Cafe Goodluck' },
      { number: 'Gate 2', name: 'PYC Club link', landmark: 'Deccan Gymkhana Grounds' }
    ],
    popularNearby: ['Fergusson College Road', 'Deccan Bus Stand', 'PYC Gymkhana', 'Balgandharva Ranga Mandir'],
    coordinates: { x: 155, y: 350 }
  },
  {
    id: 'chhatrapati-sambhaji-udyan',
    name: 'Chhatrapati Sambhaji Udyan',
    nameMarathi: 'छत्रपती संभाजी उद्यान',
    line: 'Aqua Line',
    lineColor: '#008C8C',
    lineCode: 'AL',
    order: 7,
    isInterchange: false,
    facilities: ['Lift', 'Escalator', 'Washroom', 'Wi-Fi'],
    firstTrain: '06:17 AM',
    lastTrain: '11:17 PM',
    nextTrains: [
      { destination: 'Ramwadi', etaMinutes: 16, platform: 'Platform 1' },
      { destination: 'Vanaz', etaMinutes: 12, platform: 'Platform 2' }
    ],
    description: 'Overlooking Sambhaji Park and Mutha River, adjacent to Balgandharva auditorium and JM Road shopping district.',
    address: 'JM Road, near Balgandharva Chowk, Pune 411005',
    gates: [
      { number: 'Gate 1', name: 'JM Road Main', landmark: 'Balgandharva Auditorium' },
      { number: 'Gate 2', name: 'Sambhaji Park Gate', landmark: 'Riverbed Road' }
    ],
    popularNearby: ['Balgandharva Ranga Mandir', 'Jangali Maharaj (JM) Road', 'Sambhaji Park', 'Kakasaheb Gadgil Bridge'],
    coordinates: { x: 175, y: 350 }
  },
  {
    id: 'pmc',
    name: 'PMC',
    nameMarathi: 'पुणे महानगरपालिका',
    line: 'Aqua Line',
    lineColor: '#008C8C',
    lineCode: 'AL',
    order: 8,
    isInterchange: false,
    facilities: ['Lift', 'Escalator', 'Washroom', 'Wi-Fi'],
    firstTrain: '06:19 AM',
    lastTrain: '11:19 PM',
    nextTrains: [
      { destination: 'Ramwadi', etaMinutes: 18, platform: 'Platform 1' },
      { destination: 'Vanaz', etaMinutes: 14, platform: 'Platform 2' }
    ],
    description: 'Located at Dengle Bridge opposite the Pune Municipal Corporation (PMC) main administrative headquarters.',
    address: 'Near Dengle Bridge, Shivajinagar, Pune 411005',
    gates: [
      { number: 'Gate 1', name: 'PMC Main Building', landmark: 'Municipal Corporation HQ' }
    ],
    popularNearby: ['PMC Headquarters', 'Shaniwar Wada (East Entry)', 'Dengle Bridge', 'Mutha River Ghat'],
    coordinates: { x: 190, y: 350 }
  },
  {
    id: 'district-court-pune-aqua',
    name: 'District Court Pune',
    nameMarathi: 'जिल्हा न्यायालय पुणे',
    line: 'Aqua Line',
    lineColor: '#008C8C',
    lineCode: 'AL',
    order: 9,
    isInterchange: true,
    interchangeLine: 'Purple Line (PCMC ↔ Swargate)',
    facilities: ['Lift', 'Escalator', 'Washroom', 'Wi-Fi', 'Interchange Concourse', 'Customer Care', 'ATMs'],
    firstTrain: '06:00 AM',
    lastTrain: '11:20 PM',
    nextTrains: [
      { destination: 'Ramwadi', etaMinutes: 3, platform: 'Platform 3' },
      { destination: 'Vanaz', etaMinutes: 5, platform: 'Platform 4' },
      { destination: 'Swargate', etaMinutes: 2, platform: 'Platform 1 (Underground)' },
      { destination: 'PCMC', etaMinutes: 4, platform: 'Platform 2 (Underground)' }
    ],
    description: 'Premier Multi-Modal Interchange Hub of Pune Metro. Seamlessly transfers passengers between Purple Line (PCMC ↔ Swargate) and Aqua Line (Vanaz ↔ Ramwadi).',
    address: 'Juna Bazaar Chowk, Nyay Marg, Shivajinagar, Pune 411005',
    gates: [
      { number: 'Gate 1', name: 'District Court Main Gate', landmark: 'Pune District & Sessions Court' },
      { number: 'Gate 2', name: 'PMC Administrative Building', landmark: 'Pune Municipal Corporation' },
      { number: 'Gate 3', name: 'Kamgar Putala Link', landmark: 'Juna Bazaar Chowk' }
    ],
    popularNearby: ['District Court', 'PMC Head Office', 'COEP Boat Club', 'Juna Bazaar', 'Mutha Riverfront'],
    coordinates: { x: 200, y: 350 }
  },
  {
    id: 'rto-pune',
    name: 'RTO Pune',
    nameMarathi: 'आरटीओ पुणे (मंगळवार पेठ)',
    line: 'Aqua Line',
    lineColor: '#008C8C',
    lineCode: 'AL',
    order: 10,
    isInterchange: false,
    facilities: ['Lift', 'Escalator', 'Washroom', 'Wi-Fi', 'Parking'],
    firstTrain: '06:22 AM',
    lastTrain: '11:22 PM',
    nextTrains: [
      { destination: 'Ramwadi', etaMinutes: 5, platform: 'Platform 1' },
      { destination: 'Vanaz', etaMinutes: 7, platform: 'Platform 2' }
    ],
    description: 'Elevated station serving the Regional Transport Office (RTO), Collector Office, and central government administrative corridors.',
    address: 'Dr. Ambedkar Road, near RTO Office, Pune 411001',
    gates: [
      { number: 'Gate 1', name: 'RTO Main Gate', landmark: 'Regional Transport Office' },
      { number: 'Gate 2', name: 'Collector Office Link', landmark: 'Pune Collectorate' }
    ],
    popularNearby: ['Pune RTO Office', 'Collector Office', 'General Post Office (GPO)', 'Sassoon Hospital Link'],
    coordinates: { x: 235, y: 350 }
  },
  {
    id: 'pune-railway-station',
    name: 'Pune Railway Station',
    nameMarathi: 'पुणे रेल्वे स्टेशन',
    line: 'Aqua Line',
    lineColor: '#008C8C',
    lineCode: 'AL',
    order: 11,
    isInterchange: false,
    facilities: ['Lift', 'Escalator', 'Washroom', 'Wi-Fi', 'Direct Railway Footbridge', 'Cloakroom Link'],
    firstTrain: '06:00 AM',
    lastTrain: '11:25 PM',
    nextTrains: [
      { destination: 'Ramwadi', etaMinutes: 4, platform: 'Platform 1' },
      { destination: 'Vanaz', etaMinutes: 6, platform: 'Platform 2' }
    ],
    description: 'Major multimodal junction integrated with Pune Junction Railway Station and the MSRTC Pune Station Central Bus Stand.',
    address: 'Near Pune Railway Station Main Portico, Pune 411001',
    gates: [
      { number: 'Gate 1', name: 'Railway Station Footbridge', landmark: 'Pune Junction Platforms' },
      { number: 'Gate 2', name: 'MSRTC Bus Stand', landmark: 'Pune Station ST Stand' }
    ],
    popularNearby: ['Pune Railway Junction', 'Pune Station ST Stand', 'Sassoon General Hospital', 'Inox Bund Garden'],
    coordinates: { x: 265, y: 350 }
  },
  {
    id: 'ruby-hall-clinic',
    name: 'Ruby Hall Clinic',
    nameMarathi: 'रुबी हॉल क्लिनिक',
    line: 'Aqua Line',
    lineColor: '#008C8C',
    lineCode: 'AL',
    order: 12,
    isInterchange: false,
    facilities: ['Lift', 'Escalator', 'Washroom', 'Wi-Fi'],
    firstTrain: '06:03 AM',
    lastTrain: '11:28 PM',
    nextTrains: [
      { destination: 'Ramwadi', etaMinutes: 6, platform: 'Platform 1' },
      { destination: 'Vanaz', etaMinutes: 8, platform: 'Platform 2' }
    ],
    description: 'Healthcare corridor station serving Ruby Hall Clinic, Jehangir Hospital, and Dhole Patil Road commercial areas.',
    address: 'Sassoon Road, near Ruby Hall Clinic, Pune 411001',
    gates: [
      { number: 'Gate 1', name: 'Ruby Hall Hospital', landmark: 'Grant Medical Foundation' },
      { number: 'Gate 2', name: 'Jehangir Hospital Link', landmark: 'Jehangir Hospital' }
    ],
    popularNearby: ['Ruby Hall Clinic', 'Jehangir Hospital', 'Dhole Patil Road', 'Sangamwadi Bridge'],
    coordinates: { x: 295, y: 350 }
  },
  {
    id: 'bund-garden',
    name: 'Bund Garden',
    nameMarathi: 'बंड गार्डन',
    line: 'Aqua Line',
    lineColor: '#008C8C',
    lineCode: 'AL',
    order: 13,
    isInterchange: false,
    facilities: ['Lift', 'Escalator', 'Washroom', 'Wi-Fi'],
    firstTrain: '06:06 AM',
    lastTrain: '11:31 PM',
    nextTrains: [
      { destination: 'Ramwadi', etaMinutes: 8, platform: 'Platform 1' },
      { destination: 'Vanaz', etaMinutes: 10, platform: 'Platform 2' }
    ],
    description: 'Elevated station crossing Mula-Mutha River, serving Bund Garden, Fitzgerald Bridge, and Koregaon Park south access.',
    address: 'Bund Garden Road, near Fitzgerald Bridge, Pune 411001',
    gates: [
      { number: 'Gate 1', name: 'Bund Garden Park', landmark: 'Fitzgerald Bridge' },
      { number: 'Gate 2', name: 'Koregaon Park South', landmark: 'Mula-Mutha River Bridge' }
    ],
    popularNearby: ['Bund Garden', 'Koregaon Park Lane 1', 'Fitzgerald Bridge', 'Yerawada Bridge Link'],
    coordinates: { x: 325, y: 350 }
  },
  {
    id: 'yerawada',
    name: 'Yerawada',
    nameMarathi: 'येरवडा',
    line: 'Aqua Line',
    lineColor: '#008C8C',
    lineCode: 'AL',
    order: 14,
    isInterchange: false,
    facilities: ['Lift', 'Escalator', 'Washroom', 'Wi-Fi'],
    firstTrain: '06:09 AM',
    lastTrain: '11:34 PM',
    nextTrains: [
      { destination: 'Ramwadi', etaMinutes: 5, platform: 'Platform 1' },
      { destination: 'Vanaz', etaMinutes: 12, platform: 'Platform 2' }
    ],
    description: 'Serving Yerawada commercial junction, Ahmednagar Road corridor, and direct link to Pune Airport feeder transit.',
    address: 'Ahmednagar Road, Yerawada Chowk, Pune 411006',
    gates: [
      { number: 'Gate 1', name: 'Gunjan Chowk', landmark: 'Gunjan Cinema / Airport Road Link' }
    ],
    popularNearby: ['Yerawada Central', 'Airport Road Link', 'Business Bay', 'Deccan College'],
    coordinates: { x: 355, y: 350 }
  },
  {
    id: 'kalyani-nagar',
    name: 'Kalyani Nagar',
    nameMarathi: 'कल्याणी नगर',
    line: 'Aqua Line',
    lineColor: '#008C8C',
    lineCode: 'AL',
    order: 15,
    isInterchange: false,
    facilities: ['Lift', 'Escalator', 'Washroom', 'Wi-Fi'],
    firstTrain: '06:12 AM',
    lastTrain: '11:37 PM',
    nextTrains: [
      { destination: 'Ramwadi', etaMinutes: 3, platform: 'Platform 1' },
      { destination: 'Vanaz', etaMinutes: 14, platform: 'Platform 2' }
    ],
    description: 'Prominent IT and residential hub along Ahmednagar Road, serving Cybage, Cerebrum IT Park, and Koregaon Park north bridge.',
    address: 'Ahmednagar Road, Kalyani Nagar Junction, Pune 411014',
    gates: [
      { number: 'Gate 1', name: 'Cerebrum IT Park', landmark: 'Kalyani Nagar Main Road' }
    ],
    popularNearby: ['Kalyani Nagar IT Hub', 'Cerebrum IT Park', 'Mariplex Mall', 'Aga Khan Palace'],
    coordinates: { x: 380, y: 350 }
  },
  {
    id: 'ramwadi',
    name: 'Ramwadi',
    nameMarathi: 'रामवाडी',
    line: 'Aqua Line',
    lineColor: '#008C8C',
    lineCode: 'AL',
    order: 16,
    isInterchange: false,
    facilities: ['Lift', 'Escalator', 'Washroom', 'Wi-Fi', 'Parking', 'Feeder Bus Link'],
    firstTrain: '06:00 AM',
    lastTrain: '11:40 PM',
    nextTrains: [
      { destination: 'Vanaz', etaMinutes: 3, platform: 'Platform 2' }
    ],
    description: 'Eastern terminal of the Aqua Line along Ahmednagar Road, serving Viman Nagar, Phoenix Marketcity, and Pune International Airport commuters.',
    address: 'Ahmednagar Road, Ramwadi, Vadgaon Sheri, Pune 411014',
    gates: [
      { number: 'Gate 1', name: 'Viman Nagar / Airport Road', landmark: 'Symbiosis Campus Link' },
      { number: 'Gate 2', name: 'Vadgaon Sheri Link', landmark: 'Ahmednagar Highway' }
    ],
    popularNearby: ['Phoenix Marketcity Pune', 'Viman Nagar', 'Symbiosis International University', 'Pune Airport Connector'],
    coordinates: { x: 410, y: 350 }
  }
];

// Unified station list (deduplicating District Court Pune for single-list views)
export const STATIONS: MetroStation[] = [
  ...PURPLE_LINE_STATIONS,
  ...AQUA_LINE_STATIONS.filter(s => s.id !== 'district-court-pune-aqua')
];

/**
 * Calculates prototype/sample fare based on station count slab:
 * 1–3 stations → ₹10
 * 4–6 stations → ₹20
 * 7–9 stations → ₹30
 * 10–12 stations → ₹40
 * 13–16 stations → ₹50
 * 17+ stations → ₹60
 */
export function calculatePrototypeFare(stationCount: number): number {
  if (stationCount <= 1) return 10;
  if (stationCount <= 3) return 10;
  if (stationCount <= 6) return 20;
  if (stationCount <= 9) return 30;
  if (stationCount <= 12) return 40;
  if (stationCount <= 16) return 50;
  return 60;
}

export interface RouteLeg {
  line: 'Purple Line' | 'Aqua Line';
  lineColor: string;
  fromStation: MetroStation;
  toStation: MetroStation;
  path: MetroStation[];
  stationCount: number;
  durationMinutes: number;
}

export interface PlannedRoute {
  fromStation: MetroStation;
  toStation: MetroStation;
  path: MetroStation[];
  stationCount: number;
  durationMinutes: number;
  fareRupees: number;
  isInterchange: boolean;
  interchangeStation?: MetroStation;
  interchangeInstruction?: string;
  legs: RouteLeg[];
  line: string;
  nextMetroMinutes: number;
  frequencyMinutes: number;
  status: 'On Time' | 'Slight Delay';
  preferenceUsed: 'Fastest' | 'Least Fare' | 'Less Transfers';
}

/**
 * Helper to get stations along a single line between two stations
 */
function getLinePath(
  lineStations: MetroStation[],
  fromStation: MetroStation,
  toStation: MetroStation
): MetroStation[] {
  const fromIdx = lineStations.findIndex(s => s.name === fromStation.name);
  const toIdx = lineStations.findIndex(s => s.name === toStation.name);
  if (fromIdx === -1 || toIdx === -1) return [];

  if (fromIdx <= toIdx) {
    return lineStations.slice(fromIdx, toIdx + 1);
  } else {
    return lineStations.slice(toIdx, fromIdx + 1).reverse();
  }
}

/**
 * Dynamic route generator supporting intra-line and inter-line routes
 * with automated interchange detection at District Court Pune.
 */
export function calculateRoute(
  fromId: string,
  toId: string,
  preference: 'Fastest' | 'Least Fare' | 'Less Transfers' = 'Fastest'
): PlannedRoute {
  // Normalize IDs (District Court Pune on either line is the same junction)
  const normFromId = fromId === 'district-court-pune-aqua' ? 'district-court-pune' : fromId;
  const normToId = toId === 'district-court-pune-aqua' ? 'district-court-pune' : toId;

  const fromStation = STATIONS.find(s => s.id === normFromId) || STATIONS[0];
  const toStation = STATIONS.find(s => s.id === normToId) || STATIONS[STATIONS.length - 1];

  // District Court station reference
  const districtCourtStation = STATIONS.find(s => s.name === 'District Court Pune') || PURPLE_LINE_STATIONS[9];

  // Check which lines stations belong to
  const fromInPurple = PURPLE_LINE_STATIONS.some(s => s.name === fromStation.name);
  const toInPurple = PURPLE_LINE_STATIONS.some(s => s.name === toStation.name);
  const fromInAqua = AQUA_LINE_STATIONS.some(s => s.name === fromStation.name);
  const toInAqua = AQUA_LINE_STATIONS.some(s => s.name === toStation.name);

  // CASE 1: Both stations on SAME LINE
  if ((fromInPurple && toInPurple) || (fromInAqua && toInAqua)) {
    const isPurple = fromInPurple && toInPurple;
    const activeLineStations = isPurple ? PURPLE_LINE_STATIONS : AQUA_LINE_STATIONS;
    const path = getLinePath(activeLineStations, fromStation, toStation);
    const stationCount = path.length;
    // ~2.5 mins per inter-station hop + 2 min dwell
    const durationMinutes = Math.max(3, (stationCount - 1) * 2 + 2);
    const fareRupees = calculatePrototypeFare(stationCount);
    const lineName = isPurple ? 'Purple Line' : 'Aqua Line';
    const lineColor = isPurple ? '#7C3AED' : '#008C8C';

    const singleLeg: RouteLeg = {
      line: isPurple ? 'Purple Line' : 'Aqua Line',
      lineColor,
      fromStation,
      toStation,
      path,
      stationCount,
      durationMinutes
    };

    return {
      fromStation,
      toStation,
      path,
      stationCount,
      durationMinutes,
      fareRupees,
      isInterchange: false,
      interchangeInstruction: undefined,
      legs: [singleLeg],
      line: lineName,
      nextMetroMinutes: 3,
      frequencyMinutes: 6,
      status: 'On Time',
      preferenceUsed: preference
    };
  }

  // CASE 2: DIFFERENT LINES -> Requires Interchange at District Court Pune
  // Leg 1: fromStation to District Court Pune on origin line
  // Leg 2: District Court Pune to toStation on destination line
  let leg1Path: MetroStation[] = [];
  let leg2Path: MetroStation[] = [];
  let leg1Line: 'Purple Line' | 'Aqua Line' = 'Purple Line';
  let leg2Line: 'Purple Line' | 'Aqua Line' = 'Aqua Line';

  if (fromInPurple) {
    // Purple Line -> Aqua Line
    leg1Line = 'Purple Line';
    leg2Line = 'Aqua Line';
    const courtInPurple = PURPLE_LINE_STATIONS.find(s => s.name === 'District Court Pune')!;
    const courtInAqua = AQUA_LINE_STATIONS.find(s => s.name === 'District Court Pune')!;

    leg1Path = getLinePath(PURPLE_LINE_STATIONS, fromStation, courtInPurple);
    leg2Path = getLinePath(AQUA_LINE_STATIONS, courtInAqua, toStation);
  } else {
    // Aqua Line -> Purple Line
    leg1Line = 'Aqua Line';
    leg2Line = 'Purple Line';
    const courtInAqua = AQUA_LINE_STATIONS.find(s => s.name === 'District Court Pune')!;
    const courtInPurple = PURPLE_LINE_STATIONS.find(s => s.name === 'District Court Pune')!;

    leg1Path = getLinePath(AQUA_LINE_STATIONS, fromStation, courtInAqua);
    leg2Path = getLinePath(PURPLE_LINE_STATIONS, courtInPurple, toStation);
  }

  // Combined path without duplicate District Court
  const combinedPath = [
    ...leg1Path,
    ...leg2Path.slice(1) // skip duplicate District Court
  ];

  const totalStationCount = combinedPath.length;
  // Estimated travel time: leg1 time + 5 mins interchange buffer + leg2 time
  const leg1Duration = Math.max(2, (leg1Path.length - 1) * 2 + 1);
  const leg2Duration = Math.max(2, (leg2Path.length - 1) * 2 + 1);
  const durationMinutes = leg1Duration + 5 + leg2Duration; // 5 min transfer
  const fareRupees = calculatePrototypeFare(totalStationCount);

  const leg1: RouteLeg = {
    line: leg1Line,
    lineColor: leg1Line === 'Purple Line' ? '#7C3AED' : '#008C8C',
    fromStation,
    toStation: districtCourtStation,
    path: leg1Path,
    stationCount: leg1Path.length,
    durationMinutes: leg1Duration
  };

  const leg2: RouteLeg = {
    line: leg2Line,
    lineColor: leg2Line === 'Purple Line' ? '#7C3AED' : '#008C8C',
    fromStation: districtCourtStation,
    toStation,
    path: leg2Path,
    stationCount: leg2Path.length,
    durationMinutes: leg2Duration
  };

  return {
    fromStation,
    toStation,
    path: combinedPath,
    stationCount: totalStationCount,
    durationMinutes,
    fareRupees,
    isInterchange: true,
    interchangeStation: districtCourtStation,
    interchangeInstruction: `Change from ${leg1Line} to ${leg2Line} at District Court Pune`,
    legs: [leg1, leg2],
    line: `${leg1Line} ⇄ ${leg2Line}`,
    nextMetroMinutes: 4,
    frequencyMinutes: 6,
    status: 'On Time',
    preferenceUsed: preference
  };
}

export interface LiveTrainLocation {
  station: MetroStation;
  status: 'Departed ✓' | string;
  isTrainHere: boolean;
  timeLabel: string;
  isCompleted: boolean;
}

// Live timeline data compatible with updated stations (Purple Line PCMC ↔ Swargate corridor)
export const LIVE_STATION_TIMELINE = [
  { stationId: 'pcmc', statusText: 'Departed ✓', isTrainHere: false, isCompleted: true },
  { stationId: 'sant-tukaram-nagar', statusText: 'Departed ✓', isTrainHere: false, isCompleted: true },
  { stationId: 'nashik-phata', statusText: '2 min', isTrainHere: true, isCompleted: false },
  { stationId: 'kasarwadi', statusText: '5 min', isTrainHere: false, isCompleted: false },
  { stationId: 'phugewadi', statusText: '8 min', isTrainHere: false, isCompleted: false },
  { stationId: 'dapodi', statusText: '11 min', isTrainHere: false, isCompleted: false },
  { stationId: 'shivajinagar', statusText: '16 min', isTrainHere: false, isCompleted: false },
  { stationId: 'district-court-pune', statusText: '19 min', isTrainHere: false, isCompleted: false },
  { stationId: 'swargate', statusText: '26 min', isTrainHere: false, isCompleted: false }
];

export interface TicketType {
  id: string;
  name: string;
  priceDisplay: string;
  basePrice: number;
  description: string;
  validity: string;
  features: string[];
  popular?: boolean;
}

export const TICKET_TYPES: TicketType[] = [
  {
    id: 'single',
    name: 'Single Journey',
    priceDisplay: '₹10 – ₹60',
    basePrice: 20,
    description: 'Fare depends on journey distance/stations.',
    validity: 'Valid for 120 minutes from entry gate',
    features: ['Instant QR entry', 'Distance/station stage fare', 'Single/Interchange journey'],
    popular: true
  },
  {
    id: 'day-pass',
    name: 'Day Pass',
    priceDisplay: '₹120',
    basePrice: 120,
    description: 'Prototype/demo pass — unlimited travel for 1 day',
    validity: 'Valid across Purple & Aqua lines until midnight',
    features: ['Unlimited rides on both lines', 'Ideal for tourists & multiple trips', 'Single-tap QR entry'],
    popular: false
  },
  {
    id: 'monthly-pass',
    name: 'Monthly Pass',
    priceDisplay: '₹2,000',
    basePrice: 2000,
    description: 'Prototype/demo pass — for regular commuters',
    validity: 'Valid for 30 consecutive calendar days',
    features: ['Commuter savings for daily travel', 'Priority smart card access', 'Demo prototype pass'],
    popular: false
  }
];

export interface DigitalTicket {
  id: string;
  type: string;
  fromStation: string;
  toStation: string;
  fare: number;
  purchasedAt: string;
  validUntil: string;
  qrCodeValue: string;
  bookingRef: string;
  status: 'ACTIVE' | 'EXPIRED' | 'USED';
  passenger: string;
}

export const DEMO_TICKETS: DigitalTicket[] = [
  {
    id: 'TKT-9428-PUN',
    type: 'Single Journey Ticket',
    fromStation: 'PCMC',
    toStation: 'Ramwadi',
    fare: 50,
    purchasedAt: 'Today, 12:40 PM',
    validUntil: 'Today, 02:40 PM',
    qrCodeValue: 'SMARTMETRO-2026-PCMC-RAMWADI-9428',
    bookingRef: 'SM2677109',
    status: 'ACTIVE',
    passenger: 'Avani'
  },
  {
    id: 'TKT-8114-PUN',
    type: 'Day Pass',
    fromStation: 'All Lines Network',
    toStation: 'Unlimited Access',
    fare: 120,
    purchasedAt: 'Yesterday, 08:30 AM',
    validUntil: 'Yesterday, 11:00 PM',
    qrCodeValue: 'SMARTMETRO-DAYPASS-2026-8114',
    bookingRef: 'SM2676054',
    status: 'EXPIRED',
    passenger: 'Avani'
  }
];

export interface SavedRoute {
  id: string;
  title: string;
  fromStationId: string;
  toStationId: string;
  duration: string;
  fare: string;
  tag: 'College' | 'Work' | 'Home';
}

export const DEFAULT_SAVED_ROUTES: SavedRoute[] = [
  {
    id: 'sr-1',
    title: 'College Route (Interchange)',
    fromStationId: 'pcmc',
    toStationId: 'garware-college',
    duration: '28 min',
    fare: '₹40',
    tag: 'College'
  },
  {
    id: 'sr-2',
    title: 'Airport Corridor Trip',
    fromStationId: 'shivajinagar',
    toStationId: 'ramwadi',
    duration: '22 min',
    fare: '₹30',
    tag: 'Work'
  },
  {
    id: 'sr-3',
    title: 'Market Shopping Route',
    fromStationId: 'vanaz',
    toStationId: 'pune-railway-station',
    duration: '24 min',
    fare: '₹30',
    tag: 'Home'
  }
];

export const FAQS = [
  {
    question: 'How do I plan a journey?',
    answer: 'Tap the FROM or TO fields on the Home screen or Journey Planner. Select any station from the Purple Line or Aqua Line. If your journey requires changing lines, the app automatically guides you to interchange at District Court Pune.'
  },
  {
    question: 'How can I find a station?',
    answer: 'Use the Stations tab from the bottom navigation or the station search bar. You can view all 13 Purple Line stations and 15 Aqua Line stations, along with their nearby landmarks, facilities, and platform directions.'
  },
  {
    question: 'How does interchange work at District Court Pune?',
    answer: 'District Court Pune is the central multi-level interchange. The Purple Line operates on underground tracks, while the Aqua Line operates on elevated tracks. Dedicated escalators and concourse signs connect both platforms in under 3 minutes.'
  },
  {
    question: 'How is the prototype fare calculated?',
    answer: 'This prototype calculates estimated distance-based fares: 1–3 stations = ₹10, 4–6 stations = ₹20, 7–9 stations = ₹30, 10–12 stations = ₹40, 13–16 stations = ₹50, and 17+ stations = ₹60. These are prototype estimates for demonstration purposes.'
  },
  {
    question: 'What is the AI Journey Assistant?',
    answer: 'The AI Journey Assistant is a future-ready feature demonstrating how smart route recommendations, interchange advice, and commuter insights can help passengers navigate the transit network effortlessly.'
  }
];

export const PROJECT_DETAILS = {
  appName: 'SMART METRO',
  tagline: 'Smarter Travel. A Better Tomorrow.',
  institution: 'D.Y. Patil Arts, Commerce and Science Women’s College',
  department: 'B.Sc. Computer Applications',
  academicYear: '2026–27',
  headline: 'A smart approach towards efficient and convenient urban transportation.',
  objective: 'To study the challenges faced by metro passengers and explore how a smart, technology-based metro system can make travelling more convenient, efficient and user-friendly.',
  coreObjectives: [
    'Provide structured metro information and train location estimates',
    'Make route and station information easily accessible across Purple & Aqua lines',
    'Reduce passenger confusion regarding routes, timings and interchange at District Court Pune',
    'Help passengers plan journeys with duration, stage count and prototype fare breakdown',
    'Demonstrate future AI Journey Assistance and smart commuter navigation'
  ],
  futureVision: 'Smart Metro is designed as a future-ready metro assistance platform that can combine route planning, station information, live metro information, ticket/fare estimation and AI-powered journey assistance.',
  futureRoadmap: [
    'Official metro APIs & live GTFS-RT open transit integration',
    'Real-time train GPS locations & accurate live headway tracking',
    'Official real-time dynamic fares & contactless ticketing payment gateways',
    'Live service alerts, maintenance advisories & station crowd density feeds',
    'AI-powered multimodal journey recommendations & multilingual voice assistance'
  ],
  prototypeDisclaimer: 'This application is a student college project prototype for demonstration purposes. Fares, timings, and train telemetry are structured mock/demo data and do not represent official operational Pune Metro API feeds.'
};
