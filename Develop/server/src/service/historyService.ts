// TODO: Define a City class with name and id properties
import fs from 'node:fs/promises';
import {v4 as uuidv4} from 'uuid';

class City {
  name: string;
  id: string;
  constructor(name: string, id: string) {
    this.name = name;
    this.id = id;
  }
}
// TODO: Complete the HistoryService class
class HistoryService {
 // TODO: Define a read method that reads from the searchHistory.json file
  // private async read() {}
  private async read() {
    const filePath = './db/searchHistory.json';
    try{
      const data = await fs.readFile(filePath, 'utf8');
      return JSON.parse(data);
    }
    catch (error) {
      console.error('error/failed reading file:', error);
      return [];
    }
  }
  // TODO: Define a write method that writes the updated cities array to the searchHistory.json file
  // private async write(cities: City[]) {}
  private async write(cities: City[]) {
    const filePath = './db/searchHistory.json';
    try {
      await fs.writeFile(filePath, JSON.stringify(cities, null, 2));
    } catch (error) {
      console.error('Error/failed writing search history', error);
    }
  }
  // TODO: Define a getCities method that reads the cities from the searchHistory.json file and returns them as an array of City objects
  // async getCities() {}
  async getCities() {
    try {
      const cities = await this.read();
      return cities;
    } catch (error) {
      console.error('Error/failed retrieving cities:', error);
      return [];
    }
  }
  // TODO Define an addCity method that adds a city to the searchHistory.json file
  // async addCity(city: string) {}
  async addCity(city: string) {
    try {
      const cities = await this.read();
      const newCity = new City(city, uuidv4());
      cities.push(newCity);
      await this.write(cities);
      return newCity;
    } catch (error) {
      console.error('Error adding city:', error);
      return [];
    }
  }
}
