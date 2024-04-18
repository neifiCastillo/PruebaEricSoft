CREATE DATABASE PruebaEricSoft;

USE PruebaEricSoft;

CREATE TABLE Products (
    ProductNo INT PRIMARY KEY,
    ProductName VARCHAR(100),
    Quantity INT,
    Price DECIMAL(10, 2)
);

CREATE TABLE FacturaH (
    FacturaNo INT,
    Estatus VARCHAR(10)
);

CREATE TABLE FacturaD (
    FacturaNo INT,
    ProductoNo INT,
    Cantidad INT,
    Precio INT
);

CREATE TABLE Producto (
    ProductoNo INT,
    ProductoNombre VARCHAR(100),
    Marca VARCHAR(50)
);


-- Crear consulta SQL que extraiga las facturas cuyo estatus sea igual a Activa, la marca sea igual a Cat y cantidad sea mayor que 10.
SELECT f.FacturaNo, f.Estatus, fd.ProductoNo, fd.Cantidad
FROM FacturaH f
INNER JOIN FacturaD fd ON F.FacturaNo = fd.FacturaNo
INNER JOIN Producto p ON fd.ProductoNo = p.ProductoNo
WHERE f.Estatus = 'Activa' 
AND p.Marca = 'Cat'
AND fd.Cantidad > 10;

--crear consulta SQL que muestre los distintos productos que han tenido 2 o más facturas con estatus igual a Anulada
SELECT fd.ProductoNo, COUNT(DISTINCT f.FacturaNo) AS NumFacturasAnulada
FROM FacturaH f
INNER JOIN FacturaD fd ON f.FacturaNo = fd.FacturaNo
WHERE f.Estatus = 'Anulada' 
GROUP BY fd.ProductoNo
HAVING COUNT(DISTINCT f.FacturaNo) >= 2;



