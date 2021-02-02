DROP DATABASE IF EXISTS restaurants_test;
CREATE DATABASE restaurants_test;

\c restaurants_test;

DROP TABLE IF EXISTS area;
DROP TABLE IF EXISTS restaurants;
DROP TABLE IF EXISTS comments;
DROP TABLE IF EXISTS ratings;

-- create tables

CREATE TABLE area (
    area_id SERIAL PRIMARY KEY,
    name VARCHAR
    );

CREATE TABLE restaurants (
    restaurant_id SERIAL PRIMARY KEY,
    name VARCHAR,
    area_id INT REFERENCES area(area_id),
    cuisine VARCHAR,
    website VARCHAR
);

CREATE TABLE comments (
    comment_id SERIAL PRIMARY KEY,
    restaurant_id INT REFERENCES restaurants(restaurant_id),
    body VARCHAR,
    created_at TIMESTAMP NOT NULL DEFAULT  CURRENT_TIMESTAMP
    );

CREATE TABLE ratings (
    rating_id SERIAL PRIMARY KEY,
    restaurant_id INT REFERENCES restaurants(restaurant_id),
    rating INT,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
    );


-- put data in tables

-- areas
INSERT INTO area(name) VALUES ('Woodseats'); 
INSERT INTO area(name) VALUES ('Hunters Bar');


-- restaurants
INSERT INTO restaurants(name, area_id, cuisine, website) VALUES ('Marco', 1, 'Italian', 'https://www.tripadvisor.co.uk/Restaurant_Review-g186364-d8065913-Reviews-Marco_s-Sheffield_South_Yorkshire_England.html');
INSERT INTO restaurants(name, area_id, cuisine, website) VALUES ('Mowgli', 2, 'Indian Street Food', 'https://www.mowglistreetfood.com/');


-- comments
INSERT INTO comments(restaurant_id, body) VALUES (1, 'Do not go on a Thursday!');
INSERT INTO comments(restaurant_id, body) VALUES (2, 'Mowgli Street Food is great!');


-- ratings
INSERT INTO ratings(restaurant_id, rating) VALUES (1, 1);
INSERT INTO ratings(restaurant_id, rating) VALUES (2, 1);
