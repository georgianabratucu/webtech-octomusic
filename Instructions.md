# INSTRUCTIONS

* git clone [https://github.com/georgianabratucu/webtech-octomusic.git](https://github.com/georgianabratucu/webtech-octomusic.git)

* cd webtech-octomusic

* npm install


**If you have a version prior to v8, then you should update your version using the following commands in bash:**

* nvm install 8

* nvm use 8

* nvm alias default v8


# DATABASE CONFIGURATION

* mysql-ctl start

* mysql -u root

* create database Music;

* exit;

To create the tables you should call the endpoint **/creatingTables** and then you can play with the various CRUD operations applied to the tables.


# FRONTEND CONFIGURATION

* cd frontend

* npm install

* go to frontend -> src -> Store.js and Popup.js and change the SERVER constant with your address.

* npm run build

* npm start

# HAVE FUN!
