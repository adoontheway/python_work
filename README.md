# python_work


## Tech Stack

### Client
* react/react-datepicker
* axios
* bootstrap - ui
* cnpm

### Server
* flask
* sqlite
* conda

### db
please refer to [shcema.sql](./backend/schema.sql)

## How to run 
```sh
./start.sh
```

## Screenshots
login page, include register hyper link and login logic
![Login](./screenshots/login.png)

register page, include login hyper link and forms for register 
![Register](./screenshots/register.png)

user list, only for admin check users, include a simple pager
![list](./screenshots/list.png)

## Design
### Restful Api
| api | method | Data| Description |
|----------|--------|-------------|----------|
|index       |  get|None |login page,only frontend,no server required|
|user/register|post|name, birthday,phone number,email, addr,photo|user registration|
|user/login|post|email or phone| a login page|
|user/list|post|None|list all users, only for admin?|


## Test
apologize for this, no time to apply unit test for both side.