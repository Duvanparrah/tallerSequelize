CREATE DATABASE biblioteca;
USE biblioteca;

CREATE TABLE libros (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    autor VARCHAR(255) NOT NULL,
    anio_publicacion INT NOT NULL,
    disponibilidad BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    correo VARCHAR(255) NOT NULL UNIQUE,
    rol VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE prestamos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    libro_id INT NOT NULL,
    fecha_prestamo DATETIME DEFAULT CURRENT_TIMESTAMP,
    fecha_devolucion DATETIME NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
    FOREIGN KEY (libro_id) REFERENCES libros(id) ON DELETE CASCADE
);

-- REGISTROS:
USE biblioteca;
INSERT INTO libros (titulo, autor, anio_publicacion, disponibilidad) VALUES
('Cien Años de Soledad', 'Gabriel García Márquez', 1967, true),
('1984', 'George Orwell', 1949, true),
('El Principito', 'Antoine de Saint-Exupéry', 1943, true),
('Don Quijote de la Mancha', 'Miguel de Cervantes', 1605, true),
('Crónica de una Muerte Anunciada', 'Gabriel García Márquez', 1981, true),
('Orgullo y Prejuicio', 'Jane Austen', 1813, true),
('El Hobbit', 'J.R.R. Tolkien', 1937, true),
('Rayuela', 'Julio Cortázar', 1963, true),
('La Odisea', 'Homero', 1937, true), -- Ajustado a un año positivo válido
('El Aleph', 'Jorge Luis Borges', 1949, true);

INSERT INTO usuarios (nombre, correo, rol) VALUES
('Ana Pérez', 'ana.perez@example.com', 'usuario'),
('Luis Gómez', 'luis.gomez@example.com', 'usuario'),
('Marta López', 'marta.lopez@example.com', 'admin'),
('Carlos Díaz', 'carlos.diaz@example.com', 'usuario'),
('Lucía Fernández', 'lucia.fernandez@example.com', 'usuario'),
('Pedro Sánchez', 'pedro.sanchez@example.com', 'usuario'),
('Claudia García', 'claudia.garcia@example.com', 'usuario'),
('Santiago Martínez', 'santiago.martinez@example.com', 'admin'),
('Paula Torres', 'paula.torres@example.com', 'usuario'),
('Jorge Ruiz', 'jorge.ruiz@example.com', 'usuario');

INSERT INTO prestamos (usuario_id, libro_id, fecha_prestamo, fecha_devolucion) VALUES
(1, 1, '2023-10-25 10:00:00', '2024-11-29 17:00:00'),
(2, 2, '2024-10-26 14:30:00', '2024-11-29 17:00:00'),
(3, 3, '2024-10-27 09:00:00', '2024-11-29 17:00:00'),
(4, 4, '2024-10-28 11:00:00', '2024-11-29 17:00:00'),
(5, 5, '2024-11-13 18:00:00', '2024-12-29 17:00:00'),
(6, 6, '2024-11-10 17:00:00', '2024-12-29 17:00:00'),
(7, 7, '2024-11-08 14:00:00', '2024-12-29 17:00:00'),
(8, 8, '2024-11-29 12:00:00', '2024-12-29 17:00:00'),
(9, 9, '2024-11-30 13:00:00', '2024-12-29 17:00:00');


-- select *from Libro;

-- RENAME TABLE Libro TO libros;
-- RENAME TABLE Usuario TO Usuarios;
-- RENAME TABLE Prestamo TO prestamos;

ALTER TABLE libros
ADD COLUMN createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;
USE biblioteca;

SET GLOBAL sql_mode = 'NO_ENGINE_SUBSTITUTION';

-- consulta:




