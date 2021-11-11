import { render, screen } from '@testing-library/react';
import App from './App';
import SignIn from '../src/Components/AuthStack/SignIn';
import ReactDOM from 'react-dom';


// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

 // Test page renders without crashing
 test ("renders without crashing", ()=>{
  const div = document.createElement("div");
  ReactDOM.render(<SignIn></SignIn>, div);
  
  // expect(global.window.location.pathname).toEqual('/signIn');
})
