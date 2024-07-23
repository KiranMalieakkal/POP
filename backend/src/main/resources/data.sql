-- Create Categories
INSERT INTO Category (title) VALUES ('Office Supplies');
INSERT INTO Category (title) VALUES ('Software');
INSERT INTO Category (title) VALUES ('Travel');
INSERT INTO Category (title) VALUES ('Entertainment');
--
-- -- Create Projects
INSERT INTO Project (title) VALUES ('Project Alpha');
INSERT INTO Project (title) VALUES ('Project Beta');
INSERT INTO Project (title) VALUES ('Project Gamma');

-- Create Users
INSERT INTO pop_user (first_name, last_name, email) VALUES ('John', 'Doe', 'john.doe@example.com');
INSERT INTO pop_user (first_name, last_name, email) VALUES ('Jane', 'Smith', 'jane.smith@example.com');
INSERT INTO pop_user (first_name, last_name, email) VALUES ('Alice', 'Johnson', 'alice.johnson@example.com');
INSERT INTO pop_user (first_name, last_name, email) VALUES ('Bob', 'Brown', 'bob.brown@example.com');
INSERT INTO pop_user (first_name, last_name, email) VALUES ('Charlie', 'Davis', 'charlie.davis@example.com');

-- Create Receipts
-- User 1 (John Doe) - 0 Receipts
-- User 2 (Jane Smith) - 15 Receipts
INSERT INTO Receipt (company, amount, currency, purchase_date, text_content, user_id, category_id, project_id) VALUES
     ('Amazon', 99.99, 'USD', '2023-07-01', 'Office Chair', 2, 1, 1),
     ('Microsoft', 199.99, 'USD', '2023-07-02', 'Office 365 Subscription', 2, 2, 1),
     ('Delta', 299.99, 'USD', '2023-07-03', 'Flight to NYC', 2, 3, 1),
     ('Uber', 19.99, 'USD', '2023-07-04', 'Taxi ride', 2, 3, 1),
     ('Starbucks', 4.99, 'USD', '2023-07-05', 'Coffee', 2, 4, 1),
     ('Adobe', 9.99, 'USD', '2023-07-06', 'Photoshop Subscription', 2, 2, 1),
     ('Netflix', 12.99, 'USD', '2023-07-07', 'Monthly Subscription', 2, 4, 1),
     ('Airbnb', 499.99, 'USD', '2023-07-08', 'Accommodation', 2, 3, 1),
     ('Lyft', 29.99, 'USD', '2023-07-09', 'Taxi ride', 2, 3, 1),
     ('Spotify', 9.99, 'USD', '2023-07-10', 'Monthly Subscription', 2, 4, 1),
     ('Slack', 6.99, 'USD', '2023-07-11', 'Slack Subscription', 2, 2, 1),
     ('Google', 49.99, 'USD', '2023-07-12', 'Google Workspace Subscription', 2, 2, 1),
     ('WeWork', 299.99, 'USD', '2023-07-13', 'Co-working Space', 2, 1, 1),
     ('Expedia', 999.99, 'USD', '2023-07-14', 'Business Trip', 2, 3, 1),
     ('GitHub', 9.99, 'USD', '2023-07-15', 'GitHub Subscription', 2, 2, 1);

-- User 3 (Alice Johnson) - 10 Receipts
INSERT INTO Receipt (company, amount, currency, purchase_date, text_content, user_id, category_id, project_id) VALUES
    ('Apple', 999.99, 'USD', '2023-07-16', 'MacBook Pro', 3, 1, 2),
    ('Amazon', 49.99, 'USD', '2023-07-17', 'Office Supplies', 3, 1, 2),
    ('Uber', 19.99, 'USD', '2023-07-18', 'Taxi ride', 3, 3, 2),
    ('Google', 59.99, 'USD', '2023-07-19', 'Google Ads', 3, 2, 2),
    ('Adobe', 29.99, 'USD', '2023-07-20', 'Creative Cloud', 3, 2, 2),
    ('Airbnb', 299.99, 'USD', '2023-07-21', 'Accommodation', 3, 3, 2),
    ('Lyft', 9.99, 'USD', '2023-07-22', 'Taxi ride', 3, 3, 2),
    ('Spotify', 14.99, 'USD', '2023-07-23', 'Family Subscription', 3, 4, 2),
    ('Slack', 12.99, 'USD', '2023-07-24', 'Slack Subscription', 3, 2, 2),
    ('Netflix', 17.99, 'USD', '2023-07-25', 'Family Subscription', 3, 4, 2);

-- User 4 (Bob Brown) - 5 Receipts
INSERT INTO Receipt (company, amount, currency, purchase_date, text_content, user_id, category_id, project_id) VALUES
     ('Amazon', 199.99, 'USD', '2023-07-26', 'Printer', 4, 1, NULL),
     ('Google', 29.99, 'USD', '2023-07-27', 'Google Drive Storage', 4, 2, NULL),
     ('Uber', 15.99, 'USD', '2023-07-28', 'Taxi ride', 4, 3, NULL),
     ('Netflix', 12.99, 'USD', '2023-07-29', 'Monthly Subscription', 4, 4, NULL),
     ('Apple', 799.99, 'USD', '2023-07-30', 'iPhone', 4, 1, NULL);

-- User 5 (Charlie Davis) - 0 Receipts
-- User 5 has no receipts as requested

-- Adjust categories and projects accordingly for the data provided
