# API with JWT authentication -> Node and Express

The database used was the postgresql version 13.  
In the first place, create a .env file in the root folder and change the data to your data. Example:

```.env
DBNAME=<your database>
DBHOST=<your host>
DBPORT=<your port>
DBUSER=<your dbUser>
DBPASSWORD=<your password>
```
Now the connection to the database will work. I think!.

Install the dependencies using the package.json with the command:

`npm i package.json --save`

To test the application, below has all routes to test:   

* (post) -> /user => create a user, don't forget of send your json on the request.
* (post) -> /login => return a json with jwt token. Is necessary, send **username** and **password** in the json to work.
* (get) -> /user => return your user. To it work, is need send the jwt token.