import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { MainLayout } from './MainLayout';
import { DegreeInformationInput, DegreeOutput } from './DegreeInformation';
import { NoDegreeSection } from './NoDegreeSection';
import { useDropdownData } from './use-dropdown-data';
import About from './about';

function App() {
  const { 
    degreeLevels, 
    degreeMap, 
    majors, 
    options, 
    honorsList 
  } = useDropdownData();

  const [selectedDegree, setSelectedDegree] = useState('');
  const [selectedMajor, setSelectedMajor] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedHonors, setSelectedHonors] = useState('');
  const [awardedDate, setAwardedDate] = useState('');

  const resetForm = () => {
    setSelectedDegree('');
    setSelectedMajor('');
    setSelectedOption('');
    setSelectedHonors('');
    setAwardedDate('');
  };

  const degreeShort = degreeMap[selectedDegree] || "";
  const awardedYear = awardedDate ? awardedDate.split("/").pop() : "";
  const formattedLine = degreeShort && selectedMajor && awardedYear 
    ? `${degreeShort}, ${selectedMajor}, ${awardedYear};` 
    : "";

  // Generate output text
  const outputText = [
    formattedLine,
    selectedDegree,
    [selectedMajor, selectedOption].filter(Boolean).join(', '),
    selectedHonors,
    awardedDate ? awardedDate : ''
  ].filter(Boolean).join('\n');

  return (
    <Router>
      <div>
        <nav className="bg-gray-100 p-4">
          <div className="container mx-auto flex justify-between items-center">
            <Link to="/" className="text-xl font-bold">Degree Formatter</Link>
            <div className="space-x-4">
              <Link to="/" className="hover:text-blue-600">Home</Link>
              <Link to="/about" className="hover:text-blue-600">About</Link>
            </div>
          </div>
        </nav>

        <Routes>
          <Route 
            path="/" 
            element={
              <MainLayout>
                <DegreeInformationInput 
                  degreeLevels={degreeLevels}
                  majors={majors}
                  options={options}
                  honorsList={honorsList}
                  selectedDegree={selectedDegree}
                  selectedMajor={selectedMajor}
                  selectedOption={selectedOption}
                  selectedHonors={selectedHonors}
                  awardedDate={awardedDate}
                  onDegreeChange={setSelectedDegree}
                  onMajorChange={setSelectedMajor}
                  onOptionChange={setSelectedOption}
                  onHonorsChange={setSelectedHonors}
                  onDateChange={setAwardedDate}
                  onReset={resetForm}
                />
                
                <div className="w-full md:w-1/2 p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Generated Output</h2>
                  </div>
                  
                  <DegreeOutput outputText={outputText} />
                  
                  <NoDegreeSection />
                </div>
              </MainLayout>
            } 
          />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;