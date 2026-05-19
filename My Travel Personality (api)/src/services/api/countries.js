import axios from 'axios';

const BASE_URL = 'https://restcountries.com/v3.1';

export const fetchCountryByName = async (name) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/name/${encodeURIComponent(name)}?fullText=true`);
    if (data && data.length > 0) {
      const c = data[0];
      return {
        name: c.name.common,
        officialName: c.name.official,
        flag: c.flags?.svg || c.flags?.png,
        flagAlt: c.flags?.alt,
        capital: c.capital?.[0] || 'N/A',
        region: c.region,
        subregion: c.subregion,
        population: c.population,
        languages: c.languages ? Object.values(c.languages) : [],
        currencies: c.currencies
          ? Object.values(c.currencies).map((cur) => `${cur.name} (${cur.symbol})`)
          : [],
        timezones: c.timezones,
        latlng: c.latlng,
        area: c.area,
        maps: c.maps?.googleMaps,
        coatOfArms: c.coatOfArms?.svg,
        borders: c.borders || [],
      };
    }
    return null;
  } catch (error) {
    console.error('Error fetching country data:', error);
    return null;
  }
};

export const fetchCountriesByRegion = async (region) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/region/${region}`);
    return data.slice(0, 8).map((c) => ({
      name: c.name.common,
      flag: c.flags?.svg || c.flags?.png,
      capital: c.capital?.[0] || 'N/A',
      region: c.region,
      population: c.population,
    }));
  } catch (error) {
    console.error('Error fetching region countries:', error);
    return [];
  }
};
