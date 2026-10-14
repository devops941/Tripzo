'use client';

import React, { useState } from 'react';
import { HelpCircle, ChevronDown } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
}

const defaultFaqs: FaqItem[] = [
  {
    question: 'Is Bangalore safe for tourists?',
    answer:
      'Yes, Bangalore is considered one of the safest cosmopolitan cities in India for solo travellers, families, and couples. Standard travel precautions such as keeping valuables secure and using verified cab services late at night are recommended.',
  },
  {
    question: 'What is the local language in Bangalore?',
    answer:
      'Kannada is the official and primary local language of Bangalore. However, English and Hindi are widely spoken and understood across the city, along with Tamil, Telugu, and Malayalam.',
  },
  {
    question: 'What should I pack for a trip to Bangalore?',
    answer:
      'Pack comfortable cotton clothing for daytime outings, comfortable walking shoes for sightseeing and parks, light woolens or a jacket for cool evenings, and an umbrella if visiting during the monsoon season (June to September).',
  },
  {
    question: 'What is the best time to visit Bangalore?',
    answer:
      'The ideal time to visit Bangalore is between October and March when the weather is pleasant and cool, with temperatures ranging from 15°C to 28°C.',
  },
  {
    question: 'How do I get to Bangalore?',
    answer:
      'Bangalore is exceptionally well-connected via Kempegowda International Airport (BLR), major railway stations including KSR Bengaluru and Yesvantpur, and express highways connecting neighboring states.',
  },
  {
    question: 'What are the must-try dishes in Bangalore?',
    answer:
      'Must-try delicacies include crispy Benne Masala Dosa at Vidyarthi Bhavan or CTR, Bisi Bele Bath, Mysore Pak, filter coffee, Mangalorean seafood, and craft brews from the city’s famous microbreweries.',
  },
  {
    question: 'What outdoor activities can I enjoy in Bangalore?',
    answer:
      'Bangalore offers a range of activities including morning nature walks in Cubbon Park & Lalbagh, trekking at Nandi Hills, parasailing, go-karting, rock climbing at Ramanagara, and exploring heritage palaces.',
  },
  {
    question: 'Are there any cultural festivals celebrated in Bangalore?',
    answer:
      'Bangalore celebrates Karaga Shaktyotsava (one of the oldest festivals), Bengaluru Habba, Ganesh Chaturthi, Diwali, and the vibrant Lalbagh Republic Day & Independence Day Flower Shows.',
  },
  {
    question: 'What are some popular attractions in Bangalore?',
    answer:
      'Key attractions include Bangalore Palace, Tipu Sultan’s Summer Palace, Cubbon Park, Lalbagh Botanical Garden, ISKCON Temple, Visvesvaraya Museum, and Bannerghatta National Park.',
  },
  {
    question: 'Can I rent a bike or scooter in Bangalore?',
    answer:
      'Yes, bike and scooter rentals are easily accessible through mobile apps such as Royal Brothers, Bounce, and Yulu for local city commutes and weekend getaways.',
  },
  {
    question: 'Is it necessary to carry cash in Bangalore?',
    answer:
      'Digital payments through UPI (Google Pay, PhonePe, Paytm) and credit/debit cards are accepted everywhere in Bangalore, from high-end malls to street vendors. Carrying a small amount of cash for local transport or auto-rickshaws is recommended.',
  },
];

interface FaqSectionProps {
  title?: string;
  items?: FaqItem[];
}

export default function FaqSection({ title = 'FAQs:', items = defaultFaqs }: FaqSectionProps) {
  // Store expanded state per index
  const [openIndex, setOpenIndex] = useState<number | null>(6); // 6th is open initially as demonstrated in preview

  const toggleFaq = (index: number) => {
    setOpenIndex(prev => (prev === index ? null : index));
  };

  return (
    <section className="w-full py-16 sm:py-20 bg-white border-t border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="mb-10">
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-zinc-900 tracking-tight">
            {title}
          </h2>
          <div className="w-14 h-1 bg-gradient-to-r from-[#003DB8] to-[#00D9FF] rounded-full mt-3" />
        </div>

        {/* Accordion List */}
        <div className="divide-y divide-zinc-200/80">
          {items.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div key={idx} className="py-4.5 sm:py-5 transition-colors">
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full flex items-center justify-between text-left gap-4 group focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-3.5 sm:gap-4">
                    <div className="w-6 h-6 rounded-md border border-zinc-300 group-hover:border-[#003DB8] flex items-center justify-center flex-shrink-0 text-zinc-500 group-hover:text-[#003DB8] transition-colors">
                      <HelpCircle className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-sm sm:text-[15px] font-medium text-zinc-800 group-hover:text-[#003DB8] transition-colors">
                      {item.question}
                    </span>
                  </div>

                  <div
                    className={`transform transition-transform duration-200 text-zinc-700 flex-shrink-0 group-hover:text-[#003DB8] ${
                      isOpen ? 'rotate-180 text-[#003DB8]' : ''
                    }`}
                  >
                    <ChevronDown className="w-5 h-5" />
                  </div>
                </button>

                {/* Collapsible Answer */}
                {isOpen && (
                  <div className="pt-3 pl-9.5 sm:pl-10 pr-6 text-xs sm:text-[13px] text-zinc-500 leading-relaxed animate-in fade-in duration-200">
                    <p>{item.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
