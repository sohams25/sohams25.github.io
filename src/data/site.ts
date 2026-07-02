/* =========================================================================
   Site content — single source of truth for Soham Shinde's portfolio.
   Every metric, date, and institution here matches the CV. No invented facts.
   ========================================================================= */

export interface Link {
  label: string;
  href: string;
}

export interface Experience {
  org: string;
  url: string;
  role: string;
  period: string;
  logo: string;
  logoAlt: string;
  summary: string;
  tags: string[];
}

export interface Publication {
  title: string;
  authors: string;
  venue: string;
  status: 'Accepted' | 'Under review';
  link?: string;
  thumb: string;
  thumbAlt: string;
}

export interface Project {
  name: string;
  period: string;
  note: string;
  summary: string;
  tags: string[];
  link?: Link;
}

export const profile = {
  name: 'Soham Shinde',
  role: 'Machine Learning Engineer',
  roleLine: 'machine learning · computer vision · robotics',
  tagline: 'I teach robots to see. Mostly they do.',
  statusNow:
    'At Clutterbot, building the perception pipelines that tell indoor robots where things are.',
  location: 'Bengaluru, India',
  photo: '/images/ProfilePhoto.jpeg',
  photoAlt: 'Soham Shinde',
  email: 'sohams.web@gmail.com',
  links: {
    github: 'https://github.com/sohams25',
    linkedin: 'https://www.linkedin.com/in/sohams2k3/',
    cv: 'https://drive.google.com/file/d/1Eq_YHm8R2EUpRYa85YuvEElSPurYrvCd/view?usp=drive_link',
  },
} as const;

export const about = {
  para1:
    "I'm a Machine Learning Engineer at Clutterbot. I build the pipelines that train and deploy our segmentation and detection models, the ones that let our indoor robots see and move, and I package those deliverables for the Autonomous Navigation team. Recently I moved our perception system onto the Qualcomm DragonWing QCS6490P chipset and NVIDIA IoT kits, pulling about 30% more edge inference speed out of a barebones Linux setup with GStreamer. The hardware move risked breaking how the robot tracks its target, so I designed and shipped a custom 6DOF pose-estimation proof-of-concept for locking and rebasing.",
  para2:
    "Before Clutterbot I spent most of my time in research labs, pointing models at images and asking what they understood. At NTU I built and benchmarked a Video Vision Transformer for classroom activity recognition. It hit 88% test accuracy on a 927-clip EduNet subset and 72% on an independent 100-video set, and the saliency maps showed it watching the right things: raised hands, writing on the board. I also worked on gaze estimation to derive student-engagement measures. At TCS Research I wrapped Segment Anything in a PyQt5 GUI for AI-assisted annotation and automated the stitching of segmented regions into larger sub-scenes. At CSIR-CEERI I restored deteriorated Rajasthani murals with U-Net++, DeepLabV3+, and a few others, reaching SSIM 0.9812 on the inpainting pipeline. The same thread runs through all of it: computer vision, 3D modeling, applied ML, some HCI, and robotics.",
  para3:
    'I studied Electronics & Communication Engineering with a minor in Data Science at BITS Pilani Goa. There I wrote autonomous navigation for Project Kratos, our student-built Mars rover prototype. Off the keyboard I brew Blue Tokai in a French press, boulder, and trek in the Himalayas. Same loop as debugging: find the next hold, commit, sometimes fall.',
} as const;

export const sectionIntros = {
  experience: 'Research labs, internships, and now a robotics startup. Newest first.',
  publications: 'Two papers on segmenting and restoring artwork and ancient wall paintings. One accepted, one under review.',
  projects: 'Point clouds, smart glasses, a Mars rover.',
  contact: "Email me at sohams.web@gmail.com. I'm also on GitHub and LinkedIn, and the CV has the long version.",
} as const;

export const experience: Experience[] = [
  {
    org: 'Clutterbot',
    url: 'https://www.clutterbot.com/',
    role: 'Machine Learning Engineer',
    period: "May '25 — Present",
    logo: '/images/ClutterBot_Logo.png',
    logoAlt: 'Clutterbot logo',
    summary:
      'I build the pipelines that train and ship our segmentation and detection models for indoor navigation, and package them for the Autonomous Navigation team. I moved the perception stack onto the Qualcomm DragonWing QCS6490P and NVIDIA IoT kits, gaining about 30% edge inference speed on barebones Linux with GStreamer, and built a custom 6DOF pose-estimation proof-of-concept to keep target locking stable through the migration.',
    tags: ['edge inference', 'perception', '6DOF pose', 'GStreamer'],
  },
  {
    org: 'Nanyang Technological University',
    url: 'https://www.ntu.edu.sg/',
    role: 'Research Associate',
    period: "Jul '24 — May '25",
    logo: '/images/NTU.png',
    logoAlt: 'Nanyang Technological University logo',
    summary:
      'Built and benchmarked a Video Vision Transformer (ViViT) for classroom activity recognition: 88% test accuracy on a 927-clip EduNet subset, 72% on an independent 100-video set, with gradient saliency maps confirming the model watched raised hands and board writing. Worked on gaze estimation to derive student-engagement measures, with Dr. Yuvaraj and Dr. Amalin.',
    tags: ['ViViT', 'gaze estimation', 'video', 'HCI'],
  },
  {
    org: 'TCS Research',
    url: '',
    role: 'Intern',
    period: "Jun '24 — Aug '24",
    logo: '/images/TCSR_Logo.png',
    logoAlt: 'TCS Research logo',
    summary:
      'Wrapped Segment Anything (SAM) in a PyQt5 GUI for AI-assisted image annotation, and automated stitching of individually segmented regions into larger sub-scenes for semantic scene understanding.',
    tags: ['SAM', 'PyQt5', 'segmentation', 'tooling'],
  },
  {
    org: 'CSIR-CEERI, Pilani',
    url: 'https://www.ceeri.res.in/',
    role: 'Research Intern',
    period: "May '23 — Aug '23",
    logo: '/images/Central_Electronics_Engineering_Research_Institute_Logo.png',
    logoAlt: 'CSIR-CEERI logo',
    summary:
      'Restored and segmented deteriorated Rajasthani murals with U-Net++, DeepLabV3+, PSPNet and FPN under Dr. Dhiraj Sangwan. Generated synthetic damage with StyleGAN2-ADA and reached SSIM 0.9812 on the inpainting pipeline.',
    tags: ['inpainting', 'GANs', 'cultural heritage', 'SSIM 0.9812'],
  },
];

export const publications: Publication[] = [
  {
    title: 'Subscene Segmentation for Artwork Scene Understanding',
    authors: 'Soham Shinde, Vikram Jamwal',
    venue: 'ECCV AI4VA Workshop',
    status: 'Under review',
    thumb: '/images/TCSR.png',
    thumbAlt: 'Subscene segmentation result',
  },
  {
    title: 'Damage Segmentation and Restoration of Ancient Wall Paintings for Preserving Cultural Heritage',
    authors: 'HS Baath, S. Shinde, J. Keniya, PR. Mishra, A. Saini, D. Sangwan',
    venue: 'CVIP-2023 · Springer',
    status: 'Accepted',
    link: 'https://link.springer.com/chapter/10.1007/978-3-031-58535-7_9',
    thumb: '/images/17.png',
    thumbAlt: 'Wall painting restoration result',
  },
];

export const projects: Project[] = [
  {
    name: 'CloSe++',
    period: "Feb '24 — May '24",
    note: 'with Dr. Garvita Tiwari',
    summary:
      'Extended the CloSe-Net framework for fine-grained 3D clothing segmentation from coloured point clouds. Sharpened edge detection between clothing types and automated clothing-type detection to remove manual input.',
    tags: ['3D', 'point clouds', 'segmentation'],
    link: { label: 'CloSe', href: 'https://virtualhumans.mpi-inf.mpg.de/close3dv24/' },
  },
  {
    name: 'Project Visio',
    period: "Oct '22 — Aug '23",
    note: 'with Prof. Sougata Sen',
    summary:
      'Smart glasses to aid the visually impaired: object detection and scene understanding, Tiny-ML inference on ESP microcontrollers, and a companion Android app talking to the glasses over WiFi.',
    tags: ['Tiny-ML', 'embedded', 'assistive'],
  },
  {
    name: 'Project Kratos',
    period: "Sep '22 — Jan '23",
    note: "BITS Goa Mars rover",
    summary:
      "Autonomous Subsystem of BITS Goa's student-built Mars rover prototype. Autonomous navigation in ROS, path planning with A*, Dijkstra and SLAM in Gazebo on an NVIDIA Jetson Xavier, and OpenCV object detection.",
    tags: ['ROS', 'SLAM', 'path planning'],
    link: { label: 'kratos-the-rover', href: 'https://kratos-the-rover.github.io' },
  },
];

export const education = {
  degree: 'B.E. Electronics & Communication Engineering, minor in Data Science',
  school: 'BITS Pilani, K.K. Birla Goa Campus',
  schoolUrl: 'https://www.bits-pilani.ac.in/goa/',
  year: 'Graduated July 2025',
} as const;

export const interests = [
  'Blue Tokai in a French press',
  'Bouldering',
  'Treks in the Himalayas',
] as const;

export const orgs = [
  { name: 'BITS Pilani', logo: '/images/BITS_Pilani-Logo.png' },
  { name: 'CSIR-CEERI', logo: '/images/Central_Electronics_Engineering_Research_Institute_Logo.png' },
  { name: 'TCS Research', logo: '/images/TCSR_Logo.png' },
  { name: 'NTU Singapore', logo: '/images/NTU.png' },
  { name: 'Clutterbot', logo: '/images/ClutterBot_Logo.png' },
] as const;

export const meta = {
  title: 'Soham Shinde — Machine Learning Engineer',
  description:
    'I build computer vision and 3D perception for robots. At Clutterbot I work on perception pipelines that let an indoor robot navigate, plus edge inference and the research behind it.',
  ogDescription:
    'I build computer vision and 3D perception for robots: navigation pipelines, edge inference, and the research behind them.',
  url: 'https://sohamshinde.com',
} as const;
