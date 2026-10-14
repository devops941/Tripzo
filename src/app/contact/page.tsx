import BranchHeroCard from '@/components/BranchHeroCard';
import ArticleSection from '@/components/ArticleSection';
import BookingSection from '@/components/BookingSection';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Contact Us - Tripzo',
  description: 'Connect with Tripzo travel experts for custom vacations, holiday packages, and inquiries.',
};

export default function ContactPage() {
  return (
    <main className="w-full min-h-screen pt-24 bg-white">
      {/* Page Title Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4">
        <span className="text-xs font-bold uppercase tracking-wider text-[#003DB8]">
          Get In Touch
        </span>
        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-zinc-900 mt-1">
          Contact Tripzo
        </h1>
        <p className="text-sm sm:text-base text-zinc-500 mt-2 max-w-2xl">
          Whether you’re planning a family vacation, solo getaway, or corporate retreat, our dedicated team is here to assist you 24/7.
        </p>
      </div>

      {/* Branch Address & Cultural Photo Card (Matching Reference) */}
      <BranchHeroCard />

      {/* Editorial Content */}
      <ArticleSection />

      {/* Booking and Contact Info Section */}
      <BookingSection />

      {/* Footer */}
      <Footer />
    </main>
  );
}
