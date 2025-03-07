// Utility Functions

// Function to fetch data from Google Sheets
export const fetchGoogleSheetData = async (columnName: string, isKeyValuePair: boolean = false) => {
    try {
      const response = await fetch(
        `https://docs.google.com/spreadsheets/d/1P7D-POSEWe88C6_hDXiiHFIyiN-XuHYTSY1KvQ5joCU/gviz/tq?tqx=out:json&headers=1&range=${columnName}`
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const text = await response.text();
      
      // Extract JSON from the response text
      const jsonMatch = text.match(/google\.visualization\.Query\.setResponse\((.*)\);/s);
      
      if (!jsonMatch) {
        throw new Error('Unable to extract JSON from response');
      }
      
      const jsonText = jsonMatch[1];
      const data = JSON.parse(jsonText);
      
      // Check if rows exist
      if (!data.table || !data.table.rows) {
        throw new Error('No rows found in the data');
      }
      
      const rows = data.table.rows;
      
      // If it's a key-value pair (for degreeMap)
      if (isKeyValuePair) {
        return rows.reduce((acc: Record<string, string>, row: any) => {
          // Safely access row values, accounting for potential null/undefined
          const key = row.c[0]?.v;
          const value = row.c[1]?.v;
          
          if (key && value) {
            acc[key] = value;
          }
          return acc;
        }, {});
      }
      
      // Extract values from the first column
      return rows
        .map((row: any) => row.c[0]?.v)
        .filter((value: any) => value !== null && value !== undefined);
    } catch (error) {
      console.error('Detailed error fetching data:', error);
      return isKeyValuePair ? {} : [];
    }
  };
  
  // Get term code based on input digit and year
  export const getTermCode = (
    digit: string, 
    year: string, 
    inputType: 'digit' | 'month' | 'season' = 'digit'
  ): string => {
    if (!digit || !year) return '';
    
    const yearNum = parseInt(year);
    const digitNum = parseInt(digit);
    
    // Only increment year for digit input type
    if (inputType === 'digit') {
      // Original behavior with year incrementing
      if (digitNum === 1) {
        // Fall
        return `FA${year}`;
      } else if (digitNum === 2) {
        // Spring
        return `SP${yearNum + 1}`;
      } else if (digitNum === 3) {
        // Winter
        return `WI${yearNum + 1}`;
      } else {
        // Summer & other values
        return `SU${yearNum + 1}`;
      }
    } else {
      // For month and season selections, don't increment the year
      if (digitNum === 1) {
        // Fall
        return `FA${year}`;
      } else if (digitNum === 2) {
        // Spring
        return `SP${year}`;
      } else if (digitNum === 3) {
        // Winter
        return `WI${year}`;
      } else {
        // Summer & other values
        return `SU${year}`;
      }
    }
  };