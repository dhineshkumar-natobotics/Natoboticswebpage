import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from './shared/router/AppRouter';
import { LoadingScreen } from './shared/ui/LoadingScreen/LoadingScreen';
import { ContactWidget } from './shared/ui/ContactWidget/ContactWidget';
import './shared/styles/globals.css';

function App() {
  return (
    <BrowserRouter>
      <LoadingScreen />
      <ContactWidget />
      <AppRouter />
    </BrowserRouter>
  );
}

export default App;
