<!--
Hey, thanks for using the awesome-readme-template template.  
If you have any enhancements, then fork this project and create a pull request 
or just open an issue with the label "enhancement".

Don't forget to give this project a star for additional support ;)
Maybe you can mention me or this repo in the acknowledgements too
-->
  <div align="center">

  <img src="public/images/logo-full.png" alt="logo" width="500" height="auto" />
  <h1>About</h1>
  </div>
  <p>
  SmartShopper is a web application that has been developed as an interactive application to help the client find cheapest hardware items online by comparing between ebay, gumtree and amazon

  The project has been developed using Javascript, HTML and CSS. MongoDB has been used to store all patient information and the application had been deployed on Heroku(Since Heroku is a paid service, being on a student budget, we could only maintain the deployment for the duration of the subject).
  Further information on the tech-stack and features can be found below.

    
  
  </p>
   

<br />


<!-- TechStack -->
### :space_invader: Tech Stack

<details>
  <summary>Client</summary>
  <ul>
    <li><a href="https://nodejs.org/en/">Node.js</a></li>
    <li><a href="https://handlebarsjs.com/">Handlebars </a></li>
  </ul>
</details>

<details>
  <summary>Server</summary>
  <ul>
    <li><a href="https://expressjs.com/">Express.js</a></li>
  </ul>
</details>

<details>
<summary>Database</summary>
  <ul>
    <li><a href="https://www.mongodb.com/">MongoDB</a></li>
  </ul>
</details>

<details>
<summary>DevOps</summary>
  <ul>
    <li><a href="https://www.passportjs.org/">Passport.js</a></li>
  </ul>
</details>

<!-- Env Variables -->
### :key: Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`MONGO_URL="mongodb+srv://username:password@cluster0.gv1sn.mongodb.net/test"`

<!-- Getting Started -->
## 	:toolbox: Getting Started

<!-- Prerequisites -->
### :bangbang: Prerequisites

This project uses npm as package manager

```bash
 npm install --package here
```

<!-- Run Locally -->
### :running: Run Locally

Clone the project

```bash
  git clone https://github.com/Sanskar-Agarwal/Diabetes-Home-App/
```

Go to the project directory

```bash
  cd Diabetes-Home-App
```

Install dependencies

```bash
  npm install luxon
  npm install express-validator
  npm install express
  npm install passport
  npm install bcrypt
```

Start the server

```bash
  node app.js
  or
  nodemon app.js
```
