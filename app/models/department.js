const CoreModel = require('./CoreModel');

class Department extends CoreModel {
  department_name;
  code;
 
  constructor(department) {
      super(department.id);
      this.department_name = department.department_name;
      this.code = department.code;
    
  }
};

module.exports = Department;