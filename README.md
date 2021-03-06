Strive Blog API

You are in charge of creating a set of WebAPIs for the Strive Blog application.

Here you can find the Frontend already created


In this first "step" the application should enable the creation, editing, deletion, listing of blog authors.

Tomorrow you will connect to your backend from frontend that we provided and communicate with your own API.


Authors should have following information:

 

name
surname
ID (Unique and server generated)
email
date of birth
avatar (e.g. https://ui-avatars.com/api/?name=John+Doe)
 

The backend should include the following routes:

 

GET /authors => returns the list of authors
GET /authors/123 => returns a single author
POST /authors => create a new author
PUT /authors/123 => edit the author with the given id
DELETE /authors/123 => delete the author with the given id
 

The persistence must be granted via file system (es.: Json file with a list of authors inside)

 

Sidenote: remember to install the cors package with 'npm i cors', to import it with the import statement and to use it with 'server.use(cors())'

 

Extra
POST authors/checkEmail => check if another author has the same email. The parameter should be passed in the body. It should return true or false.

It should not be possible to add a new author (with POST /authors) if another has the same email.