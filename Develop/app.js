const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const teamArray = [];

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)\

// define the questions that will be asked in the CLI
const managerQuestions = [
  {
    type: "input",
    message: "Enter manager's name",
    name: "name",
  },
  {
    type: "input",
    message: "Enter manager's email",
    name: "email",
  },
  {
    type: "input",
    message: "Enter office number",
    name: "officeNumber",
  },
  {
    type: "input",
    message: "Enter manager position title",
    name: "role",
  },
];

const engineerQuestions = [
  {
    type: "input",
    message: "Enter engineer's name",
    name: "name",
  },
  {
    type: "input",
    message: "Enter engineer's email",
    name: "email",
  },
  {
    type: "input",
    message: "Enter engineer's GitHub username",
    name: "github",
  },
  {
    type: "input",
    message: "Enter engineer position title",
    name: "role",
  },
];

const internQuestions = [
  {
    type: "input",
    message: "Enter intern's name",
    name: "name",
  },
  {
    type: "input",
    message: "Enter intern's email",
    name: "email",
  },
  {
    type: "input",
    message: "Enter intern's school",
    name: "school",
  },
  {
    type: "input",
    message: "Enter intern position title",
    name: "role",
  }
];

const additional = [
  {
    type: "list",
    message: "Select a team member to add?",
    name: "additional",
    choices: ["Manager", "Engineer", "Intern", "None"],
  },
];

// function used to get user input and push to teamArray
function addManager() {
  inquirer.prompt(managerQuestions).then(function (response) {
    const newManager = new Manager(
      response.name,
      teamArray.length + 1,
      response.email,
      response.officeNumber,
      response.role
    );
    teamArray.push(newManager);
    addMembers();
  });
}

function addEngineer() {
  inquirer.prompt(engineerQuestions).then(function (response) {
    const newEngineer = new Engineer(
      response.name,
      teamArray.length + 1,
      response.email,
      response.github,
      response.role
    );
    teamArray.push(newEngineer);
    addMembers();
  });
}

function addIntern() {
  inquirer.prompt(internQuestions).then(function (response) {
    const newIntern = new Intern(
      response.name,
      teamArray.length + 1,
      response.email,
      response.school,
      response.role
    );
    teamArray.push(newIntern);
    addMembers();
  });
}

function addMembers() {
  inquirer.prompt(additional).then(function (response) {
    if (response.additional === "Manager") {
      addManager();
    } else if (response.additional === "Engineer") {
      addEngineer();
    } else if (response.additional === "Intern") {
      addIntern();
    } else {
      console.log(teamArray)
      generateHTML();
    }
  });
}

// function to generate html
function generateHTML() {
  // generate here
  fs.writeFile(outputPath, render(teamArray), function(err) {
    if(err) throw err;
  })
};

// function to initialize the CLI
addMembers();

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.
