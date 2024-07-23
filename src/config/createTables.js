import { db } from "./db.js"

db.exec(`
   create table administrador (
      cpf varchar(11) not null,
      nome varchar(50) not null,
      nome_usuario varchar(30) not null,
      senha varchar(20) not null,

      primary key (CPF)
   );

   create table endereco_veterinario (
      id_endereco varchar(12) not null,
      cidade varcahr(40) not null,
      bairro varchar(30) not null,
      rua varchar(30) not null,

      primary key (id_endereco)
   );

   create table veterinario (
      codigo_veterinario varchar(12) not null,
      CPF varchar(11) not null,
      nome varchar(40) not null,
      id_endereco varchar(12) not null,
      
      primary key (codigo_veterinario),
      constraint FK_veterinarioEndereco foreign key (id_endereco) references endereco_veterinario (id_endereco)
   );

   create table telefones_veterinario (
      id_veterinario varchar(12) not null,
      numero varchar(11) not null,

      primary key (id_veterinario, numero),
      constraint FK_VeterinarioTelefone foreign key (id_veterinario) references veterinario (codigo_veterinario)
   );

   create table endereco_responsavel (
      id_endereco varchar(12) not null,
      cidade varchar(40) not null,
      bairro varchar(30) not null,
      rua varchar(30) not null,

      primary key (id_endereco)
   );

   create table responsavel (
      CPF varchar(11) not null, 
      nome varchar(40) not null,
      id_endereco varchar(12) not null,

      primary key (CPF),
      constraint FK_ResponsavelEndereco foreign key (id_endereco) references endereco_responsavel (id_endereco)
   );

   create table telefones_responsavel (
      CPF_responsavel varchar(11) not null,
      numero varchar(11) not null,

      primary key (CPF_responsavel, numero),
      constraint FK_ResponsavelTelefone foreign key (CPF_responsavel) references responsavel (CPF)
   );

   create table tipo_pet (
      id_tipo varchar(12) not null,
      tipo varchar(25) not null,
      raca varchar(25) not null,

      primary key (id_tipo)
   );

   create table pet (
      codigo_pet varchar(12) not null,
      nome varchar(40) not null,
      idade smallint not null, 
      situacao text not null,
      id_tipo varchar(12) not null,
      cpf_responsavel varchar(11) not null,

      primary key (codigo_pet),
      constraint FK_PetTipo foreign key (id_tipo) references tipo_pet (id_tipo),
      constraint FK_PetResponsavel foreign key (cpf_responsavel) references responsavel (CPF),
      constraint LimitAge check (idade >= 0 and idade <= 100)
   );

   create table consulta (
      id_consulta varchar(12) not null,
      nome varchar(40) not null,
      descricao varchar(40),
      data_criado date default (date('now')),
      horario_criado time default (time('now')),
      data date not null,
      horario time not null,
      id_pet varchar(12) not null,
      id_responsavel varchar(12) not null,
      id_veterinario varchar(12) not null,

      primary key (id_consulta),
      constraint FK_ConsultaPet foreign key (id_pet) references pet (codigo_pet),
      constraint FK_ConsultaResponsavel foreign key (id_responsavel) references responsavel (CPF),
      constraint FK_ConsultaVeterinario foreign key (id_veterinario) references veterinario (codigo_veterinario)
   )
`)