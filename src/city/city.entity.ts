import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { BaseEntity } from '../shared/baseEntity.js'; //BaseEntity fuerza a crear un campo "ID", que esta clase no necesita, pues su PK es postalCode

@Entity()
export class City {
    @PrimaryKey( {autoincrement: false })
    postalCode!: number;

    @Property()
    name!: string;
}