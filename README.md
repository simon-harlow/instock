# InStock

## 📦 Setup for Team Members

Steps to setup local environment for the project

### .env file
Copy this file to .env and replace the values with your own configuration values.

```
#The port that the server will listen on.
PORT=8080
BACKEND_URL=http://localhost
DB_LOCAL_DBNAME='instock'
DB_LOCAL_USER='root'
DB_LOCAL_PASSWORD='your local password'
```

### MySQL DB and Data

Setup a DB called 'instock' by connecting to our local MySQL server and running the following command:

```
create database instock
```

Switch to the instock db by running command:

```
use instock
```



Run the migrations and then insert seed data by running these commands from within the server folder. This will invoke the scripts from the `package.json` file
```
npm run migrate
npm run seed
```

## 📝 Description
This was a group project and the first project where we were using a MySQL database to store data.

The site is for a company to manage the inventory of stock across multiple warehouses.

## 🧰 New Tech Stack

* `Knex.js`
* `MySQL`
* `Chakra UI`

## 👷 Contributors
* [Simon](https://github.com/simon-harlow)
* [Evan](https://github.com/evan-csj)
* [Irene](https://github.com/IreneHuynh)
* [Mahad](https://github.com/Mahad-7)

## 🎓 Authors
* [Adam](https://github.com/GInTher)
* [Paolo](https://github.com/PCRib)
* [Rajat](https://github.com/rjtbansal)
* [Roisin](https://github.com/RoisOneill)
* [Jason](https://github.com/projectyang)
