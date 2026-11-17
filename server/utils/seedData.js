const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const User = require('../models/User');
const Event = require('../models/Event');
const Registration = require('../models/Registration');

dotenv.config({ path: path.join(__dirname, '..', '.env') });

const sampleEvents = [
  {
    title: 'AI & Machine Learning Workshop',
    description: 'An intensive hands-on workshop covering the fundamentals of Deep Learning, Neural Networks, Computer Vision, and Transformer architectures using PyTorch and Hugging Face. Designed for aspiring ML engineers and researchers looking to build real-world AI applications.',
    category: 'Workshops',
    date: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000), // 15 days from now
    startTime: '09:30 AM',
    endTime: '04:30 PM',
    venue: 'Turing Computer Lab 302, Main Academic Block',
    organizer: 'Department of Artificial Intelligence & Data Science',
    contact: 'ai-workshop@eventhub.edu | +1 (555) 723-9011',
    capacity: 60,
    registeredCount: 0,
    registrationDeadline: new Date(Date.now() + 12 * 24 * 60 * 60 * 1000),
    image: 'https://images.unsplash.com/photo-1555255707-c07966088b7b?w=1000&auto=format&fit=crop&q=80'
  },
  {
    title: 'Web Development Bootcamp',
    description: 'Master full-stack modern web development! Learn React 19, Node.js, Tailwind CSS, and REST API architectural patterns. Build and deploy an interactive production project during this two-day comprehensive bootcamp.',
    category: 'Workshops',
    date: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000),
    startTime: '10:00 AM',
    endTime: '05:00 PM',
    venue: 'Software Engineering Lab 1, Tech Block',
    organizer: 'Google Developer Student Club (GDSC)',
    contact: 'gdsc-leads@eventhub.edu | +1 (555) 881-2299',
    capacity: 75,
    registeredCount: 0,
    registrationDeadline: new Date(Date.now() + 18 * 24 * 60 * 60 * 1000),
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1000&auto=format&fit=crop&q=80'
  },
  {
    title: 'National Hackathon 2026',
    description: 'A 24-hour non-stop hackathon challenging multidisciplinary student teams to engineer novel software and hardware solutions addressing Smart Cities, Healthcare AI, Green Tech, and Cyber Resilience. Huge cash prizes, mentoring, and direct interview opportunities with top tech sponsors.',
    category: 'Competitions',
    date: new Date(Date.now() + 28 * 24 * 60 * 60 * 1000),
    startTime: '08:00 AM',
    endTime: '08:00 AM (Next Day)',
    venue: 'Central University Auditorium & Innovation Hub',
    organizer: 'Innovation & Incubation Cell (IIC)',
    contact: 'hackathon@eventhub.edu | +1 (555) 902-3344',
    capacity: 120,
    registeredCount: 0,
    registrationDeadline: new Date(Date.now() + 22 * 24 * 60 * 60 * 1000),
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1000&auto=format&fit=crop&q=80'
  },
  {
    title: 'Cyber Security Awareness Seminar',
    description: 'Distinguished cybersecurity researchers and ethical penetration testers discuss zero-trust architecture, ransomware defense strategies, social engineering countermeasures, and career pathways in offensive and defensive digital security.',
    category: 'Seminars',
    date: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
    startTime: '02:00 PM',
    endTime: '05:00 PM',
    venue: 'Dr. APJ Abdul Kalam Memorial Hall',
    organizer: 'Cyber Security Student Guild',
    contact: 'cybersec@eventhub.edu | +1 (555) 412-8877',
    capacity: 150,
    registeredCount: 0,
    registrationDeadline: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000),
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1000&auto=format&fit=crop&q=80'
  },
  {
    title: 'Inter-College Coding Competition',
    description: 'Compete against the sharpest programmers across the state. Test your data structures, algorithms, dynamic programming, and mathematical problem-solving skills under timed contest conditions modeled on ICPC standards.',
    category: 'Competitions',
    date: new Date(Date.now() + 17 * 24 * 60 * 60 * 1000),
    startTime: '11:00 AM',
    endTime: '02:30 PM',
    venue: 'Online & Central Lab B',
    organizer: 'Coding & Competitive Programming Club',
    contact: 'codecomp@eventhub.edu | +1 (555) 334-1188',
    capacity: 90,
    registeredCount: 0,
    registrationDeadline: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
    image: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=1000&auto=format&fit=crop&q=80'
  },
  {
    title: 'Campus Spring Cultural Fest - VIBRANCE',
    description: 'The premier annual cultural extravaganza of the university! Three vibrant days of battle of the bands, western & classical dance choreography, theatrical drama, fashion walk, art exhibitions, and pro-night celebrity concerts.',
    category: 'Cultural',
    date: new Date(Date.now() + 35 * 24 * 60 * 60 * 1000),
    startTime: '09:00 AM',
    endTime: '10:00 PM',
    venue: 'University Open Air Theatre (OAT)',
    organizer: 'Student Affairs & Cultural Council',
    contact: 'culturalfest@eventhub.edu | +1 (555) 890-5544',
    capacity: 500,
    registeredCount: 0,
    registrationDeadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1000&auto=format&fit=crop&q=80'
  },
  {
    title: 'Entrepreneurship & Startup Pitch Workshop',
    description: 'Learn how to transform an innovative technical idea into a scalable venture. Covering market research, customer discovery, minimum viable product (MVP) design, financial forecasting, and investor pitch deck preparation with successful alumni founders.',
    category: 'Workshops',
    date: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000),
    startTime: '10:30 AM',
    endTime: '03:30 PM',
    venue: 'Seminar Hall 2, Management Block',
    organizer: 'E-Cell & Startup Incubation Network',
    contact: 'ecell@eventhub.edu | +1 (555) 670-3412',
    capacity: 80,
    registeredCount: 0,
    registrationDeadline: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000),
    image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=1000&auto=format&fit=crop&q=80'
  },
  {
    title: 'Cloud Computing & DevOps Summit',
    description: 'Dive deep into modern cloud-native deployment patterns, Docker containerization, Kubernetes orchestration, CI/CD automated deployment pipelines, and microservice infrastructure monitoring on AWS and Google Cloud.',
    category: 'Seminars',
    date: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000),
    startTime: '01:30 PM',
    endTime: '05:30 PM',
    venue: 'Auditorium Hall B',
    organizer: 'Cloud & Infrastructure SIG',
    contact: 'cloudsummit@eventhub.edu | +1 (555) 321-7788',
    capacity: 110,
    registeredCount: 0,
    registrationDeadline: new Date(Date.now() + 19 * 24 * 60 * 60 * 1000),
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1000&auto=format&fit=crop&q=80'
  },
  {
    title: 'Annual Inter-Department Sports Meet',
    description: 'The pinnacle athletic tournament of the semester featuring track & field sprints, basketball championships, volleyball showdowns, football, badminton, and table tennis. Register early to represent your department!',
    category: 'Sports',
    date: new Date(Date.now() + 40 * 24 * 60 * 60 * 1000),
    startTime: '07:30 AM',
    endTime: '06:00 PM',
    venue: 'University Olympic Sports Complex & Grounds',
    organizer: 'Department of Physical Education & Sports Board',
    contact: 'sportsboard@eventhub.edu | +1 (555) 654-9988',
    capacity: 250,
    registeredCount: 0,
    registrationDeadline: new Date(Date.now() + 32 * 24 * 60 * 60 * 1000),
    image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=1000&auto=format&fit=crop&q=80'
  },
  {
    title: 'State Level Technical Quiz - TECH-WHIZ',
    description: 'A battle of intellect spanning computer history, modern programming languages, algorithmic milestones, emerging tech breakthroughs, and sci-tech trivia. Team up in pairs of two for rapid-fire rounds and buzzers!',
    category: 'Technical',
    date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
    startTime: '02:00 PM',
    endTime: '04:30 PM',
    venue: 'Sir MV Auditorium',
    organizer: 'IEEE Student Branch',
    contact: 'ieee-quiz@eventhub.edu | +1 (555) 234-9090',
    capacity: 100,
    registeredCount: 0,
    registrationDeadline: new Date(Date.now() + 11 * 24 * 60 * 60 * 1000),
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1000&auto=format&fit=crop&q=80'
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

    console.log('Creating Admin and Student demo accounts...');

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
      college: 'Department of Computer Science',
      role: 'user'
    });

    // 3. Second Student Demo Account
    const student2User = await User.create({
      name: 'Priya Sharma',
      email: 'priya@eventhub.edu',
      password: 'StudentPassword123!',
      phone: '+1 (555) 678-1234',
      college: 'Information Technology Division',
      role: 'user'
    });

    console.log('Seeding 10 realistic college events...');
    const createdEvents = await Event.insertMany(sampleEvents);

    console.log('Seeding initial sample registrations...');
    // Seed 2 active registrations for Alex Johnson
    const reg1 = await Registration.create({
      registrationId: 'EVT-2026-101429',
      user: studentUser._id,
      event: createdEvents[0]._id, // AI & ML
      status: 'Confirmed',
      registeredAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
    });
    createdEvents[0].registeredCount += 1;
    await createdEvents[0].save();

    const reg2 = await Registration.create({
      registrationId: 'EVT-2026-102558',
      user: studentUser._id,
      event: createdEvents[2]._id, // National Hackathon
      status: 'Confirmed',
      registeredAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
    });
    createdEvents[2].registeredCount += 1;
    await createdEvents[2].save();

    // Seed 1 registration for Priya Sharma
    const reg3 = await Registration.create({
      registrationId: 'EVT-2026-103891',
      user: student2User._id,
      event: createdEvents[1]._id, // Web Dev Bootcamp
      status: 'Confirmed',
      registeredAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
    });
    createdEvents[1].registeredCount += 1;
    await createdEvents[1].save();

    console.log('==============================================');
    console.log(' Database Seeded Successfully!');
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
