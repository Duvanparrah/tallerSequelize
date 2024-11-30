CREATE DATABASE eventos;
USE eventos;

CREATE TABLE usuarios (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nombre VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL
);
CREATE TABLE eventos (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nombre VARCHAR(100) NOT NULL,
  descripcion TEXT NOT NULL,
  fecha_hora DATETIME NOT NULL,
  lugar VARCHAR(255) NOT NULL,
  capacidad_maxima INT NOT NULL,
  inscripciones_actuales INT DEFAULT 0
);
CREATE TABLE inscripciones (
  id INT PRIMARY KEY AUTO_INCREMENT,
  usuario_id INT NOT NULL,
  evento_id INT NOT NULL,
  fecha_inscripcion DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
  FOREIGN KEY (evento_id) REFERENCES eventos(id) ON DELETE CASCADE
);
SELECT * FROM eventos WHERE inscripciones_actuales < capacidad_maxima;
SELECT u.nombre, u.email FROM usuarios u
JOIN inscripciones i ON u.id = i.usuario_id
WHERE i.evento_id = ?;

SELECT e.nombre, COUNT(i.id) AS num_inscripciones
FROM eventos e
JOIN inscripciones i ON e.id = i.evento_id
GROUP BY e.id
ORDER BY num_inscripciones DESC;
