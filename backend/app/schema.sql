DROP TABLE IF EXISTS t_user;
DROP TABLE IF EXISTS t_appointment;

CREATE TABLE t_appointment (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    birthday TEXT NOT NULL,
    phone TEXT NOT NULL,
    address TEXT NOT NULL,
    photo TEXT NOT NULL,
    appointment TEXT NOT NULL
);

CREATE TABLE t_user (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL,
    password TEXT NOT NULL,
    token TEXT
);

INSERT INTO t_user (username, password,token) VALUES ('admin','admin',"admin");

INSERT INTO t_appointment (name, email, birthday, phone, address, photo, appointment) VALUES ('test001','test001@test.com','09/07/1970','12300','Some Where in Mexico','avatar.jpeg','2022-06-01 12:00:00');
INSERT INTO t_appointment (name, email, birthday, phone, address, photo, appointment) VALUES ('test002','test002@test.com','09/07/1971','12301','Some Where in US','avatar.jpeg','2022-06-01 12:00:00');
INSERT INTO t_appointment (name, email, birthday, phone, address, photo, appointment) VALUES ('test003','test003@test.com','09/07/1972','12302','Some Where in Britain','avatar.jpeg','2022-06-01 12:00:00');
INSERT INTO t_appointment (name, email, birthday, phone, address, photo, appointment) VALUES ('test004','test004@test.com','09/07/1974','12303','Some Where in Philipions','avatar.jpeg','2022-06-01 12:00:00');
INSERT INTO t_appointment (name, email, birthday, phone, address, photo, appointment) VALUES ('test005','test005@test.com','09/07/1975','12304','Some Where in Malaysia','avatar.jpeg','2022-06-01 12:00:00');
INSERT INTO t_appointment (name, email, birthday, phone, address, photo, appointment) VALUES ('test006','test006@test.com','09/07/1976','12305','Some Where in India','avatar.jpeg','2022-06-01 12:00:00');
INSERT INTO t_appointment (name, email, birthday, phone, address, photo, appointment) VALUES ('test007','test007@test.com','09/07/1977','12306','Some Where in China','avatar.jpeg','2022-06-01 12:00:00');
INSERT INTO t_appointment (name, email, birthday, phone, address, photo, appointment) VALUES ('test008','test008@test.com','09/07/1978','12307','Some Where in Autria','avatar.jpeg','2022-06-01 12:00:00');
INSERT INTO t_appointment (name, email, birthday, phone, address, photo, appointment) VALUES ('test009','test009@test.com','09/07/1977','12308','Some Where in Nertherland','avatar.jpeg','2022-06-01 12:00:00');
INSERT INTO t_appointment (name, email, birthday, phone, address, photo, appointment) VALUES ('test010','test010@test.com','09/07/1977','12309','Some Where in Swiden','avatar.jpeg','2022-06-01 12:00:00');
INSERT INTO t_appointment (name, email, birthday, phone, address, photo, appointment) VALUES ('test011','test011@test.com','09/07/1977','12310','Some Where in German','avatar.jpeg','2022-06-01 12:00:00');
INSERT INTO t_appointment (name, email, birthday, phone, address, photo, appointment) VALUES ('test012','test012@test.com','09/07/1977','12311','Some Where in France','avatar.jpeg','2022-06-01 12:00:00');
INSERT INTO t_appointment (name, email, birthday, phone, address, photo, appointment) VALUES ('test013','test013@test.com','09/07/1977','12312','Some Where in Zanbia','avatar.jpeg','2022-06-01 12:00:00');