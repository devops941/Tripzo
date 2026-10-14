import React from 'react';

export interface ArticleSectionItem {
  heading: string;
  paragraphs: (string | React.ReactNode)[];
}

interface ArticleSectionProps {
  sections?: ArticleSectionItem[];
  className?: string;
}

const defaultArticleSections: ArticleSectionItem[] = [
  {
    heading: 'How To Choose the Best Travel Agency in Madurai?',
    paragraphs: [
      <>
        With hundreds of temples and a historical background that dates back to the Sangam age, Madurai is undoubtedly the cultural capital of Tamil Nadu. Over the last few decades, this temple city has become increasingly urbanized over the last decade. To get their minds off the hectic schedule, local Maduraiites are looking for{' '}
        <a href="#packages" className="text-[#003DB8] hover:underline font-medium">
          affordable tour packages
        </a>{' '}
        in and around the country. If you&apos;re looking for a <span className="italic font-medium">travel agency in Madurai</span>, this guide is for you:
      </>,
    ],
  },
  {
    heading: 'Travel Agents Vs. DIY Travel Planning – Which Is Better?',
    paragraphs: [
      'Good Madurai tour operators don&apos;t go overboard with advertising, allowing their service quality and experience to speak for them. While I&apos;m not against DIY travel planning, there are several benefits of planning a vacation through a travel agency in Madurai. For one, you don&apos;t have to plan everything – from booking to boarding & lodging, your travel agent in Madurai will manage the entire process. But most importantly, travel agents have access to exclusive deals and package discounts, thanks to partner offers.',
      'Madurai people value honor and honesty above everything else – winning their hearts is easy if you practice transparency and offer value for money. Not to mention customer satisfaction!',
    ],
  },
  {
    heading: 'Why Is Tripzo the Best Travel Agency in Madurai?',
    paragraphs: [
      'Tripzo is a well-established brand of travel consultants in South India with a strong footprint in the travel industry and boasts a solid national and international network in the travel and tourism sector. Our strong network helps us design customized travel plans in India and outside the country.',
      'Thanks to our strong local team of employees, we&apos;ve become a sought-after travel agency in Madurai. Our travel agents understand the pulse and nuances of Madurai people and create travel packages keeping in mind these factors.',
    ],
  },
  {
    heading: 'Which Company Is Best for Travel Agents in Madurai?',
    paragraphs: [
      'Tripzo has a robust background in the hospitality sector and hence offers the value addition of experience and expertise to the business. This expertise is another reason why we focus exclusively on creating delighted customers.',
      'It is not merely enough to get your bookings and ticketing done per your requirements. A good travel agency in Madurai would go beyond its scope of the duty to serve customers. The agent would gather details of what the customer expects from his travel and then create checkpoints to cover visas, ticketing, stay, sightseeing, transfers, meals, etc. A good travel agency in Madurai makes the tour an experience to nurture for a lifetime rather than a logbook where you merely tick off destinations.',
      'With branches across South India, Tripzo has a robust, well-established network of agents and assures you seamless and impeccable service wherever you go.',
    ],
  },
  {
    heading: 'Tripzo – The Best Travel Agency in Madurai',
    paragraphs: [
      'The next time you plan a weekend getaway or a cruise holiday, or even an international trip, all you need to do is call Tripzo, Madurai. Our staff is well trained and adept at giving you the best prices and designing spectacular packages customized to suit your requirements. They can assure you that your choice of traveling with Tripzo is perhaps the best decision you&apos;ve ever made.',
      <>
        Follow our{' '}
        <a href="#instagram" className="text-[#003DB8] hover:underline font-medium">
          Instagram profile
        </a>{' '}
        to know about the latest offers and discounts.
      </>,
    ],
  },
];

export default function ArticleSection({
  sections = defaultArticleSections,
  className = '',
}: ArticleSectionProps) {
  return (
    <section className={`w-full bg-white py-12 sm:py-16 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl space-y-10 sm:space-y-12">
          {sections.map((sec, idx) => (
            <article key={idx} className="space-y-3.5">
              <h2 className="text-2xl sm:text-3xl md:text-[32px] font-serif font-bold text-zinc-900 tracking-tight leading-snug">
                {sec.heading}
              </h2>

              <div className="space-y-3 text-xs sm:text-sm md:text-[14.5px] text-zinc-600 leading-relaxed font-normal">
                {sec.paragraphs.map((p, pIdx) => (
                  <p key={pIdx}>{p}</p>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
