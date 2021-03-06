import React, {useState,useEffect} from 'react';
import instance from "../../service/Axios";
import './Row.css'
import YouTube from "react-youtube";
import movieTrailer from 'movie-trailer';


const Row = (props) => {

    const base_url = "https://image.tmdb.org/t/p/original/"

    const [movies,setMovies] = useState([]);
    const [trailerUrl,setTrailerUrl] = useState("");

    useEffect(() => {
        async function fetchData(){

            const request = await instance.get(props.fetchUrl);
            setMovies(request.data.results);
            // console.log(request.data.results);
            return request;
        }
        fetchData();
        // if [] , run once when the rows load and don't run it again
    },[props.fetchUrl])

    const opts = {
        height:"400",
        width:"100%",
        playerVars:{
            // https://developers.google.com/youtube/player_parameters,
            autoplay:1
        }
    }

    const showTrailer = (movie) => {
        if(trailerUrl){
            setTrailerUrl("");
        }
        else{
                movieTrailer(movie?.name || "")
                    .then((url) => {
                        const urlParams = new URLSearchParams(new URL (url).search);
                        setTrailerUrl(urlParams.get('v'));
                    })
                    .catch((error) => console.log(error));
        }
    }

    return(
        <div className="row">
            <h2 className="title">{props.title}</h2>
            <div className="row__posters">
                {movies.map(movie => (
                 <img key={movie.id}
                      onClick={() => showTrailer(movie)}
                      className={`row__poster ${props.isLargeRow && "row__posterLarge"}`}
                      src={`${base_url}${props.isLargeRow ? movie.poster_path : movie.backdrop_path}`}
                      alt={movie.name}/>
                ))}
            </div>
            {trailerUrl && <YouTube videoId={trailerUrl} opts={opts}/>}
        </div>
    )
}

export default Row;