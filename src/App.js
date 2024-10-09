import './App.css';
import { useEffect } from 'react';
import useTelegram from './hooks/useTelegram';
import ProductList from './components/ProductList/ProductList';

function App() {
  const { tg } = useTelegram();

  useEffect(() => {
    tg.ready();
  }, [])

  return (
    <div className="App">
      <ProductList />
    </div>
  );
}

export default App;
