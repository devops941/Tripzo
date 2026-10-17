'use client';

import { useState, useEffect } from 'react';

interface Article {
  heading: string;
  content: string;
}

const DEFAULT_ARTICLES: Article[] = [
  {
    heading: 'How To Choose the Best Travel Agency in Madurai?',
    content: "With hundreds of temples and a historical background that dates back to the Sangam age, Madurai is undoubtedly the cultural capital of Tamil Nadu. Over the last few decades, this temple city has become increasingly urbanized. To get their minds off the hectic schedule, local Maduraiites are looking for affordable tour packages in and around the country.",
  },
  {
    heading: 'Travel Agents Vs. DIY Travel Planning – Which Is Better?',
    content: "Good Madurai tour operators don't go overboard with advertising, allowing their service quality and experience to speak for them. There are several benefits of planning a vacation through a travel agency in Madurai – from booking to boarding & lodging, your travel agent will manage the entire process.\n\nMadurai people value honor and honesty above everything else – winning their hearts is easy if you practice transparency and offer value for money.",
  },
  {
    heading: 'Why Is Tripzo the Best Travel Agency in Madurai?',
    content: "Tripzo is a well-established brand of travel consultants in South India with a strong footprint in the travel industry and boasts a solid national and international network in the travel and tourism sector. Our strong network helps us design customized travel plans in India and outside the country.\n\nThanks to our strong local team of employees, we've become a sought-after travel agency in Madurai.",
  },
  {
    heading: 'Which Company Is Best for Travel Agents in Madurai?',
    content: "Tripzo has a robust background in the hospitality sector and hence offers the value addition of experience and expertise to the business. This expertise is another reason why we focus exclusively on creating delighted customers.\n\nWith branches across South India, Tripzo has a robust, well-established network of agents and assures you seamless and impeccable service wherever you go.",
  },
];

export default function ArticleSection() {
  const [articles, setArticles] = useState<Article[]>(DEFAULT_ARTICLES);

  useEffect(() => {
    fetch('/api/settings')
      .then(res => res.json())
      .then(data => {
        if (data.settings?.articles?.length > 0) {
          setArticles(data.settings.articles);
        }
      })
      .catch(() => {});
  }, []);

  if (articles.length === 0) return null;

  return (
    <section className="w-full bg-white py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl space-y-10 sm:space-y-12">
          {articles.map((article, idx) => (
            <article key={idx} className="space-y-3.5">
              <h2 className="text-2xl sm:text-3xl md:text-[32px] font-serif font-bold text-zinc-900 tracking-tight leading-snug">
                {article.heading}
              </h2>
              <div className="space-y-3 text-xs sm:text-sm md:text-[14.5px] text-zinc-600 leading-relaxed font-normal">
                {article.content.split('\n\n').map((para, pIdx) => (
                  <p key={pIdx}>{para}</p>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
