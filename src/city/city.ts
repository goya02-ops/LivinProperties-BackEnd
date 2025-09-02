import { Entity, PrimaryKey, Property } from "@mikro-orm/core";

@Entity()
export class City {
    @PrimaryKey()
    postalCode!: number;

    @Property()
    name!: string;
}