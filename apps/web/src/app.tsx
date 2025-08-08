import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import NxWelcome from '@/components/nx-welcome';
import { Button } from '@packages/ui/components/button';
import { Card } from '@packages/ui/components/card';
import { Input } from '@packages/ui/components/input';

export function App() {
  const [data, setData] = React.useState('');
  React.useEffect(() => {
    // Remove custom headers to avoid triggering CORS preflight
    fetch('http://localhost:3000/api')
      .then(response => response.text())
      .then(data => setData(data));
  }, []);

  return (
    <div className='p-6'>
      {data}
      <br />
      <NxWelcome title='@nx/web' />
      {/* Shared Components Demo */}
      <div className='mt-8 space-y-6'>
        <h2 className='text-2xl font-bold'>Shared Components Demo</h2>

        <Card className='max-w-md'>
          <h3 className='mb-4 text-lg font-semibold'>Button Examples</h3>
          <div className='space-x-2'>
            <Button>Primary</Button>
            <Button variant='secondary'>Secondary</Button>
            <Button variant='outline'>Outline</Button>
          </div>
        </Card>

        <Card className='max-w-md'>
          <h3 className='mb-4 text-lg font-semibold'>Input Example</h3>
          <Input
            placeholder='Enter your name'
            className='mb-2'
          />
          <Input
            type='email'
            placeholder='Enter your email'
            className='mb-2'
          />
          <Input
            type='password'
            placeholder='Enter your password'
          />
        </Card>
      </div>
      {/* START: routes */}
      {/* These routes and navigation have been generated for you */}
      {/* Feel free to move and update them to fit your needs */}
      <br />
      <hr />
      <br />
      <div role='navigation'>
        <ul>
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to='/page-2'>Page 2</Link>
          </li>
        </ul>
      </div>
      <Routes>
        <Route
          path='/'
          element={
            <div>
              This is the generated root route.{' '}
              <Link to='/page-2'>Click here for page 2.</Link>
            </div>
          }
        />
        <Route
          path='/page-2'
          element={
            <div>
              <Link to='/'>Click here to go back to root page.</Link>
            </div>
          }
        />
      </Routes>
      {/* END: routes */}
    </div>
  );
}

export default App;
