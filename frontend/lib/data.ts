import { SocialIcon, NewsArticle } from "@/types";

export const sportsLinks = [
    { key: 'football', label: 'Ποδόσφαιρο' },
    { key: 'basketball', label: 'Μπάσκετ' },
    { key: 'formula1', label: 'Formula 1' },
  ];
 
export const companyLinks = [
    { key: 'about', label: 'Σχετικά' },
    { key: 'contact', label: 'Επικοινωνία' },
    { key: 'privacy', label: 'Απόρρητο' },
    { key: 'terms', label: 'Όροι Χρήσης' },
  ];
  
export const socialIcons: SocialIcon[] = [
    { name: "Facebook", icon: "ri-facebook-fill" },
    { name: "Twitter", icon: "ri-twitter-fill" },
    { name: "Instagram", icon: "ri-instagram-fill" },
    { name: "YouTube", icon: "ri-youtube-fill" },
  ];

export const mainNews: NewsArticle[] = [
    {
      category: "ΜΠΑΣΚΕΤ",
      categoryColor: "bg-orange-100 text-orange-800",
      title: "Ο ΛεΜπρόν Τζέιμς Σπάει το Ρεκόρ Πόντων Όλων των Εποχών",
      description: "Ο σούπερ σταρ των Lakers γράφει ιστορία με μια εντυπωσιακή εμφάνιση κόντρα στους Oklahoma City Thunder...",
      timeAgo: "2 hours ago",
      author: "Μάικ Τζόνσον",
      imageUrl: "/basket1.png",
    },
    {
      category: "ΠΟΔΟΣΦΑΙΡΟ",
      categoryColor: "bg-green-100 text-green-800",
      title: "Η Κούρσα για τον Τίτλο της Premier League Εντείνεται",
      description: "Η Άρσεναλ και η Manchester City μάχονται για την κορυφή με μόνο τρεις αγώνες να απομένουν στη σεζόν...",
      timeAgo: "6 hours ago",
      author: "Ντέιβιντ Μαρτίνεζ",
      imageUrl: "/football1.png",
    },
    {
      category: "FORMULA 1",
      categoryColor: "bg-blue-100 text-blue-800",
      title: "Ο Φερστάπεν Κυριαρχεί στα Προκριματικά του Μονακό",
      description: "Ο οδηγός της Red Bull κατακτά την pole position με έναν εκπληκτικό χρόνο, ετοιμάζοντας το έδαφος για μια ακόμη πιθανή νίκη...",
      timeAgo: "4 hours ago",
      author: "Σάρα Γουίλσον",
      imageUrl: "/f1.png",
    },
    {
      category: "ΜΠΑΣΚΕΤ",
      categoryColor: "bg-orange-100 text-orange-800",
      title: "Οριστικοποιήθηκε ο Πίνακας των Playoffs του NBA",
      description: "Οι αναμετρήσεις της Ανατολικής και Δυτικής Διάσκεψης καθορίστηκαν καθώς οι ομάδες ετοιμάζονται για τα πιο ανταγωνιστικά playoffs των τελευταίων ετών...",
      timeAgo: "8 hours ago",
      author: "Άλεξ Θόμπσον",
      imageUrl: "/greek_basket.png",
    },
  ];
  
export const footballNews: NewsArticle[] = [
    {
      category: "PREMIER LEAGUE",
      categoryColor: "bg-green-100 text-green-800",
      title: "City εναντίον Arsenal: Το Παιχνίδι του Τίτλου",
      description: "Ο τελευταίος αγώνας υπόσχεται να είναι το πιο δραματικό φινάλε της Premier League των τελευταίων δεκαετιών...",
      timeAgo: "1 hour ago",
      author: "Τομ Άντερσον",
      imageUrl: "/football1.png",
    },
    {
      category: "CHAMPIONS LEAGUE",
      categoryColor: "bg-blue-100 text-blue-800",
      title: "Αποτελέσματα Κλήρωσης Ημιτελικών",
      description: "Οι ευρωπαϊκοί γίγαντες μαθαίνουν τη μοίρα τους καθώς ο δρόμος προς τον τελικό γίνεται ξεκάθαρος...",
      timeAgo: "2 hours ago",
      author: "Μαρία Σάντος",
      imageUrl: "/football.png",
    },
    {
      category: "ΠΑΓΚΟΣΜΙΟ ΚΥΠΕΛΛΟ",
      categoryColor: "bg-purple-100 text-purple-800",
      title: "Το Δράμα των Προκριματικών Συνεχίζεται",
      description: "Πολλά έθνη μάχονται για τις τελευταίες θέσεις στο τουρνουά του επόμενου έτους...",
      timeAgo: "4 hours ago",
      author: "Ρομπέρτο Σίλβα",
      imageUrl: "/football1.png",
    },
  ];
  
export const basketballNews: NewsArticle[] = [
    {
      category: "ΤΕΛΙΚΟΙ NBA",
      categoryColor: "bg-orange-100 text-orange-800",
      title: "Έβδομο Παιχνίδι για Ιστορικό Φινάλε",
      description: "Και οι δύο ομάδες φτάνουν στα όριά τους καθώς η δόξα του πρωταθλήματος κρέμεται στον αέρα...",
      timeAgo: "30 minutes ago",
      author: "Κέβιν Γουίλιαμς",
      imageUrl: "/basket1.png",
    },
    {
      category: "DRAFT NBA",
      categoryColor: "bg-yellow-100 text-yellow-800",
      title: "Αποκαλύφθηκαν τα Κορυφαία Ταλέντα",
      description: "Οι αστέρες των κολεγίων ετοιμάζονται για το επόμενο κεφάλαιο της καλαθοσφαιρικής τους καριέρας...",
      timeAgo: "1 hour ago",
      author: "Άσλεϊ Ντέιβις",
      imageUrl: "/basket1.png",
    },
    {
      category: "WNBA",
      categoryColor: "bg-pink-100 text-pink-800",
      title: "Η Κούρσα για τα Playoffs Εντείνεται",
      description: "Πολλές ομάδες μάχονται για τις τελευταίες θέσεις μετά τη κανονική περίοδο σε συναρπαστικό φινάλε...",
      timeAgo: "3 hours ago",
      author: "Τζένιφερ Λι",
      imageUrl: "/basket1.png",
    },
  ];
  
export const formulaOneNews: NewsArticle[] = [
    {
      category: "GP ΜΟΝΑΚΟ",
      categoryColor: "bg-red-100 text-red-800",
      title: "Ρεκόρ Γύρου Προκριματικών Σπάει",
      description: "Εκπληκτική εμφάνιση στους δρόμους του Μόντε Κάρλο ετοιμάζει συναρπαστική ημέρα αγώνα...",
      timeAgo: "2 hours ago",
      author: "Πιερ Ντιμπουά",
      imageUrl: "/f1.png",
    },
    {
      category: "ΠΡΩΤΑΘΛΗΜΑ",
      categoryColor: "bg-blue-100 text-blue-800",
      title: "Η Μάχη για τον Τίτλο Πηγαίνει στον Τελευταίο Αγώνα",
      description: "Τρεις οδηγοί μαθηματικά ακόμα στη διεκδίκηση για το παγκόσμιο πρωτάθλημα...",
      timeAgo: "4 hours ago",
      author: "Μάρκο Ρόσι",
      imageUrl: "/f2.png",
    },
    {
      category: "ΤΕΧΝΟΛΟΓΙΑ",
      categoryColor: "bg-green-100 text-green-800",
      title: "Ανακοινώθηκαν Νέοι Κανονισμοί",
      description: "Η FIA αποκαλύπτει σημαντικές τεχνικές αλλαγές για το πρωτάθλημα της επόμενης σεζόν...",
      timeAgo: "6 hours ago",
      author: "Χανς Μύλερ",
      imageUrl: "/f1.png",
    },
  ];
  