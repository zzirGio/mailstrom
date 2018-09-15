USE `mailstrom`;

INSERT INTO User (UserName, Email, Password) VALUES ('alice', 'alice@test.com', 'wonderland');
INSERT INTO User (UserName, Email, Password) VALUES ('bob', 'bob@test.com', 'cheeseburger');
INSERT INTO User (UserName, Email, Password) VALUES ('carol', 'carol@test.com', 'christmas');
INSERT INTO User (UserName, Email, Password) VALUES ('eve', 'eve@test.com', 'allyourbase');

INSERT INTO Contact (UserId, Name, PhoneNumber) VALUES (1, 'Bob', '1234');
INSERT INTO Contact (UserId, Name, PhoneNumber) VALUES (1, 'Carol', '1234');
INSERT INTO Contact (UserId, Name, PhoneNumber) VALUES (1, 'Eve', '1234');

INSERT INTO Message (UserId, ContactId, Content) VALUES (1, 1, 'Hello, Bob');
INSERT INTO Message (UserId, ContactId, Content) VALUES (1, 2, 'Hello, Carol');
INSERT INTO Message (UserId, ContactId, Content) VALUES (1, 3, 'Who are you?');
