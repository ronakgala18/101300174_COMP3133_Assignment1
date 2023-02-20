const Employee = require("./models/employeeModel");

exports.getAllEmployees = async () => {
    const employees = await Employee.find();
    return {
        message: "Successfully retreived all employees!",
        employees
    };
}
exports.addEmployee= async args => {
    const employee = new Employee({
        firstname: args.firstname,
        lastname: args.lastname,
        email: args.email,
        gender: args.gender,
        salary: args.salary
    })

    try {
        await employee.save()
        message = "Employee successfully created"
        return {
            message,
            employee  
        }
        }
    catch (err) {
        if (!args.firstname || !args.lastname || !args.email || !args.gender || !args.salary) {
            throw new Error(`Fields cannot be empty`)
        }
        if (err.code === 11000) {
            const duplicateKey = Object.keys(err.keyPattern)[0];
            throw new Error(`User with this ${duplicateKey} already exists`)
        } else if (err.name === 'ValidationError') {
            throw new Error(`Invalid input format`)
        } else {
            throw new Error('An error occurred while creating the employee')
        }
    }
},

exports.getEmployeeByID= async args => {
    try {
        const employee = await Employee.findById(args.id)
        if(employee) {
        message =`Empoyee  ${employee.firstname} ${employee.lastname}} found successfully in database`
            return {
                message: message,
                employee
                
            }
    }

    } catch (err) {
        if (!args.id) {
            throw new Error(`ID field can not be empty`)
        }
        else if (err.name === 'CastError') {
            throw new Error(`Invalid employee id`)
        }
        throw new Error(`An error occurred while getting the employee`)
    }
},

exports.updateEmployeeById = async args => {
    let message = "";
    const employee =
        await Employee.findByIdAndUpdate(args.id, args, { new: true, runValidators: true })
            .catch(err => {
                if (err.name === "CastError") {
                    message = `Invalid ${err.path}: ${err.value}.`;
                } else if (err.code === 11000) { // duplicate field error
                    const duplicateValue = err.errmsg.match(/(["'])(?:(?=(\\?))\2.)*?\1/)[0];
                    message = `Duplicate field value: ${duplicateValue}. Please use another value!`;
                } else if (err.name === "ValidationError") {
                    const errors = Object.values(err.errors).map(el => el.message);
                    message = `Invalid input data. ${errors.join(". ")}`;
                }
            });

    if (message !== "") {
        return {
            message: "No data entered",
        }
    }
    if (!employee) {
        return {
            message: "Employee not found",
        }
    }
    
    return {
        message: "Successfully updated an employee",
        employee
    }
}

exports.deleteEmployeeById = async args => {
    let message = "";
    await Employee.findByIdAndRemove(args.id)
        .catch(err => {
            if (err.name === "CastError") {
                message = `Invalid ${err.path}: ${err.value}.`;
            }
        });

    if (message === "") {
        message = "Successfully Deleted!"
    }

    return message;
}