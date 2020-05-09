class BetterEmployee {
  // pass through data of user input via inquirer response
  constructor(name, id, email, officeNumber, github, school, role) {
    this.name = name;
    this.id = id;
    this.email = email;
    this.officeNumber = officeNumber;
    this.github = github;
    this.school = school;
    this.role = role || "Employee";
  }

  getListItem() {
    if (this.officeNumber) {
        return `<li class="list-group-item">Office number: ${this.officeNumber}</li>`
    } else if (this.github) {
        return `<li class="list-group-item">GitHub: ${this.github}</li>`
    } else if (this.school) {
        return `<li class="list-group-item">School: ${this.school}</li>`

    }
  }

  getHTML() {
    return `
      <div class="card employee-card">
          <div class="card-header">
              <h2 class="card-title">${this.name}</h2>
              <h3 class="card-title"><i class="fas fa-mug-hot mr-2"></i>${this.role}</h3>
          </div>
          <div class="card-body">
              <ul class="list-group">
                  <li class="list-group-item">ID: ${this.id}</li>
                  <li class="list-group-item">Email: <a href="mailto:${this.email}">${this.email}</a></li>
                  ${this.getListItem()}
              </ul>
          </div>
      </div>`;
  }
}

module.exports = BetterEmployee;
