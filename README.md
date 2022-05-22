# Social Media Platform API


A social media platform API which supports features like getting a user profile, follow a user, upload a post, delete a post, like a post, unlike a liked post, and comment on a post.

## Features

- Authentication of user 
- CRUD (Create, Read, Update, Delete) operations on Post
- Follow / Unfollow a registered user
- Like / Dislike a Post 
- Comment on Post



## Tech stack used

Following open source projects is used to create this API:

- `Node.js` - evented I/O for the backend
- `Express` - fast node.js network app framework [@tjholowaychuk]
- `MongoDB` - MongoDB is a document database with the scalability and flexibility that you want with the querying and indexing that you need.
- `MongoDB Atlas` - Real time cloud database.

## Dependencies Used

- express
- mongoose  
- jsonwebtoken
- dotenv
- bcrypt
- cookie-parser
- morgan
- helmet

## Installation

Project requires [Node.js](https://nodejs.org/) to run.

Create a directory in your local system and clone the repository.
```sh
mkdir <dirname>
cd <dirname>
gh repo clone Aniketingithub/reunion-assignment-aniket
```

Install the required dependencies.

```sh
npm install
```

Create a .env file in your root directory and add following variables in it.
| Variable name | Its use |
| ---- | ---- |
| `MONGO_URL` | URL to your mongodb atlas database |
|  | mongodb+srv://<username>:<password>@cluster0.xjzfs.mongodb.net/<databaseName>?retryWrites=true&w=majority |
| `ACCES_TOKEN_SECRET` | A secret key for hashing passwords and generating tokens |
| `PORT` | Provide the port in which the server will start |

Start the server.
```sh
node index.js
```
The Server will start running at the provided `Port number`.
