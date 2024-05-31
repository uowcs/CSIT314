-- Insert orders for Store ID 4 (a fast food restaurant)
INSERT INTO acme_orders ("storeId", items, quantity, amount, "stripePaymentIntentId", "stripePaymentIntentStatus", name, email, "addressId", "createdAt", accepted)
VALUES
(4, '[{"product_id": 2, "name": "Big Mac", "quantity": 1, "price": 8.50}]', 1, 8.50, 'pi_example123', 'succeeded', 'John Doe', 'john.doe@example.com', 101, CURRENT_TIMESTAMP, TRUE),
(4, '[{"product_id": 127812, "name": "Fries", "quantity": 2, "price": 4.00}]', 2, 4.00, 'pi_example124', 'succeeded', 'Jane Smith', 'jane.smith@example.com', 102, CURRENT_TIMESTAMP, TRUE),
(4, '[{"product_id": 595712, "name": "Coca-Cola", "quantity": 1, "price": 3.00}]', 1, 3.00, 'pi_example125', 'succeeded', 'Alice Johnson', 'alice.johnson@example.com', 103, CURRENT_TIMESTAMP, TRUE);

-- Insert orders for Store ID 5 (a Mexican restaurant)
INSERT INTO acme_orders ("storeId", items, quantity, amount, "stripePaymentIntentId", "stripePaymentIntentStatus", name, email, "addressId", "createdAt", accepted)
VALUES
(5, '[{"product_id": 9, "name": "Tacos", "quantity": 1, "price": 5.00}]', 1, 5.00, 'pi_example126', 'succeeded', 'Carlos Ray', 'carlos.ray@example.com', 104, CURRENT_TIMESTAMP, TRUE),
(5, '[{"product_id": 11, "name": "Enchiladas", "quantity": 1, "price": 5.00}]', 1, 5.00, 'pi_example127', 'succeeded', 'Lisa Monroe', 'lisa.monroe@example.com', 105, CURRENT_TIMESTAMP, TRUE),
(5, '[{"product_id": 12, "name": "Quesadillas", "quantity": 1, "price": 5.00}]', 1, 5.00, 'pi_example128', 'succeeded', 'Bob White', 'bob.white@example.com', 106, CURRENT_TIMESTAMP, TRUE);

-- Insert orders for Store ID 9 (Gelatissimo)
INSERT INTO acme_orders ("storeId", items, quantity, amount, "stripePaymentIntentId", "stripePaymentIntentStatus", name, email, "addressId", "createdAt", accepted)
VALUES
(9, '[{"product_id": 6, "name": "Filipino Ube Cheesecake", "quantity": 1, "price": 5.00}]', 1, 5.00, 'pi_example129', 'succeeded', 'David Green', 'david.green@example.com', 107, CURRENT_TIMESTAMP, TRUE),
(9, '[{"product_id": 7, "name": "Belgian Choc Marble Seashells", "quantity": 1, "price": 5.00}]', 1, 5.00, 'pi_example130', 'succeeded', 'Nancy Black', 'nancy.black@example.com', 108, CURRENT_TIMESTAMP, TRUE),
(9, '[{"product_id": 8, "name": "Hawaiian Tropical Coconut", "quantity": 3, "price": 5.50}]', 3, 5.50, 'pi_example131', 'succeeded', 'Steve Brown', 'steve.brown@example.com', 109, CURRENT_TIMESTAMP, TRUE);

-- Insert orders for Store ID 10 (PappaRich)
INSERT INTO acme_orders ("storeId", items, quantity, amount, "stripePaymentIntentId", "stripePaymentIntentStatus", name, email, "addressId", "createdAt", accepted)
VALUES
(10, '[{"product_id": 19, "name": "Curry Laksa (Chicken)", "quantity": 1, "price": 18.50}]', 1, 18.50, 'pi_example129', 'succeeded', 'David Green', 'david.green@example.com', 110, CURRENT_TIMESTAMP, TRUE),
(10, '[{"product_id": 20, "name": "Curry Laksa (Seafood)", "quantity": 2, "price": 20.90}]', 2, 20.90, 'pi_example130', 'succeeded', 'Nancy Black', 'nancy.black@example.com', 111, CURRENT_TIMESTAMP, TRUE),
(10, '[{"product_id": 23, "name": "Roti Canai with Vegetarian Curry Mutton", "quantity": 2, "price": 21}]', 2, 21, 'pi_example131', 'succeeded', 'Steve Brown', 'steve.brown@example.com', 112, CURRENT_TIMESTAMP, TRUE);

-- Insert orders for Store ID 11 (Amigos Mexican Restaurant)
INSERT INTO acme_orders ("storeId", items, quantity, amount, "stripePaymentIntentId", "stripePaymentIntentStatus", name, email, "addressId", "createdAt", accepted)
VALUES
(11, '[{"product_id": 25, "name": "Wings(8pc)", "quantity": 2, "price": 13.00}]', 1, 13.00, 'pi_example129', 'succeeded', 'Carlos Ray', 'carlos.ray@example.com', 113, CURRENT_TIMESTAMP, TRUE),
(11, '[{"product_id": 26, "name": "Amigos Burrito", "quantity": 2, "price": 25.00}]', 2, 25.00, 'pi_example130', 'succeeded', 'Jane Smith', 'jane.smith@example.com', 114, CURRENT_TIMESTAMP, TRUE),
(11, '[{"product_id": 27, "name": "Enchiladas Verdes", "quantity": 2, "price": 27.00}]', 2, 27.00, 'pi_example131', 'succeeded', 'Alice Johnson', 'alice.johnson@example.com', 115, CURRENT_TIMESTAMP, TRUE);

-- Insert orders for Store ID 12 (Unanderra Fish&Chips )
INSERT INTO acme_orders ("storeId", items, quantity, amount, "stripePaymentIntentId", "stripePaymentIntentStatus", name, email, "addressId", "createdAt", accepted)
VALUES
(12, '[{"product_id": 29, "name": "Fish n chips", "quantity": 2, "price": 17.10}]', 1, 17.10, 'pi_example129', 'succeeded', 'Carlos Ray', 'carlos.ray@example.com', 116, CURRENT_TIMESTAMP, TRUE),
(12, '[{"product_id": 30, "name": "Seafood basket", "quantity": 2, "price": 24.05}]', 2, 24.05, 'pi_example130', 'succeeded', 'Jane Smith', 'jane.smith@example.com', 117, CURRENT_TIMESTAMP, TRUE),
(12, '[{"product_id": 31, "name": "Calamari", "quantity": 1, "price": 6.50}]', 2, 6.50, 'pi_example125', 'succeeded', 'Alice Johnson', 'alice.johnson@example.com', 118, CURRENT_TIMESTAMP, TRUE);

-- Insert orders for Store ID  14 (Hero Sushi Wollongong)
INSERT INTO acme_orders ("storeId", items, quantity, amount, "stripePaymentIntentId", "stripePaymentIntentStatus", name, email, "addressId", "createdAt", accepted)
VALUES
(14, '[{"product_id": 32, "name": "Grilled Salmon Nigiri Box", "quantity": 1, "price": 16.00}]', 1, 16.00, 'pi_example123', 'succeeded', 'John Doe', 'john.doe@example.com', 119, CURRENT_TIMESTAMP, TRUE),
(14, '[{"product_id": 33, "name": "Mixed Combo Box", "quantity": 2, "price": 16.00}]', 2, 16.00, 'pi_example130', 'succeeded', 'Jane Smith', 'jane.smith@example.com', 120, CURRENT_TIMESTAMP, TRUE),
(14, '[{"product_id": 34, "name": "Salmon Avo Roll", "quantity": 1, "price": 5.00}]', 1, 5.00, 'pi_example128', 'succeeded', 'Bob White', 'bob.white@example.com', 121, CURRENT_TIMESTAMP, TRUE);
