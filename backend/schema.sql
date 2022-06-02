drop table if exists t_user;
create table t_user (
    id integer primary key autoincrement,
    name string not null,
    address string not null,
    photo string not null,
    birthday string not null,
    email string not null,
    token string,
    salt string not null,
    password string not null,
    created_at datetime not null,
)