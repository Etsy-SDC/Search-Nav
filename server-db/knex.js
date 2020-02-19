var faker = require('faker');
require('dotenv').config();

var pg = require('knex')({
    client: 'pg',
    connection: 'postgres://sagerwilliams:password@localhost:5432/sagerwilliams'
})

pg.schema
    .dropTable('products')
    .createTable('products', (table) => {
        table
            .increments('id')
            .unsigned()
            .primary()
        table
            .string('title')
            .notNullable()
        table
            .string('category')
            .notNullable()
        table
            .integer('popularity')
            .notNullable()
    })
    .then(() => {
        return;
    })

async function seed(pg) {
    var data = [];
    
    for (let i = 0; i < 1000; i++) {
        for (let j = 0; j < 10000; j++) {
            data.push({
                title: faker.commerce.productName(),
                category: faker.commerce.department(),
                popularity: Math.floor(Math.random() * 1000)
            });
        }
        await pg('products')
            .insert(data)
        setTimeout(() => {data = []}, 0);
    }
    console.log('Seeded Database.');
}

seed(pg);
