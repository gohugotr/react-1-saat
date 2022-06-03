import { useEffect, useState } from 'react'
import './App.css'
import MovieCard from './MovieCard'
import SearchIcon from './search.svg'

const App = () => {
  //https://www.youtube.com/watch?v=b9eMGE7QtTk&list=PL6QREj8te1P6wX9m5KnicnDVEucbOPsqR&index=6
  // https://gist.github.com/adrianhajdin/997a8cdf94234e889fa47be89a4759f1?short_path=65f6eb8
  const [movie, setMovie] = useState([])
  const [arananFilm, setArananFilm] = useState('')

  const searchMovies = async (title) => {
    const response = await fetch(`${API_KEY}&s=${title}`)

    const data = await response.json()

    setMovie(data.Search)
    console.log(data.Search)
  }

  useEffect(() => {
    // ilk seferde çalışmasını sağlıyoruz
    // React 18'de iki kez çalışmasını engellemek için 
    // index.jsx içinde katı modu  (<React.StrictMode>) kaldırdık. Zaten üretim modunda doğru çalışıyormuş.
    searchMovies('Batman');
  }, [])

  // http://www.omdbapi.com/?i=tt3896198&apikey=87ae7e99
  const API_KEY = 'http://www.omdbapi.com?apikey=87ae7e99'

  return (
    <div className='app'>
      <h1>Film Havuzu</h1>
      <div className='search'>
        <input
          type='text'
          value={arananFilm}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              searchMovies(arananFilm)
            }
          }}
          onChange={(e) => {
            setArananFilm(e.target.value)
          }}
          placeholder='Film ara ...'
        />
        <img
          src={SearchIcon}
          onClick={(e) => {
            searchMovies(arananFilm)
          }}
          alt='Ara'
        />
      </div>
      <div className='container'>
        {movie?.length > 0 ? (
          movie.map((film, index) => {
            return <MovieCard key={index} movie={film} />
          })
        ) : (
          <div className='empty'>
            <h2>Veri bulunamadı</h2>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
