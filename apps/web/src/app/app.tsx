import React from 'react';

export function App() {
  const [data, setData] = React.useState('');
  React.useEffect(() => {
    // Skip fetch during testing
    if (process.env.NODE_ENV === 'test') return;

    fetch('http://localhost:4201/api')
      .then(response => response.text())
      .then(data => setData(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div>
      <h1 className='text-red-500'>Hello World</h1>
      <p>{data}</p>
    </div>
  );
}

export default App;
