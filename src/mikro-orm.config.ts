import { defineConfig } from '@mikro-orm/mysql';
import { City } from './city/city.entity';
import { Neighborhood } from './neighborhood/neighborhood.entity';

export default defineConfig({
  entities: [City, Neighborhood],
  dbName: 'inmobiliarialvp',
  user: 'lvp',
  password: 'AgusLuchoRamaSantiTomi12345',
  host: 'localhost',
  port: 3306,
  debug: true,
});
