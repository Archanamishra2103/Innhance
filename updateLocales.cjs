const fs = require('fs');
const path = require('path');

const localesDir = path.join(__dirname, 'src', 'locales');

const files = ['ar.json', 'de.json', 'en.json', 'es.json', 'fr.json', 'hi.json', 'id.json'];

// Common data for all (names, locations, initials, featured)
const commonData = [
  { author: "Nd Manor", location: "Dehradun", initials: "NM", featured: false },
  { author: "Fateh Villas", location: "Udaipur", initials: "FV", featured: false },
  { author: "14 gable", location: "Manali", initials: "1G", featured: false },
  { author: "Seven Seas", location: "Rishikesh", initials: "SS", featured: false },
  { author: "Bindram Palace", location: "Rishikesh", initials: "BP", featured: false },
  { author: "Meeram Ganga", location: "Rishikesh", initials: "MG", featured: true },
  { author: "Panabi Resorts", location: "Rishikesh", initials: "PR", featured: false },
  { author: "Hotel Gorbandh", location: "Udaipur", initials: "HG", featured: false },
  { author: "Hotel Old Town", location: "Neemrana", initials: "HO", featured: false },
  { author: "Hotel Mani International", location: "Patna", initials: "HM", featured: false }
];

const quotes = {
  en: [
    { category: "Bookings ↑", quote: "Our front desk used to be overwhelmed with WhatsApp messages asking about room rates. Now the AI handles 90% of them and our direct bookings have shot up. It feels like having an extra staff member working 24/7." },
    { category: "Guest love", quote: "What amazed me is how naturally it talks to guests. They actually think they are chatting with our manager. We are seeing a lot more confirmed reservations simply because the replies are instant." },
    { category: "Revenue", quote: "In Manali network can be tricky and sometimes we miss messages. This tool sits in the cloud and replies instantly. Our OTA commissions have dropped significantly since guests now prefer booking directly on WhatsApp." },
    { category: "Time saved", quote: "We get a lot of foreign tourists and the multi language feature is a game changer. The bot replies in their native language and handles the payment links perfectly." },
    { category: "Bookings ↑", quote: "Managing group bookings used to take days of back and forth on WhatsApp. Now the bot answers all the common questions about amenities and pricing instantly. We just wake up to the payment notifications." },
    { category: "Guest love", quote: "I was skeptical about using AI for our hotel but the setup was so easy. Guests love the instant responses and our reception is much more relaxed now. Highly recommended for boutique properties." },
    { category: "Revenue", quote: "The best part is how it handles late night inquiries. We used to lose so many bookings because guests would message at midnight and book somewhere else by morning. Not anymore." },
    { category: "Time saved", quote: "Since we implemented this our conversion rate from WhatsApp chats has doubled. It smoothly shares pictures and exact availability without us having to check the system manually every time." },
    { category: "Bookings ↑", quote: "We host a lot of weekend travelers who ask the same questions about parking and check-in times. The bot takes care of all of that and even sends them the location map automatically." },
    { category: "Revenue", quote: "It is incredibly efficient. We used to pay hefty commissions to travel agents but now the AI drives direct bookings right into our account. The investment paid for itself in the first week." }
  ],
  hi: [
    { category: "बुकिंग ↑", quote: "हमारे फ्रंट डेस्क पर कमरे की दरों के बारे में पूछने वाले व्हाट्सएप संदेशों की भरमार रहती थी। अब AI उनमें से 90% को संभालता है और हमारी डायरेक्ट बुकिंग काफी बढ़ गई है। ऐसा लगता है जैसे 24/7 काम करने वाला कोई अतिरिक्त कर्मचारी हो।" },
    { category: "अतिथि प्रेम", quote: "मुझे इस बात ने हैरान किया कि यह मेहमानों से कितनी स्वाभाविक रूप से बात करता है। वे वास्तव में सोचते हैं कि वे हमारे प्रबंधक के साथ चैट कर रहे हैं। हम बहुत अधिक कन्फर्म बुकिंग देख रहे हैं क्योंकि उत्तर तुरंत मिलते हैं।" },
    { category: "राजस्व", quote: "मनाली में नेटवर्क मुश्किल हो सकता है और कभी-कभी हम संदेश मिस कर देते हैं। यह टूल क्लाउड में रहता है और तुरंत उत्तर देता है। चूंकि मेहमान अब सीधे व्हाट्सएप पर बुकिंग करना पसंद करते हैं, इसलिए हमारा OTA कमीशन काफी कम हो गया है।" },
    { category: "समय की बचत", quote: "हमें बहुत सारे विदेशी पर्यटक मिलते हैं और बहु-भाषा सुविधा बहुत अच्छी है। बॉट उनकी मूल भाषा में उत्तर देता है और भुगतान लिंक को पूरी तरह से संभालता है।" },
    { category: "बुकिंग ↑", quote: "ग्रुप बुकिंग के प्रबंधन में व्हाट्सएप पर आगे-पीछे होने में कई दिन लग जाते थे। अब बॉट तुरंत सुविधाओं और मूल्य निर्धारण के बारे में सभी सामान्य प्रश्नों के उत्तर देता है। हम बस भुगतान सूचनाओं के साथ जागते हैं।" },
    { category: "अतिथि प्रेम", quote: "मैं हमारे होटल के लिए AI का उपयोग करने के बारे में संशय में था लेकिन सेटअप बहुत आसान था। मेहमान तुरंत प्रतिक्रिया पसंद करते हैं और हमारा रिसेप्शन अब अधिक आराम से है। बुटीक संपत्तियों के लिए अत्यधिक अनुशंसित।" },
    { category: "राजस्व", quote: "सबसे अच्छी बात यह है कि यह देर रात की पूछताछ को कैसे संभालता है। हम बहुत सारी बुकिंग खो देते थे क्योंकि मेहमान आधी रात को संदेश भेजते थे और सुबह तक कहीं और बुक कर लेते थे। अब ऐसा नहीं है।" },
    { category: "समय की बचत", quote: "जब से हमने इसे लागू किया है, व्हाट्सएप चैट से हमारी रूपांतरण दर दोगुनी हो गई है। यह हमें हर बार मैन्युअल रूप से सिस्टम की जांच किए बिना चित्रों और सटीक उपलब्धता को सुचारू रूप से साझा करता है।" },
    { category: "बुकिंग ↑", quote: "हम सप्ताहांत के बहुत से यात्रियों की मेजबानी करते हैं जो पार्किंग और चेक-इन समय के बारे में समान प्रश्न पूछते हैं। बॉट उस सब का ख्याल रखता है और यहां तक ​​कि उन्हें स्वचालित रूप से स्थान मानचित्र भी भेजता है।" },
    { category: "राजस्व", quote: "यह अविश्वसनीय रूप से कुशल है। हम ट्रैवल एजेंटों को भारी कमीशन देते थे लेकिन अब AI सीधे हमारे खाते में डायरेक्ट बुकिंग लाता है। निवेश ने पहले सप्ताह में ही अपनी लागत निकाल ली।" }
  ],
  es: [
    { category: "Reservas ↑", quote: "Nuestra recepción solía estar abrumada con mensajes de WhatsApp preguntando por las tarifas. Ahora la IA maneja el 90% y nuestras reservas directas se han disparado." },
    { category: "Amor de los huéspedes", quote: "Lo que me sorprendió es la naturalidad con la que habla. Creen que están chateando con el gerente. Estamos viendo muchas más reservas porque las respuestas son instantáneas." },
    { category: "Ingresos", quote: "En Manali la red falla y perdíamos mensajes. Esta herramienta está en la nube y responde al instante. Nuestras comisiones OTA han bajado porque prefieren reservar directamente en WhatsApp." },
    { category: "Tiempo ahorrado", quote: "Recibimos muchos turistas extranjeros y la función multilingüe lo cambia todo. El bot responde en su idioma nativo y maneja los pagos perfectamente." },
    { category: "Reservas ↑", quote: "Gestionar reservas de grupos tomaba días. Ahora el bot responde a todas las preguntas comunes sobre comodidades y precios al instante. Solo nos despertamos con las notificaciones de pago." },
    { category: "Amor de los huéspedes", quote: "Era escéptico sobre usar IA, pero la configuración fue muy fácil. A los huéspedes les encantan las respuestas instantáneas. Muy recomendable para hoteles boutique." },
    { category: "Ingresos", quote: "Lo mejor es cómo maneja las consultas nocturnas. Solíamos perder reservas porque nos escribían a medianoche y para la mañana ya habían reservado en otro lugar. Ya no." },
    { category: "Tiempo ahorrado", quote: "Desde que lo implementamos, nuestra tasa de conversión de WhatsApp se ha duplicado. Comparte imágenes y disponibilidad exacta sin revisar el sistema manualmente." },
    { category: "Reservas ↑", quote: "Recibimos viajeros de fin de semana que preguntan lo mismo sobre aparcamiento y horarios de entrada. El bot se encarga de todo e incluso les envía el mapa automáticamente." },
    { category: "Ingresos", quote: "Es increíblemente eficiente. Solíamos pagar grandes comisiones a agentes de viajes, pero ahora la IA genera reservas directas en nuestra cuenta." }
  ],
  fr: [
    { category: "Réservations ↑", quote: "Notre réception était submergée de messages WhatsApp. Maintenant, l'IA gère 90 % d'entre eux et nos réservations directes ont grimpé en flèche. C'est comme avoir un employé 24h/24." },
    { category: "Amour des clients", quote: "Ce qui m'a étonné, c'est le naturel avec lequel il parle. Ils pensent discuter avec le gérant. Nous voyons plus de réservations car les réponses sont instantanées." },
    { category: "Revenus", quote: "À Manali, le réseau est capricieux. Cet outil répond instantanément. Nos commissions OTA ont considérablement baissé car les clients préfèrent réserver directement sur WhatsApp." },
    { category: "Gain de temps", quote: "Nous recevons beaucoup de touristes étrangers. Le bot répond dans leur langue maternelle et gère parfaitement les liens de paiement." },
    { category: "Réservations ↑", quote: "Gérer les réservations de groupe prenait des jours. Maintenant, le bot répond instantanément aux questions courantes sur les prix. Nous nous réveillons avec les notifications de paiement." },
    { category: "Amour des clients", quote: "J'étais sceptique quant à l'utilisation de l'IA, mais l'installation a été facile. Les clients adorent les réponses instantanées. Fortement recommandé pour les hôtels de charme." },
    { category: "Revenus", quote: "La meilleure partie est la façon dont il gère les demandes nocturnes. Nous ne perdons plus de réservations pendant la nuit." },
    { category: "Gain de temps", quote: "Depuis sa mise en place, notre taux de conversion WhatsApp a doublé. Il partage des photos et la disponibilité exacte sans vérification manuelle." },
    { category: "Réservations ↑", quote: "Nous accueillons des voyageurs du week-end qui posent les mêmes questions sur le parking. Le bot s'occupe de tout et leur envoie la carte automatiquement." },
    { category: "Revenus", quote: "C'est incroyablement efficace. L'IA génère des réservations directes directement sur notre compte. L'investissement s'est remboursé dès la première semaine." }
  ],
  de: [
    { category: "Buchungen ↑", quote: "Unsere Rezeption war früher überlastet mit WhatsApp-Nachrichten. Jetzt erledigt die KI 90 % davon und unsere Direktbuchungen sind in die Höhe geschossen." },
    { category: "Gästeliebe", quote: "Was mich erstaunt, ist, wie natürlich es mit Gästen spricht. Sie denken, sie chatten mit unserem Manager. Wir sehen viel mehr bestätigte Reservierungen." },
    { category: "Einnahmen", quote: "In Manali kann das Netzwerk knifflig sein. Dieses Tool antwortet sofort. Unsere OTA-Provisionen sind gesunken, da Gäste lieber direkt buchen." },
    { category: "Zeitersparnis", quote: "Wir haben viele ausländische Touristen. Der Bot antwortet in ihrer Muttersprache und wickelt die Zahlungslinks perfekt ab." },
    { category: "Buchungen ↑", quote: "Gruppenbuchungen dauerten früher Tage. Jetzt beantwortet der Bot alle häufigen Fragen sofort. Wir wachen einfach mit den Zahlungsbenachrichtigungen auf." },
    { category: "Gästeliebe", quote: "Ich war skeptisch, aber die Einrichtung war sehr einfach. Die Gäste lieben die sofortigen Antworten. Sehr empfehlenswert für Boutique-Hotels." },
    { category: "Einnahmen", quote: "Der beste Teil ist, wie es nächtliche Anfragen bearbeitet. Wir verlieren keine Buchungen mehr, weil Gäste um Mitternacht schreiben." },
    { category: "Zeitersparnis", quote: "Unsere Konversionsrate bei WhatsApp-Chats hat sich verdoppelt. Es teilt reibungslos Bilder und die genaue Verfügbarkeit." },
    { category: "Buchungen ↑", quote: "Wochenendreisende stellen die gleichen Fragen zum Parken. Der Bot kümmert sich um alles und sendet ihnen automatisch die Karte." },
    { category: "Einnahmen", quote: "Es ist unglaublich effizient. Wir zahlen keine hohen Provisionen mehr, die KI bringt uns Direktbuchungen. Hat sich sofort rentiert." }
  ],
  ar: [
    { category: "حجوزات ↑", quote: "كان مكتب الاستقبال لدينا مثقلًا برسائل الواتساب. الآن يتعامل الذكاء الاصطناعي مع 90% منها وارتفعت حجوزاتنا المباشرة." },
    { category: "حب الضيوف", quote: "ما أدهشني هو مدى طبيعة التحدث. يعتقدون أنهم يتحدثون مع المدير. نرى المزيد من الحجوزات لأن الردود فورية." },
    { category: "إيرادات", quote: "في مانالي يمكن أن تكون الشبكة صعبة. هذه الأداة ترد على الفور. انخفضت عمولات OTA الخاصة بنا بشكل كبير." },
    { category: "توفير الوقت", quote: "نحصل على الكثير من السياح الأجانب. يرد الروبوت بلغتهم الأم ويتعامل مع روابط الدفع بشكل مثالي." },
    { category: "حجوزات ↑", quote: "كانت إدارة حجوزات المجموعات تستغرق أيامًا. الآن يجيب الروبوت على جميع الأسئلة الشائعة على الفور. نستيقظ فقط على إشعارات الدفع." },
    { category: "حب الضيوف", quote: "كنت متشككًا، لكن الإعداد كان سهلًا جدًا. يحب الضيوف الردود الفورية. نوصي به بشدة للفنادق." },
    { category: "إيرادات", quote: "أفضل جزء هو كيفية التعامل مع الاستفسارات الليلية. لم نعد نفقد الحجوزات بسبب تأخر الرد ليلاً." },
    { category: "توفير الوقت", quote: "تضاعف معدل التحويل من محادثات الواتساب. يشارك الصور والتوافر الدقيق بسلاسة." },
    { category: "حجوزات ↑", quote: "المسافرون في عطلة نهاية الأسبوع يطرحون نفس الأسئلة حول وقوف السيارات. الروبوت يعتني بكل شيء." },
    { category: "إيرادات", quote: "فعال للغاية. اعتدنا دفع عمولات باهظة، لكن الآن الذكاء الاصطناعي يدفع الحجوزات المباشرة إلى حسابنا." }
  ],
  id: [
    { category: "Pemesanan ↑", quote: "Resepsionis kami dulu kewalahan dengan pesan WhatsApp. Sekarang AI menangani 90% darinya dan pemesanan langsung kami melonjak tajam." },
    { category: "Kepuasan Tamu", quote: "Yang membuat saya kagum adalah betapa alaminya ia berbicara. Mereka pikir mereka mengobrol dengan manajer kami." },
    { category: "Pendapatan", quote: "Di Manali jaringan bisa bermasalah. Alat ini membalas secara instan. Komisi OTA kami telah turun secara signifikan." },
    { category: "Hemat Waktu", quote: "Kami mendapat banyak turis asing. Bot membalas dalam bahasa ibu mereka dan menangani tautan pembayaran dengan sempurna." },
    { category: "Pemesanan ↑", quote: "Mengelola pemesanan grup dulu memakan waktu berhari-hari. Sekarang bot menjawab semua pertanyaan umum secara instan." },
    { category: "Kepuasan Tamu", quote: "Saya skeptis, tetapi penyiapannya sangat mudah. Tamu menyukai balasan instan. Sangat direkomendasikan untuk hotel butik." },
    { category: "Pendapatan", quote: "Bagian terbaiknya adalah bagaimana ia menangani pertanyaan larut malam. Kami tidak lagi kehilangan pemesanan." },
    { category: "Hemat Waktu", quote: "Tingkat konversi obrolan WhatsApp kami telah berlipat ganda. Ini berbagi gambar dan ketersediaan yang tepat dengan lancar." },
    { category: "Pemesanan ↑", quote: "Wisatawan akhir pekan menanyakan pertanyaan yang sama tentang parkir. Bot mengurus semua itu secara otomatis." },
    { category: "Pendapatan", quote: "Sangat efisien. Kami dulu membayar komisi besar, tetapi sekarang AI mendorong pemesanan langsung ke akun kami." }
  ]
};

for (const file of files) {
  const filePath = path.join(localesDir, file);
  const lang = file.split('.')[0];
  
  if (fs.existsSync(filePath)) {
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    
    if (data.testimonials_section) {
      const langQuotes = quotes[lang] || quotes['en'];
      
      const newItems = commonData.map((hotel, index) => {
        return {
          category: langQuotes[index].category,
          quote: langQuotes[index].quote,
          author: hotel.author,
          role: "",
          property: "",
          location: hotel.location,
          initials: hotel.initials,
          featured: hotel.featured
        };
      });
      
      data.testimonials_section.items = newItems;
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
      console.log(`Updated ${file}`);
    }
  }
}
