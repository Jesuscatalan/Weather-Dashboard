import { Router } from 'express';
const router = Router();
import HistoryService from '../../service/historyservice.js';
import WeatherService from '../../service/weatherService.js';

// import HistoryService from '../../service/historyService.js';
// import WeatherService from '../../service/weatherService.js';

// TODO: POST Request with city name to retrieve weather data
router.post('/', async (req: Request, res: Response) => {
  try { const city = req.body.cityName;
    if (!city) {
      return res.status(400).json({ error: 'city name is required: ${city}'});
    }
    const weatherData = await WeatherService.getWeatherForCity(city);
  
  // TODO: save city to search history
  const existingCity = await HistoryService.getCities().then((cities) =>
    cities.find((existingCity: { name: string }) => existingCity.name === city)
  );
  if (!existingCity) {
    await HistoryService.addCity(city);
    console.log(`City "${city}" added to search history`);
  } else {
    console.log(`City "${city}" already exists in search history`);
  } return res.status(200).json(weatherData);
} catch (error) {
  console.error(error); return res.status(500).json({ message:'failed to get weather data'});
}
});

// TODO: GET search history
router.get('/history', async (_req: Request, res: Response) => {
  try {
    const cities = await HistoryService.getCities();
    res.json(cities);
  } catch (error) {
    console.error(error);
    res.status(500).json({message:'failed to get search history'});
  }
});


