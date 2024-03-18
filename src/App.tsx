import Layout from './components/Layout';
import Home from './components/Home';
import About from './components/About';
import Login from './components/Login';
import Shop from './components/Shop';
import Account from './components/Account';
import { Routes, Route, Navigate } from 'react-router-dom';

function App() {
  const content = (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="login" element={<Login />} />
        <Route path="shop" element={<Shop />} />
        <Route path="account" element={<Account />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );

  return content;
}

export default App;
