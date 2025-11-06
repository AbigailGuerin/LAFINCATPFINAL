-- phpMyAdmin SQL Dump
-- version 5.2.3
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3306
-- Tiempo de generación: 06-11-2025 a las 18:24:42
-- Versión del servidor: 8.0.31
-- Versión de PHP: 8.4.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `lafincagestion`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `clientes`
--

DROP TABLE IF EXISTS `clientes`;
CREATE TABLE IF NOT EXISTS `clientes` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `apellido` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `direccion` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `cuit` varchar(13) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `iva` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `telefono` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `usuario` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `clientes`
--

INSERT INTO `clientes` (`id`, `nombre`, `apellido`, `direccion`, `cuit`, `iva`, `email`, `telefono`, `usuario`, `password`) VALUES
(1, 'José', 'De San Martín', 'Yapeyú 1778', '20-17781850-5', 'Responsable Ins', 'sanmartin@hotmail.com', '341 4254521', 'josesanmartin', '123456'),
(2, 'Manuel', 'Belgrano', 'Rosario 1770', '20-17701820-5', 'Monotributo', 'manuelbelgrano@gmail.com', '3476 625876', 'manuelbelgrano', '654123'),
(3, 'Juana', 'Azurduy', 'Sucre 1780', '27-17801862-0', 'Cons. Final', 'juanitaazur862@live.com', '341 5418563', 'juanaazurduy', '456789'),
(4, 'Gregoria', 'Matorras', 'Orense 1738', '23-17381813-1', 'Resp. Inscripto', 'matorras.g.813@gmail.com', '342 6325498', 'gregoriamatorras', '987654'),
(21, 'Abigail', 'Guerín Gattino', 'pasaje blas parera 919', '27-46879899-4', 'Monotributo', 'abigailguerin@institutocedec.com', '3416651918', 'abiguerin', '123456789');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalle_pedidos`
--

DROP TABLE IF EXISTS `detalle_pedidos`;
CREATE TABLE IF NOT EXISTS `detalle_pedidos` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `pedidos_id` bigint NOT NULL,
  `productos_id` bigint NOT NULL,
  `cantidad` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `detalle_pedidos`
--

INSERT INTO `detalle_pedidos` (`id`, `pedidos_id`, `productos_id`, `cantidad`) VALUES
(1, 5, 1, 1),
(2, 5, 1, 1),
(3, 5, 2, 1),
(4, 5, 10, 1),
(5, 5, 1, 1),
(6, 5, 9, 1),
(7, 5, 1, 1),
(8, 5, 28, 1),
(9, 6, 21, 1),
(10, 6, 22, 1),
(11, 6, 23, 1),
(12, 7, 21, 1),
(13, 8, 25, 1),
(14, 8, 28, 1),
(15, 8, 27, 1),
(16, 8, 29, 1),
(17, 9, 21, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedidos`
--

DROP TABLE IF EXISTS `pedidos`;
CREATE TABLE IF NOT EXISTS `pedidos` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `fecha` date NOT NULL,
  `clientes_id` bigint NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `pedidos`
--

INSERT INTO `pedidos` (`id`, `fecha`, `clientes_id`) VALUES
(9, '2025-11-06', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

DROP TABLE IF EXISTS `productos`;
CREATE TABLE IF NOT EXISTS `productos` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `codigo` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `nombre` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `descripcion` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `direccion` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `precio` double DEFAULT NULL,
  `stock` double DEFAULT NULL,
  `imagen` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `id_rubro` bigint DEFAULT NULL,
  `id_proveedor` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`id`, `codigo`, `nombre`, `descripcion`, `direccion`, `precio`, `stock`, `imagen`, `id_rubro`, `id_proveedor`) VALUES
(21, '001', 'Alquiler de departamento Rosario', 'Departamento acondicionado en ciudad de Rosario', 'Sargento Cabral 4158', 750000, NULL, 'dpto1.jpg', NULL, NULL),
(22, '002', 'Alquiler de departamento San Lorenzo', 'Departamento acondicionado en 5to piso en la ciudad de San Lorenzo', 'Hipólito Yrigoyen 2099', 500000, NULL, 'dpto2.jpg', NULL, NULL),
(23, '003', 'Venta de departamento en Granadero Baigorria', 'Departamento acondicionado en 7mo piso en la ciudad de Granadero Baigorria', 'Av. Santa Fe 543', 12000000, NULL, 'dpto3.jpg', NULL, NULL),
(24, '004', 'Alquiler de monoambiente en Rosario', 'Monoambiente de 35m² completamente acondicionado en la ciudad de Rosario', 'Arengreen 5465', 250000, NULL, 'monoambiente1.jpg', NULL, NULL),
(25, '005', 'Alquiler de monoambiente en San Lorenzo', 'Monoambiente de 42m² completamente acondicionado y con todos los servicios en la ciudad de San Lorenzo', 'Falucho 4685', 300000, NULL, 'monoambiente2.jpg', NULL, NULL),
(26, '006', 'Alquiler de monoambiente en Rosario', 'Monoambiente de 36m² completamente acondicionado en la ciudad de Rosario', 'Av. Alberdi 2006', 275000, NULL, 'monoambiente3.jpg', NULL, NULL),
(27, '007', 'Alquiler de casa unifamiliar de una planta en Funes', 'Casa unifamiliar de una sola planta con patio de 50m² y pileta incluída.', 'Alvear 354', 500000, NULL, 'casita1.jpg', NULL, NULL),
(28, '009', 'Venta de casa unifamiliar de dos plantas en Fray Luis Beltrán', 'Casa unifamiliar de dos plantas con dos habitaciones, dos baños y patio de 30m²', 'Gral. Artigas 86', 75000000, NULL, 'casita2.jpg', NULL, NULL),
(29, '008', 'Venta de casa unifamiliar de dos plantas en Puerto San Martín', 'Casa unifamiliar de dos plantas con patio de 56m², pileta incluída y completamente amueblada', 'Thompson 100', 100000000, NULL, 'casita3.jpg', NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `vta_pedidos`
-- (Véase abajo para la vista actual)
--
DROP VIEW IF EXISTS `vta_pedidos`;
CREATE TABLE IF NOT EXISTS `vta_pedidos` (
`id` bigint
,`pedidos_id` bigint
,`fecha` date
,`clientes_id` bigint
,`codigo` varchar(15)
,`nombre` varchar(100)
,`cantidad` int
,`precio` double
,`importe` double
);

-- --------------------------------------------------------

--
-- Estructura para la vista `vta_pedidos`
--
DROP TABLE IF EXISTS `vta_pedidos`;

DROP VIEW IF EXISTS `vta_pedidos`;
CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `vta_pedidos`  AS SELECT `detalle_pedidos`.`id` AS `id`, `pedidos`.`id` AS `pedidos_id`, `pedidos`.`fecha` AS `fecha`, `pedidos`.`clientes_id` AS `clientes_id`, `productos`.`codigo` AS `codigo`, `productos`.`nombre` AS `nombre`, `detalle_pedidos`.`cantidad` AS `cantidad`, `productos`.`precio` AS `precio`, (`detalle_pedidos`.`cantidad` * `productos`.`precio`) AS `importe` FROM ((`detalle_pedidos` join `productos` on((`detalle_pedidos`.`productos_id` = `productos`.`id`))) join `pedidos` on((`detalle_pedidos`.`pedidos_id` = `pedidos`.`id`))) ORDER BY `pedidos`.`id` DESC ;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
