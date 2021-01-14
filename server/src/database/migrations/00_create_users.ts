import Knex from 'knex';

export async function up(knex: Knex){ //TABELA DE USUÁRIOS
  return knex.schema.createTable('users', 
  table =>{
    table.uuid('idUser').primary();
    table.string('name').notNullable();
    table.string('email').notNullable().unique();
    table.string('password').notNullable();
    table.string('typeUser').notNullable().defaultTo('S') //S=solicitante | A=administrador | R=representante
    table.string('active').notNullable().defaultTo('S') //S=sim | N=não
    table.dateTime('createAt', { precision: 6 }).defaultTo(knex.fn.now(6))
  });
}

export async function down(knex: Knex){
  return knex.schema.dropTable('users');
}