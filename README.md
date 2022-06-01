# python_work


## Restful Api
| api | method | Data| Description |
|----------|--------|-------------|----------|
|index       |  get|None |login page,no server required|
|user/register|post|name, birthday,phone number,email, addr,photo|user registration|
|user/login|post|email or phone| a login page|
|user/list|post|None|list all users, only for admin?|
|user/logout|get|None|logout the server|

## DB

### Mongo
docker + mongodb
```js
{
    'name':string,
    'birthday':ISODateTime,
    'phone':string,
    'email':string,
    'address':string,
    'photo':string,
    'salt':string,
    'token':string
}
```
### sqlite
```sql
CREATE TABLE t_user IF NOT EXSIT {

}
```