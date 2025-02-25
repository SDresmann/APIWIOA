import { useState } from 'react';
import axios from 'axios';
import logocos from './COS_logo_api.png'

function App() {
  const [location, setLocation] = useState('');
  const [radius, setRadius] = useState('');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    setLoading(true);
    setError(null);

    // Define parameters for the API endpoint
    const userId = 'RZBporBZsoNiB1d';
    const centerType = '0';
    const youthServices = '0';
    const workersServices = '0';
    const businessServices = '0';
    const sortColumns = '0';
    const sortDirections = '0';
    const startRecord = '0';
    const limitRecord = '10';

    // Construct the API URL
    const baseURL = 'https://api.careeronestop.org';
    const endpoint = `/v1/ajcfinder/${userId}/${location}/${radius}/${centerType}/${youthServices}/${workersServices}/${businessServices}/${sortColumns}/${sortDirections}/${startRecord}/${limitRecord}`;
    const url = baseURL + endpoint;

    try {
      const response = await axios.get(url, {
        headers: {
          'Authorization': ` Bearer XDtqepVJfVojZuJ0z9KNiVhaX11dM3PaxfL/eFyP34InADP6U+H7q3hsS6ZwbfQ3RXbXnQibj1EsBX6fcwccrQ==`,
          'Accept': 'application/json'
        }
      });
      console.log('Raw JSON:', response.data);
      setData(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Render centers based on the fields we need.
  // Here, we assume that the response is an array of center objects. 
  // If your response wraps the centers in an object property, update accordingly.
  const renderCenters = () => {
    // Adjust the property name if needed; here we assume the centers are returned as an array.
    const centers = data.OneStopCenterList || (Array.isArray(data) ? data : []);

    if (centers.length === 0) {
      return <p>No centers found for this search.</p>;
    }

    return centers.map((center, index) => (
      <div key={index} style={{ marginBottom: '20px', padding: '10px', borderBottom: '1px solid #ccc' }}>
        <h3>{center.Name}</h3>
        <p>{center.Address1}</p>
        <p>{center.City}, {center.StateName}</p>
        <p>Distance: {center.Distance}</p>
        <p>
          Website: {center.WebSiteUrl ? (
            <a href={center.WebSiteUrl} target="_blank" rel="noopener noreferrer">
              {center.WebSiteUrl}
            </a>
          ) : 'N/A'}
        </p>
        <p>Phone: {center.Phone || 'N/A'}</p>
      </div>
    ));
  };

  return (
    <div style={{ padding: '20px' }}>
    <img src={logocos}/>
      <h1>API Search</h1>
      <div style={{ marginBottom: '10px' }}>
        <label>
          Location:&nbsp;
          <input 
            type="text" 
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter location"
          />
        </label>
      </div>
      <div style={{ marginBottom: '10px' }}>
        <label>
          Radius:&nbsp;
          <input 
            type="text" 
            value={radius}
            onChange={(e) => setRadius(e.target.value)}
            placeholder="Enter radius"
          />
        </label>
      </div>
      <button onClick={handleSearch}>Search</button>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}

      {data && (
        <div>
          <h2>Results</h2>
          {renderCenters()}
        </div>
      )}
    </div>
  );
}

export default App;
