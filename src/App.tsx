import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from './app/AppRouter';
import { LoadingScreen } from './components/ui/LoadingScreen';
import './styles/globals.css';

function App() {
  return (
    <BrowserRouter>
      <LoadingScreen />
      <AppRouter />
    </BrowserRouter>
  );
}

export default App;
