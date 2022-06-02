DROP TABLE IF EXiSTS t_user;

CREATE TABLE t_user (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    birthday TEXT NOT NULL,
    phone TEXT NOT NULL UNIQUE,
    address TEXT NOT NULL,
    photo TEXT NOT NULL,
    priority INTEGER DEFAULT 0,
    token TEXT
);

INSERT INTO t_user (name, email, birthday, phone, address, photo) VALUES ('test001','test001@test.com','09/07/1970','12300','Some Where in Mexico','avatar.jpeg');
INSERT INTO t_user (name, email, birthday, phone, address, photo) VALUES ('test002','test002@test.com','09/07/1971','12301','Some Where in US','avatar.jpeg');
INSERT INTO t_user (name, email, birthday, phone, address, photo) VALUES ('test003','test003@test.com','09/07/1972','12302','Some Where in Britain','avatar.jpeg');
INSERT INTO t_user (name, email, birthday, phone, address, photo) VALUES ('test004','test004@test.com','09/07/1974','12303','Some Where in Philipions','avatar.jpeg');
INSERT INTO t_user (name, email, birthday, phone, address, photo) VALUES ('test005','test005@test.com','09/07/1975','12304','Some Where in Malaysia','avatar.jpeg');
INSERT INTO t_user (name, email, birthday, phone, address, photo) VALUES ('test006','test006@test.com','09/07/1976','12305','Some Where in India','avatar.jpeg');
INSERT INTO t_user (name, email, birthday, phone, address, photo) VALUES ('test007','test007@test.com','09/07/1977','12306','Some Where in China','avatar.jpeg');
INSERT INTO t_user (name, email, birthday, phone, address, photo) VALUES ('test008','test008@test.com','09/07/1978','12307','Some Where in Autria','avatar.jpeg');
INSERT INTO t_user (name, email, birthday, phone, address, photo) VALUES ('test009','test009@test.com','09/07/1977','12308','Some Where in Nertherland','avatar.jpeg');
INSERT INTO t_user (name, email, birthday, phone, address, photo) VALUES ('test010','test010@test.com','09/07/1977','12309','Some Where in Swiden','avatar.jpeg');
INSERT INTO t_user (name, email, birthday, phone, address, photo) VALUES ('test011','test011@test.com','09/07/1977','12310','Some Where in German','avatar.jpeg');
INSERT INTO t_user (name, email, birthday, phone, address, photo) VALUES ('test012','test012@test.com','09/07/1977','12311','Some Where in France','avatar.jpeg');
INSERT INTO t_user (name, email, birthday, phone, address, photo) VALUES ('test013','test013@test.com','09/07/1977','12312','Some Where in Zanbia','avatar.jpeg');
INSERT INTO t_user (name, email, birthday, phone, address, photo,priority) VALUES ('admin','admin@test.com','09/07/1977','11111','Some Where in NoWhere','avatar.jpeg',100);