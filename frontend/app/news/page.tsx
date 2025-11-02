import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function NewsPage() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Ειδήσεις
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Η σελίδα ειδήσεων είναι υπό κατασκευή. Σύντομα θα βρείτε εδώ όλες τις τελευταίες ειδήσεις από τον κόσμο του αθλητισμού.
          </p>
          <div className="mt-12">
            <div className="inline-flex items-center gap-3 px-8 py-4 bg-white rounded-full shadow-lg">
              <div className="w-3 h-3 bg-primary rounded-full animate-pulse"></div>
              <span className="text-gray-700 font-semibold">Έρχεται Σύντομα</span>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

