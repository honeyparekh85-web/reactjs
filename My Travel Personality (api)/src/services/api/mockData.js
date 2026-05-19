// Quiz Questions
export const quizQuestions = [
  {
    id: 'weather',
    question: 'What weather makes your soul come alive?',
    subtitle: 'Close your eyes and feel it...',
    options: [
      { value: 'sunny', label: '☀️ Golden Sunshine', desc: 'Warm rays on your skin' },
      { value: 'rainy', label: '🌧️ Gentle Rain', desc: 'Cozy and poetic' },
      { value: 'snowy', label: '❄️ Soft Snowfall', desc: 'Quiet winter magic' },
      { value: 'tropical', label: '🌴 Tropical Breeze', desc: 'Humid and lush' },
    ],
  },
  {
    id: 'landscape',
    question: 'Mountains or the ocean?',
    subtitle: 'Where does your heart wander?',
    options: [
      { value: 'mountains', label: '🏔️ Misty Mountains', desc: 'Elevated and serene' },
      { value: 'beaches', label: '🏖️ Turquoise Beaches', desc: 'Salt air and waves' },
      { value: 'forests', label: '🌲 Ancient Forests', desc: 'Deep green and mystical' },
      { value: 'desert', label: '🏜️ Golden Desert', desc: 'Vast and powerful' },
    ],
  },
  {
    id: 'vibe',
    question: 'Nightlife or peaceful mornings?',
    subtitle: 'Your ideal energy...',
    options: [
      { value: 'nightlife', label: '🌃 Neon Nightlife', desc: 'Electric and alive' },
      { value: 'morning', label: '🌅 Peaceful Mornings', desc: 'Golden hour serenity' },
      { value: 'both', label: '✨ A bit of both', desc: 'Balance is everything' },
      { value: 'sunset', label: '🌇 Sunset Chaser', desc: 'Magic hour devotee' },
    ],
  },
  {
    id: 'food',
    question: 'What food style calls to you?',
    subtitle: 'Taste is a journey...',
    options: [
      { value: 'street', label: '🍜 Street Food', desc: 'Authentic and local' },
      { value: 'fine', label: '🍷 Fine Dining', desc: 'Elegant and curated' },
      { value: 'cafe', label: '☕ Café Culture', desc: 'Pastries and lattes' },
      { value: 'exotic', label: '🌶️ Exotic Spices', desc: 'Bold and adventurous' },
    ],
  },
  {
    id: 'aesthetic',
    question: 'Choose your dream aesthetic',
    subtitle: 'Your visual soul...',
    options: [
      { value: 'minimal', label: '🤍 Minimalist', desc: 'Clean lines, pure beauty' },
      { value: 'vintage', label: '📷 Vintage Film', desc: 'Nostalgic warmth' },
      { value: 'neon', label: '💜 Neon Futuristic', desc: 'Cyberpunk dreams' },
      { value: 'bohemian', label: '🌸 Bohemian', desc: 'Free-spirited and wild' },
    ],
  },
  {
    id: 'budget',
    question: 'What\'s your travel budget style?',
    subtitle: 'No judgment, just vibes...',
    options: [
      { value: 'luxury', label: '💎 Luxury', desc: 'Only the finest' },
      { value: 'mid', label: '🎯 Smart Splurge', desc: 'Best value, great taste' },
      { value: 'budget', label: '🎒 Backpacker', desc: 'Experiences over things' },
      { value: 'mixed', label: '⚖️ Flexible', desc: 'Depends on the mood' },
    ],
  },
  {
    id: 'adventure',
    question: 'Your adventure level?',
    subtitle: 'How wild do you go?',
    options: [
      { value: 'extreme', label: '🪂 Adrenaline Rush', desc: 'Skydiving, bungee, diving' },
      { value: 'moderate', label: '🚴 Active Explorer', desc: 'Hiking, cycling, surfing' },
      { value: 'chill', label: '🧘 Zen Wanderer', desc: 'Yoga, spas, slow travel' },
      { value: 'cultural', label: '🏛️ Culture Seeker', desc: 'Museums, history, art' },
    ],
  },
  {
    id: 'travel_style',
    question: 'Solo or with your crew?',
    subtitle: 'The company you keep...',
    options: [
      { value: 'solo', label: '🚶 Solo Soul', desc: 'Freedom and self-discovery' },
      { value: 'partner', label: '💑 Romantic Duo', desc: 'Love in every sunset' },
      { value: 'friends', label: '👯 Squad Goals', desc: 'Memories with your people' },
      { value: 'family', label: '👨‍👩‍👧‍👦 Family Voyage', desc: 'Adventures for all ages' },
    ],
  },
  {
    id: 'movie_vibe',
    question: 'Pick your movie vibe',
    subtitle: 'Your life as a film...',
    options: [
      { value: 'romance', label: '🎬 Dreamy Romance', desc: 'Before Sunrise vibes' },
      { value: 'action', label: '💥 Action Epic', desc: 'Mission Impossible energy' },
      { value: 'indie', label: '🎭 Indie Artfilm', desc: 'Wes Anderson aesthetic' },
      { value: 'mystery', label: '🔮 Mystical Journey', desc: 'Eat Pray Love magic' },
    ],
  },
  {
    id: 'energy',
    question: 'What energy do you crave?',
    subtitle: 'The final piece of your soul map...',
    options: [
      { value: 'healing', label: '💫 Healing & Peace', desc: 'Rest your soul' },
      { value: 'inspiration', label: '🔥 Inspiration', desc: 'Ignite your creativity' },
      { value: 'connection', label: '🤝 Human Connection', desc: 'Meet the world' },
      { value: 'transformation', label: '🦋 Transformation', desc: 'Come back changed' },
    ],
  },
];

// Personality types mapped to countries
export const personalityMap = {
  'Moonlight Explorer': {
    country: 'Japan',
    tagline: 'Dreamy, artistic, and drawn to peaceful coastal cities',
    aura: 'Indigo & Silver',
    emoji: '🌙',
    color: 'from-indigo-500 to-purple-600',
  },
  'Sunset Wanderer': {
    country: 'Greece',
    tagline: 'Romantic, warm-hearted, chasing golden horizons',
    aura: 'Amber & Rose',
    emoji: '🌅',
    color: 'from-orange-400 to-pink-500',
  },
  'Neon Nomad': {
    country: 'South Korea',
    tagline: 'Electric, bold, thriving in vibrant city lights',
    aura: 'Neon Pink & Blue',
    emoji: '💜',
    color: 'from-fuchsia-500 to-cyan-400',
  },
  'Wild Spirit': {
    country: 'New Zealand',
    tagline: 'Fearless, free, at home in untamed nature',
    aura: 'Emerald & Gold',
    emoji: '🌿',
    color: 'from-emerald-500 to-yellow-400',
  },
  'Golden Soul': {
    country: 'Italy',
    tagline: 'Elegant, passionate, savoring every beautiful moment',
    aura: 'Gold & Burgundy',
    emoji: '✨',
    color: 'from-yellow-400 to-red-500',
  },
  'Ocean Dreamer': {
    country: 'Maldives',
    tagline: 'Tranquil, deep, connected to the rhythm of the sea',
    aura: 'Turquoise & Pearl',
    emoji: '🌊',
    color: 'from-cyan-400 to-blue-500',
  },
  'Desert Phoenix': {
    country: 'Morocco',
    tagline: 'Mysterious, resilient, drawn to ancient warmth',
    aura: 'Terracotta & Saffron',
    emoji: '🏜️',
    color: 'from-amber-500 to-orange-600',
  },
  'Aurora Seeker': {
    country: 'Iceland',
    tagline: 'Ethereal, introspective, chasing northern lights',
    aura: 'Mint & Lavender',
    emoji: '🌌',
    color: 'from-teal-400 to-violet-500',
  },
};

// Itinerary data per country
export const itineraryData = {
  Japan: {
    days: [
      { day: 1, title: 'Tokyo Arrival', activities: ['Check into boutique Shinjuku hotel', 'Evening stroll through Shibuya Crossing', 'Dinner at a hidden izakaya in Golden Gai', 'Tokyo Tower night view'] },
      { day: 2, title: 'Cultural Immersion', activities: ['Morning at Senso-ji Temple', 'Explore Akihabara electric town', 'Afternoon tea ceremony in Ueno', 'Harajuku street fashion walk'] },
      { day: 3, title: 'Day Trip to Kamakura', activities: ['Visit the Great Buddha', 'Bamboo grove walk', 'Fresh seafood lunch by the coast', 'Sunset at Enoshima Island'] },
      { day: 4, title: 'Kyoto Dreams', activities: ['Bullet train to Kyoto', 'Fushimi Inari Shrine at dawn', 'Arashiyama Bamboo Forest', 'Geisha district evening walk'] },
      { day: 5, title: 'Final Day Magic', activities: ['Nishiki Market food tour', 'Kinkaku-ji Golden Pavilion', 'Farewell kaiseki dinner', 'Night train back to Tokyo'] },
    ],
    foods: [
      { name: 'Ramen', desc: 'Rich tonkotsu broth with tender pork', vibe: '🍜 Cozy & Warming' },
      { name: 'Sushi Omakase', desc: 'Chef\'s choice at a Tsukiji counter', vibe: '🍣 Elegant & Fresh' },
      { name: 'Matcha Parfait', desc: 'Layered green tea dessert in Uji', vibe: '🍵 Zen & Sweet' },
      { name: 'Wagyu Yakiniku', desc: 'Grilled A5 beef melting on your tongue', vibe: '🥩 Luxurious' },
      { name: 'Taiyaki', desc: 'Fish-shaped pastry filled with red bean', vibe: '🐟 Playful & Warm' },
      { name: 'Okonomiyaki', desc: 'Savory pancake loaded with toppings', vibe: '🥞 Fun & Hearty' },
    ],
    hotels: [
      { name: 'Aman Tokyo', type: 'Luxury', price: '$$$', rating: 4.9 },
      { name: 'Hoshinoya Kyoto', type: 'Boutique Ryokan', price: '$$$', rating: 4.8 },
      { name: 'MUJI Hotel Ginza', type: 'Minimalist', price: '$$', rating: 4.5 },
      { name: 'K5 Tokyo', type: 'Design Hotel', price: '$$', rating: 4.6 },
    ],
    playlist: { name: 'Tokyo Neon Nights', mood: 'Lo-fi beats meets city pop', tracks: 12 },
  },
  Greece: {
    days: [
      { day: 1, title: 'Athens Arrival', activities: ['Visit the Acropolis at golden hour', 'Lunch in Plaka district', 'Explore Monastiraki flea market', 'Rooftop dinner with Parthenon view'] },
      { day: 2, title: 'Island Hopping Begins', activities: ['Ferry to Santorini', 'Blue dome church photoshoot', 'Wine tasting in Pyrgos', 'Oia sunset experience'] },
      { day: 3, title: 'Santorini Dreams', activities: ['Red Beach morning swim', 'Donkey ride to Fira', 'Greek cooking class', 'Caldera sunset sailing'] },
      { day: 4, title: 'Mykonos Energy', activities: ['Ferry to Mykonos', 'Little Venice exploration', 'Beach club afternoon', 'Windmills at sunset'] },
      { day: 5, title: 'Final Greek Magic', activities: ['Delos island history tour', 'Fresh seafood lunch', 'Spa and relaxation', 'Farewell beach bonfire'] },
    ],
    foods: [
      { name: 'Moussaka', desc: 'Layered eggplant and béchamel perfection', vibe: '🍆 Comfort & Home' },
      { name: 'Fresh Souvlaki', desc: 'Grilled meat wrapped in warm pita', vibe: '🥙 Casual & Joyful' },
      { name: 'Baklava', desc: 'Honey-drizzled phyllo layers with nuts', vibe: '🍯 Sweet & Golden' },
      { name: 'Octopus Meze', desc: 'Grilled octopus with olive oil and lemon', vibe: '🐙 Coastal & Fresh' },
      { name: 'Greek Salad', desc: 'Tomato, feta, olives – simple perfection', vibe: '🥗 Pure & Light' },
      { name: 'Loukoumades', desc: 'Honey puffs with cinnamon and walnuts', vibe: '🍩 Heavenly' },
    ],
    hotels: [
      { name: 'Canaves Oia Suites', type: 'Luxury Cave', price: '$$$', rating: 4.9 },
      { name: 'Mystique Santorini', type: 'Boutique', price: '$$$', rating: 4.8 },
      { name: 'Cavo Tagoo Mykonos', type: 'Design Hotel', price: '$$$', rating: 4.7 },
      { name: 'Athens Was Hotel', type: 'Modern Urban', price: '$$', rating: 4.5 },
    ],
    playlist: { name: 'Aegean Golden Hour', mood: 'Mediterranean chill and summer warmth', tracks: 15 },
  },
};

// Fallback itinerary for any country
export const defaultItinerary = {
  days: [
    { day: 1, title: 'Arrival & Explore', activities: ['Check into hotel', 'Walk through the old town', 'Local café for coffee', 'Sunset at a scenic viewpoint'] },
    { day: 2, title: 'Cultural Day', activities: ['Visit top museum', 'Explore a local market', 'Traditional lunch', 'Architectural walking tour'] },
    { day: 3, title: 'Nature & Adventure', activities: ['Morning hike or beach time', 'Scenic photography spots', 'Local food tour', 'Evening live music'] },
  ],
  foods: [
    { name: 'Local Signature Dish', desc: 'The must-try regional specialty', vibe: '🍽️ Authentic' },
    { name: 'Street Food Favorites', desc: 'Grab-and-go local bites', vibe: '🥡 Adventurous' },
    { name: 'Sweet Treats', desc: 'Traditional desserts and pastries', vibe: '🍰 Delightful' },
  ],
  hotels: [
    { name: 'Boutique Retreat', type: 'Boutique', price: '$$', rating: 4.6 },
    { name: 'City Center Hotel', type: 'Modern', price: '$$', rating: 4.4 },
  ],
  playlist: { name: 'Wanderlust Vibes', mood: 'Global chill beats for exploration', tracks: 10 },
};

// Testimonials
export const testimonials = [
  { name: 'Aria Chen', role: 'Digital Nomad', text: 'WanderSoul knew me better than I know myself. Japan was exactly where my soul needed to be.', avatar: '🌸' },
  { name: 'Marcus Rivera', role: 'Travel Photographer', text: 'The mood board feature is incredible. It captured the exact aesthetic I was dreaming of.', avatar: '📷' },
  { name: 'Priya Sharma', role: 'Yoga Instructor', text: 'From quiz to itinerary — every detail felt personally crafted. Truly magical experience.', avatar: '🧘' },
  { name: 'Luca Moretti', role: 'Food Blogger', text: 'The food recommendations were spot on! I discovered dishes I never knew existed.', avatar: '🍝' },
];

// Featured destinations for landing page
export const featuredDestinations = [
  { name: 'Kyoto', country: 'Japan', vibe: 'Zen & Timeless', image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=600&q=80' },
  { name: 'Santorini', country: 'Greece', vibe: 'Golden & Dreamy', image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=600&q=80' },
  { name: 'Bali', country: 'Indonesia', vibe: 'Lush & Spiritual', image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&q=80' },
  { name: 'Marrakech', country: 'Morocco', vibe: 'Spicy & Mystical', image: 'https://images.unsplash.com/photo-1539020140153-e479b8c22e70?w=600&q=80' },
  { name: 'Reykjavik', country: 'Iceland', vibe: 'Ethereal & Wild', image: 'https://images.unsplash.com/photo-1504829857797-ddff29c27927?w=600&q=80' },
  { name: 'Amalfi', country: 'Italy', vibe: 'Elegant & Sunlit', image: 'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?w=600&q=80' },
];
