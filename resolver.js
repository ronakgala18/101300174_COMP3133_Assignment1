const Employee = require('./models/employeeModel');
const User = require('./models/userModel');

exports.resolvers = {
    Query: {
        getEmployees: async (parent, args) => {
            return Employee.find({})
        },
        getEmployeeByID: async (parent, args) => {
            try {
                return await Employee.findById(args.id);
            } catch (err) {
                throw new Error(`An error occurred while getting the employee`)
            }
        },

        login: async (parent, args) => {
            try {
                const user = await User.findOne({ username: args.username })

                if (user && user.password === args.password) {
                    return `User ${user.username} logged in successfully`
                } else {
                    return "Invalid username or password"
                }
            } catch (err) {
                return JSON.stringify(err.message)
            }
        }
    },

    Mutation: {
        addEmployee: async (parent, args) => {
            try {
                let newEmp = new Employee({
                    firstname: args.firstname,
                    lastname: args.lastname,
                    email: args.email,
                    gender: args.gender,
                    salary: args.salary,
                });


                return await newEmp.save()

            } catch (err) {
                throw new Error('An error occurred while creating the user')

            }
        },
        updateEmployee: async (parent, args) => {
            if (!args.firstname || !args.lastname || !args.email || !args.gender || !args.salary) {
                throw new Error(`Fields cannot be empty`)
            }
            try {

                return await Employee.findOneAndUpdate(
                    {
                        _id: args.id
                    },
                    {
                        $set: {
                            firstname: args.firstname,
                            lastname: args.lastname,
                            email: args.email,
                            gender: args.gender,
                            salary: args.salary
                        }
                    }, { new: true }
                )

            } catch (err) {
                throw new Error('An error occurred while creating the user')
            }
        },
        deleteEmployee: async (parent, args) => {
            if (!args.id) {
                throw new Error('ID can not be empty');
            }
            try {
                return await Employee.findByIdAndDelete(args.id)
            }
            catch (err) {
                throw new Error(`An error occurred while getting the employee`)
            }
        },
        signup: async (parent, args) => {
            try {
                const user = new User({
                    username: args.username,
                    email: args.email,
                    password: args.password
                })

                return await user.save()
            } catch (err) {
                throw new Error('An error occurred while creating the user')
            }
        }
    }
}