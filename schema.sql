CREATE TABLE contacts(
    id SERIAL PRIMARY KEY,
    contact_name VARCHAR(50),
    contact VARCHAR(10),
    email VARCHAR(50)
);

CREATE TABLE appointments(
    id SERIAL PRIMARY KEY,
    appointment_title VARCHAR(50),
    appointment_date DATE,
    appointment_time TIME,
);
