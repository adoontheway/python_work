# python_work


# Tech Stack

## Client
* react/react-datepicker
* axios
* bootstrap
* cnpm

## Server
* django
* conda

# Design
## Restful Api
| api | method | Data| Description |
|----------|--------|-------------|----------|
|index       |  get|None |login page,no server required|
|user/register|post|name, birthday,phone number,email, addr,photo|user registration|
|user/login|post|email or phone| a login page|
|user/list|post|None|list all users, only for admin?|
|user/logout|get|None|logout the server|


## Storage

### 1.Mongo
I can not sure docker is install on you guys device.
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
### 2.sqlite
```sql

```
### 3.local file system

```sh
./data/dat
```
| name | byte-length | description |
| ------- | -------- | ----------- |
| version   | 8 | .dat version |
| enc type | 8 | data encryption type |
| compress algorithm| 8 | compress algorithm type |
| length | 32 | data length |
| data | length | the local data itself |

## Test
no time for unit test now