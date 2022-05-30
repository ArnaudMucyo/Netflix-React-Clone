
import './App.css';
import Home from "./Home/Home";
import Row from "./components/Rows/Row";
import Requests from "./service/Requests";

function App() {
  return (
    <div className="App">
    <Home/>
      <Row title="Netflix Originals" isLargeRow fetchUrl={Requests.fetchNetflixOriginals}/>
      <Row title="Trending Now" fetchUrl={Requests.fetchTrending}/>
      <Row title="Top Rated" fetchUrl={Requests.fetchTopRated}/>
      <Row title="Action Movies" fetchUrl={Requests.fetchActionMovies}/>
      <Row title="Horror Movies" fetchUrl={Requests.fetchHorrorMovies}/>
      <Row title="Romance Movies" fetchUrl={Requests.fetchRomanceMovies}/>
      <Row title="Documentaries" fetchUrl={Requests.fetchDocumentaries}/>
    </div>
  );
}

export default App;
