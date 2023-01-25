# 7daysofcode-mongodb

This is a mini-project proposed at [7daysofcode](https://7daysofcode.io/matricula/mongodb) and arrived to me by [Alura](https://www.alura.com.br/).

The project consists in create an simple API to manage a list of Characters (Heros and Villains from comics). The list is shall be stored in a MongoDB database and the API shall provide the minimium CRUD operations (Create, Read, Update and Delete).

## Requirements
- [Node.js](https://nodejs.org/en/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)

## Configuration
1. Clone the repository [7daysofcode-mongodb](https://github.com/rjanuzi/7daysofcode-mongodb.git)
2. Install Node dependencies (**npm install**)
3. Configure the MongoDB connection to your data base:
    * Rename the file **"configs/db-config-template.json"** to **"configs/db-config.json"**
    * Fill the fields in the file according to your MongoDB configuration (host, db, username and password) -- **Don't share this info into you repository!!!**
4. Run the application (**npm index.js**)
5. Access the endpoints in your browser or use a tool like the VS Code Extension [REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client).
    * http://localhost/characters/all - Return all the characters in the Database.
    * http://localhost/characters/:id - Return the character with the id informed.
    * http://localhost/characters/nickname/:nick_name - Return the character with the nickname informed.
    * insertCharacter.http - Sample of how to insert a new character in the database.
    * removeCharacter.http - Sample of how to remove a character from the database.
    * updateCharacter.http - Sample of how to update a character in the database.