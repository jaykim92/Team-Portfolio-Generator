const BetterEmployee = require("./lib/BetterEmployee");
// const Manager = require("./lib/Manager");
// const Engineer = require("./lib/Engineer");
// const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const teamArray = [];
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");
const render = require("./lib/htmlRenderer");

// define the questions that will be asked in the CLI
// const managerQuestions = [
//   {
//     type: "input",
//     message: "Enter manager's name",
//     name: "name",
//   },
//   {
//     type: "input",
//     message: "Enter manager's email",
//     name: "email",
//   },
//   {
//     type: "input",
//     message: "Enter office number",
//     name: "officeNumber",
//   },
//   {
//     type: "input",
//     message: "Enter manager position title",
//     name: "role",
//   },
// ];

// const engineerQuestions = [
//   {
//     type: "input",
//     message: "Enter engineer's name",
//     name: "name",
//   },
//   {
//     type: "input",
//     message: "Enter engineer's email",
//     name: "email",
//   },
//   {
//     type: "input",
//     message: "Enter engineer's GitHub username",
//     name: "github",
//   },
//   {
//     type: "input",
//     message: "Enter engineer position title",
//     name: "role",
//   },
// ];

// const internQuestions = [
//   {
//     type: "input",
//     message: "Enter intern's name",
//     name: "name",
//   },
//   {
//     type: "input",
//     message: "Enter intern's email",
//     name: "email",
//   },
//   {
//     type: "input",
//     message: "Enter intern's school",
//     name: "school",
//   },
//   {
//     type: "input",
//     message: "Enter intern position title",
//     name: "role",
//   }
// ];

// const additional = [
//   {
//     type: "list",
//     message: "Select a team member to add?",
//     name: "additional",
//     choices: ["Manager", "Engineer", "Intern", "None"],
//   },
// ];

// function used to get user input and push to teamArray
// function addManager() {
//   inquirer.prompt(managerQuestions).then(function (response) {
//     const newManager = new Manager(
//       response.name,
//       teamArray.length + 1,
//       response.email,
//       response.officeNumber,
//       response.role
//     );
//     teamArray.push(newManager);
//     addMembers();
//   });
// }

// function addEngineer() {
//   inquirer.prompt(engineerQuestions).then(function (response) {
//     const newEngineer = new Engineer(
//       response.name,
//       teamArray.length + 1,
//       response.email,
//       response.github,
//       response.role
//     );
//     teamArray.push(newEngineer);
//     addMembers();
//   });
// }

// function addIntern() {
//   inquirer.prompt(internQuestions).then(function (response) {
//     const newIntern = new Intern(
//       response.name,
//       teamArray.length + 1,
//       response.email,
//       response.school,
//       response.role
//     );
//     teamArray.push(newIntern);
//     addMembers();
//   });
// }

// function addMembers() {
//   inquirer.prompt(additional).then(function (response) {
//     if (response.additional === "Manager") {
//       addManager();
//     } else if (response.additional === "Engineer") {
//       addEngineer();
//     } else if (response.additional === "Intern") {
//       addIntern();
//     } else {
//       console.log(teamArray)
//       generateHTML();
//     }
//   });
// }

// function to generate html
// function generateHTML() {
//   // generate here
//   fs.writeFile(outputPath, render(teamArray), function(err) {
//     if(err) throw err;
//   })
// };

// function to initialize the CLI
// addMembers();

// ______________________________________
// below is refactored code to reduce repetitiveness
const questions = [
  {
    type: "list",
    message: "Select a team member to add?",
    name: "title",
    choices: ["Manager", "Engineer", "Intern"],
  },
  {
    type: "input",
    message: "Enter team member's name",
    name: "name",
  },
  {
    type: "input",
    message: "Enter team member's email",
    name: "email",
  },
  {
    type: "input",
    message: "Enter team member position title",
    name: "role",
  },
  {
    type: "input",
    message: "Enter manager's office number",
    name: "officeNumber",
    when: (res) => res.title === "Manager",
  },
  {
    type: "input",
    message: "Enter engineer's GitHub username",
    name: "github",
    when: (res) => res.title === "Engineer",
  },
  {
    type: "input",
    message: "Enter intern's school",
    name: "school",
    when: (res) => res.title === "Intern",
  },
];

const additional = [
  {
    type: "list",
    message: "Add a team member?",
    name: "continue",
    choices: ["Yes", "No"],
  },
]

function getTeam() {
  inquirer.prompt(questions).then(function (res) {
    const newEmployee = new BetterEmployee(
      res.name,
      teamArray.length + 1,
      res.email,
      res.officeNumber,
      res.github,
      res.school,
      res.role
    );
    teamArray.push(newEmployee);
    addMembers();
  });
}

function generateHTML() {
  // generate here
  fs.writeFile(outputPath, render(teamArray), function (err) {
    if (err) throw err;
  });
}

function addMembers() {
  inquirer.prompt(additional).then((res) => {
    // repeat the push to teamArray if there is another team member to add
    if (res.continue === "Yes") {
      getTeam();
    }

    generateHTML();
  });
}

getTeam();
