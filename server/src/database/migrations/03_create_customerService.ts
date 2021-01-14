import Knex from 'knex';

export async function up(knex: Knex){
  return knex.schema.createTable('customerService', //TABELA DE ATENDIMENTOS
  table =>{ 
    table.increments('idCustomerService').primary();
    table.uuid('idCliente').notNullable().references('idUser').inTable('users');
    table.dateTime('createAt', { precision: 6 }).defaultTo(knex.fn.now(6))
    table.dateTime('finishIn')
  });
}

export async function down(knex: Knex){
  return knex.schema.dropTable('customerService');
}