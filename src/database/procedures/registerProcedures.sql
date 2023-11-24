CREATE OR ALTER PROCEDURE registerUser(
    @member_id VARCHAR(100),
    @first_name VARCHAR(200),
    @last_name VARCHAR(200),
    @email VARCHAR(300),
    @cohort_number INT NOT NULL,
    @phone_number VARCHAR(20),
    @password VARCHAR(200))
AS
BEGIN

   INSERT INTO members (member_id, email, cohort_number, first_name, last_name,password,phone_number)
    VALUES(@member_id, @email, @cohort_number, @first_name, @last_name,@password,@phone_number)
END
