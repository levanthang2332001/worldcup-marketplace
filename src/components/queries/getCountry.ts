import data from '@/data/data.json';

export const getDataCountry = (country: number) => {
  const countryData = data.find((item) => item.id === country);
  return {
    country: countryData?.country,
    rarity: countryData?.rarity,
  };
};
