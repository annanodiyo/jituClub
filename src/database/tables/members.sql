CREATE TABLE members (
    member_id VARCHAR(100) PRIMARY KEY,
    email VARCHAR(300),
    cohort_number INT NOT NULL,
    first_name VARCHAR(200),
    last_name VARCHAR(200),
    password VARCHAR(200),
    phone_number VARCHAR(20)
);
