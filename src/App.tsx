import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  const content = (
    <>
      <Header />
      <main className='main'>
        <p>main</p>
      </main>
      <Footer />
    </>
  );

  return content;
}

export default App;
