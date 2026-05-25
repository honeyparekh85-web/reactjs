import axios from 'axios';

const BASE_URL = import.meta.env.VITE_JSON_SERVER_URL || 'http://localhost:4000';

export const fetchCountryByName = async (name) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/countries`, {
      params: { name },
    });
    if (data && data.length > 0) {
      return data[0];
    }
    return null;
  } catch (error) {
    console.error('Error fetching country data:', error);
    return null;
  }
};

export const fetchCountriesByRegion = async (region) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/countries`, {
      params: { region },
    });
    return data.slice(0, 8).map((c) => ({
      name: c.name,
      flag: c.flag,
      capital: c.capital || 'N/A',
      region: c.region,
      population: c.population,
    }));
  } catch (error) {
    console.error('Error fetching region countries:', error);
    return [];
  }
};
