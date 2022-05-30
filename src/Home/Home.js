import React, {useEffect, useState} from "react";
import './Home.css'
import Navbar from "../components/Navbar/Navbar";
import Requests from "../service/Requests";
import instance from "../service/Axios";

const Home = (props) => {

    const [randomMovie,setRandomMovie] = useState([]);

    useEffect(() => {
        async function fetchData(){
           const request = await instance.get(Requests.fetchNetflixOriginals)
            setRandomMovie(request.data.results[Math.floor(Math.random() * request.data.results.length - 1)]);
        }
        fetchData();
    },[])

    console.log(randomMovie);

    const truncate = (str, n) => {
        return str?.length > n ? str.substr(0, n-1) + "..." : str;
    }

    return(
        <div className="home">
            <Navbar/>
          <div className="banner"
               style={{
                   width:"100%",
              backgroundSize:"cover", backgroundImage:`url("https://image.tmdb.org/t/p/original/${randomMovie?.backdrop_path}")`,
                   backgroundPosition: "center"
          }}>

              <div className="banner__contents">
                  <h1 className="banner__title">{randomMovie?.title || randomMovie?.name || randomMovie?.original_name}</h1>
                  <div className="banner__buttons">
                      <button className="banner__button">Play</button>
                      <button className="banner__button">My List</button>
                  </div>
                  <h1 className="banner__description">{truncate(randomMovie?.overview,150)}</h1>

              </div>

          </div>
            <div className="banner__fadeBottom"/>
        </div>
    )
}

export default Home;