CREATE TABLE contacts(
    id SERIAL PRIMARY KEY,
    contact_name VARCHAR(50) NOT NULL,
    contact VARCHAR(15),
    email VARCHAR(50) NOT NULL
);

CREATE TABLE appointments(
    id SERIAL PRIMARY KEY,
    appointment_title VARCHAR(50) NOT NULL,
    appointment_date DATE NOT NULL,
    appointment_time TIME NOT NULL
);
