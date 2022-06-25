-- MariaDB dump 10.19  Distrib 10.4.24-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: solicitudes
-- ------------------------------------------------------
-- Server version	10.4.24-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `estadosolicitud`
--

DROP TABLE IF EXISTS `estadosolicitud`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `estadosolicitud` (
  `idestadosolicitud` int(11) NOT NULL AUTO_INCREMENT,
  `nombreestadosolicitud` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`idestadosolicitud`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `estadosolicitud`
--

LOCK TABLES `estadosolicitud` WRITE;
/*!40000 ALTER TABLE `estadosolicitud` DISABLE KEYS */;
INSERT INTO `estadosolicitud` VALUES (1,'APROBADA'),(2,'RECHAZADA'),(3,'EN NEGOCIACIÓN'),(4,'FINALIZADA');
/*!40000 ALTER TABLE `estadosolicitud` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `negociacionsolicitud`
--

DROP TABLE IF EXISTS `negociacionsolicitud`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `negociacionsolicitud` (
  `idnegociacionsolicitud` int(11) NOT NULL AUTO_INCREMENT,
  `idsolicitud` int(11) DEFAULT NULL,
  `comentariosolicitantenegociacionsolicitud` longtext DEFAULT NULL,
  `comentariorespuestanegociacionsolicitud` longtext DEFAULT NULL,
  `fechainiciopropuestanegociacionsolicitud` date DEFAULT NULL,
  `fechafinalpropuestanegociacionsolicitud` date DEFAULT NULL,
  `fechainiciocorregidanegociacionsolicitud` date DEFAULT NULL,
  `fechafinalcorregidanegociacionsolicitud` date DEFAULT NULL,
  PRIMARY KEY (`idnegociacionsolicitud`),
  KEY `fk_relationship_8` (`idsolicitud`),
  CONSTRAINT `fk_relationship_8` FOREIGN KEY (`idsolicitud`) REFERENCES `solicitud` (`idsolicitud`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `negociacionsolicitud`
--

LOCK TABLES `negociacionsolicitud` WRITE;
/*!40000 ALTER TABLE `negociacionsolicitud` DISABLE KEYS */;
INSERT INTO `negociacionsolicitud` VALUES (1,6,'asdn asd as d asdas','dfs sdfsdf sf sfsdf','2022-06-21','2022-06-22','2022-06-21','2022-06-22'),(2,7,'Necesito vacunarme','Se aprueba','2022-06-24','2022-06-24','2022-06-24','2022-06-24');
/*!40000 ALTER TABLE `negociacionsolicitud` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `perfilusuario`
--

DROP TABLE IF EXISTS `perfilusuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `perfilusuario` (
  `idperfilusuario` int(11) NOT NULL AUTO_INCREMENT,
  `nombreperfilusuario` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idperfilusuario`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `perfilusuario`
--

LOCK TABLES `perfilusuario` WRITE;
/*!40000 ALTER TABLE `perfilusuario` DISABLE KEYS */;
INSERT INTO `perfilusuario` VALUES (1,'Administrador'),(2,'Solicitante');
/*!40000 ALTER TABLE `perfilusuario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `permiso`
--

DROP TABLE IF EXISTS `permiso`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `permiso` (
  `idpermiso` int(11) NOT NULL AUTO_INCREMENT,
  `nombrepermiso` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`idpermiso`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `permiso`
--

LOCK TABLES `permiso` WRITE;
/*!40000 ALTER TABLE `permiso` DISABLE KEYS */;
INSERT INTO `permiso` VALUES (1,'Usuario'),(2,'Inicio'),(3,'TipoSolicitud'),(4,'MisSolicitudes'),(5,'AdministrarSolicitudes');
/*!40000 ALTER TABLE `permiso` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `permisosdelusuario`
--

DROP TABLE IF EXISTS `permisosdelusuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `permisosdelusuario` (
  `idpermisosdelusuario` int(11) NOT NULL AUTO_INCREMENT,
  `idperfilusuario` int(11) DEFAULT NULL,
  `idpermiso` int(11) DEFAULT NULL,
  PRIMARY KEY (`idpermisosdelusuario`),
  KEY `fk_mantenedores_del_perfil` (`idperfilusuario`),
  KEY `fk_mantenedores_permisos` (`idpermiso`),
  CONSTRAINT `fk_mantenedores_del_perfil` FOREIGN KEY (`idperfilusuario`) REFERENCES `perfilusuario` (`idperfilusuario`),
  CONSTRAINT `fk_mantenedores_permisos` FOREIGN KEY (`idpermiso`) REFERENCES `permiso` (`idpermiso`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `permisosdelusuario`
--

LOCK TABLES `permisosdelusuario` WRITE;
/*!40000 ALTER TABLE `permisosdelusuario` DISABLE KEYS */;
INSERT INTO `permisosdelusuario` VALUES (1,1,1),(2,1,2),(3,1,3),(4,1,4),(5,1,5),(6,2,4);
/*!40000 ALTER TABLE `permisosdelusuario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `solicitud`
--

DROP TABLE IF EXISTS `solicitud`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `solicitud` (
  `idsolicitud` int(11) NOT NULL AUTO_INCREMENT,
  `idtiposolicitud` int(11) DEFAULT NULL,
  `idusuario` int(11) DEFAULT NULL,
  `usu_idusuario` int(11) DEFAULT NULL,
  `idestadosolicitud` int(11) DEFAULT NULL,
  `fechasolicitud` datetime DEFAULT NULL,
  `fecharespuesta` datetime DEFAULT NULL,
  `fechainiciosolicitud` date DEFAULT NULL,
  `fechafinalsolicitud` date DEFAULT NULL,
  PRIMARY KEY (`idsolicitud`),
  KEY `fk_estado_de_la_solicitud` (`idestadosolicitud`),
  KEY `fk_solicitante` (`usu_idusuario`),
  KEY `fk_solicitud_tiposolicitud` (`idtiposolicitud`),
  KEY `fk_administrador` (`idusuario`),
  CONSTRAINT `fk_administrador` FOREIGN KEY (`idusuario`) REFERENCES `usuario` (`idusuario`),
  CONSTRAINT `fk_estado_de_la_solicitud` FOREIGN KEY (`idestadosolicitud`) REFERENCES `estadosolicitud` (`idestadosolicitud`),
  CONSTRAINT `fk_solicitante` FOREIGN KEY (`usu_idusuario`) REFERENCES `usuario` (`idusuario`),
  CONSTRAINT `fk_solicitud_tiposolicitud` FOREIGN KEY (`idtiposolicitud`) REFERENCES `tiposolicitud` (`idtiposolicitud`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `solicitud`
--

LOCK TABLES `solicitud` WRITE;
/*!40000 ALTER TABLE `solicitud` DISABLE KEYS */;
INSERT INTO `solicitud` VALUES (6,1,1,1,1,'2022-06-21 15:05:20','2022-06-21 18:46:02','2022-06-21','2022-06-21'),(7,1,1,5,1,'2022-06-24 23:50:48','2022-06-25 00:30:30','2022-06-24','2022-06-25');
/*!40000 ALTER TABLE `solicitud` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tiposolicitud`
--

DROP TABLE IF EXISTS `tiposolicitud`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tiposolicitud` (
  `idtiposolicitud` int(11) NOT NULL AUTO_INCREMENT,
  `nombretiposolicitud` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`idtiposolicitud`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tiposolicitud`
--

LOCK TABLES `tiposolicitud` WRITE;
/*!40000 ALTER TABLE `tiposolicitud` DISABLE KEYS */;
INSERT INTO `tiposolicitud` VALUES (1,'Día administrativo'),(3,'Retiro temprano para buscar hijos al colegio'),(4,'Semana de permiso por fallecimiento de familiar'),(7,'Día libre por cumpleaños'),(8,'Bicicleta para movilización');
/*!40000 ALTER TABLE `tiposolicitud` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `usuario` (
  `idusuario` int(11) NOT NULL AUTO_INCREMENT,
  `idperfilusuario` int(11) DEFAULT NULL,
  `nombreusuario` varchar(50) DEFAULT NULL,
  `apellidousuario` varchar(50) DEFAULT NULL,
  `emailusuario` varchar(50) DEFAULT NULL,
  `rutusuario` varchar(50) DEFAULT NULL,
  `contrasenausuario` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`idusuario`),
  KEY `fk_perfildelusuario` (`idperfilusuario`),
  CONSTRAINT `fk_perfildelusuario` FOREIGN KEY (`idperfilusuario`) REFERENCES `perfilusuario` (`idperfilusuario`)
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES (1,1,'Roy Alex','Standen Barraza','roystandenb@gmail.com','16428927-3','164289273'),(5,2,'Amanda','Standen Barraza','asd@gmail.com','8370986-3','123456'),(6,2,'ALEJANDRO ISRAEL','BERR?OS','alejandro.ampuero@institutodetierrasblancas.cl','20.447.454-0','12345'),(7,2,'VALENTINA ESTEFAN?A','G?LVEZ','valentina.alfaro@institutodetierrasblancas.cl','21.288.580-0','12345'),(8,2,'JEREMY PATRICIO','CAMPUSANO','jeremy.gamboa@institutodetierrasblancas.cl','21.889.769-K','12345'),(9,2,'JOSELYN KARINA','HIDALGO','joselyn.hidalgo@institutodetierrasblancas.cl','18.318.260-9','12345'),(10,2,'JASSON YOHAN','CASTILLO','jasson.segovia@institutodetierrasblancas.cl','21.833.392-3','12345'),(11,2,'BYRON ARIEL','ORELLANA','byron.rodriguez@institutodetierrasblancas.cl','20.953.167-4','12345'),(12,2,'FERNANDA LORETO','MARAMBIO','fernanda.lanas@institutodetierrasblancas.cl','21.096.727-3','12345'),(13,2,'SERGIO ANTONIO','ESPINOZA','sergio.huerta@institutodetierrasblancas.cl','18.264.733-0','12345'),(14,2,'TOMAS BENJAM?N','AHUMADA','tomas.gomez@institutodetierrasblancas.cl','21.605.218-8','12345'),(15,2,'LESLIE PATRICIA','ARMIJO','leslie.concha@institutodetierrasblancas.cl','17.092.049-K','12345'),(16,2,'NATALIA BELEN','RIVEROS','natalia.riveros@institutodetierrasblancas.cl','19.506.357-5','12345'),(17,2,'ALEJANDRA','OTALORA','alejandra.jamett@institutodetierrasblancas.cl','22.869.930-6','12345'),(18,2,'MAYKOL ANDRES','SILVA','maykol.gonzalez@institutodetierrasblancas.cl','21.824.100-K','12345'),(19,2,'TRINIDAD BEL?N','COLLAO','trinidad.herrero@institutodetierrasblancas.cl','21.611.194-K','12345'),(20,2,'DHAFNE SELENA','RAMIREZ','dhafne.gomez@institutodetierrasblancas.cl','21.485.542-9','12345'),(21,2,'MARIANELA JOHANA','CASTILLO','marianela.reyes@institutodetierrasblancas.cl','12.943.453-8','12345'),(22,2,'JHOEL ALEXIS','G?LVEZ','jhoel.avalos@institutodetierrasblancas.cl','21.492.108-1','12345'),(23,2,'DIEGO IGNACIO','NU?EZ','diego.rivera@institutodetierrasblancas.cl','21.803.935-9','12345'),(24,2,'MIGUEL ANGEL','MEJIAS','miguel.cordova@institutodetierrasblancas.cl','15.839.799-4','12345'),(25,2,'NICOL?S ALEJANDRO','HERRERA','nicolas.espindola@institutodetierrasblancas.cl','21.350.758-3','12345'),(26,2,'MARIA JOSE','P?REZ','maria.monroy@institutodetierrasblancas.cl','20.486.475-6','12345'),(27,2,'VICENTE ALBERTO','ILABACA','vicente.morata@institutodetierrasblancas.cl','21.150.764-0','12345'),(28,2,'ALAN JOS? DANIEL','ROJAS','alan.rojas@institutodetierrasblancas.cl','21.686.542-1','12345'),(29,2,'RUB? MIREYA','CHEBAIR','rubi.zambra@institutodetierrasblancas.cl','21.655.542-2','12345'),(30,2,'RUB? ALEJANDRA','SALINAS','rubi.chebair@institutodetierrasblancas.cl','16.052.719-6','12345'),(31,2,'ANAIS DE JES?S','CASTRO','anais.vega@institutodetierrasblancas.cl','21.434.412-2','12345'),(32,2,'ANOUK ANNYA','ARAYA','anouk.castillo@institutodetierrasblancas.cl','21.832.765-6','12345'),(33,2,'ARLYS VALENTINA','AHUMADA','arlys.lastra@institutodetierrasblancas.cl','100.522.471-K','12345'),(34,2,'ESTEPHANIE YAELA','ALCAYAGA','estephanie.leiva@institutodetierrasblancas.cl','20.940.005-7','12345'),(35,2,'CONSTANZA BAT- SEBA SOLEDAD','CORALES','constanza.aguilera@institutodetierrasblancas.cl','21.214.635-8','12345'),(36,2,'RENATO SALVADOR','CORT?S','renato.cortes@institutodetierrasblancas.cl','21.627.705-8','12345'),(37,2,'LUIS IGNACIO','VEGA','luis.araya@institutodetierrasblancas.cl','19.712.392-3','12345'),(38,2,'CAMILA ANTONIA','GONZ?LEZ','camila.astudillo@institutodetierrasblancas.cl','21.551.728-4','12345'),(39,2,'CONSTANZA CAROLINA','MOURAS','constanza.munoz@institutodetierrasblancas.cl','21.027.457-K','12345'),(40,2,'FRANCHESKA YAMILETTE','ALFARO','FRANCHESKA.GUERRA@institutodetierrasblancas.cl','21.624.231-9','12345'),(41,2,'CAMILA ANDREA','MORA','CAMILA.CABRERA@institutodetierrasblancas.cl','20.168.720-9','12345'),(42,2,'MIRZA ISABEL','MU?OZ','MIRZA.ALVARADO@institutodetierrasblancas.cl','14.386.010-8','12345');
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-06-25  1:06:15
