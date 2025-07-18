// Translations for different languages
const translations = {
  'en': {
    'title': 'Dr. Karen Prediger',
    'directPayment': 'Immediate Direct Payment available',
    'profession': 'Dentist in Schifflange',
    'directions': 'Directions',
    'call': 'Call',
    'contact': 'Contact',
    'languages': 'Languages: PT, EN, FR',
    'about': 'About',
    'aboutText': 'My priority is to offer my patients quality care based on listening, trust, and personalized treatment. I am committed to constantly updating my knowledge and skills to ensure effective treatments tailored to each need, while respecting the well-being and comfort of my patients.',
    'aboutText2': 'I am a dentist graduated from the Federal University of Rio Grande do Sul (Brazil), with a Master\'s degree in Dentistry from Fernando Pessoa University (Portugal). I completed advanced training in endodontics in Madrid and am currently pursuing a specialization in dental prosthetics. My approach aims to combine technical expertise and humanity to ensure the best quality of care for my patients.',
    'onlineBooking': 'Online Booking'
  },
  'fr': {
    'title': 'Dr. Karen Prediger',
    'directPayment': 'Paiement direct immédiat disponible',
    'profession': 'Dentiste à Schifflange',
    'directions': 'Itinéraire',
    'call': 'Appeler',
    'contact': 'Contact',
    'languages': 'Langues: PT, EN, FR',
    'about': 'À propos',
    'aboutText': 'Ma priorité est d\'offrir à mes patients un accompagnement de qualité, basé sur l\'écoute, la confiance et des soins personnalisés. Je m\'engage à mettre à jour constamment mes connaissances et mes compétences afin de garantir des traitements efficaces et adaptés à chaque besoin, dans le respect du bien-être et du confort de mes patients.',
    'aboutText2': 'Je suis dentiste diplômée de l\'Université Fédérale du Rio Grande do Sul (Brésil), avec un Master en Odontologie de l\'Université Fernando Pessoa (Portugal). J\'ai complété un perfectionnement en endodontie à Madrid et je poursuis actuellement une spécialisation en prothèse dentaire. Mon approche vise à allier expertise technique et humanité pour assurer la meilleure qualité de soins à mes patients.',
    'onlineBooking': 'Réservation en ligne'
  },
  'pt': {
    'title': 'Dra. Karen Prediger',
    'directPayment': 'Pagamento direto imediato disponível',
    'profession': 'Dentista em Schifflange',
    'directions': 'Direções',
    'call': 'Ligar',
    'contact': 'Contato',
    'languages': 'Idiomas: PT, EN, FR',
    'about': 'Sobre',
    'aboutText': 'Minha prioridade é oferecer aos meus pacientes um atendimento de qualidade, baseado na escuta, confiança e cuidados personalizados. Comprometo-me a atualizar constantemente meus conhecimentos e habilidades para garantir tratamentos eficazes e adaptados a cada necessidade, respeitando o bem-estar e o conforto dos meus pacientes.',
    'aboutText2': 'Sou dentista formada pela Universidade Federal do Rio Grande do Sul (Brasil), com Mestrado em Odontologia pela Universidade Fernando Pessoa (Portugal). Completei um aperfeiçoamento em endodontia em Madrid e atualmente estou cursando uma especialização em prótese dentária. Minha abordagem visa combinar expertise técnica e humanidade para garantir a melhor qualidade de atendimento aos meus pacientes.',
    'onlineBooking': 'Agendamento Online'
  }
};

// Function to change the language
function changeLanguage(lang) {
  // Update iframe URL based on language
  const iframe = document.querySelector('iframe');
  if (iframe) {
    const baseUrl = 'https://booking-app.doctena.com/';
    const doctorId = '08b0232b-4100-452f-94f4-8f174f8cb620';
    iframe.src = `${baseUrl}${lang}/doctor/${doctorId}`;
  }

  // Update all translatable elements using their IDs
  for (const key in translations[lang]) {
    const element = document.getElementById(key);
    if (element) {
      element.textContent = translations[lang][key];
    }
  }

  // Show/hide language-specific elements
  document.querySelectorAll(`html [lang="${lang}"]`).forEach(el => el.classList.remove('d-none'));
  document.querySelectorAll(`html [lang]:not([lang="${lang}"])`).forEach(el => el.classList.add('d-none'));

  // Highlight the selected language button
  document.querySelectorAll('.language-selector .btn').forEach(btn => {
    btn.classList.remove('active');
  });
  document.querySelector(`.language-selector button[onclick="changeLanguage('${lang}')"]`).classList.add('active');
}

// Set language based on URL hash, query string, or default to English
document.addEventListener('DOMContentLoaded', function() {
  // Check for language parameter in URL hash first
  const hash = window.location.hash;
  const hashLangMatch = hash.match(/#lang=([a-z]{2})/);
  
  // Check for language parameter in query string
  const urlParams = new URLSearchParams(window.location.search);
  const queryLang = urlParams.get('lang');
  
  // Determine which language to use
  let selectedLang = 'en'; // Default language
  
  if (hashLangMatch && ['en', 'fr', 'pt'].includes(hashLangMatch[1])) {
    // Valid language found in URL hash
    selectedLang = hashLangMatch[1];
  } else if (queryLang && ['en', 'fr', 'pt'].includes(queryLang)) {
    // Valid language found in query string
    selectedLang = queryLang;
  }
  
  // Apply the selected language
  changeLanguage(selectedLang);

  // Update URL when language changes
  document.querySelectorAll('.language-selector .btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const lang = this.getAttribute('onclick').match(/changeLanguage\('([a-z]{2})'\)/)[1];
      
      // Update both query string and hash without page reload
      const url = new URL(window.location);
      url.searchParams.set('lang', lang);
      url.hash = `lang=${lang}`;
      window.history.replaceState({}, '', url);
    });
  });
});
