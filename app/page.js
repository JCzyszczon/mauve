import Title from './components/title';
import About from './components/about';
import News from './components/news';
import Offer from './components/offer';
import ProgressBar from './components/progressbar';
import Navbar from './components/navbar';
import Footer from './components/footer';

export default function Home() {
  return (
    <>
      <Navbar/>
      <main className='w-full h-auto'>
        <ProgressBar/>
        <Title/>
        <News/>
        <Offer/>
        <About/>
      </main>
      <Footer/>
    </>
  )
}