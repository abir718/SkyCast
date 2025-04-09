import { useEffect, useState } from 'react'
import './App.css'
import { IoSearch } from "react-icons/io5";
import { WiHumidity } from "react-icons/wi";
import { FaThermometerEmpty } from "react-icons/fa";
import { FaFire } from "react-icons/fa";

function App() {
  const [city, setCity] = useState("dhaka");
  const [search, setSearch] = useState("");
  const [cityData, setCityData] = useState(null);
  const [pic, setPic] = useState([]);
  const [error, setError] = useState("");

  const API_KEY = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`)
      .then(res => res.json())
      .then(data => {
        if (data.cod === "404") {
          setError("City not found. Please check the name and try again.");
          setCityData(null);
        } else {
          setCityData(data);
          setError("");
        }
      })
  }, [API_KEY, city]);

  const searchCity = () => {
    if (search.trim() !== "") {
      setCity(search);
    }
  }

  useEffect(() => {
    let condition = cityData?.weather[0]?.main;

    if (condition === 'Clear') {
      setPic('images/sunny.png');
    } else if (condition === 'Haze') {
      setPic('images/haze.png');
    } else if (condition === 'Snow') {
      setPic('images/snow.png');
    } else if (condition === 'Thunderstorm') {
      setPic('images/thunderstorm.png');
    } else if (condition === 'Rain' || condition === 'Drizzle') {
      setPic('images/rain.png');
    } else if (condition === 'Clouds') {
      setPic('images/Clouds.png');
    } else if (condition === 'Mist') {
      setPic('images/wind.png');
    } else {
      setPic('images/partly.png');
    }
  }, [cityData]);

  return (
    <div className='flex items-center justify-center'>
      <div className='bg-[#2F3543] flex flex-col items-center text-center justify-center pt-4 w-[350px] rounded-lg text-[rgba(255,255,255,0.8)]'>
        <div className='flex items-center w-fit bg-[rgba(255,255,255,0.3)] rounded-full px-2'>
          <input
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            name='city'
            className='p-2 focus:outline-none'
            type="text"
            placeholder='Search for Cities'
          />
          <button onClick={searchCity} className='cursor-pointer'>
            <IoSearch className='size-6 text-[#D5F0F7]' />
          </button>
        </div>

        {error && <p className="text-red-500 mt-4">{error}</p>}

        {cityData ? (
          <>
            <p className="text-xl font-medium mt-6">{cityData.name}, {cityData.sys.country}</p>
            <p>now</p>
            <img className="py-6" src={pic} alt="weather icon" />
            <h1 className="text-5xl font-medium">{Math.round(cityData.main.temp)}°</h1>
            <p className="text-2xl py-4">{cityData.weather[0].description}</p>
            <div>
              <p className="text-lg">Wind</p>
              <div className="flex items-center gap-3">
                <img className="w-[20px]" src="images/air.png" alt="wind icon" />
                <p>{Math.round(cityData.wind.speed)} m/h</p>
              </div>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <FaFire size="22" />
                <p className="text-lg">Max: {Math.round(cityData.main.temp_max)}°C</p>
              </div>
              <div className="flex items-center gap-2">
                <FaThermometerEmpty size="22" />
                <p className="text-lg">Min: {Math.round(cityData.main.temp_min)}°C</p>
              </div>
              <div className="flex items-center gap-2 col-span-2 justify-center mb-4">
                <WiHumidity size="22" />
                <p className="text-lg">Humidity: {cityData.main.humidity}%</p>
              </div>
            </div>
          </>
        ) : (
          !error && <p className="text-white mt-4">Loading...</p>
        )}
      </div>
    </div>
  )
}

export default App;
