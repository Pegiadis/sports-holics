import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JournalistsSection from "@/components/JournalistsSection";
import { fetchJournalists } from "../homepage-api";

// Force dynamic rendering for real-time CMS updates
export const dynamic = 'force-dynamic';

export default async function BlogPage() {
  const journalists = await fetchJournalists();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 py-12">
        {/* Page Header */}
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Blog</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Ανακαλύψτε τις απόψεις και αναλύσεις των έμπειρων αθλητικών δημοσιογράφων μας
          </p>
        </div>

        {/* Journalists Grid */}
        {journalists.length > 0 ? (
          <JournalistsSection 
            journalists={journalists} 
            title="Επιλέξτε Δημοσιογράφο"
            showAll={true}
          />
        ) : (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-200 mb-6">
              <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Δεν υπάρχουν διαθέσιμοι δημοσιογράφοι</h2>
            <p className="text-gray-600">
              Οι δημοσιογράφοι μας θα εμφανιστούν σύντομα. Ελέγξτε ξανά αργότερα!
            </p>
          </div>
        )}

        {/* Info Section */}
        <div className="mt-16 bg-white rounded-xl shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Σχετικά με το Blog μας</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            Το blog του Sports Holics φιλοξενεί εξειδικευμένους αθλητικούς δημοσιογράφους που καλύπτουν 
            όλα τα σημαντικά αθλήματα. Κάθε δημοσιογράφος φέρνει τη δική του μοναδική προοπτική και ανάλυση, 
            προσφέροντάς σας εις βάθος κάλυψη των αθλημάτων που αγαπάτε.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Επιλέξτε έναν δημοσιογράφο παραπάνω για να δείτε τα πιο πρόσφατα άρθρα και αναλύσεις του.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
