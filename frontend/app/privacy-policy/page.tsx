import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Πολιτική Απορρήτου | Sports Holics",
  description:
    "Πολιτική απορρήτου και χρήσης cookies του Sports Holics. Μάθετε πώς συλλέγουμε και χρησιμοποιούμε τα δεδομένα σας.",
  robots: {
    index: true,
    follow: true,
  },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />

      <main className="max-w-4xl mx-auto px-4 py-12">
        {/* Page Header */}
        <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
              <svg
                className="w-6 h-6 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-900">
              Πολιτική Απορρήτου
            </h1>
          </div>
          <p className="text-gray-600">
            Τελευταία ενημέρωση: Δεκέμβριος 2024
          </p>
        </div>

        {/* Content Sections */}
        <div className="bg-white rounded-xl shadow-sm p-8 space-y-8">
          {/* Introduction */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Εισαγωγή
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Στο Sports Holics, σεβόμαστε την ιδιωτικότητά σας και δεσμευόμαστε
              να προστατεύουμε τα προσωπικά σας δεδομένα. Η παρούσα πολιτική
              απορρήτου εξηγεί πώς συλλέγουμε, χρησιμοποιούμε και προστατεύουμε
              τις πληροφορίες σας όταν επισκέπτεστε τον ιστότοπό μας.
            </p>
          </section>

          {/* What Data We Collect */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Ποια Δεδομένα Συλλέγουμε
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Συλλέγουμε τους ακόλουθους τύπους πληροφοριών:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>
                <strong>Δεδομένα ανάλυσης:</strong> Πληροφορίες σχετικά με τον
                τρόπο χρήσης του ιστότοπου (σελίδες που επισκέπτεστε, χρόνος
                παραμονής, κ.λπ.)
              </li>
              <li>
                <strong>Τεχνικά δεδομένα:</strong> Διεύθυνση IP, τύπος
                προγράμματος περιήγησης, λειτουργικό σύστημα
              </li>
              <li>
                <strong>Cookies:</strong> Μικρά αρχεία που αποθηκεύονται στη
                συσκευή σας για τη βελτίωση της εμπειρίας χρήσης
              </li>
            </ul>
          </section>

          {/* Cookies Section */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <svg
                className="w-6 h-6 text-red-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12zm-1-5a1 1 0 112 0v2a1 1 0 11-2 0v-2zm0-4a1 1 0 112 0 1 1 0 01-2 0z" />
              </svg>
              Χρήση Cookies
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Χρησιμοποιούμε cookies για να βελτιώσουμε την εμπειρία σας στον
              ιστότοπό μας. Τα cookies χωρίζονται στις ακόλουθες κατηγορίες:
            </p>

            {/* Cookie Types */}
            <div className="space-y-4">
              {/* Essential Cookies */}
              <div className="bg-gray-50 rounded-lg p-4 border-l-4 border-green-500">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Απαραίτητα Cookies
                </h3>
                <p className="text-gray-600 text-sm">
                  Αυτά τα cookies είναι απαραίτητα για τη λειτουργία του
                  ιστότοπου. Περιλαμβάνουν την αποθήκευση των προτιμήσεων
                  cookies σας. Δεν μπορούν να απενεργοποιηθούν.
                </p>
              </div>

              {/* Analytics Cookies */}
              <div className="bg-gray-50 rounded-lg p-4 border-l-4 border-blue-500">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Cookies Ανάλυσης (Google Analytics)
                </h3>
                <p className="text-gray-600 text-sm mb-2">
                  Χρησιμοποιούμε το Google Analytics για να κατανοήσουμε πώς οι
                  επισκέπτες χρησιμοποιούν τον ιστότοπό μας. Αυτά τα cookies
                  συλλέγουν πληροφορίες όπως:
                </p>
                <ul className="text-gray-600 text-sm list-disc list-inside ml-2 space-y-1">
                  <li>Αριθμός επισκεπτών</li>
                  <li>Σελίδες που προβλήθηκαν</li>
                  <li>Πηγή επισκεψιμότητας</li>
                  <li>Χρόνος παραμονής στον ιστότοπο</li>
                </ul>
                <p className="text-gray-600 text-sm mt-2">
                  <strong>Απαιτείται η συγκατάθεσή σας</strong> για την
                  ενεργοποίηση αυτών των cookies.
                </p>
              </div>
            </div>
          </section>

          {/* Your Rights */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Τα Δικαιώματά σας
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Σύμφωνα με τον Γενικό Κανονισμό Προστασίας Δεδομένων (GDPR), έχετε
              τα ακόλουθα δικαιώματα:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>Δικαίωμα πρόσβασης στα δεδομένα σας</li>
              <li>Δικαίωμα διόρθωσης ανακριβών δεδομένων</li>
              <li>Δικαίωμα διαγραφής (&quot;δικαίωμα στη λήθη&quot;)</li>
              <li>Δικαίωμα περιορισμού της επεξεργασίας</li>
              <li>Δικαίωμα ανάκλησης της συγκατάθεσης</li>
              <li>Δικαίωμα υποβολής καταγγελίας στην αρμόδια αρχή</li>
            </ul>
          </section>

          {/* Managing Cookies */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Διαχείριση Cookies
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Μπορείτε να διαχειριστείτε τις προτιμήσεις σας για τα cookies
              ανά πάσα στιγμή:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>
                Μέσω του banner cookies που εμφανίζεται κατά την πρώτη
                επίσκεψη
              </li>
              <li>
                Μέσω των ρυθμίσεων του προγράμματος περιήγησής σας
              </li>
              <li>
                Διαγράφοντας τα cookies από τη συσκευή σας
              </li>
            </ul>
            <div className="mt-4 p-4 bg-red-50 rounded-lg border border-red-200">
              <p className="text-gray-700 text-sm">
                <strong>Σημείωση:</strong> Αν απορρίψετε τα cookies ανάλυσης,
                θα συνεχίσετε να έχετε πρόσβαση σε όλο το περιεχόμενο του
                ιστότοπου χωρίς περιορισμούς.
              </p>
            </div>
          </section>

          {/* Data Retention */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Διατήρηση Δεδομένων
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Τα δεδομένα ανάλυσης διατηρούνται για 26 μήνες στο Google
              Analytics. Οι προτιμήσεις cookies σας αποθηκεύονται τοπικά στη
              συσκευή σας και δεν έχουν ημερομηνία λήξης, εκτός αν τις
              διαγράψετε χειροκίνητα.
            </p>
          </section>

          {/* Third Party Services */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Υπηρεσίες Τρίτων
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Χρησιμοποιούμε τις ακόλουθες υπηρεσίες τρίτων:
            </p>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="px-4 py-2 text-left font-semibold text-gray-900">
                      Υπηρεσία
                    </th>
                    <th className="px-4 py-2 text-left font-semibold text-gray-900">
                      Σκοπός
                    </th>
                    <th className="px-4 py-2 text-left font-semibold text-gray-900">
                      Πολιτική Απορρήτου
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-4 py-3 text-gray-700">Google Analytics</td>
                    <td className="px-4 py-3 text-gray-700">
                      Ανάλυση επισκεψιμότητας
                    </td>
                    <td className="px-4 py-3">
                      <a
                        href="https://policies.google.com/privacy"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-red-600 hover:text-red-700 underline"
                      >
                        Προβολή
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Contact */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Επικοινωνία
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Για οποιαδήποτε ερώτηση σχετικά με την πολιτική απορρήτου ή τα
              δεδομένα σας, μπορείτε να επικοινωνήσετε μαζί μας στο:{" "}
              <a
                href="mailto:privacy@sportsholics.gr"
                className="text-red-600 hover:text-red-700 underline"
              >
                privacy@sportsholics.gr
              </a>
            </p>
          </section>

          {/* Back to Home */}
          <div className="pt-6 border-t border-gray-200">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-red-600 hover:text-red-700 font-medium transition-colors"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Επιστροφή στην Αρχική
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

