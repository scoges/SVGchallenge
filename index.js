const inquirer = require("inquirer");
const fs = require("fs");
const { Triangle, Square, Circle } = require("./lib/shapes");

function createLogoFile(fileName, answers) {
  let svgString = `
<svg width="300" height="200" xmlns="http://www.w3.org/2000/svg">
  <g>
    ${answers.shape}
`;

  let shapeChoice;

  if (answers.shape === "Triangle") {
    shapeChoice = new Triangle();
    svgString += `
      <polygon points="150, 18 244, 182 56, 182" fill="${answers.shapeBackgroundColor}"/>
    `;
  } else if (answers.shape === "Square") {
    shapeChoice = new Square();
    svgString += `
      <rect x="73" y="40" width="160" height="160" fill="${answers.shapeBackgroundColor}"/>
    `;
  } else {
    shapeChoice = new Circle();
    svgString += `
      <circle cx="150" cy="115" r="80" fill="${answers.shapeBackgroundColor}"/>
    `;
  }

  svgString += `
    <text x="150" y="130" text-anchor="middle" font-size="40" fill="${answers.textColor}">${answers.text}</text>
  </g>
</svg>
`;

  fs.writeFile(fileName, svgString, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Logo has been created: logo.svg");
    }
  });
}

function getUserInput() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "Enter the text for your logo (up to three characters):",
        name: "text",
      },
      {
        type: "input",
        message: "Choose text color (color keyword or hexadecimal number):",
        name: "textColor",
      },
      {
        type: "list",
        message: "Select a shape for your logo:",
        choices: ["Triangle", "Square", "Circle"],
        name: "shape",
      },
      {
        type: "input",
        message: "Choose shape color (color keyword or hexadecimal number):",
        name: "shapeBackgroundColor",
      },
    ])
    .then((answers) => {
      if (answers.text.length > 3) {
        console.log("Text should be no more than three characters.");
        getUserInput();
      } else {
        createLogoFile("logo.svg", answers);
      }
    });
}

getUserInput();