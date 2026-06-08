export const whistleColors = [
  { name: 'Schwarz', hex: '#1c1c1e' },
  { name: 'Rot',     hex: '#cc2200' },
  { name: 'Blau',    hex: '#1a56db' },
  { name: 'Grün',    hex: '#16653a' },
  { name: 'Gelb',    hex: '#ca8a04' },
];

export type DesignMaterial = {
  roughness: number; metalness: number;
  clearcoat: number; clearcoatRoughness: number;
};

export const whistleDesigns = ['Classic', 'Pro', 'Carbon', 'Elite', 'Sport'] as const;

export const designMaterials: Record<string, DesignMaterial> = {
  Classic: { roughness: 0.12, metalness: 0.0,  clearcoat: 0.95, clearcoatRoughness: 0.08 },
  Pro:     { roughness: 0.04, metalness: 0.92, clearcoat: 0.1,  clearcoatRoughness: 0.05 },
  Carbon:  { roughness: 0.62, metalness: 0.1,  clearcoat: 0.2,  clearcoatRoughness: 0.3  },
  Elite:   { roughness: 0.02, metalness: 1.0,  clearcoat: 0.0,  clearcoatRoughness: 0.0  },
  Sport:   { roughness: 0.48, metalness: 0.0,  clearcoat: 0.5,  clearcoatRoughness: 0.32 },
};

export const whistleTypes = [
  { id: 'pea',   name: 'Pea Classic', desc: 'Klassische Erbsenpfeife', price: 34.90 },
  { id: 'fox40', name: 'Fox 40',      desc: 'Kammer-Pfeife, kein Pea', price: 39.90 },
  { id: 'metal', name: 'Metal Pro',   desc: 'Traditionell & lang',     price: 44.90 },
  { id: 'grip',  name: 'Grip',        desc: 'Ergonomisch & flach',     price: 37.90 },
  { id: 'mini',  name: 'Ultra Mini',  desc: 'Kompakt & rund',          price: 29.90 },
] as const;

export type WhistleTypeId = typeof whistleTypes[number]['id'];

export const whistleTones = [
  { id: 1 as const, name: 'Ton 1', desc: 'Kurz & scharf'     },
  { id: 2 as const, name: 'Ton 2', desc: 'Tief & kräftig'    },
  { id: 3 as const, name: 'Ton 3', desc: 'Dreifach-Signal'   },
  { id: 4 as const, name: 'Ton 4', desc: 'Langanhaltend'     },
  { id: 5 as const, name: 'Ton 5', desc: 'Staccato-Burst'    },
];

export const features = [
  { icon: '🎵', title: 'Präziser Klang',    desc: 'Jede Pfeifn ist auf maximale Lautstärke und kristallklare Tonreinheit optimiert.' },
  { icon: '⚙️', title: '3D-Konfigurator',   desc: 'Gestalte deine Pfeifn in Echtzeit – Farbe, Design und Klang nach deinem Geschmack.' },
  { icon: '⭐', title: 'Premium Material',  desc: 'Hochwertige Materialien und präzise Verarbeitung für Profis und Amateure.' },
  { icon: '🚀', title: 'Express-Lieferung', desc: 'Deine individuelle Pfeifn in wenigen Werktagen bei dir – weltweit.' },
];

export const testimonials = [
  { name: 'Thomas K.',  role: 'FIFA-Schiedsrichter',         rating: 5, text: 'Die beste Pfeife, die ich je hatte. Der Klang ist unglaublich klar – selbst in vollen Stadien.' },
  { name: 'Sandra M.',  role: 'Bundesliga-Schiedsrichterin', rating: 5, text: 'Der 3D-Konfigurator ist genial. Meine individuelle Pfeifn war in 3 Tagen geliefert.' },
  { name: 'Marco R.',   role: 'Amateurfußball',              rating: 5, text: 'Endlich eine Pfeife, die zu mir passt. Pfeifn – für immer!' },
  { name: 'Lisa W.',    role: 'Basketball-Schiedsrichterin', rating: 5, text: 'Professionell, schön gestaltet und laut. Genau das, was ich gesucht habe.' },
];

export const galleryItems = [
  { emoji: '🎯', label: 'Classic Schwarz',     category: 'Pfeifn'        },
  { emoji: '🔴', label: 'Pro Rot',             category: 'Pfeifn'        },
  { emoji: '🔵', label: 'Elite Blau',          category: 'Pfeifn'        },
  { emoji: '🟡', label: 'Sport Gelb',          category: 'Pfeifn'        },
  { emoji: '🏟️', label: 'Allianz Arena',       category: 'Stadien'       },
  { emoji: '🏟️', label: 'Signal Iduna Park',   category: 'Stadien'       },
  { emoji: '👨‍⚖️', label: 'Bundesliga-Einsatz', category: 'Schiedsrichter'},
  { emoji: '👩‍⚖️', label: 'Champions League',  category: 'Schiedsrichter'},
  { emoji: '⚽', label: 'Elfmeter-Entscheid',  category: 'Sportmomente'  },
  { emoji: '🏀', label: 'Basketball Finale',   category: 'Sportmomente'  },
  { emoji: '🌿', label: 'Carbon Elite',        category: 'Pfeifn'        },
  { emoji: '🏆', label: 'WM-Finale',           category: 'Sportmomente'  },
];
