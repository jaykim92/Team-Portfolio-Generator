const Employee = require("./Employee");

class Manager extends Employee {
  constructor(name, id, email, officeNumber, role) {
    super(name, id, email, role);
    this.officeNumber = officeNumber;
  }

  getOfficeNumber() {
    return this.officeNumber;
  }
}

module.exports = Manager;
