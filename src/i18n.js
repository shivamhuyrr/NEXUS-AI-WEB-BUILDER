import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Translation files are defined directly here for simplicity,
// but they could be moved to separate JSON files later.
const resources = {
    en: {
        translation: {
            "app": {
                "title": "Nexus AI",
                "start_building": "Start Building"
            },
            "hero": {
                "badge": "Next-Generation Web Development",
                "title_part_1": "Design websites in",
                "title_part_2": "any language.",
                "subtitle": "Nexus AI transforms your natural language descriptions into production-ready, beautiful React and Tailwind code instantly.",
                "open_builder": "Open Builder",
                "learn_more": "Learn More"
            },
            "features": {
                "title": "Built for velocity",
                "subtitle": "Everything you need to go from concept to production-ready code in seconds.",
                "instant": {
                    "title": "Instant Generation",
                    "desc": "Watch your interfaces build themselves in real-time as the AI streams code directly to your browser."
                },
                "modern": {
                    "title": "Modern Stack",
                    "desc": "Outputs clean, functional React components styled perfectly with Tailwind CSS."
                },
                "export": {
                    "title": "One-Click Export",
                    "desc": "Copy individual components or open the entire project directly in Sandpack for further editing."
                }
            },
            "footer": {
                "text": "© {{year}} Nexus AI Builder. Created for seamless development."
            }
        }
    },
    es: {
        translation: {
            "app": {
                "title": "Nexus AI",
                "start_building": "Empezar a Crear"
            },
            "hero": {
                "badge": "Desarrollo Web de Próxima Generación",
                "title_part_1": "Diseña sitios web en",
                "title_part_2": "cualquier idioma.",
                "subtitle": "Nexus AI transforma tus descripciones en lenguaje natural en código React y Tailwind hermoso y listo para producción al instante.",
                "open_builder": "Abrir Constructor",
                "learn_more": "Aprender Más"
            },
            "features": {
                "title": "Construido para la velocidad",
                "subtitle": "Todo lo que necesitas para pasar del concepto al código de producción en segundos.",
                "instant": {
                    "title": "Generación Instantánea",
                    "desc": "Mira cómo tus interfaces se construyen en tiempo real mientras la IA transmite código directamente a tu navegador."
                },
                "modern": {
                    "title": "Stack Moderno",
                    "desc": "Genera componentes de React limpios y funcionales, con estilos perfectos de Tailwind CSS."
                },
                "export": {
                    "title": "Exportación en un Clic",
                    "desc": "Copia componentes individuales o abre todo el proyecto directamente en Sandpack para seguir editando."
                }
            },
            "footer": {
                "text": "© {{year}} Constructor Nexus AI. Creado para un desarrollo sin interrupciones."
            }
        }
    },
    hi: {
        translation: {
            "app": {
                "title": "Nexus AI",
                "start_building": "बनाना शुरू करें"
            },
            "hero": {
                "badge": "अगली पीढ़ी का वेब विकास",
                "title_part_1": "वेबसाइटें डिज़ाइन करें",
                "title_part_2": "किसी भी भाषा में।",
                "subtitle": "नेक्सस एआई आपके प्राकृतिक भाषा विवरणों को तुरंत उत्पादन-तैयार, सुंदर रिएक्ट और टेलविंड कोड में बदल देता है।",
                "open_builder": "बिल्डर खोलें",
                "learn_more": "और जानें"
            },
            "features": {
                "title": "गति के लिए निर्मित",
                "subtitle": "अवधारणा से उत्पादन-तैयार कोड तक सेकंडों में जाने के लिए जो कुछ भी आपको चाहिए।",
                "instant": {
                    "title": "त्वरित निर्माण",
                    "desc": "अपनी आँखों के सामने इंटरफ़ेस को वास्तविक समय में बनते हुए देखें, क्योंकि AI सीधे आपके ब्राउज़र में कोड स्ट्रीम करता है।"
                },
                "modern": {
                    "title": "आधुनिक स्टैक",
                    "desc": "स्वच्छ, कार्यात्मक रिएक्ट घटक आउटपुट करता है जो टेलविंड सीएसएस के साथ पूरी तरह से स्टाइल किए गए हैं।"
                },
                "export": {
                    "title": "एक-क्लिक निर्यात",
                    "desc": "आगे के संपादन के लिए व्यक्तिगत घटकों को कॉपी करें या पूरा प्रोजेक्ट सीधे सैंडपैक में खोलें।"
                }
            },
            "footer": {
                "text": "© {{year}} नेक्सस एआई बिल्डर। निर्बाध विकास के लिए बनाया गया।"
            }
        }
    }
};

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false // React already escapes values
        }
    });

export default i18n;
