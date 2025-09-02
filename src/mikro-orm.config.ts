import { defineConfig } from '@mikro-orm/mysql';
import { City } from './city/city';

export default defineConfig({
  entities: [City],
  dbName: 'tu_base_de_datos',
  user: 'tu_usuario',
  password: 'tu_contraseña',
  host: 'localhost',
  port: 3306,
  debug: true,
});
