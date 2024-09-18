import axios from "axios";
import { weatherKey } from "../../constain/fontFamilies";
import {debounce} from 'lodash'
const forecaseEndpoint = params => `http://api.weatherapi.com/v1/forecast.json?key=${weatherKey}&q=${params.cityName}&days=${params.days}&aqi=no&alerts=no`
const locationsEndpoint =  params => `http://api.weatherapi.com/v1/search.json?key=${weatherKey}&q=${params.cityName}`;

const weather = async (endpoint) =>{
  const options = {
    method: 'GET',
    url: endpoint
  }
  try {
    const response = await axios.request(options);
    return response.data
  } catch (error) {
    console.log('weather error: ', error);
    return null
    
  }
}

export const fetchWeatherForecast = params =>{
  return weather(forecaseEndpoint(params))
}

export const fetchWeatherLocaitions = params =>{
  return weather(locationsEndpoint(params))
}