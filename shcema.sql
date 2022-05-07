DROP TABLE IF EXISTS favoritMovies;

CREATE TABLE IF NOT EXISTS favoritMovies(
    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    overview VARCHAR(1000),
    release_date VARCHAR(1000),
    poster_path VARCHAR(1000)
);