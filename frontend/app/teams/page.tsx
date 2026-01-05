import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TeamsSection from "@/components/TeamsSection";
import { fetchTeams } from "@/lib/team-api";

// Force dynamic rendering for real-time CMS updates
export const dynamic = 'force-dynamic';

export default async function TeamsPage() {
  const teams = await fetchTeams();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 py-12">
        {/* Page Header */}
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Ομάδες</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Ανακαλύψτε όλα τα νέα και τις αναλύσεις για τις αγαπημένες σας ομάδες
          </p>
        </div>

        {/* Teams Grid */}
        {teams.length > 0 ? (
          <TeamsSection 
            teams={teams} 
            title="Επιλέξτε Ομάδα"
            showAll={true}
            showFilters={true}
          />
        ) : (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-200 mb-6">
              <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Δεν υπάρχουν διαθέσιμες ομάδες</h2>
            <p className="text-gray-600">
              Οι ομάδες θα εμφανιστούν σύντομα. Ελέγξτε ξανά αργότερα!
            </p>
          </div>
        )}

        {/* Info Section */}
        <div className="mt-16 bg-white rounded-xl shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Σχετικά με τις Ομάδες</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            Στο Sports Holics καλύπτουμε τις σημαντικότερες ομάδες του ελληνικού και διεθνούς αθλητισμού. 
            Βρείτε όλα τα νέα, τις αναλύσεις και τις αποκλειστικές πληροφορίες για την αγαπημένη σας ομάδα.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Επιλέξτε μια ομάδα παραπάνω για να δείτε όλα τα σχετικά άρθρα.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}

