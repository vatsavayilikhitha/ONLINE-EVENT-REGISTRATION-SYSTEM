const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const User = require('../models/User');
const Event = require('../models/Event');
const Registration = require('../models/Registration');

dotenv.config({ path: path.join(__dirname, '..', '.env') });

const sampleEvents = [
  // ==========================================
  // 1. TECHNOLOGY AND HACKATHONS
  // ==========================================
  {
    title: 'National AI & Cloud Hackathon 2026',
    description: 'A 36-hour non-stop nationwide hackathon challenging multidisciplinary student teams to engineer novel software and hardware solutions addressing Smart Cities, Healthcare AI, Green Tech, and Cyber Resilience. Features mentorship from senior architects at Google and Microsoft, rapid prototyping cloud credits, and direct placement interview rounds.',
    category: 'Technology and Hackathons',
    date: new Date(Date.now() + 18 * 24 * 60 * 60 * 1000),
    startTime: '08:00 AM',
    endTime: '08:00 PM (Next Day)',
    venue: 'Central University Innovation Hub & Turing Auditorium',
    organizer: 'Innovation & Incubation Cell (IIC) in partnership with GDSC',
    contact: 'hackathon@eventhub.edu | +1 (555) 902-3344',
    capacity: 150,
    registeredCount: 0,
    registrationDeadline: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
    price: 0,
    isFeatured: true,
    isTrending: true,
    tags: ['Hackathon', 'AI', 'Cloud', 'Prizes'],
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1200&auto=format&fit=crop&q=80'
  },
  {
    title: 'Autonomous Robotics & Embedded Systems Challenge',
    description: 'Assemble, program, and race autonomous ground rovers through complex obstacle tracks. Participants implement sensor fusion, LiDAR SLAM navigation, and real-time computer vision control algorithms on Raspberry Pi and ROS2 platforms.',
    category: 'Technology and Hackathons',
    date: new Date(Date.now() + 26 * 24 * 60 * 60 * 1000),
    startTime: '09:00 AM',
    endTime: '05:30 PM',
    venue: 'Robotics Engineering Pavilion & Arena',
    organizer: 'Department of Mechatronics & Robotics Club',
    contact: 'robotics@eventhub.edu | +1 (555) 812-4422',
    capacity: 80,
    registeredCount: 0,
    registrationDeadline: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000),
    price: 25,
    isFeatured: false,
    isTrending: true,
    tags: ['Robotics', 'Hardware', 'ROS2', 'AI'],
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1200&auto=format&fit=crop&q=80'
  },
  {
    title: 'Inter-College Competitive Code Sprint',
    description: 'Speed, accuracy, and algorithmic mastery. Compete in individual divisions solving complex algorithmic challenges covering dynamic programming, graph theory, and number theory under timed ICPC rules with live automated judge evaluation.',
    category: 'Technology and Hackathons',
    date: new Date(Date.now() + 12 * 24 * 60 * 60 * 1000),
    startTime: '10:00 AM',
    endTime: '02:00 PM',
    venue: 'Computing Center Labs 101-104',
    organizer: 'ACM Student Chapter',
    contact: 'codesprint@eventhub.edu | +1 (555) 341-8976',
    capacity: 120,
    registeredCount: 0,
    registrationDeadline: new Date(Date.now() + 9 * 24 * 60 * 60 * 1000),
    price: 0,
    isFeatured: false,
    isTrending: false,
    tags: ['Algorithms', 'ICPC', 'Competitive Coding'],
    image: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=1200&auto=format&fit=crop&q=80'
  },

  // ==========================================
  // 2. WORKSHOPS AND TECHNICAL SESSIONS
  // ==========================================
  {
    title: 'Hands-on Deep Learning & LLM Fine-Tuning Workshop',
    description: 'An intensive, hands-on masterclass covering Transformer architectures, Parameter-Efficient Fine-Tuning (PEFT, LoRA), Quantization, and Retrieval-Augmented Generation (RAG) using PyTorch, vLLM, and Hugging Face. Each participant receives dedicated GPU lab access.',
    category: 'Workshops and Technical Sessions',
    date: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
    startTime: '09:30 AM',
    endTime: '04:30 PM',
    venue: 'Turing Computer Lab 302, Main Academic Block',
    organizer: 'Department of Artificial Intelligence & Data Science',
    contact: 'ai-workshop@eventhub.edu | +1 (555) 723-9011',
    capacity: 65,
    registeredCount: 0,
    registrationDeadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    price: 15,
    isFeatured: true,
    isTrending: true,
    tags: ['Machine Learning', 'PyTorch', 'LLMs', 'Hands-on'],
    image: 'https://images.unsplash.com/photo-1555255707-c07966088b7b?w=1200&auto=format&fit=crop&q=80'
  },
  {
    title: 'Full-Stack React 19 & Cloud-Native Architecture Bootcamp',
    description: 'Master enterprise full-stack development. Learn modern React 19 Server Components, Node.js microservices, containerization with Docker, and automated CI/CD deployment pipelines on AWS and Vercel.',
    category: 'Workshops and Technical Sessions',
    date: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
    startTime: '10:00 AM',
    endTime: '05:00 PM',
    venue: 'Software Engineering Studio A, Tech Block',
    organizer: 'Google Developer Student Club (GDSC)',
    contact: 'webdev-bootcamp@eventhub.edu | +1 (555) 881-2299',
    capacity: 70,
    registeredCount: 0,
    registrationDeadline: new Date(Date.now() + 12 * 24 * 60 * 60 * 1000),
    price: 0,
    isFeatured: false,
    isTrending: true,
    tags: ['React', 'Node.js', 'Docker', 'WebDev'],
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&auto=format&fit=crop&q=80'
  },
  {
    title: 'Zero-Trust Cyber Security & Ethical Hacking Masterclass',
    description: 'Learn modern security defense from certified ethical hackers. Topics include network traffic analysis with Wireshark, automated vulnerability exploitation, web application pentesting (OWASP Top 10), and proactive enterprise incident response.',
    category: 'Workshops and Technical Sessions',
    date: new Date(Date.now() + 22 * 24 * 60 * 60 * 1000),
    startTime: '01:00 PM',
    endTime: '06:00 PM',
    venue: 'Cyber Security Operations Lab 4B',
    organizer: 'Student Cyber Security Guild & InfoSec Forum',
    contact: 'cybersec@eventhub.edu | +1 (555) 412-8877',
    capacity: 55,
    registeredCount: 0,
    registrationDeadline: new Date(Date.now() + 19 * 24 * 60 * 60 * 1000),
    price: 20,
    isFeatured: false,
    isTrending: false,
    tags: ['Cybersecurity', 'Ethical Hacking', 'OWASP', 'InfoSec'],
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200&auto=format&fit=crop&q=80'
  },

  // ==========================================
  // 3. MUSIC AND ENTERTAINMENT
  // ==========================================
  {
    title: 'Campus Symphony & Battle of the Bands: ROCKFEST',
    description: 'The loudest night of the semester! Over 12 premier collegiate rock, indie, and fusion bands battle it out on the open air mainstage for the golden trophy and professional recording studio time. Featuring headliner guest performances and gourmet food trucks.',
    category: 'Music and Entertainment',
    date: new Date(Date.now() + 24 * 24 * 60 * 60 * 1000),
    startTime: '05:30 PM',
    endTime: '11:00 PM',
    venue: 'University Open Air Theatre (OAT)',
    organizer: 'Music Society & Cultural Affairs Board',
    contact: 'musicfest@eventhub.edu | +1 (555) 912-3841',
    capacity: 450,
    registeredCount: 0,
    registrationDeadline: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000),
    price: 10,
    isFeatured: true,
    isTrending: true,
    tags: ['Music', 'Live Concert', 'Battle of the Bands', 'Entertainment'],
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=1200&auto=format&fit=crop&q=80'
  },
  {
    title: 'Sunset Acoustic Jam & Stand-Up Comedy Evening',
    description: 'An unplugged evening under the campus lanterns featuring acoustic guitarists, soulful singer-songwriters, and hilarious stand-up comedy sets by top student comedians and invited circuit artists.',
    category: 'Music and Entertainment',
    date: new Date(Date.now() + 11 * 24 * 60 * 60 * 1000),
    startTime: '06:00 PM',
    endTime: '09:30 PM',
    venue: 'Amphitheatre Courtyard & Student Plaza',
    organizer: 'Performing Arts Club & Literary Guild',
    contact: 'acoustic-jam@eventhub.edu | +1 (555) 554-1299',
    capacity: 200,
    registeredCount: 0,
    registrationDeadline: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000),
    price: 0,
    isFeatured: false,
    isTrending: false,
    tags: ['Acoustic', 'Comedy', 'Unplugged', 'Evening'],
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=1200&auto=format&fit=crop&q=80'
  },
  {
    title: 'Electronic Music Production & DJ Workshop',
    description: 'Dive into digital audio workstations (Ableton Live, FL Studio), synthesis techniques, beatmaking, mixing, and stage performance basics led by renowned electronic music producers and sound engineers.',
    category: 'Music and Entertainment',
    date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    startTime: '02:00 PM',
    endTime: '06:00 PM',
    venue: 'Acoustics & Sound Recording Studio, Media Center',
    organizer: 'Sound Design & Electronic Music Society',
    contact: 'djworkshop@eventhub.edu | +1 (555) 762-9031',
    capacity: 50,
    registeredCount: 0,
    registrationDeadline: new Date(Date.now() + 27 * 24 * 60 * 60 * 1000),
    price: 15,
    isFeatured: false,
    isTrending: false,
    tags: ['DJ', 'Ableton', 'Electronic Music', 'Audio Production'],
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1200&auto=format&fit=crop&q=80'
  },

  // ==========================================
  // 4. CULTURAL FESTIVALS
  // ==========================================
  {
    title: 'VIBRANCE 2026: Annual Inter-College Cultural Extravaganza',
    description: 'The crown jewel of campus celebrations! Three days filled with classical and contemporary dance battles, theatrical plays, multilingual poetry slams, celebrity fashion walk, and breathtaking art installations. Join thousands of attendees from across 50 universities.',
    category: 'Cultural Festivals',
    date: new Date(Date.now() + 32 * 24 * 60 * 60 * 1000),
    startTime: '09:00 AM',
    endTime: '10:00 PM',
    venue: 'Grand University Grounds & Central OAT',
    organizer: 'Student Cultural Council & Dean of Student Affairs',
    contact: 'vibrance@eventhub.edu | +1 (555) 890-5544',
    capacity: 600,
    registeredCount: 0,
    registrationDeadline: new Date(Date.now() + 28 * 24 * 60 * 60 * 1000),
    price: 0,
    isFeatured: true,
    isTrending: true,
    tags: ['Fest', 'Vibrance', 'Dance', 'Drama', 'Cultural'],
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1200&auto=format&fit=crop&q=80'
  },
  {
    title: 'Global Diversity & Heritage Carnival',
    description: 'Celebrate our diverse global campus community. Experience authentic traditional cuisines, cultural garment showcases, folklore storytelling, and interactive heritage exhibits presented by international student associations.',
    category: 'Cultural Festivals',
    date: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000),
    startTime: '11:00 AM',
    endTime: '06:00 PM',
    venue: 'International Pavilion & Campus Lawn',
    organizer: 'International Students Association (ISA)',
    contact: 'heritage-carnival@eventhub.edu | +1 (555) 234-7711',
    capacity: 350,
    registeredCount: 0,
    registrationDeadline: new Date(Date.now() + 18 * 24 * 60 * 60 * 1000),
    price: 0,
    isFeatured: false,
    isTrending: false,
    tags: ['Heritage', 'Global', 'Food', 'Culture'],
    image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=1200&auto=format&fit=crop&q=80'
  },
  {
    title: 'Inter-Department Classical Arts & Drama Championship',
    description: 'An elegant theatrical showcase of Shakespearean drama, Indian classical Kathak and Bharatanatyam recital competitions, and street-play mime performances evaluated by eminent regional dramatists.',
    category: 'Cultural Festivals',
    date: new Date(Date.now() + 19 * 24 * 60 * 60 * 1000),
    startTime: '02:00 PM',
    endTime: '08:00 PM',
    venue: 'Rabindranath Tagore Memorial Auditorium',
    organizer: 'Theatre & Dramatics Guild',
    contact: 'drama-arts@eventhub.edu | +1 (555) 678-9900',
    capacity: 250,
    registeredCount: 0,
    registrationDeadline: new Date(Date.now() + 16 * 24 * 60 * 60 * 1000),
    price: 5,
    isFeatured: false,
    isTrending: false,
    tags: ['Theatre', 'Drama', 'Classical Dance', 'Arts'],
    image: 'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?w=1200&auto=format&fit=crop&q=80'
  },

  // ==========================================
  // 5. SPORTS
  // ==========================================
  {
    title: 'Annual Inter-Department Olympic Sports Meet 2026',
    description: 'The pinnacle athletic tournament of the university featuring track & field sprints, 4x100m relays, long jump, shot put, basketball championships, volleyball showdowns, and football tournaments. Medals and university honors awarded to top departments.',
    category: 'Sports',
    date: new Date(Date.now() + 27 * 24 * 60 * 60 * 1000),
    startTime: '07:30 AM',
    endTime: '06:00 PM',
    venue: 'University Olympic Sports Complex & Main Track Stadium',
    organizer: 'Department of Physical Education & Sports Board',
    contact: 'sportsboard@eventhub.edu | +1 (555) 654-9988',
    capacity: 350,
    registeredCount: 0,
    registrationDeadline: new Date(Date.now() + 22 * 24 * 60 * 60 * 1000),
    price: 0,
    isFeatured: true,
    isTrending: true,
    tags: ['Athletics', 'Track', 'Sports Meet', 'Fitness'],
    image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=1200&auto=format&fit=crop&q=80'
  },
  {
    title: 'Campus Premier League: 7v7 Football Championship',
    description: 'Under the floodlights, 16 collegiate teams compete in a high-octane 7-a-side knockout football tournament. Trophies, golden boot accolades, and prize pool for finalists.',
    category: 'Sports',
    date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
    startTime: '04:00 PM',
    endTime: '09:30 PM',
    venue: 'FIFA Standard Synthetic Football Turf',
    organizer: 'University Football Club (UFC)',
    contact: 'football@eventhub.edu | +1 (555) 789-2211',
    capacity: 120,
    registeredCount: 0,
    registrationDeadline: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
    price: 10,
    isFeatured: false,
    isTrending: true,
    tags: ['Football', 'Soccer', 'Tournament', 'Knockout'],
    image: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=1200&auto=format&fit=crop&q=80'
  },
  {
    title: 'Inter-Collegiate Badminton & Table Tennis Open',
    description: 'Smash your way to victory in singles and doubles brackets. Featuring certified regional referees, Yonex match shuttlecocks, and professional indoor synthetic court facilities.',
    category: 'Sports',
    date: new Date(Date.now() + 16 * 24 * 60 * 60 * 1000),
    startTime: '09:00 AM',
    endTime: '04:00 PM',
    venue: 'Indoor Multi-Court Gymnasium',
    organizer: 'Racquet Sports Association',
    contact: 'badminton@eventhub.edu | +1 (555) 432-8822',
    capacity: 90,
    registeredCount: 0,
    registrationDeadline: new Date(Date.now() + 13 * 24 * 60 * 60 * 1000),
    price: 0,
    isFeatured: false,
    isTrending: false,
    tags: ['Badminton', 'Table Tennis', 'Indoor Sports'],
    image: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=1200&auto=format&fit=crop&q=80'
  },

  // ==========================================
  // 6. ENTREPRENEURSHIP AND BUSINESS
  // ==========================================
  {
    title: 'Founders Pitch Arena 2026: Venture Capital & Angel Seed',
    description: 'Transform your tech prototype into a venture-backed enterprise. Student startup founders pitch live to angel investors, VC partners from top funds, and seasoned alumni entrepreneurs. Features $25,000 non-dilutive seed grants and 6 months free incubator space.',
    category: 'Entrepreneurship and Business',
    date: new Date(Date.now() + 29 * 24 * 60 * 60 * 1000),
    startTime: '10:00 AM',
    endTime: '04:30 PM',
    venue: 'Auditorium Hall A, Management & Executive Center',
    organizer: 'E-Cell & Startup Incubation Network',
    contact: 'pitch-arena@eventhub.edu | +1 (555) 670-3412',
    capacity: 100,
    registeredCount: 0,
    registrationDeadline: new Date(Date.now() + 23 * 24 * 60 * 60 * 1000),
    price: 0,
    isFeatured: true,
    isTrending: true,
    tags: ['Startups', 'Venture Capital', 'Pitching', 'E-Cell'],
    image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=1200&auto=format&fit=crop&q=80'
  },
  {
    title: 'Product Management & Growth Marketing Workshop',
    description: 'A deep-dive masterclass into how fast-growing Silicon Valley startups discover product-market fit, design PRDs, conduct cohort retention analysis, and engineer viral acquisition loops with modern analytics stacks.',
    category: 'Entrepreneurship and Business',
    date: new Date(Date.now() + 13 * 24 * 60 * 60 * 1000),
    startTime: '01:30 PM',
    endTime: '05:30 PM',
    venue: 'Seminar Hall 3, Commerce Block',
    organizer: 'Student Business Association & PM Fellowship',
    contact: 'pm-workshop@eventhub.edu | +1 (555) 819-3320',
    capacity: 75,
    registeredCount: 0,
    registrationDeadline: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
    price: 10,
    isFeatured: false,
    isTrending: false,
    tags: ['Product Management', 'Growth', 'Marketing', 'Business'],
    image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=1200&auto=format&fit=crop&q=80'
  },
  {
    title: 'Financial Modeling, FinTech & Crypto Systems Seminar',
    description: 'Industry experts break down quantitative trading algorithms, decentralized finance (DeFi) protocols, modern investment banking valuations, and AI-driven predictive risk models in modern financial markets.',
    category: 'Entrepreneurship and Business',
    date: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000),
    startTime: '10:30 AM',
    endTime: '02:30 PM',
    venue: 'Sir Visvesvaraya Conference Room',
    organizer: 'FinTech & Quantitative Economics Society',
    contact: 'fintech@eventhub.edu | +1 (555) 998-3344',
    capacity: 85,
    registeredCount: 0,
    registrationDeadline: new Date(Date.now() + 17 * 24 * 60 * 60 * 1000),
    price: 0,
    isFeatured: false,
    isTrending: false,
    tags: ['Finance', 'Fintech', 'Quant', 'Investment'],
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&auto=format&fit=crop&q=80'
  },

  // ==========================================
  // 7. ART AND PHOTOGRAPHY
  // ==========================================
  {
    title: 'Visual Arts Showcase & Creative Canvas Expo',
    description: 'A curated gallery exhibition celebrating visual talent across oil painting, acrylic canvas, digital concept art, 3D character modeling, and sculpture. Open gallery walk with live art auctions and interactive sketching corners.',
    category: 'Art and Photography',
    date: new Date(Date.now() + 17 * 24 * 60 * 60 * 1000),
    startTime: '10:00 AM',
    endTime: '06:00 PM',
    venue: 'Fine Arts Gallery & Design Atrium',
    organizer: 'Department of Fine Arts & Creative Guild',
    contact: 'finearts@eventhub.edu | +1 (555) 441-2900',
    capacity: 180,
    registeredCount: 0,
    registrationDeadline: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
    price: 0,
    isFeatured: true,
    isTrending: false,
    tags: ['Art', 'Painting', 'Exhibition', 'Design'],
    image: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=1200&auto=format&fit=crop&q=80'
  },
  {
    title: 'Campus Through The Lens: Urban & Wildlife Photo Walk',
    description: 'Master manual camera controls, golden-hour framing, composition dynamics, macro wildlife, and Lightroom post-processing workflow during this guided field walk led by National Geographic contributing photographers.',
    category: 'Art and Photography',
    date: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000),
    startTime: '06:30 AM',
    endTime: '11:30 AM',
    venue: 'Campus Botanical Gardens & Heritage Clock Tower',
    organizer: 'Shutterbugs Photography Society',
    contact: 'photoclub@eventhub.edu | +1 (555) 776-5544',
    capacity: 45,
    registeredCount: 0,
    registrationDeadline: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000),
    price: 0,
    isFeatured: false,
    isTrending: true,
    tags: ['Photography', 'Photo Walk', 'Lightroom', 'Camera'],
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=1200&auto=format&fit=crop&q=80'
  },
  {
    title: 'UI/UX Design Sprint & Figma Masterclass',
    description: 'From wireframes to interactive design systems. Learn design thinking principles, accessibility (WCAG), auto-layout micro-interactions, and component architecture in Figma directly from senior product designers.',
    category: 'Art and Photography',
    date: new Date(Date.now() + 23 * 24 * 60 * 60 * 1000),
    startTime: '01:00 PM',
    endTime: '05:00 PM',
    venue: 'Digital Media Computer Lab 204',
    organizer: 'Interaction Design & UX Guild',
    contact: 'uiux-sprint@eventhub.edu | +1 (555) 332-9988',
    capacity: 60,
    registeredCount: 0,
    registrationDeadline: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000),
    price: 15,
    isFeatured: false,
    isTrending: false,
    tags: ['UI/UX', 'Figma', 'Design Systems', 'Product Design'],
    image: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=1200&auto=format&fit=crop&q=80'
  },

  // ==========================================
  // 8. COLLEGE EVENTS
  // ==========================================
  {
    title: 'Freshers Carnival & Campus Life Orientation 2026',
    description: 'Welcome to the university family! Explore 40+ student club booths, live musical performances, fun trivia games, campus scavenger hunts, and meet your academic deans and student mentors.',
    category: 'College Events',
    date: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000),
    startTime: '10:00 AM',
    endTime: '04:00 PM',
    venue: 'University Central Quadrangle & Student Center',
    organizer: 'Dean of Student Welfare & Mentorship Cell',
    contact: 'freshers@eventhub.edu | +1 (555) 102-3948',
    capacity: 500,
    registeredCount: 0,
    registrationDeadline: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
    price: 0,
    isFeatured: true,
    isTrending: true,
    tags: ['Freshers', 'Orientation', 'Campus Life', 'Clubs'],
    image: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=1200&auto=format&fit=crop&q=80'
  },
  {
    title: 'Grand Alumni Reunion & Career Mentorship Summit',
    description: 'Connect with distinguished alumni working across Fortune 500 tech firms, research labs, venture capital funds, and public civil services. Gain candid career advice, 1-on-1 resume reviews, and internship referrals.',
    category: 'College Events',
    date: new Date(Date.now() + 35 * 24 * 60 * 60 * 1000),
    startTime: '09:30 AM',
    endTime: '05:00 PM',
    venue: 'Alumni Memorial Hall & Convention Center',
    organizer: 'Office of Alumni Relations & Placement Cell',
    contact: 'alumni-summit@eventhub.edu | +1 (555) 443-8822',
    capacity: 250,
    registeredCount: 0,
    registrationDeadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    price: 0,
    isFeatured: false,
    isTrending: false,
    tags: ['Alumni', 'Networking', 'Career', 'Mentorship'],
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=1200&auto=format&fit=crop&q=80'
  },
  {
    title: 'Annual Science Fair & Engineering Prototype Expo',
    description: 'Undergraduate and postgraduate student researchers present working engineering prototypes, patent-pending inventions, renewable energy devices, and biomedical innovations judged by industry leaders and faculty.',
    category: 'College Events',
    date: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000),
    startTime: '10:00 AM',
    endTime: '04:00 PM',
    venue: 'Science & Engineering Complex, Ground Floor Exhibition Hall',
    organizer: 'Research & Consultancy Directorate',
    contact: 'sciencefair@eventhub.edu | +1 (555) 771-3300',
    capacity: 200,
    registeredCount: 0,
    registrationDeadline: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000),
    price: 0,
    isFeatured: false,
    isTrending: false,
    tags: ['Science Fair', 'Engineering', 'Innovation', 'Research'],
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=1200&auto=format&fit=crop&q=80'
  },

  // ==========================================
  // 9. CONFERENCES AND SEMINARS
  // ==========================================
  {
    title: 'International Conference on Quantum Computing & Future Tech',
    description: 'World-renowned quantum physicists, IBM Q researchers, and quantum software developers gather to present peer-reviewed papers on quantum algorithms, Qiskit error mitigation, and topological qubits. Keynote addresses, panel debates, and research networking.',
    category: 'Conferences and Seminars',
    date: new Date(Date.now() + 40 * 24 * 60 * 60 * 1000),
    startTime: '09:00 AM',
    endTime: '05:30 PM',
    venue: 'Sir C.V. Raman International Auditorium',
    organizer: 'Department of Computer Science & IEEE Quantum Council',
    contact: 'quantum-conf@eventhub.edu | +1 (555) 332-1100',
    capacity: 200,
    registeredCount: 0,
    registrationDeadline: new Date(Date.now() + 34 * 24 * 60 * 60 * 1000),
    price: 50,
    isFeatured: true,
    isTrending: false,
    tags: ['Quantum', 'Conference', 'Research', 'IEEE'],
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&auto=format&fit=crop&q=80'
  },
  {
    title: 'Sustainable Green Tech & Climate Resilience Summit',
    description: 'Leading climatologists, clean energy pioneers, and environmental policy makers explore solar grid efficiency, battery storage breakthroughs, sustainable urban design, and circular economy strategies for campus and cities.',
    category: 'Conferences and Seminars',
    date: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
    startTime: '10:00 AM',
    endTime: '03:30 PM',
    venue: 'Green Earth Conference Centre, Environmental Science Wing',
    organizer: 'Center for Sustainability & Renewable Energy',
    contact: 'greentech@eventhub.edu | +1 (555) 887-2211',
    capacity: 140,
    registeredCount: 0,
    registrationDeadline: new Date(Date.now() + 12 * 24 * 60 * 60 * 1000),
    price: 0,
    isFeatured: false,
    isTrending: false,
    tags: ['Green Tech', 'Sustainability', 'Climate', 'Solar'],
    image: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=1200&auto=format&fit=crop&q=80'
  },
  {
    title: 'Women in STEM & Engineering Leadership Colloquium',
    description: 'Empowering the next generation of women technologists, engineers, and scientific leaders. Inspiring panels with Fortune 500 engineering directors, breakthrough researchers, workshop breakout sessions, and networking luncheon.',
    category: 'Conferences and Seminars',
    date: new Date(Date.now() + 9 * 24 * 60 * 60 * 1000),
    startTime: '11:00 AM',
    endTime: '04:00 PM',
    venue: 'Grace Hopper Auditorium, Computing Sciences Complex',
    organizer: 'Society of Women Engineers (SWE) Campus Section',
    contact: 'women-stem@eventhub.edu | +1 (555) 662-4411',
    capacity: 160,
    registeredCount: 0,
    registrationDeadline: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000),
    price: 0,
    isFeatured: false,
    isTrending: true,
    tags: ['Women in Tech', 'Leadership', 'SWE', 'STEM'],
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=1200&auto=format&fit=crop&q=80'
  }
];

const seedDatabase = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/eventhub_db';
    console.log(`Connecting to MongoDB at: ${mongoUri}...`);
    await mongoose.connect(mongoUri);

    console.log('Clearing existing database collections...');
    await Registration.deleteMany({});
    await Event.deleteMany({});
    await User.deleteMany({});

    console.log('Creating Admin and Student accounts...');

    // 1. Admin Account
    const adminUser = await User.create({
      name: 'System Administrator',
      email: 'admin@eventhub.edu',
      password: 'AdminPassword123!',
      phone: '+1 (555) 019-2834',
      college: 'College of Engineering & Technology',
      role: 'admin'
    });

    // 2. Student Demo Account
    const studentUser = await User.create({
      name: 'Alex Johnson',
      email: 'student@eventhub.edu',
      password: 'StudentPassword123!',
      phone: '+1 (555) 349-8812',
      college: 'Department of Computer Science & Engineering',
      role: 'user'
    });

    // 3. Second Student Account
    const student2User = await User.create({
      name: 'Priya Sharma',
      email: 'priya@eventhub.edu',
      password: 'StudentPassword123!',
      phone: '+1 (555) 678-1234',
      college: 'School of Information Technology',
      role: 'user'
    });

    console.log(`Seeding ${sampleEvents.length} realistic events across all 9 categories...`);
    const createdEvents = await Event.insertMany(sampleEvents);

    console.log('Seeding initial student registrations for rich dashboard metrics...');
    // Alex registered for Hackathon (Event 0), AI Workshop (Event 3), Rockfest (Event 6)
    const reg1 = await Registration.create({
      registrationId: 'EVT-2026-101429',
      user: studentUser._id,
      event: createdEvents[0]._id, // National AI Hackathon
      status: 'Confirmed',
      registeredAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
    });
    createdEvents[0].registeredCount += 1;
    await createdEvents[0].save();

    const reg2 = await Registration.create({
      registrationId: 'EVT-2026-102558',
      user: studentUser._id,
      event: createdEvents[3]._id, // Deep Learning Workshop
      status: 'Confirmed',
      registeredAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
    });
    createdEvents[3].registeredCount += 1;
    await createdEvents[3].save();

    const reg3 = await Registration.create({
      registrationId: 'EVT-2026-104921',
      user: studentUser._id,
      event: createdEvents[6]._id, // Rockfest Battle of the Bands
      status: 'Confirmed',
      registeredAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
    });
    createdEvents[6].registeredCount += 1;
    await createdEvents[6].save();

    // Priya registered for Vibrance (Event 9) and Green Tech (Event 25)
    const reg4 = await Registration.create({
      registrationId: 'EVT-2026-105118',
      user: student2User._id,
      event: createdEvents[9]._id, // Vibrance
      status: 'Confirmed',
      registeredAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000)
    });
    createdEvents[9].registeredCount += 1;
    await createdEvents[9].save();

    console.log('==============================================');
    console.log(' Database Seeded Successfully!');
    console.log(` Total Events: ${createdEvents.length}`);
    console.log(' All 9 Categories Populated!');
    console.log('==============================================');
    console.log('Demo Credentials:');
    console.log(' Admin Account:');
    console.log('   Email:    admin@eventhub.edu');
    console.log('   Password: AdminPassword123!');
    console.log(' Student Account:');
    console.log('   Email:    student@eventhub.edu');
    console.log('   Password: StudentPassword123!');
    console.log('==============================================');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
