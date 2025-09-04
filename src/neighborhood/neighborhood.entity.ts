import { Entity, PrimaryKey, Property, ManyToOne } from '@mikro-orm/core';
import { City } from '../city/city.entity.js';

@Entity()
export class Neighborhood {

  @PrimaryKey()
  name!: string;   // PK parte 1

  @ManyToOne(() => City, { primary: true }) 
  city!: City;     // PK parte 2 y además FK a City

}
