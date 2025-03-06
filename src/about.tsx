import { Link } from 'react-router-dom';

function About() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-4">About This Application</h1>
        <p className="text-gray-700 mb-4">
          Welcome to the <strong>Historic Transcript Automation</strong> tool! This application streamlines the process of generating formatted transcript entries based on historic student records.
        </p>

        <h2 className="text-xl font-semibold mt-4 mb-2">How It Works</h2>
        <p className="text-gray-700">
          This tool allows users to enter degree details or document cases where no degree was awarded. Users can efficiently generate formatted transcript entries that can be copied for official use.
        </p>

        <h2 className="text-xl font-semibold mt-4 mb-2">Using the Application</h2>

        <h3 className="text-lg font-medium mt-3">1. Entering Degree Information</h3>
        <ul className="list-disc list-inside text-gray-700">
          <li>Select the <strong>Degree Level</strong> (e.g., Bachelor's, Master's, Doctorate).</li>
          <li>Choose a <strong>Major</strong> from the dropdown list.</li>
          <li>Optionally, specify an <strong>Option/Concentration</strong> related to the major.</li>
          <li>Select any applicable <strong>Honors</strong> (e.g., Summa Cum Laude).</li>
          <li>Enter the <strong>Awarded Date</strong> in the format <code>mm/dd/yyyy</code>.</li>
          <li>The system will generate an entry on the right side. Click the <strong>copy</strong> button to copy the text.</li>
        </ul>

        <h3 className="text-lg font-medium mt-3">2. Recording No Degree Awarded</h3>
        <p className="text-gray-700">
          If a student did not receive a degree, follow this format:
        </p>
        <ul className="list-disc list-inside text-gray-700">
          <li>Determine the <strong>first and last semesters attended</strong> using the term numbers.</li>
          <li>Enter only the <strong>first year</strong> of the term and the system will generate the order of the end term for that academic year.</li>
          <li>Use the semester abbreviation:
            <ul className="list-inside ml-4">
              <li>Semester 1: FA = Fall</li>
              <li>Semester 2: SP = Spring</li>
              <li>Semester 3: WI = Winter</li>
              <li>Semester 6/7: SU = Summer</li>
            </ul>
          </li>
          <li>Format example: <code>No Degree Awarded, FA1965 – SP1967</code>.</li>
          <li>Enter the relevant information, then click <strong>"No Degree Awarded"</strong> to generate the transcript entry.</li>
          <li>Copy the output using the provided button.</li>
        </ul>

        <h3 className="text-lg font-medium mt-3">3. Resetting the Form</h3>
        <ul className="list-disc list-inside text-gray-700">
          <li>Use the <strong>Reset Form</strong> button to clear all entered degree data.</li>
          <li>If entering "No Degree," use <strong>Reset No Degree</strong> to reset the term fields.</li>
        </ul>

        <h2 className="text-xl font-semibold mt-4 mb-2">Additional Information</h2>
        <ul className="list-disc list-inside text-gray-700">
          <li>The application automatically formats transcript entries for consistency.</li>
          <li>The search icons in the dropdown fields help users quickly find relevant options.</li>
        </ul>

        <div className="mt-6">
          <Link to="/" className="text-blue-500 hover:underline">Back to Home</Link>
        </div>
      </div>
    </div>
  );
}

export default About;
