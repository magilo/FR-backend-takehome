# MG Rewards
Web service for adding and spending rewards points in user account.

<!-- # Project Name
> Outline a brief description of your project.
> Live demo [_here_](https://www.example.com).  -->
<!-- If you have the project hosted somewhere, include the link here. -->

## About
This project was created as an exercise to practice Test-Driven Development (TDD) and to review foundational concepts of a REST API. I took the opportunity to set this project up from scratch in order to learn more about the role of Express in backend development. It was also the first time I assembled documentation using Swagger as I needed an interface to present my API.
<!-- Backend API project
- Provide general information about your project here.
- What problem does it (intend to) solve?
- What is the purpose of your project?
- Why did you undertake it? -->
<!-- You don't have to answer all the questions - just the ones relevant to your project. -->

## Technologies Used
- Node.js - v14.17.0
- Express - v4.17.2
- [SQLite3 - v5.0.2](https://github.com/mapbox/node-sqlite3)
- [Sequelize - v6.15.0](https://github.com/sequelize/sequelize)
- Jest - v27.4.7

Notes:
<br>
I picked SQLite as the database for this project because I found out about in-memory databases only recently and I wanted to try using one. SQLite is prototype friendly and easy to set up. However, SQLite doesn't seem to be deployment friendly.

## Features
- Transactions can be added for points
- Points can be spent
- Get remaining points balance


## Project Preview
<a href="https://www.loom.com/share/debf58d88cdf4a9b9c69d4257d802b91">
    <p>MG Rewards API - Watch Video</p>
    <img style="max-width:300px;" src="https://cdn.loom.com/sessions/thumbnails/debf58d88cdf4a9b9c69d4257d802b91-with-play.gif">
  </a>



## Setup
#### Setup for project on local environment:
- You will need `node` and `npm` installed globally on your machine.
- Git fork this repository into your desired directory. [Quickstart Guide](https://docs.github.com/en/get-started/quickstart/fork-a-repo)

#### Install dependencies:
```sh
npm install
```

#### Start local server:
```sh
npm start
```
- Open `http://localhost:3000/api-docs/#/` in your browser to access api docs.
- Nodemon will watch for any changes in the files


#### Run tests:
```sh
npm test
```
- Jest will watch for any changes in the files


#### Notes:
- Make sure your Node version is at least version 14.
- Please note swagger-jsdoc is using v6.0.0 in this project. Other versions are not guaranteed to work.


<!-- What are the project requirements/dependencies? Where are they listed? A requirements.txt or a Pipfile.lock file perhaps? Where is it located?

Proceed to describe how to install / setup one's local environment / get started with the project.
- tests are setup in watchmode
- file updates are setup in watchmode through nodemon -->


<!-- ## Usage
How does one go about using it?
Provide various use cases and code examples here.

`write-your-code-here` -->


<!-- ## Project Status
Project is: _in progress_ / _complete_ / _no longer being worked on_. If you are no longer working on it, provide reasons why. -->


## Room for Improvement
#### Room for improvement:
- missing validation and error handling inside routes
- could have better error handling endware for routes
- more thorough tests that handle edge cases and invalid inputs
- better interfacing between route and resources

  e.g rename /api/transactions/{payer} ---> /api/transactions/add

#### To do:
- research best practices for REST Architecture
- research some ways to deploy projects with SQLite


## Acknowledgements
Tutorials used for this project:
- [Rest application with Node JS Express & Sequelize & SQLite](https://youtu.be/bWFuEVmRgdk)
- [Test Driven Development - TDD with Node js Express](https://youtu.be/dTn_biKznU4)
- [Document an Express API with Swagger UI and JSDoc](https://dev.to/kabartolo/how-to-document-an-express-api-with-swagger-ui-and-jsdoc-50do)
- [Splitting your swagger spec into multiple files in a Node project](https://www.codementor.io/@peteradeoye/splitting-your-swagger-spec-into-multiple-files-in-a-node-project-nuprc0mej)
- [How to write a good README for your GitHub project?](https://bulldogjob.com/news/449-how-to-write-a-good-readme-for-your-github-project)

<!-- Give credit here.
- This project was inspired by...
- This project was based on [this tutorial](https://www.example.com).
- Many thanks to... -->


<!-- ## Contact
Created by [@flynerdpl](https://www.flynerd.pl/) - feel free to contact me! -->




<!-- ## Table of Contents
* [General Info](#general-information)
* [Technologies Used](#technologies-used)
* [Features](#features)
* [Screenshots](#screenshots)
* [Setup](#setup)
* [Usage](#usage)
* [Project Status](#project-status)
* [Room for Improvement](#room-for-improvement)
* [Acknowledgements](#acknowledgements)
* [Contact](#contact)
* [License](#license) -->
