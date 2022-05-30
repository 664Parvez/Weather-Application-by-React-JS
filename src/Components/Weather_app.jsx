import React, { useEffect, useState } from "react";

import Cloud from './img/cloud.png'
import Sunny from './img/sunny.png'
import Snow from './img/snow.png'


const WeatherApp = () => {

    // const img = {
    //     c 
    // }

    const [ countryName, setCountryName ] = useState ('London')
    const [ temperature, setTemperature ] = useState ()
    const [ weatherForecast, setWeatherForecast ] = useState ()
    const [ maxTemp, setMaxTemp ] = useState ()
    const [ minTemp, setMinTemp ] = useState ()

    const [ image, setImage ] = useState (Cloud)

    const dynamicCountryName = () => {
        const countryInput = document.getElementById ('country_input').value
        console.log (countryInput)
        setCountryName (countryInput)
    }

    useEffect ( () => {
        fetch (`https://api.openweathermap.org/data/2.5/weather?q=${countryName}&appid=63880b428ea3cf0ab0567ac110d52dc1`)
        .then ( (response) => {
            return response.json()
        } )
        .then ( (data) => {
            console.log (data)

            let Name = data.name
            console.log(Name);

            // Temperature
            let temperature = data.main.temp
            setTemperature(Math.round(temperature - 273.15));

            // Weather Forecast
            let weather_forecast = data.weather[0].main
            setWeatherForecast(weather_forecast);

            // Max-Temperature
            let max_weather = data.main.temp_max
            setMaxTemp(Math.round(max_weather - 273.15))

            // Min - Temperature
            let min_weather = data.main.temp_min
            setMinTemp(Math.round(min_weather - 273.15))
        } )

        // Icon Image Condition
        // Background Image Condition
        if ( weatherForecast === 'Clouds' ) {
            document.body.className = 'cloudy_weather_background'
            setImage (Cloud)

        } else if (weatherForecast === 'Haze' || weatherForecast === 'Clear') {
            document.body.className = 'hot_weather_background'
            setImage (Sunny)
        }

        if ( temperature <= 0 ) {
            document.body.className = 'cold_weather_background'
            setImage (Snow)
        }
    } )

    

    return (
        <>
        <h1 className="text-center m-3">Weather App</h1>
        <div className="container text-center">
            <input type="text" className="form-control" id="country_input" placeholder="Search City Name ......." />
            <button className="btn btn-primary mt-2" onClick={ dynamicCountryName }>Search</button>
        </div>
        <div className="container text-center">
            <h1 id="country_name">{ countryName.toLocaleUpperCase() } </h1>

            <img id="forecast_img" src= { image } alt="" /> 
            {/* <h1>{ image }</h1> */}

            <h1 id="degree"><span id="degree_number">{ `${temperature}` }&deg;</span>C</h1>
            <h2>{ weatherForecast }</h2>
            <div className="container">
                <div className="row text-center mt-3">
                    <div className="col-lg-6 col-md-6 col-sm-12">
                        <h3>Maximum temperature</h3>
                        <h1>{ `${ maxTemp }`}&deg;c</h1>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12">
                        <h3>Minimum Temperature</h3>
                        <h1>{ `${minTemp}`}&deg;c</h1>
                    </div>
                </div>
            </div>
        </div>
            
        </>
    )   
}

export default WeatherApp

// round

// 1699579d78f14d2d8d20718274974ce3

// https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
// https://api.openweathermap.org/data/2.5/weather?q=London&appid={API key}

// weather?q=`${countryName}`&appid=


// kelvin to celcius formula -> 289.98K − 273.15 = 16.83°C

//  temp-max and temp-min