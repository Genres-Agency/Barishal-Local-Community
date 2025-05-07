"use client";

import Image from "next/image";
import { useParams } from "next/navigation";

interface ServiceItem {
  id: number;
  title: string;
  image: string;
  address: string;
  phone: string;
  description: string;
}

interface SubCategory {
  id: number;
  title: string;
  icon?: string;
  services?: ServiceItem[];
}

interface Category {
  id: number;
  title: string;
  icon: string;
  subCategories?: SubCategory[];
}

// সমস্ত ক্যাটাগরির জন্য ডেমো সার্ভিস ডেটা
const shoppingMallServices: ServiceItem[] = [
  {
    id: 1,
    title: "বরিশাল সিটি মল",
    image: "/assets/images/malls/city-mall.jpg",
    address: "নতুন বাজার, বরিশাল",
    phone: "০১৭১২-৩৪৫৬৭৮",
    description:
      "বরিশালের সবচেয়ে বড় শপিং মল। ব্র্যান্ডেড শপ, ফুড কোর্ট এবং সিনেমা হল সহ সকল সুবিধা।",
  },
  {
    id: 2,
    title: "সাউদার্ন প্লাজা",
    image: "/assets/images/malls/southern-plaza.jpg",
    address: "সদর রোড, বরিশাল",
    phone: "০১৮১২-৯৮৭৬৫৪",
    description:
      "আধুনিক শপিং মল। ফ্যাশন স্টোর, সুপারশপ এবং রেস্টুরেন্ট সহ বিভিন্ন দোকান।",
  },
  {
    id: 3,
    title: "নতুন বাজার শপিং কমপ্লেক্স",
    image: "/assets/images/malls/new-market.jpg",
    address: "নতুন বাজার, বরিশাল",
    phone: "০১৯১২-৩৪৫৬৭৮",
    description:
      "ঐতিহ্যবাহী শপিং এলাকা। পোশাক, ইলেকট্রনিক্স এবং দৈনন্দিন প্রয়োজনীয় পণ্যের দোকান।",
  },
  {
    id: 4,
    title: "বরিশাল প্লাজা",
    image: "/assets/images/malls/barishal-plaza.jpg",
    address: "বেল তলা, বরিশাল",
    phone: "০১৮১৫-৯৮৭৬৫৪",
    description:
      "আধুনিক শপিং কমপ্লেক্স। বিভিন্ন ব্র্যান্ডের শোরুম এবং বিনোদন কেন্দ্র।",
  },
];

const parkServices: ServiceItem[] = [
  {
    id: 1,
    title: "বরিশাল সেন্ট্রাল পার্ক",
    image: "/assets/images/parks/central-park.jpg",
    address: "সদর রোড, বরিশাল",
    phone: "০১৭১২-৩৪৫৬৭৮",
    description:
      "শহরের প্রাণকেন্দ্রে অবস্থিত বিশাল পার্ক। সবুজ গাছপালা, হাঁটার পথ এবং খেলার মাঠ সহ।",
  },
  {
    id: 2,
    title: "রিভারসাইড চিলড্রেন পার্ক",
    image: "/assets/images/parks/riverside-park.jpg",
    address: "নদী তীর, বরিশাল",
    phone: "০১৮১২-৯৮৭৬৫৪",
    description:
      "শিশুদের জন্য নিরাপদ খেলার স্থান। বিভিন্ন রাইড এবং খেলার সরঞ্জাম সহ।",
  },
  {
    id: 3,
    title: "ইকো পার্ক বরিশাল",
    image: "/assets/images/parks/eco-park.jpg",
    address: "কাউনিয়া, বরিশাল",
    phone: "০১৯১২-৩৪৫৬৭৮",
    description:
      "প্রাকৃতিক পরিবেশে অবস্থিত ইকো পার্ক। বিভিন্ন প্রজাতির গাছ, পাখি এবং প্রজাপতি দেখার সুযোগ।",
  },
  {
    id: 4,
    title: "স্পোর্টস কমপ্লেক্স পার্ক",
    image: "/assets/images/parks/sports-park.jpg",
    address: "স্টেডিয়াম রোড, বরিশাল",
    phone: "০১৮১৫-৯৮৭৬৫৪",
    description:
      "ক্রীড়া সুবিধা সম্পন্ন পার্ক। ফুটবল মাঠ, ব্যাডমিন্টন কোর্ট এবং জগিং ট্র্যাক সহ।",
  },
];

const restaurantServices: ServiceItem[] = [
  {
    id: 1,
    title: "বাংলা কিচেন",
    image: "/assets/images/restaurants/bangla-kitchen.jpg",
    address: "সদর রোড, বরিশাল",
    phone: "০১৭১২-৩৪৫৬৭৮",
    description:
      "ঐতিহ্যবাহী বাঙালি খাবারের রেস্টুরেন্ট। কাচ্চি বিরিয়ানি, ভর্তা এবং মাছের স্পেশাল আইটেম।",
  },
  {
    id: 2,
    title: "চাইনিজ কর্নার",
    image: "/assets/images/restaurants/chinese-corner.jpg",
    address: "নতুন বাজার, বরিশাল",
    phone: "০১৮১২-৯৮৭৬৫৪",
    description:
      "চাইনিজ এবং থাই খাবারের রেস্টুরেন্ট। নুডলস, সুপ এবং সী-ফুড স্পেশালিটি।",
  },
  {
    id: 3,
    title: "পিৎজা হাট",
    image: "/assets/images/restaurants/pizza-hut.jpg",
    address: "সিটি মল, বরিশাল",
    phone: "০১৯১২-৩৪৫৬৭৮",
    description:
      "ইতালিয়ান পিৎজা এবং পাস্তার রেস্টুরেন্ট। বিভিন্ন ধরনের পিৎজা এবং সাইড ডিশ।",
  },
  {
    id: 4,
    title: "কফি হাউস",
    image: "/assets/images/restaurants/coffee-house.jpg",
    address: "বেল তলা, বরিশাল",
    phone: "০১৮১৫-৯৮৭৬৫৪",
    description:
      "আধুনিক ক্যাফে। প্রিমিয়াম কফি, স্ন্যাকস এবং ডেজার্ট। ওয়াই-ফাই সহ আরামদায়ক পরিবেশ।",
  },
  {
    id: 5,
    title: "হেলদি বাইটস",
    image: "/assets/images/restaurants/healthy-bites.jpg",
    address: "সদর রোড, বরিশাল",
    phone: "০১৭১৫-৯৮৭৬৫৪",
    description:
      "স্বাস্থ্যসম্মত খাবারের রেস্টুরেন্ট। সালাদ, স্মুদি, এবং অর্গানিক খাবার।",
  },
];

const hospitalServices: ServiceItem[] = [
  {
    id: 1,
    title: "বরিশাল মেডিকেল কলেজ হাসপাতাল",
    image: "/assets/images/hospitals/medical-college.jpg",
    address: "সদর রোড, বরিশাল",
    phone: "০১৭১২-৩৪৫৬৭৮",
    description:
      "সরকারি মেডিকেল কলেজ হাসপাতাল। ২৪/৭ জরুরি সেবা এবং বিশেষজ্ঞ চিকিৎসক।",
  },
  {
    id: 2,
    title: "ইবনে সিনা হাসপাতাল",
    image: "/assets/images/hospitals/ibn-sina.jpg",
    address: "নতুন বাজার, বরিশাল",
    phone: "০১৮১২-৯৮৭৬৫৪",
    description:
      "আধুনিক প্রাইভেট হাসপাতাল। সকল ধরনের রোগের চিকিৎসা এবং সার্জারি সুবিধা।",
  },
  {
    id: 3,
    title: "ডেন্টাল কেয়ার সেন্টার",
    image: "/assets/images/hospitals/dental-care.jpg",
    address: "কাজীর মোড়, বরিশাল",
    phone: "০১৯১২-৩৪৫৬৭৮",
    description:
      "আধুনিক দন্ত চিকিৎসা কেন্দ্র। দাঁতের সমস্ত ধরনের চিকিৎসা এবং কসমেটিক ডেন্টিস্ট্রি।",
  },
  {
    id: 4,
    title: "লাইফ কেয়ার ডায়াগনস্টিক",
    image: "/assets/images/hospitals/life-care.jpg",
    address: "বেল তলা, বরিশাল",
    phone: "০১৮১৫-৯৮৭৬৫৪",
    description:
      "আধুনিক ডায়াগনস্টিক সেন্টার। এমআরআই, সিটি স্ক্যান, এক্স-রে এবং প্যাথলজি সেবা।",
  },
  {
    id: 5,
    title: "মাদার কেয়ার ক্লিনিক",
    image: "/assets/images/hospitals/mother-care.jpg",
    address: "সদর রোড, বরিশাল",
    phone: "০১৭১৫-৯৮৭৬৫৪",
    description:
      "মা ও শিশু স্বাস্থ্য কেন্দ্র। প্রসূতি সেবা, শিশু রোগ বিশেষজ্ঞ এবং টিকাদান কেন্দ্র।",
  },
];

const religiousServices: ServiceItem[] = [
  {
    id: 1,
    title: "বরিশাল কেন্দ্রীয় জামে মসজিদ",
    image: "/assets/images/religious/central-mosque.jpg",
    address: "সদর রোড, বরিশাল",
    phone: "০১৭১২-৩৪৫৬৭৮",
    description:
      "ঐতিহাসিক কেন্দ্রীয় মসজিদ। সুন্দর স্থাপত্য এবং বিশাল প্রার্থনা কক্ষ।",
  },
  {
    id: 2,
    title: "শ্রী শ্রী কালী মন্দির",
    image: "/assets/images/religious/kali-temple.jpg",
    address: "নতুন বাজার, বরিশাল",
    phone: "০১৮১২-৯৮৭৬৫৪",
    description:
      "প্রাচীন কালী মন্দির। ধর্মীয় অনুষ্ঠান এবং পূজা-অর্চনার কেন্দ্র।",
  },
  {
    id: 3,
    title: "সেন্ট পিটারস চার্চ",
    image: "/assets/images/religious/st-peters.jpg",
    address: "চার্চ রোড, বরিশাল",
    phone: "০১৯১২-৩৪৫৬৭৮",
    description:
      "ঐতিহ্যবাহী খ্রিস্টান গির্জা। রবিবারের প্রার্থনা এবং ধর্মীয় উৎসব পালন।",
  },
  {
    id: 4,
    title: "বরিশাল বৌদ্ধ বিহার",
    image: "/assets/images/religious/buddhist-temple.jpg",
    address: "বেল তলা, বরিশাল",
    phone: "০১৮১৫-৯৮৭৬৫৪",
    description:
      "শান্তিপূর্ণ বৌদ্ধ মন্দির। ধ্যান কেন্দ্র এবং ধর্মীয় শিক্ষার স্থান।",
  },
  {
    id: 5,
    title: "গুরুদ্বারা সাহিব",
    image: "/assets/images/religious/gurudwara.jpg",
    address: "সদর রোড, বরিশাল",
    phone: "০১৭১৫-৯৮৭৬৫৪",
    description:
      "শিখ ধর্মের উপাসনালয়। লঙ্গর (সামাজিক রান্নাঘর) এবং ধর্মীয় অনুষ্ঠান।",
  },
];

const touristServices: ServiceItem[] = [
  {
    id: 1,
    title: "দুর্গাসাগর দীঘি",
    image: "/assets/images/tourist/durga-sagar.jpg",
    address: "সদর রোড, বরিশাল",
    phone: "০১৭১২-৩৪৫৬৭৮",
    description: "ঐতিহাসিক দীঘি। বিনোদন এবং প্রাকৃতিক সৌন্দর্যের কেন্দ্র।",
  },
  {
    id: 2,
    title: "বিজয় সাগর",
    image: "/assets/images/tourist/bijoy-sagar.jpg",
    address: "নতুন বাজার, বরিশাল",
    phone: "০১৮১২-৯৮৭৬৫৪",
    description: "নৌ ভ্রমণের জনপ্রিয় স্থান। সূর্যাস্ত দেখার সুন্দর জায়গা।",
  },
  {
    id: 3,
    title: "কীর্তনখোলা নদী ঘাট",
    image: "/assets/images/tourist/river-ghat.jpg",
    address: "নদী ঘাট, বরিশাল",
    phone: "০১৯১২-৩৪৫৬৭৮",
    description:
      "নৌকা ভ্রমণ এবং নদী দর্শনের জনপ্রিয় স্থান। স্থানীয় জীবনযাত্রা দেখার সুযোগ।",
  },
  {
    id: 4,
    title: "বরিশাল স্মৃতি জাদুঘর",
    image: "/assets/images/tourist/museum.jpg",
    address: "বেল তলা, বরিশাল",
    phone: "০১৮১৫-৯৮৭৬৫৪",
    description:
      "ঐতিহাসিক নিদর্শন সংগ্রহশালা। স্থানীয় ইতিহাস ও সংস্কৃতির তথ্যভাণ্ডার।",
  },
  {
    id: 5,
    title: "গৌরনদী ইকো পার্ক",
    image: "/assets/images/tourist/eco-park.jpg",
    address: "গৌরনদী, বরিশাল",
    phone: "০১৭১৫-৯৮৭৬৫৪",
    description:
      "প্রাকৃতিক সৌন্দর্যের লীলাভূমি। পিকনিক স্পট এবং বিনোদন কেন্দ্র।",
  },
];

const educationServices: ServiceItem[] = [
  {
    id: 1,
    title: "বরিশাল জিলা স্কুল",
    image: "/assets/images/education/zilla-school.jpg",
    address: "সদর রোড, বরিশাল",
    phone: "০১৭১২-৩৪৫৬৭৮",
    description:
      "ঐতিহ্যবাহী শিক্ষা প্রতিষ্ঠান। উচ্চমানের শিক্ষা এবং সহপাঠ কার্যক্রম।",
  },
  {
    id: 2,
    title: "বরিশাল বিশ্ববিদ্যালয়",
    image: "/assets/images/education/university.jpg",
    address: "নতুন বাজার, বরিশাল",
    phone: "০১৮১২-৯৮৭৬৫৪",
    description: "সরকারি বিশ্ববিদ্যালয়। বিভিন্ন বিষয়ে উচ্চশিক্ষার সুযোগ।",
  },
];

const hotelServices: ServiceItem[] = [
  {
    id: 1,
    title: "হোটেল সী প্যালেস",
    image: "/assets/images/hotels/sea-palace.jpg",
    address: "স্টেশন রোড, বরিশাল",
    phone: "০১৭১২-৩৪৫৬৭৮",
    description:
      "বরিশালের অন্যতম জনপ্রিয় ৩-তারকা হোটেল। আধুনিক সুযোগ-সুবিধা সহ আরামদায়ক অবস্থান।",
  },
  {
    id: 2,
    title: "গ্র্যান্ড হোটেল ইন্টারন্যাশনাল",
    image: "/assets/images/hotels/grand-hotel.jpg",
    address: "সদর রোড, বরিশাল",
    phone: "০১৮১২-৯৮৭৬৫৪",
    description:
      "আধুনিক সুবিধা সম্পন্ন ৩-তারকা হোটেল। রেস্টুরেন্ট, কনফারেন্স রুম এবং ২৪/৭ রুম সার্ভিস।",
  },
];

const supermarketServices: ServiceItem[] = [
  {
    id: 1,
    title: "মেগা মার্ট",
    image: "/assets/images/supermarket/mega-mart.jpg",
    address: "সদর রোড, বরিশাল",
    phone: "০১৭১২-৩৪৫৬৭৮",
    description:
      "বড় সুপারমার্কেট। দৈনন্দিন প্রয়োজনীয় সামগ্রী এবং খাদ্যপণ্য।",
  },
  {
    id: 2,
    title: "ফ্রেশ মার্কেট",
    image: "/assets/images/supermarket/fresh-market.jpg",
    address: "নতুন বাজার, বরিশাল",
    phone: "০১৮১২-৯৮৭৬৫৪",
    description: "তাজা ফল, সবজি এবং মাছ-মাংসের বাজার।",
  },
];

const transportServices: ServiceItem[] = [
  {
    id: 1,
    title: "বরিশাল রেলওয়ে স্টেশন",
    image: "/assets/images/transport/railway-station.jpg",
    address: "স্টেশন রোড, বরিশাল",
    phone: "০১৭১২-৩৪৫৬৭৮",
    description: "প্রধান রেল স্টেশন। ঢাকা-বরিশাল রুটে ট্রেন সার্ভিস।",
  },
  {
    id: 2,
    title: "নতুন বাস টার্মিনাল",
    image: "/assets/images/transport/bus-terminal.jpg",
    address: "নতুন বাজার, বরিশাল",
    phone: "০১৮১২-৯৮৭৬৫৪",
    description: "আধুনিক বাস টার্মিনাল। দেশের বিভিন্ন প্রান্তে বাস সার্ভিস।",
  },
];

const airportServices: ServiceItem[] = [
  {
    id: 1,
    title: "বরিশাল বিমানবন্দর",
    image: "/assets/images/airport/airport.jpg",
    address: "এয়ারপোর্ট রোড, বরিশাল",
    phone: "০১৭১২-৩৪৫৬৭৮",
    description: "অভ্যন্তরীণ বিমানবন্দর। ঢাকা-বরিশাল রুটে নিয়মিত ফ্লাইট।",
  },
  {
    id: 2,
    title: "এয়ার কার্গো টার্মিনাল",
    image: "/assets/images/airport/cargo-terminal.jpg",
    address: "এয়ারপোর্ট রোড, বরিশাল",
    phone: "০১৮১২-৯৮৭৬৫৪",
    description: "মালামাল পরিবহনের জন্য কার্গো টার্মিনাল।",
  },
];

const helplineCategories: Category[] = [
  {
    id: 1,
    title: " শপিং মল",
    icon: "/assets/icons/shopping.svg",
    subCategories: [
      { id: 101, title: " সুপার মল", services: shoppingMallServices },
      { id: 102, title: " স্থানীয় বাজার", services: shoppingMallServices },
      { id: 103, title: " প্লাজা", services: shoppingMallServices },
      { id: 104, title: " ফ্যাশন আউটলেট", services: shoppingMallServices },
      { id: 105, title: " ফুড কোর্ট", services: restaurantServices },
    ],
  },
  {
    id: 2,
    title: " পার্ক",
    icon: "/assets/icons/park.svg",
    subCategories: [
      { id: 201, title: " পাবলিক পার্ক", services: parkServices },
      { id: 202, title: " শিশু পার্ক", services: parkServices },
      { id: 203, title: " পশু পার্ক", services: parkServices },
      { id: 204, title: " জগিং ট্র্যাক পার্ক", services: parkServices },
      { id: 205, title: " ইকো/প্রাকৃতিক পার্ক", services: parkServices },
    ],
  },
  {
    id: 3,
    title: " রেস্টুরেন্ট",
    icon: "/assets/icons/restaurant.svg",
    subCategories: [
      { id: 301, title: " বাঙালি খাবার", services: restaurantServices },
      { id: 302, title: " ফাস্ট ফুড", services: restaurantServices },
      {
        id: 303,
        title: " এশিয়ান/চাইনিজ খাবার",
        services: restaurantServices,
      },
      { id: 304, title: " পিৎজা প্লেস", services: restaurantServices },
      { id: 305, title: " ডেজার্ট ও ক্যাফে", services: restaurantServices },
      { id: 306, title: " হেলদি/ইকো ফুড", services: restaurantServices },
    ],
  },
  {
    id: 4,
    title: " হাসপাতাল ও ক্লিনিক",
    icon: "/assets/icons/hospital.svg",
    subCategories: [
      { id: 401, title: " সরকারি হাসপাতাল", services: hospitalServices },
      { id: 402, title: " প্রাইভেট হাসপাতাল", services: hospitalServices },
      { id: 403, title: " ক্লিনিক", services: hospitalServices },
      { id: 404, title: " ডেন্টাল ক্লিনিক", services: hospitalServices },
      { id: 405, title: " ডায়াগনস্টিক সেন্টার", services: hospitalServices },
    ],
  },
  {
    id: 5,
    title: " ধর্মীয় স্থান",
    icon: "/assets/icons/religious.svg",
    subCategories: [
      { id: 501, title: " মসজিদ", services: religiousServices },
      { id: 502, title: " মন্দির", services: religiousServices },
      { id: 503, title: " গির্জা", services: religiousServices },
      { id: 504, title: " সিনাগগ", services: religiousServices },
    ],
  },
  {
    id: 6,
    title: " পর্যটন আকর্ষণ",
    icon: "/assets/icons/tourist.svg",
    subCategories: [
      { id: 601, title: " ঐতিহাসিক স্থান", services: touristServices },
      { id: 602, title: " সৈকত / নদীতীর", services: touristServices },
      { id: 603, title: " রিসোর্ট", services: touristServices },
      { id: 604, title: " স্মৃতিসৌধ", services: touristServices },
      {
        id: 605,
        title: " পাহাড় / প্রাকৃতিক দৃশ্য",
        services: touristServices,
      },
    ],
  },
  {
    id: 7,
    title: " শিক্ষা প্রতিষ্ঠান",
    icon: "/assets/icons/education.svg",
    subCategories: [
      { id: 701, title: " স্কুল", services: educationServices },
      { id: 702, title: " কলেজ", services: educationServices },
      { id: 703, title: " বিশ্ববিদ্যালয়", services: educationServices },
      {
        id: 704,
        title: " বিজ্ঞান ও গবেষণা প্রতিষ্ঠান",
        services: educationServices,
      },
      { id: 705, title: " কোচিং সেন্টার", services: educationServices },
    ],
  },
  {
    id: 8,
    title: " হোটেল ও রিসোর্ট",
    icon: "/assets/icons/hotel.svg",
    subCategories: [
      { id: 801, title: " ৩-তারকা হোটেল", services: hotelServices },
      { id: 802, title: " ৫-তারকা হোটেল", services: hotelServices },
      { id: 803, title: " বাজেট হোটেল", services: hotelServices },
      { id: 804, title: " রিসোর্ট", services: hotelServices },
      { id: 805, title: " ইকো লজ", services: hotelServices },
    ],
  },
  {
    id: 9,
    title: " সুপারমার্কেট ও মুদি দোকান",
    icon: "/assets/icons/supermarket.svg",
    subCategories: [
      {
        id: 901,
        title: " কনভিনিয়েন্স স্টোর",
        services: supermarketServices,
      },
      {
        id: 902,
        title: " ডিপার্টমেন্টাল স্টোর",
        services: supermarketServices,
      },
      {
        id: 903,
        title: " কসমেটিকস / হাউজহোল্ড",
        services: supermarketServices,
      },
      { id: 904, title: " ফ্রেশ ফুড মার্কেট", services: supermarketServices },
      {
        id: 905,
        title: " মাংস / মাছের বাজার",
        services: supermarketServices,
      },
    ],
  },
  {
    id: 10,
    title: " পরিবহন কেন্দ্র",
    icon: "/assets/icons/transport.svg",
    subCategories: [
      { id: 1001, title: " রেল স্টেশন", services: transportServices },
      { id: 1002, title: " বাস টার্মিনাল", services: transportServices },
      {
        id: 1003,
        title: " ফেরি / লঞ্চ টার্মিনাল",
        services: transportServices,
      },
      {
        id: 1004,
        title: " রাইড বুকিং স্ট্যান্ড",
        services: transportServices,
      },
      { id: 1005, title: " পার্কিং জোন", services: transportServices },
    ],
  },
  {
    id: 11,
    title: " বিমানবন্দর",
    icon: "/assets/icons/airport.svg",
    subCategories: [
      {
        id: 1101,
        title: " আন্তর্জাতিক বিমানবন্দর",
        services: airportServices,
      },
      {
        id: 1102,
        title: " অভ্যন্তরীণ বিমানবন্দর",
        services: airportServices,
      },
      { id: 1103, title: " কার্গো টার্মিনাল", services: airportServices },
      { id: 1104, title: " ভিআইপি লাউঞ্জ", services: airportServices },
    ],
  },
];

export default function SubCategoryPage() {
  const params = useParams();

  const category = helplineCategories.find(
    (cat) => encodeURIComponent(cat.id) === params.category
  );

  const subCategory = category?.subCategories?.find(
    (sub) => encodeURIComponent(sub.id) === params.subcategory
  );

  if (!category || !subCategory) {
    return <div>সাব-ক্যাটাগরি খুঁজে পাওয়া যায়নি</div>;
  }

  return (
    <div className="container mx-auto px-4 relative z-40 mt-16 lg:mt-20 py-8">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 flex items-center justify-center rounded-full bg-red-100">
          <Image
            src={category.icon}
            alt={category.title}
            height={32}
            width={32}
            className="w-6 h-6"
          />
        </div>
        <div>
          <h1 className="text-4xl font-bold">{subCategory.title}</h1>
          <p className="text-gray-600">{category.title}</p>
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {subCategory.services && subCategory.services.length > 0 ? (
          subCategory.services.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="aspect-video relative overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover"
                  height={200}
                  width={200}
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-semibold mb-2">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <div className="space-y-2">
                  <p className="flex items-center gap-2">
                    <span className="font-semibold">ঠিকানা:</span>
                    {service.address}
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="font-semibold">ফোন:</span>
                    {service.phone}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-600 text-lg">
              এই সাব-ক্যাটাগরির জন্য কোন সার্ভিস তথ্য এখনো যোগ করা হয়নি।
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
