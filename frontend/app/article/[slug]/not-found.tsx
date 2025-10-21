import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function ArticleNotFound() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Το άρθρο δεν βρέθηκε
          </h2>
          <p className="text-gray-600 mb-8">
            Το άρθρο που ψάχνετε δεν υπάρχει ή έχει αφαιρεθεί.
          </p>
          <Link
            href="/"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
          >
            Επιστροφή στην Αρχική
          </Link>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

