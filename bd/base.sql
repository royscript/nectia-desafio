/*==============================================================*/
/* DBMS name:      MySQL 5.0                                    */
/* Created on:     18/06/2022 16:15:38                          */
/*==============================================================*/


drop table if exists estadosolicitud;

drop table if exists negociacionsolicitud;

drop table if exists perfilusuario;

drop table if exists permiso;

drop table if exists permisosdelusuario;

drop table if exists solicitud;

drop table if exists tiposolicitud;

drop table if exists usuario;

/*==============================================================*/
/* Table: estadosolicitud                                       */
/*==============================================================*/
create table estadosolicitud
(
   idestadosolicitud    int not null auto_increment,
   nombreestadosolicitud varchar(50),
   primary key (idestadosolicitud)
);

/*==============================================================*/
/* Table: negociacionsolicitud                                  */
/*==============================================================*/
create table negociacionsolicitud
(
   idnegociacionsolicitud int not null auto_increment,
   idsolicitud          int,
   comentariosolicitantenegociacionsolicitud longtext,
   comentariorespuestanegociacionsolicitud longtext,
   fechainiciopropuestanegociacionsolicitud date,
   fechafinalpropuestanegociacionsolicitud date,
   fechainiciocorregidanegociacionsolicitud date,
   fechafinalcorregidanegociacionsolicitud date,
   primary key (idnegociacionsolicitud)
);

/*==============================================================*/
/* Table: perfilusuario                                         */
/*==============================================================*/
create table perfilusuario
(
   idperfilusuario      int not null auto_increment,
   nombreperfilusuario  varchar(45),
   primary key (idperfilusuario)
);

/*==============================================================*/
/* Table: permiso                                               */
/*==============================================================*/
create table permiso
(
   idpermiso            int not null auto_increment,
   nombrepermiso        varchar(200),
   primary key (idpermiso)
);

/*==============================================================*/
/* Table: permisosdelusuario                                    */
/*==============================================================*/
create table permisosdelusuario
(
   idpermisosdelusuario int not null auto_increment,
   idperfilusuario      int,
   idpermiso            int,
   primary key (idpermisosdelusuario)
);

/*==============================================================*/
/* Table: solicitud                                             */
/*==============================================================*/
create table solicitud
(
   idsolicitud          int not null auto_increment,
   idtiposolicitud      int,
   idusuario            int,
   usu_idusuario        int,
   idestadosolicitud    int,
   fechasolicitud       datetime,
   fecharespuesta       datetime,
   fechainiciosolicitud date,
   fechafinalsolicitud  date,
   primary key (idsolicitud)
);

/*==============================================================*/
/* Table: tiposolicitud                                         */
/*==============================================================*/
create table tiposolicitud
(
   idtiposolicitud      int not null auto_increment,
   nombretiposolicitud  varchar(100),
   primary key (idtiposolicitud)
);

/*==============================================================*/
/* Table: usuario                                               */
/*==============================================================*/
create table usuario
(
   idusuario            int not null auto_increment,
   idperfilusuario      int,
   nombreusuario        varchar(50),
   apellidousuario      varchar(50),
   emailusuario         varchar(50),
   rutusuario           varchar(50),
   contrasenausuario    varchar(50),
   primary key (idusuario)
);

alter table negociacionsolicitud add constraint fk_relationship_8 foreign key (idsolicitud)
      references solicitud (idsolicitud) on delete restrict on update restrict;

alter table permisosdelusuario add constraint fk_mantenedores_del_perfil foreign key (idperfilusuario)
      references perfilusuario (idperfilusuario) on delete restrict on update restrict;

alter table permisosdelusuario add constraint fk_mantenedores_permisos foreign key (idpermiso)
      references permiso (idpermiso) on delete restrict on update restrict;

alter table solicitud add constraint fk_administrador foreign key (idusuario)
      references usuario (idusuario) on delete restrict on update restrict;

alter table solicitud add constraint fk_estado_de_la_solicitud foreign key (idestadosolicitud)
      references estadosolicitud (idestadosolicitud) on delete restrict on update restrict;

alter table solicitud add constraint fk_solicitante foreign key (usu_idusuario)
      references usuario (idusuario) on delete restrict on update restrict;

alter table solicitud add constraint fk_solicitud_tiposolicitud foreign key (idtiposolicitud)
      references tiposolicitud (idtiposolicitud) on delete restrict on update restrict;

alter table usuario add constraint fk_perfildelusuario foreign key (idperfilusuario)
      references perfilusuario (idperfilusuario) on delete restrict on update restrict;

