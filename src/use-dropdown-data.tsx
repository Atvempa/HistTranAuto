import { useState, useEffect } from 'react';
import { fetchGoogleSheetData } from './utility-functions';

export const useDropdownData = () => {
  const [degreeLevels, setDegreeLevels] = useState<string[]>([]);
  const [degreeMap, setDegreeMap] = useState<Record<string, string>>({});
  const [majors, setMajors] = useState<string[]>([]);
  const [options, setOptions] = useState<string[]>([]);
  const [honorsList, setHonorsList] = useState<string[]>([]);

  useEffect(() => {
    const fetchDropdownData = async () => {
      const [
        fetchedDegreeLevels, 
        fetchedDegreeMap,
        fetchedMajors, 
        fetchedOptions, 
        fetchedHonors
      ] = await Promise.all([
        fetchGoogleSheetData('A1:A'),
        fetchGoogleSheetData('A:B', true),
        fetchGoogleSheetData('C1:C'),
        fetchGoogleSheetData('D1:D'),
        fetchGoogleSheetData('E1:E')
      ]);

      setDegreeLevels(fetchedDegreeLevels);
      setDegreeMap(fetchedDegreeMap);
      setMajors(fetchedMajors);
      setOptions(fetchedOptions);
      setHonorsList(fetchedHonors);
    };

    fetchDropdownData();
  }, []);

  return {
    degreeLevels,
    degreeMap,
    majors,
    options,
    honorsList
  };
};