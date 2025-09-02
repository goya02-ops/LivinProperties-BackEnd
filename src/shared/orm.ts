import { MikroORM } from "@mikro-orm/mysql";
import { SqlHighlighter } from "@mikro-orm/sql-highlighter";
import { City } from '../city/city.entity.js'; 

export const orm = await MikroORM.init({
  entities: [City], // ⬅️  ¡Aquí es donde pasas la entidad!
  entitiesTs: [City], // ⬅️  Repite para el entorno de desarrollo con TypeScript
  dbName: "inmobiliarialvp",
  clientUrl: "mysql://lvp:AgusLuchoRamaSantiTomi12345@localhost:3306/inmobiliarialvp",
  highlighter: new SqlHighlighter(),
  debug: true,
  schemaGenerator: {
    disableForeignKeys: true,
    createForeignKeyConstraints: true,
    ignoreSchema: [],
  },
});

export const syncSchema = async () => {
  const generator = orm.getSchemaGenerator();
  /*
  await generator.dropSchema();
  await generator.createSchema();
  */ 
  await generator.updateSchema();
};