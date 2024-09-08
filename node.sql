-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 12-08-2024 a las 21:31:28
-- Versión del servidor: 11.3.0-MariaDB
-- Versión de PHP: 8.1.17

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `node`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `prod`
--

CREATE TABLE `prod` (
  `prod_id` int(11) NOT NULL,
  `nombre` varchar(250) NOT NULL,
  `obs` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `prod`
--

INSERT INTO `prod` (`prod_id`, `nombre`, `obs`) VALUES
(1, 'laptope', 'lape'),
(2, 'celular', 'cel'),
(3, 'puerta', 'caoba'),
(4, 'qwe', '213'),
(6, 'rioja', 'rioja'),
(12, 'qwdqwd', 'qwdqwd');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `prod`
--
ALTER TABLE `prod`
  ADD PRIMARY KEY (`prod_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `prod`
--
ALTER TABLE `prod`
  MODIFY `prod_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
