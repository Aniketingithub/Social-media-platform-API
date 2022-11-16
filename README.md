# Social Media Platform API


A social media platform API which supports features like getting a user profile, follow a user, upload a post, delete a post, like a post, unlike a liked post, and comment on a post.

- [Features](https://github.com/Aniketingithub/reunion-assignment-aniket/tree/master#features)
- [Tech Stack Used](https://github.com/Aniketingithub/reunion-assignment-aniket/tree/master#tech-stack-used)
- [Dependencies](https://github.com/Aniketingithub/reunion-assignment-aniket/tree/master#dependencies-used)
- [Installation](https://github.com/Aniketingithub/reunion-assignment-aniket/tree/master#installation)
- [API Endpoints](https://github.com/Aniketingithub/reunion-assignment-aniket/tree/master#api-endpoints)
- [Hosted Link](https://github.com/Aniketingithub/Social-media-platform-API/tree/master#hosted-link)

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
gh repo clone Aniketingithub/Social-media-platform-API
```

Install the required dependencies.

```sh
npm install
```

Create a .env file in your root directory and add following variables in it.
| Variable name | Its use |
| ---- | ---- |
| `MONGO_URL` | URL to your mongodb atlas database |
|  | mongodb+srv://`<username>`:`<password>`@cluster0.xjzfs.mongodb.net/`<databaseName>`?retryWrites=true&w=majority |
| `ACCES_TOKEN_SECRET` | A secret key for hashing passwords and generating tokens |
| `PORT` | Provide the port in which the server will start |

Start the server.
```sh
node index.js
```
The Server will start running at the provided `Port number`.

## API Endpoints

- POST `/api/authenticate/register` registers a user and returns the user.
- POST `/api/authenticate` should perform user authentication and return a JWT token.
    - INPUT: Email, Password
    - RETURN: JWT token

- POST `/api/follow/{id}` authenticated user would follow user with {id}

- POST `/api/unfollow/{id}` authenticated user would unfollow a user with {id}

- GET `/api/user` should authenticate the request and return the respective user profile.
    - RETURN: User Name, number of followers & followings.

- POST `api/posts/` would add a new post created by the authenticated user.
    - Input: Title, Description
    - RETURN: Post-ID, Title, Description, Created Time(UTC).
   
- DELETE `/api/posts/{id}` would delete post with {id} created by the authenticated user.

- POST `/api/like/{id}` would like the post with {id} by the authenticated user.

- POST `/api/unlike/{id}` would unlike the post with {id} by the authenticated user.

- POST `/api/comment/{id}` add comment for post with {id} by the authenticated user.
    - Input: Comment
    - Return: Comment-ID

- GET `/api/posts/{id}` would return a single post with {id} populated with its number of likes and comments

- GET `/api/all_posts` would return all posts created by authenticated user sorted by post time.
    - RETURN: For each post return the following values
        - id: ID of the post
        - title: Title of the post
        - desc: Description of the post
        - created_at: Date and time when the post was created
        - comments: Array of comments, for the particular post
        - likes: Number of likes for the particular post

## Hosted Link
```sh
https://social-media-9vbv.onrender.com/
```
