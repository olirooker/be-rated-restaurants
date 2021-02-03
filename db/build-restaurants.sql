DROP DATABASE IF EXISTS restaurants;
CREATE DATABASE restaurants;

\c restaurants;

DROP TABLE IF EXISTS area;
DROP TABLE IF EXISTS restaurants;
DROP TABLE IF EXISTS comments;
DROP TABLE IF EXISTS ratings;

-- create tables

CREATE TABLE area (
    area_id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL
    );

CREATE TABLE restaurants (
    restaurant_id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL,
    area_id INT REFERENCES area(id),
    cuisine VARCHAR NOT NULL,
    website VARCHAR NOT NULL
    );

CREATE TABLE comments (
    comment_id SERIAL PRIMARY KEY,
    restaurant_id INT REFERENCES restaurants(id),
    body VARCHAR NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT  CURRENT_TIMESTAMP
    );

CREATE TABLE ratings (
    rating_id SERIAL PRIMARY KEY,
    restaurant_id INT REFERENCES restaurants(id),
    rating INT CHECK(rating <= 5),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
    );


-- put data in tables

-- areas
INSERT INTO area(name) VALUES ('Woodseats');
INSERT INTO area(name) VALUES ('Hunters Bar');
INSERT INTO area(name) VALUES ('Ranmoor');
INSERT INTO area(name) VALUES ('Centre');
INSERT INTO area(name) VALUES ('Ecclesall');

-- restaurants
INSERT INTO restaurants(name, area_id, cuisine, website) VALUES ('Marco', 1, 'Italian', 'https://www.tripadvisor.co.uk/Restaurant_Review-g186364-d8065913-Reviews-Marco_s-Sheffield_South_Yorkshire_England.html');
INSERT INTO restaurants(name, area_id, cuisine, website) VALUES ('Mowgli', 2, 'Indian Street Food', 'https://www.mowglistreetfood.com/');
INSERT INTO restaurants(name, area_id, cuisine, website) VALUES ('The Florentine Restaurant', 3, 'British', 'https://www.tripadvisor.co.uk/Restaurant_Review-g186364-d5816162-Reviews-The_Florentine_Restaurant-Sheffield_South_Yorkshire_England.html');
INSERT INTO restaurants(name, area_id, cuisine, website) VALUES ('KFC', 4, 'Chicken', 'https://www.kfc.co.uk/');
INSERT INTO restaurants(name, area_id, cuisine, website) VALUES ('Brocco Kitchen', 5, 'British', 'https://www.brocco.co.uk/kitchen/');

-- comments
INSERT INTO area(restaurant_id, body, created_at) VALUES (1, 'Do not go on a Thursday!', 2016-05-06);
INSERT INTO area(restaurant_id, body, created_at) VALUES (2, 'Mowgli Street Food is a disgrace; an insult to not just Indian cuisine but the entire country!', 2020-02-24);
INSERT INTO area(restaurant_id, body, created_at) VALUES (3, 'The ostrich egg came out wet and drippy!', 2019-04-05);
INSERT INTO area(restaurant_id, body, created_at) VALUES (4, 'Tell us their secret seasoning blend!!!!!!!!!!', 2020-11-02);
INSERT INTO area(restaurant_id, body, created_at) VALUES (5, 'Having decided to take my mum for afternoon tea to celebrate her 60th and to cheer her up after a recent foot operation we were served tuna mayo, cucumber and cheap ham and beef tomato sandwiches which had been made a little while because they were already starting to go crispy in places!', 2015-09-20);

-- ratings
INSERT INTO area(restaurant_id, rating, created_at) VALUES (1, 1, 2016-05-06);
INSERT INTO area(restaurant_id, rating, created_at) VALUES (2, 1, 2020-02-24);
INSERT INTO area(restaurant_id, rating, created_at) VALUES (3, 1, 2019-04-05);
INSERT INTO area(restaurant_id, rating, created_at) VALUES (4, 5, 2020-11-02);
INSERT INTO area(restaurant_id, rating, created_at) VALUES (5, 1, 2015-09-20);