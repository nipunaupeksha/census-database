# census-database
## Steps
### Step 01
Create a database in mySQL which named census or any other name, and add the mySQL configurations in `mysql-connection.js` file.

### Step 02
install nodeJS and npm in to your machine and check whether they are configured properly by running `npm -v` or `node -v` commands in terminal.
If they are running correctly go to project folder where `package.json` file located thorugh `cmd` and run `npm install` command. then make sure to run `npm install -g nodemon`.
which is to install the server. 

### Step 03
Run `nodemon start` and then server will be up, go to your browser and type `localhost:8080/census/getAllStates` in address bar it will make sure to send https call to get data and save them in mySQL.
to store all the data, go to file `Server/routes/census-routes.js` and run all the paths mentioned in there in browser, make sure to run one by one.
