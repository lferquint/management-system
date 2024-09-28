INSERT INTO `vrintex`.`colors` (color_name)
VALUES 
('Red'),
('Blue'),
('Green'),
('Yellow'),
('Black');
INSERT INTO `vrintex`.`type_product` (type_product_name)
VALUES 
('T-Shirt'),
('Pants'),
('Shoes'),
('Hat'),
('Jacket');
INSERT INTO `vrintex`.`models` (name_model, description, id_type_product, units)
VALUES 
('Model A', 'Basic T-Shirt for everyday use', 1, 'Pieces'),
('Model B', 'Comfortable pants with extra pockets', 2, 'Pieces'),
('Model C', 'Running shoes with enhanced grip', 3, 'Pairs'),
('Model D', 'Stylish hat for all occasions', 4, 'Pieces'),
('Model E', 'Warm jacket for winter', 5, 'Pieces');
INSERT INTO `vrintex`.`providers` (website, tel, email, company_name)
VALUES 
('http://www.exampleprovider1.com', '123-456-7890', 'info@exampleprovider1.com', 'Provider 1'),
('http://www.exampleprovider2.com', '098-765-4321', 'info@exampleprovider2.com', 'Provider 2'),
('http://www.exampleprovider3.com', '555-123-4567', 'info@exampleprovider3.com', 'Provider 3');
INSERT INTO `vrintex`.`list_products` (stock, id_color, id_provider, price, id_model)
VALUES 
(100, 1, 1, 15.99, 1),  -- T-Shirt, Red, Provider 1
(50, 2, 2, 25.49, 2),   -- Pants, Blue, Provider 2
(75, 3, 3, 45.00, 3),   -- Shoes, Green, Provider 3
(30, 4, 1, 10.99, 4),   -- Hat, Yellow, Provider 1
(20, 5, 2, 60.00, 5);   -- Jacket, Black, Provider 2
