/*==============================================================*/
/* DBMS name:      MySQL 5.0                                    */
/* Created on:     25/06/2022 10:29:11                          */
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





INSERT INTO `tiposolicitud` VALUES (1,'Día administrativo'),(3,'Retiro temprano para buscar hijos al colegio'),(4,'Semana de permiso por fallecimiento de familiar'),(7,'Día libre por cumpleaños'),(8,'Bicicleta para movilización');
INSERT INTO `permiso` VALUES (1,'Usuario'),(2,'Inicio'),(3,'TipoSolicitud'),(4,'MisSolicitudes'),(5,'AdministrarSolicitudes');
INSERT INTO `estadosolicitud` VALUES (1,'APROBADA'),(2,'RECHAZADA'),(3,'EN NEGOCIACIÓN'),(4,'FINALIZADA');
INSERT INTO `perfilusuario` VALUES (1,'Administrador'),(2,'Solicitante');

INSERT INTO `usuario` VALUES (1,1,'Roy Alex','Standen Barraza','roystandenb@gmail.com','16428927-3','164289273'),(5,2,'Amanda','Standen Barraza','asd@gmail.com','8370986-3','123456'),(6,2,'ALEJANDRO ISRAEL','BERR?OS','alejandro.ampuero@institutodetierrasblancas.cl','20.447.454-0','12345'),(7,2,'VALENTINA ESTEFAN?A','G?LVEZ','valentina.alfaro@institutodetierrasblancas.cl','21.288.580-0','12345'),(8,2,'JEREMY PATRICIO','CAMPUSANO','jeremy.gamboa@institutodetierrasblancas.cl','21.889.769-K','12345'),(9,2,'JOSELYN KARINA','HIDALGO','joselyn.hidalgo@institutodetierrasblancas.cl','18.318.260-9','12345'),(10,2,'JASSON YOHAN','CASTILLO','jasson.segovia@institutodetierrasblancas.cl','21.833.392-3','12345'),(11,2,'BYRON ARIEL','ORELLANA','byron.rodriguez@institutodetierrasblancas.cl','20.953.167-4','12345'),(12,2,'FERNANDA LORETO','MARAMBIO','fernanda.lanas@institutodetierrasblancas.cl','21.096.727-3','12345'),(13,2,'SERGIO ANTONIO','ESPINOZA','sergio.huerta@institutodetierrasblancas.cl','18.264.733-0','12345'),(14,2,'TOMAS BENJAM?N','AHUMADA','tomas.gomez@institutodetierrasblancas.cl','21.605.218-8','12345'),(15,2,'LESLIE PATRICIA','ARMIJO','leslie.concha@institutodetierrasblancas.cl','17.092.049-K','12345'),(16,2,'NATALIA BELEN','RIVEROS','natalia.riveros@institutodetierrasblancas.cl','19.506.357-5','12345'),(17,2,'ALEJANDRA','OTALORA','alejandra.jamett@institutodetierrasblancas.cl','22.869.930-6','12345'),(18,2,'MAYKOL ANDRES','SILVA','maykol.gonzalez@institutodetierrasblancas.cl','21.824.100-K','12345'),(19,2,'TRINIDAD BEL?N','COLLAO','trinidad.herrero@institutodetierrasblancas.cl','21.611.194-K','12345'),(20,2,'DHAFNE SELENA','RAMIREZ','dhafne.gomez@institutodetierrasblancas.cl','21.485.542-9','12345'),(21,2,'MARIANELA JOHANA','CASTILLO','marianela.reyes@institutodetierrasblancas.cl','12.943.453-8','12345'),(22,2,'JHOEL ALEXIS','G?LVEZ','jhoel.avalos@institutodetierrasblancas.cl','21.492.108-1','12345'),(23,2,'DIEGO IGNACIO','NU?EZ','diego.rivera@institutodetierrasblancas.cl','21.803.935-9','12345'),(24,2,'MIGUEL ANGEL','MEJIAS','miguel.cordova@institutodetierrasblancas.cl','15.839.799-4','12345'),(25,2,'NICOL?S ALEJANDRO','HERRERA','nicolas.espindola@institutodetierrasblancas.cl','21.350.758-3','12345'),(26,2,'MARIA JOSE','P?REZ','maria.monroy@institutodetierrasblancas.cl','20.486.475-6','12345'),(27,2,'VICENTE ALBERTO','ILABACA','vicente.morata@institutodetierrasblancas.cl','21.150.764-0','12345'),(28,2,'ALAN JOS? DANIEL','ROJAS','alan.rojas@institutodetierrasblancas.cl','21.686.542-1','12345'),(29,2,'RUB? MIREYA','CHEBAIR','rubi.zambra@institutodetierrasblancas.cl','21.655.542-2','12345'),(30,2,'RUB? ALEJANDRA','SALINAS','rubi.chebair@institutodetierrasblancas.cl','16.052.719-6','12345'),(31,2,'ANAIS DE JES?S','CASTRO','anais.vega@institutodetierrasblancas.cl','21.434.412-2','12345'),(32,2,'ANOUK ANNYA','ARAYA','anouk.castillo@institutodetierrasblancas.cl','21.832.765-6','12345'),(33,2,'ARLYS VALENTINA','AHUMADA','arlys.lastra@institutodetierrasblancas.cl','100.522.471-K','12345'),(34,2,'ESTEPHANIE YAELA','ALCAYAGA','estephanie.leiva@institutodetierrasblancas.cl','20.940.005-7','12345'),(35,2,'CONSTANZA BAT- SEBA SOLEDAD','CORALES','constanza.aguilera@institutodetierrasblancas.cl','21.214.635-8','12345'),(36,2,'RENATO SALVADOR','CORT?S','renato.cortes@institutodetierrasblancas.cl','21.627.705-8','12345'),(37,2,'LUIS IGNACIO','VEGA','luis.araya@institutodetierrasblancas.cl','19.712.392-3','12345'),(38,2,'CAMILA ANTONIA','GONZ?LEZ','camila.astudillo@institutodetierrasblancas.cl','21.551.728-4','12345'),(39,2,'CONSTANZA CAROLINA','MOURAS','constanza.munoz@institutodetierrasblancas.cl','21.027.457-K','12345'),(40,2,'FRANCHESKA YAMILETTE','ALFARO','FRANCHESKA.GUERRA@institutodetierrasblancas.cl','21.624.231-9','12345'),(41,2,'CAMILA ANDREA','MORA','CAMILA.CABRERA@institutodetierrasblancas.cl','20.168.720-9','12345'),(42,2,'MIRZA ISABEL','MU?OZ','MIRZA.ALVARADO@institutodetierrasblancas.cl','14.386.010-8','12345');


INSERT INTO `permisosdelusuario` VALUES (1,1,1),(2,1,2),(3,1,3),(4,1,4),(5,1,5),(6,2,4),(7,2,2);
INSERT INTO `solicitud` VALUES (6,1,1,1,1,'2022-06-21 15:05:20','2022-06-21 18:46:02','2022-06-21','2022-06-21'),(7,1,1,5,1,'2022-06-24 23:50:48','2022-06-25 00:30:30','2022-06-24','2022-06-25');
INSERT INTO `negociacionsolicitud` VALUES (1,6,'asdn asd as d asdas','dfs sdfsdf sf sfsdf','2022-06-21','2022-06-22','2022-06-21','2022-06-22'),(2,7,'Necesito vacunarme','Se aprueba','2022-06-24','2022-06-24','2022-06-24','2022-06-24');



