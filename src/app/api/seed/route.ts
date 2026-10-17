import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { Destination } from '@/models/Destination';
import { SiteSettings } from '@/models/SiteSettings';

// ─── Contact / Settings ─────────────────────────────────────────────────────
const SETTINGS = {
  phoneNumber: '+91 99408 88888',
  phoneLink: 'tel:+919940888888',
  email: 'bookings@tripzo.com',
  logoUrl: '/Home.png',
  faviconUrl: '/favicon.ico',
  slides: [
    {
      image: '/image_one.png',
      badge: 'CURATED JOURNEYS',
      title: 'travel, worldclass',
      description: 'The real voyage of discovery consists not in seeking new landscapes, but in having new eyes.',
    },
    {
      image: '/image_two.png',
      badge: 'EXOTIC ESCAPES',
      title: 'explore paradise',
      description: 'Leave behind the everyday and immerse yourself in pristine waters and sun-kissed shores.',
    },
    {
      image: '/image_three.png',
      badge: 'LUXURY RETREATS',
      title: 'unwind in serenity',
      description: 'Handcrafted itineraries with premium hospitality and unforgettable memories at every step.',
    },
    {
      image: '/image_four.png',
      badge: 'TIMELESS MEMORIES',
      title: 'your dream journey',
      description: 'From mountain peaks to tropical escapes, let us turn your wanderlust into reality.',
    },
  ],
  branches: [
    {
      cityName: 'Bangalore',
      address: 'Novel Tech Park,\nOpposite to 1 MG Mall,\nMG Road, Bangalore – 560042\nKarnataka, India.',
      image: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=1200&q=80',
      articles: [
        {
          heading: 'Best Travel Agency in Bangalore – Why Tripzo Stands Out',
          content: "Bangalore, India's Silicon Valley, is home to millions of professionals seeking a break from the fast-paced tech life. Tripzo has been catering to Bangalore's travel needs for over a decade, offering curated domestic and international packages at competitive prices.\n\nFrom weekend getaways to Coorg and Ooty to long-haul international holidays in Europe or Southeast Asia, our Bangalore team designs itineraries that fit every budget and schedule.",
        },
        {
          heading: 'Customised Tour Packages from Bangalore',
          content: "We specialise in creating bespoke travel experiences for Bangalore-based travellers. Whether you're planning a honeymoon, a family holiday, or a corporate offsite, Tripzo's expert consultants help you choose the right destination, accommodation, and activities.\n\nOur packages include flight bookings, hotel stays, sightseeing, and 24×7 travel support so you can focus on making memories.",
        },
      ],
    },
    {
      cityName: 'Chennai',
      address: 'No.1, Gemini Parsn,\nKodambakkam High Road,\nNungambakkam, Chennai – 600006\nTamil Nadu, India.',
      image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80',
      articles: [
        {
          heading: 'Travel Agency in Chennai – Your Trusted Holiday Partner',
          content: "Chennai is a city of culture, cuisine, and commerce. As one of South India's premier travel agencies, Tripzo Chennai has been helping families, couples, and corporate travellers plan memorable trips since 2010.\n\nFrom spiritual tours to Tirupati and Rameswaram to international beach holidays in the Maldives and Bali, our Chennai office handles every detail with precision.",
        },
        {
          heading: 'Why Choose Tripzo for Your Chennai Holiday Plans?',
          content: "Our Chennai team comprises experienced travel consultants who understand the preferences of South Indian travellers. We offer exclusive deals on group packages, honeymoon specials, and senior citizen tours.\n\nWith a dedicated customer support line and on-ground assistance at all major destinations, Tripzo ensures a smooth travel experience from start to finish.",
        },
      ],
    },
    {
      cityName: 'Madurai',
      address: 'Jayam Towers,\nHIG 38, Above DBS Bank,\n80 Feet Road, Annanagar,\nMadurai – 20\nTamil Nadu, India.',
      image: '/madurai_branch.jpg',
      articles: [
        {
          heading: 'Best Travel Agency in Madurai – Tripzo',
          content: "With hundreds of temples and a historical background that dates back to the Sangam age, Madurai is undoubtedly the cultural capital of Tamil Nadu. Tripzo Madurai has been a trusted name for affordable holiday packages for over a decade.\n\nWhether you want to explore India's heritage sites or relax on a beach in Thailand, our Madurai team curates the perfect itinerary for you.",
        },
        {
          heading: 'Why Is Tripzo the Best Travel Agency in Madurai?',
          content: "Tripzo is a well-established brand of travel consultants in South India with a strong footprint in the travel industry and boasts a solid national and international network.\n\nThanks to our strong local team of employees and deep community connections, we've become the most sought-after travel agency in Madurai.",
        },
      ],
    },
  ],
};

// ─── 10 Destinations ─────────────────────────────────────────────────────────
const DESTINATIONS = [
  {
    name: 'Kerala',
    slug: 'kerala',
    tagline: "God's Own Country",
    heroImage: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=80',
    isActive: true,
    packages: [
      {
        name: 'Kerala Backwaters Bliss',
        duration: '4 Days / 3 Nights',
        price: '₹12,999 per person',
        image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=80',
        description:
          'Experience the enchanting Kerala backwaters on a traditional houseboat cruise through the serene Alleppey canals. This package covers Kochi, Alleppey, and Kumarakom with authentic Kerala cuisine and Ayurvedic treatments.',
        highlights:
          'Houseboat stay in Alleppey\nKochi city tour & Chinese fishing nets\nAyurvedic spa session\nKatakali cultural show\nTraditional Kerala meals included\nAC transfers throughout',
      },
      {
        name: 'Munnar Tea Hills Escape',
        duration: '5 Days / 4 Nights',
        price: '₹15,499 per person',
        image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1200&q=80',
        description:
          'Discover the breathtaking tea plantations of Munnar, the mist-covered hills of Vagamon, and the wildlife of Periyar. Perfect for nature lovers and honeymooners seeking a tranquil retreat.',
        highlights:
          'Tea plantation guided walk\nEravikulam National Park visit\nPeriyar wildlife boat ride\nSpice garden tour in Thekkady\nMattupetty Dam & Echo Point\nAll meals included',
      },
      {
        name: 'Kerala Complete Tour',
        duration: '8 Days / 7 Nights',
        price: '₹22,999 per person',
        image: 'https://images.unsplash.com/photo-1593693411515-c20261bcad6e?auto=format&fit=crop&w=1200&q=80',
        description:
          'The ultimate Kerala experience covering Kochi, Munnar, Thekkady, Alleppey, and Kovalam. From misty mountains to tropical beaches, this package showcases the complete diversity of God\'s Own Country.',
        highlights:
          'Kochi heritage walk\nMunnar tea & spice tours\nPeriyar elephant camp\nAlleppey houseboat night\nKovalam beach leisure time\nMassage & Ayurveda sessions\nAll meals & AC accommodation',
      },
    ],
    faqs: [
      {
        question: 'What is the best time to visit Kerala?',
        answer: 'October to March is the best time to visit Kerala when the weather is pleasant and dry. The monsoon season (June–September) is also popular for Ayurvedic treatments.',
      },
      {
        question: 'Is houseboat accommodation comfortable?',
        answer: 'Yes! Modern houseboats in Alleppey are equipped with AC bedrooms, attached bathrooms, a dining area, and an open deck. They provide a very comfortable and unique experience.',
      },
      {
        question: 'Are these packages suitable for families with children?',
        answer: 'Absolutely. Our Kerala packages are family-friendly with child-safe boat rides, wildlife safaris, and beach activities. We can customise the itinerary based on the age of your children.',
      },
      {
        question: 'What documents do I need for Kerala travel?',
        answer: 'No special permits are needed for most Kerala destinations. Just carry a valid government-issued photo ID. For Periyar wildlife sanctuary, entry tickets are arranged by us.',
      },
    ],
  },
  {
    name: 'Goa',
    slug: 'goa',
    tagline: 'Where Every Sunset is a Party',
    heroImage: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80',
    isActive: true,
    packages: [
      {
        name: 'Goa Beach Getaway',
        duration: '3 Days / 2 Nights',
        price: '₹7,999 per person',
        image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80',
        description:
          'The perfect quick escape to the sunny beaches of Goa. Explore North Goa\'s vibrant shacks and nightlife, and the serene South Goa beaches. Includes water sports, sightseeing, and free time to relax.',
        highlights:
          'Calangute & Baga Beach visit\nWater sports (parasailing, jet ski)\nOld Goa churches heritage tour\nSpice plantation lunch\nCasino cruise (optional)\nFlight & hotel included',
      },
      {
        name: 'Goa Luxury Long Weekend',
        duration: '5 Days / 4 Nights',
        price: '₹16,999 per person',
        image: 'https://images.unsplash.com/photo-1559329007-40df8a9345d8?auto=format&fit=crop&w=1200&q=80',
        description:
          'Indulge in a premium Goa experience at a 4-star beach resort. Enjoy curated dining, spa treatments, boat cruises, and personalised sightseeing. Ideal for honeymooners and anniversary couples.',
        highlights:
          '4-star beach resort stay\nSunset river cruise\nDudhsagar Waterfall day trip\nSpice plantation & lunch\nAyurveda spa session\nCouple\'s candlelight dinner',
      },
    ],
    faqs: [
      {
        question: 'What is the best time to visit Goa?',
        answer: 'November to February is the peak season with perfect beach weather. October and March are also great months with fewer crowds. Avoid the heavy monsoon months (July–August) for beach activities.',
      },
      {
        question: 'Is Goa safe for solo travellers and women?',
        answer: 'Goa is one of India\'s most tourist-friendly destinations. Popular beach areas are well-patrolled. We recommend staying in well-reviewed accommodations and using registered taxis.',
      },
      {
        question: 'Can I customise the Goa package?',
        answer: 'Yes! We can add or remove activities, upgrade your hotel category, or extend the trip. Contact our travel consultants to build your perfect Goa itinerary.',
      },
    ],
  },
  {
    name: 'Rajasthan',
    slug: 'rajasthan',
    tagline: 'The Land of Kings & Colours',
    heroImage: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1200&q=80',
    isActive: true,
    packages: [
      {
        name: 'Royal Rajasthan Triangle',
        duration: '6 Days / 5 Nights',
        price: '₹18,499 per person',
        image: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1200&q=80',
        description:
          'Explore the golden triangle of Jaipur, Jodhpur, and Udaipur. Walk through magnificent forts, palaces, and bazaars. Experience camel rides, folk music, and royal Rajasthani cuisine.',
        highlights:
          'Amber Fort & City Palace Jaipur\nMehrangarh Fort Jodhpur\nCity Palace & boat ride Udaipur\nDesert village cultural evening\nCamel cart ride\nTraditional Rajasthani thali meals',
      },
      {
        name: 'Jaisalmer Desert Safari',
        duration: '4 Days / 3 Nights',
        price: '₹12,999 per person',
        image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1200&q=80',
        description:
          'Venture into the golden sands of the Thar Desert from the fairy-tale city of Jaisalmer. Camp under the stars, ride camels at sunset, and explore ancient havelis and the magnificent Jaisalmer Fort.',
        highlights:
          'Jaisalmer Fort guided tour\nPatwon Ki Haveli visit\nSam Sand Dunes camel safari\nLuxury desert camp stay\nCultural folk dance & bonfire\nJeep safari in the dunes',
      },
    ],
    faqs: [
      {
        question: 'What is the best time to visit Rajasthan?',
        answer: 'October to March is ideal for Rajasthan travel when temperatures are comfortable. Summers (April–June) can be extremely hot, especially in the desert regions.',
      },
      {
        question: 'Is Rajasthan suitable for first-time India travellers?',
        answer: 'Absolutely! Rajasthan is one of India\'s most organised tourist destinations with world-class heritage hotels, well-established tour circuits, and excellent connectivity.',
      },
      {
        question: 'Are desert camp stays comfortable?',
        answer: 'Yes! Our packages use well-appointed Swiss tents with attached washrooms, comfortable beds, electricity, and running water. Luxury camps also offer private plunge pools.',
      },
    ],
  },
  {
    name: 'Andaman Islands',
    slug: 'andaman-islands',
    tagline: 'India\'s Tropical Paradise',
    heroImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    isActive: true,
    packages: [
      {
        name: 'Andaman Island Hopper',
        duration: '5 Days / 4 Nights',
        price: '₹19,999 per person',
        image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
        description:
          'Discover the untouched beauty of the Andaman Islands. Snorkel in crystal-clear waters, explore Havelock\'s Radhanagar Beach (Asia\'s best beach), and visit the historic Cellular Jail in Port Blair.',
        highlights:
          'Cellular Jail light & sound show\nHavelock Island – Radhanagar Beach\nSnorkelling at Elephant Beach\nNeil Island visit\nScuba diving experience (beginner)\nSea-walk & glass-bottom boat ride',
      },
      {
        name: 'Andaman Scuba & Beach Luxury',
        duration: '7 Days / 6 Nights',
        price: '₹32,999 per person',
        image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=1200&q=80',
        description:
          'The ultimate Andaman experience for water-sports enthusiasts and beach lovers. Includes certified scuba diving courses, island hopping, luxury beach resort stay, and a private sunset cruise.',
        highlights:
          'PADI Scuba Diving certification course\nPrivate sunset cruise\n5-star beach resort in Havelock\nNeil & North Bay Island visits\nKayaking through mangroves\nDeep-sea fishing trip',
      },
    ],
    faqs: [
      {
        question: 'Do I need a permit to visit Andaman?',
        answer: 'Indian nationals do not require a permit for the main Andaman Islands. Foreign nationals need a Restricted Area Permit (RAP), which is issued on arrival at Port Blair airport or by Indian embassies.',
      },
      {
        question: 'Is flying the only way to reach Andaman?',
        answer: 'You can reach Andaman by flight (Port Blair airport) from Chennai, Kolkata, or Delhi, or by ship from Chennai/Kolkata. Flights are faster and more convenient. We handle all bookings.',
      },
      {
        question: 'Is Andaman safe for swimming and water sports?',
        answer: 'Yes, designated beaches have lifeguards and are safe for swimming. Water sports are conducted by licensed operators with all safety equipment provided. We only partner with certified operators.',
      },
    ],
  },
  {
    name: 'Manali & Shimla',
    slug: 'manali-shimla',
    tagline: 'Himachal\'s Snow-Capped Playground',
    heroImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1200&q=80',
    isActive: true,
    packages: [
      {
        name: 'Shimla Manali Honeymoon Special',
        duration: '7 Days / 6 Nights',
        price: '₹21,499 per couple',
        image: 'https://images.unsplash.com/photo-1544214310-c8b5a2a2fb5e?auto=format&fit=crop&w=1200&q=80',
        description:
          'The classic Himachal honeymoon circuit taking you through the colonial charm of Shimla and the adventure hub of Manali. Enjoy snow-covered mountains, riverside camps, and romantic mountain lodges.',
        highlights:
          'Mall Road & Ridge Shimla stroll\nKufri snow activities\nRohtang Pass snow experience\nSolang Valley adventure sports\nHidimba Devi Temple visit\nCouple\'s bonfire & riverside dinner',
      },
      {
        name: 'Manali Adventure Camp',
        duration: '5 Days / 4 Nights',
        price: '₹13,999 per person',
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1200&q=80',
        description:
          'An action-packed Manali trip for thrill-seekers. Go white-water rafting on the Beas River, paraglide over the valley, trek to Bijli Mahadev, and experience the snow at Rohtang Pass.',
        highlights:
          'White-water rafting on Beas River\nParagliding at Solang Valley\nBijli Mahadev trek\nRohtang Pass day trip\nZorbing & ATV ride\nCampfire dinner under the stars',
      },
    ],
    faqs: [
      {
        question: 'When is Rohtang Pass open?',
        answer: 'Rohtang Pass is generally open from May to October. It remains closed during winter due to heavy snowfall. For snow activities, visiting December to February in Manali town is recommended.',
      },
      {
        question: 'Is Shimla-Manali road trip safe?',
        answer: 'The Shimla-Manali highway is well-maintained but can get tricky during rains and snowfall. We arrange experienced mountain drivers and monitor weather conditions for your safety.',
      },
      {
        question: 'What should I pack for a Himachal trip?',
        answer: 'Pack warm layered clothing, waterproof jackets, trekking shoes, sunscreen, and sunglasses even in summer. In winter, heavy woolens, thermal inners, and snow boots are essential.',
      },
    ],
  },
  {
    name: 'Leh Ladakh',
    slug: 'leh-ladakh',
    tagline: 'The Land of High Passes',
    heroImage: 'https://images.unsplash.com/photo-1571536802807-30451e3955d8?auto=format&fit=crop&w=1200&q=80',
    isActive: true,
    packages: [
      {
        name: 'Ladakh Classic Motorbike Tour',
        duration: '8 Days / 7 Nights',
        price: '₹35,999 per person',
        image: 'https://images.unsplash.com/photo-1571536802807-30451e3955d8?auto=format&fit=crop&w=1200&q=80',
        description:
          'The bucket-list ride of a lifetime. Cover Leh, Nubra Valley, Pangong Lake, and Khardung La (world\'s highest motorable road) on a Royal Enfield. Includes hotel stays, a Himalayan expert guide, and oxygen support.',
        highlights:
          'Royal Enfield bike rental included\nKhardung La pass crossing\nNubra Valley camel safari\nPangong Lake overnight camp\nMagnetic Hill & Sangam visit\nBuddhist monastery tours\nOxygen cylinder & first-aid kit',
      },
      {
        name: 'Ladakh Fly & Drive Package',
        duration: '6 Days / 5 Nights',
        price: '₹28,999 per person',
        image: 'https://images.unsplash.com/photo-1580502304784-8985b7eb7260?auto=format&fit=crop&w=1200&q=80',
        description:
          'Fly into Leh and explore the best of Ladakh in comfort. Visit Pangong Lake, Nubra Valley, and iconic monasteries like Thiksey and Hemis. Perfect for those who want the Ladakh experience without the long drive.',
        highlights:
          'Leh acclimatisation day\nThiksey & Hemis Monastery\nShanti Stupa sunrise visit\nNubra Valley via Khardung La\nPangong Lake & Tsomoriri\nLocal Ladakhi cultural dinner',
      },
    ],
    faqs: [
      {
        question: 'Is altitude sickness a concern in Ladakh?',
        answer: 'Leh is at 3,500m altitude, and altitude sickness can affect anyone regardless of fitness. We recommend arriving by flight, resting for 24–48 hours, staying hydrated, and avoiding strenuous activity initially. Our packages include oxygen support.',
      },
      {
        question: 'What is the best time to visit Ladakh?',
        answer: 'June to September is the best time when all roads and passes are open. Pangong Lake and Nubra Valley are accessible. The Chadar Trek on the frozen Zanskar River happens in January-February.',
      },
      {
        question: 'Do I need an inner line permit for Ladakh?',
        answer: 'Yes, Indian nationals need an Inner Line Permit (ILP) for Nubra Valley, Pangong Lake, and Tso Moriri. Foreign nationals require a Protected Area Permit (PAP). We arrange all permits on your behalf.',
      },
    ],
  },
  {
    name: 'Coorg',
    slug: 'coorg',
    tagline: 'The Scotland of India',
    heroImage: 'https://images.unsplash.com/photo-1511884642898-4c92516a5f9d?auto=format&fit=crop&w=1200&q=80',
    isActive: true,
    packages: [
      {
        name: 'Coorg Coffee & Waterfall Retreat',
        duration: '3 Days / 2 Nights',
        price: '₹8,499 per person',
        image: 'https://images.unsplash.com/photo-1543826173-1beeb97525d8?auto=format&fit=crop&w=1200&q=80',
        description:
          'Escape to the misty hills of Coorg for a rejuvenating weekend. Walk through aromatic coffee and spice estates, visit the majestic Abbey Falls, and immerse yourself in Kodava culture and cuisine.',
        highlights:
          'Coffee plantation guided tour\nAbbey Falls & Iruppu Falls visit\nRaja\'s Seat sunset point\nElephant camp at Dubare\nTibetan monastery visit\nAuthentic Coorg pork curry meal',
      },
      {
        name: 'Coorg Jungle & Adventure',
        duration: '4 Days / 3 Nights',
        price: '₹11,999 per person',
        image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=80',
        description:
          'For the adventurous traveller, this package combines jungle trekking in Nagarhole National Park, white-water rafting on the Barapole River, and a night stay in a treehouse resort deep in the coffee forest.',
        highlights:
          'Nagarhole safari (jeep & boat)\nBarapole river white-water rafting\nTreehouse resort stay\nBirdwatching at Coorg wetlands\nCoffee estate cycling tour\nCampfire dinner in the jungle',
      },
    ],
    faqs: [
      {
        question: 'How far is Coorg from Bangalore?',
        answer: 'Coorg (Madikeri) is approximately 260 km from Bangalore, about a 5–6 hour drive. We arrange comfortable AC vehicle transfers from Bangalore.',
      },
      {
        question: 'What is the best time to visit Coorg?',
        answer: 'October to March is ideal with cool, pleasant weather. Post-monsoon (October–November) makes the waterfalls and forests lush and beautiful. Avoid peak monsoon months for outdoor activities.',
      },
      {
        question: 'Can I buy coffee directly from Coorg estates?',
        answer: 'Yes! Our plantation tours include stops where you can purchase freshly roasted Coorg coffee, spices, and local honey directly from the estate shops at factory prices.',
      },
    ],
  },
  {
    name: 'Pondicherry',
    slug: 'pondicherry',
    tagline: 'A Little Piece of France in India',
    heroImage: 'https://images.unsplash.com/photo-1582972236019-ea4af5ffe587?auto=format&fit=crop&w=1200&q=80',
    isActive: true,
    packages: [
      {
        name: 'Pondicherry Heritage & Beach Weekend',
        duration: '3 Days / 2 Nights',
        price: '₹6,999 per person',
        image: 'https://images.unsplash.com/photo-1582972236019-ea4af5ffe587?auto=format&fit=crop&w=1200&q=80',
        description:
          'Wander through the French Quarter\'s colonial streets, relax on peaceful beaches, and explore the spiritual township of Auroville. A perfect blend of culture, history, and seaside relaxation.',
        highlights:
          'French Quarter heritage walk\nAuroville Matrimandir visit\nParadise Beach boat trip\nPondicherry Museum tour\nPromenade Beach sunrise\nFrench-Indian fusion dining experience',
      },
      {
        name: 'Pondicherry Wellness & Yoga Retreat',
        duration: '5 Days / 4 Nights',
        price: '₹13,499 per person',
        image: 'https://images.unsplash.com/photo-1545389336-cf090694435e?auto=format&fit=crop&w=1200&q=80',
        description:
          'Rejuvenate mind and body in the spiritual capital of South India. This retreat combines daily yoga sessions at the Sri Aurobindo Ashram, Ayurvedic treatments, meditation, and peaceful beach mornings.',
        highlights:
          'Daily sunrise yoga sessions\nAyurvedic full-body massage\nMeditation at Sri Aurobindo Ashram\nAuroville community tour\nSilent beach morning walks\nSattvic vegetarian meals',
      },
    ],
    faqs: [
      {
        question: 'Is Pondicherry a dry state?',
        answer: 'No, Pondicherry has lower taxes on alcohol compared to Tamil Nadu, making it popular for affordable wine and beer. However, some spiritual retreat packages are alcohol-free by design.',
      },
      {
        question: 'What is Auroville and can anyone visit?',
        answer: 'Auroville is an experimental international township focused on human unity and sustainability. Visitors can explore the Visitor\'s Centre and outer areas of Matrimandir (the golden dome). Inner access requires advance booking.',
      },
      {
        question: 'How to reach Pondicherry from Chennai?',
        answer: 'Pondicherry is 160 km from Chennai, about a 3-hour drive. We arrange comfortable AC cab transfers from Chennai, Bangalore, or the nearest airport.',
      },
    ],
  },
  {
    name: 'Mysuru',
    slug: 'mysuru',
    tagline: 'The City of Palaces',
    heroImage: 'https://images.unsplash.com/photo-1611516491426-03025e6043c8?auto=format&fit=crop&w=1200&q=80',
    isActive: true,
    packages: [
      {
        name: 'Mysuru Palace & Heritage Tour',
        duration: '2 Days / 1 Night',
        price: '₹4,999 per person',
        image: 'https://images.unsplash.com/photo-1611516491426-03025e6043c8?auto=format&fit=crop&w=1200&q=80',
        description:
          'Explore the grandeur of the magnificent Mysore Palace, the sprawling Brindavan Gardens, and the ancient Chamundeshwari Temple. An enriching cultural experience in one of India\'s most regal cities.',
        highlights:
          'Mysore Palace guided tour\nBrindavan Gardens evening fountains\nChamundeshwari Temple visit\nDevaraja Market spice walk\nSilk weaving cooperative tour\nMysore pak sweet factory visit',
      },
      {
        name: 'Mysuru & Ooty Hill Station Combo',
        duration: '5 Days / 4 Nights',
        price: '₹13,999 per person',
        image: 'https://images.unsplash.com/photo-1582654291914-79bbd8adb5ea?auto=format&fit=crop&w=1200&q=80',
        description:
          'Combine the royal splendour of Mysuru with the cool mountain air of Ooty. Visit Mysore Palace, then head into the Nilgiri Hills for scenic toy train rides, botanical gardens, and tea estates.',
        highlights:
          'Mysore Palace & Brindavan Gardens\nNilgiri Mountain Railway toy train\nGovernment Botanical Garden Ooty\nDoddabetta Peak viewpoint\nTea estate guided tour\nRose Garden Ooty visit',
      },
    ],
    faqs: [
      {
        question: 'Is the Mysore Palace open every day?',
        answer: 'Mysore Palace is open daily from 10 AM to 5:30 PM. On Sundays and public holidays, the palace is illuminated with over 97,000 light bulbs from 7 PM to 7:45 PM — a spectacular sight.',
      },
      {
        question: 'What is the Dasara festival in Mysuru?',
        answer: 'Dasara (October) is the biggest festival in Mysuru, celebrated with a grand royal procession, cultural events, and illumination of the palace. It is the best time to visit Mysuru and we offer special Dasara packages.',
      },
      {
        question: 'How far is Mysuru from Bangalore?',
        answer: 'Mysuru is 150 km from Bangalore, about a 3-hour drive on the expressway. We arrange comfortable day-trip or overnight packages with AC vehicle transfers from Bangalore.',
      },
    ],
  },
  {
    name: 'Ooty',
    slug: 'ooty',
    tagline: 'The Queen of Hill Stations',
    heroImage: 'https://images.unsplash.com/photo-1582654291914-79bbd8adb5ea?auto=format&fit=crop&w=1200&q=80',
    isActive: true,
    packages: [
      {
        name: 'Ooty Classic Escape',
        duration: '3 Days / 2 Nights',
        price: '₹7,499 per person',
        image: 'https://images.unsplash.com/photo-1582654291914-79bbd8adb5ea?auto=format&fit=crop&w=1200&q=80',
        description:
          'Breathe in the fresh mountain air of Ooty, the beloved Nilgiri hill station. Walk through rose gardens, ride the iconic toy train, explore tea estates, and enjoy horse riding at the horse race course.',
        highlights:
          'Nilgiri Mountain Railway toy train\nOoty Lake boating\nGovernment Botanical Garden\nDoddabetta Peak (2,637m)\nTea factory & tasting tour\nHorse riding at Race Course',
      },
      {
        name: 'Ooty & Kodaikanal Twin Hills',
        duration: '6 Days / 5 Nights',
        price: '₹16,999 per person',
        image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1200&q=80',
        description:
          'Explore two of South India\'s most celebrated hill stations in one unforgettable trip. From the tea gardens of Ooty to the silver cascades and Berijam Lake of Kodaikanal, this package is a nature lover\'s dream.',
        highlights:
          'Ooty toy train experience\nKodaikanal Lake boat ride\nBryant Park flower garden\nSilver Cascade Waterfall\nCoaker\'s Walk sunrise trek\nGreen Valley View & Pillar Rocks\nAll accommodation & meals included',
      },
    ],
    faqs: [
      {
        question: 'What is the best season to visit Ooty?',
        answer: 'April to June is Ooty\'s peak season with pleasant weather. October to March brings cooler temperatures and is great for couples and honeymooners. Monsoon (July–September) makes the hills lush green but outdoor activities may be limited.',
      },
      {
        question: 'Can I book the Nilgiri Mountain Railway from Tripzo?',
        answer: 'Yes! We pre-book the UNESCO World Heritage toy train tickets as part of our packages so you don\'t have to worry about availability. The Mettupalayam–Ooty route is the most scenic.',
      },
      {
        question: 'Is Ooty suitable for elderly travellers?',
        answer: 'Ooty is generally accessible for elderly travellers. The roads are well-maintained and most attractions are easily reachable by vehicle. We customise the pace of sightseeing based on your group\'s needs.',
      },
    ],
  },
];

export async function GET() {
  try {
    await connectToDatabase();

    // 1. Clear existing data
    await Destination.deleteMany({});
    await SiteSettings.deleteMany({});

    // 2. Seed destinations
    const created = await Destination.insertMany(DESTINATIONS);

    // 3. Seed site settings
    const settings = await SiteSettings.create(SETTINGS);

    return NextResponse.json({
      success: true,
      message: `Seeded ${created.length} destinations and site settings.`,
      destinations: created.map(d => ({ name: d.name, slug: d.slug, packages: d.packages.length })),
      contact: { phone: settings.phoneNumber, email: settings.email, branches: settings.branches.length },
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error?.message }, { status: 500 });
  }
}
