import { personalityMap } from '../services/api/mockData';

const scoreMap = {
  weather: { sunny: ['Sunset Wanderer', 'Golden Soul'], rainy: ['Moonlight Explorer', 'Aurora Seeker'], snowy: ['Aurora Seeker', 'Moonlight Explorer'], tropical: ['Ocean Dreamer', 'Wild Spirit'] },
  landscape: { mountains: ['Wild Spirit', 'Aurora Seeker'], beaches: ['Ocean Dreamer', 'Sunset Wanderer'], forests: ['Moonlight Explorer', 'Wild Spirit'], desert: ['Desert Phoenix', 'Golden Soul'] },
  vibe: { nightlife: ['Neon Nomad', 'Golden Soul'], morning: ['Moonlight Explorer', 'Ocean Dreamer'], both: ['Sunset Wanderer', 'Wild Spirit'], sunset: ['Sunset Wanderer', 'Desert Phoenix'] },
  food: { street: ['Neon Nomad', 'Desert Phoenix'], fine: ['Golden Soul', 'Sunset Wanderer'], cafe: ['Moonlight Explorer', 'Aurora Seeker'], exotic: ['Wild Spirit', 'Desert Phoenix'] },
  aesthetic: { minimal: ['Moonlight Explorer', 'Aurora Seeker'], vintage: ['Golden Soul', 'Sunset Wanderer'], neon: ['Neon Nomad', 'Wild Spirit'], bohemian: ['Desert Phoenix', 'Ocean Dreamer'] },
  budget: { luxury: ['Golden Soul', 'Ocean Dreamer'], mid: ['Sunset Wanderer', 'Neon Nomad'], budget: ['Wild Spirit', 'Desert Phoenix'], mixed: ['Moonlight Explorer', 'Aurora Seeker'] },
  adventure: { extreme: ['Wild Spirit', 'Neon Nomad'], moderate: ['Sunset Wanderer', 'Aurora Seeker'], chill: ['Ocean Dreamer', 'Moonlight Explorer'], cultural: ['Golden Soul', 'Desert Phoenix'] },
  travel_style: { solo: ['Moonlight Explorer', 'Aurora Seeker'], partner: ['Sunset Wanderer', 'Golden Soul'], friends: ['Neon Nomad', 'Wild Spirit'], family: ['Ocean Dreamer', 'Desert Phoenix'] },
  movie_vibe: { romance: ['Sunset Wanderer', 'Golden Soul'], action: ['Wild Spirit', 'Neon Nomad'], indie: ['Moonlight Explorer', 'Aurora Seeker'], mystery: ['Desert Phoenix', 'Ocean Dreamer'] },
  energy: { healing: ['Ocean Dreamer', 'Aurora Seeker'], inspiration: ['Moonlight Explorer', 'Golden Soul'], connection: ['Sunset Wanderer', 'Neon Nomad'], transformation: ['Wild Spirit', 'Desert Phoenix'] },
};

export const generatePersonality = (answers) => {
  const tally = {};
  Object.keys(personalityMap).forEach((p) => { tally[p] = 0; });

  Object.entries(answers).forEach(([questionId, answerValue]) => {
    const mapping = scoreMap[questionId];
    if (mapping && mapping[answerValue]) {
      mapping[answerValue].forEach((personality, i) => {
        tally[personality] += (2 - i); // first match gets 2 pts, second gets 1
      });
    }
  });

  const sorted = Object.entries(tally).sort((a, b) => b[1] - a[1]);
  const topPersonality = sorted[0][0];
  const data = personalityMap[topPersonality];

  return {
    type: topPersonality,
    ...data,
    summary: `You are a ${topPersonality} — ${data.tagline}. Your travel aura glows ${data.aura}, and your dream destination awaits in ${data.country}.`,
  };
};
