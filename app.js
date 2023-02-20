const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

const app = express();
const userController = require("./userController");
const employeeController = require("./employeeController");

const rootValue = {
    signup: userController.signup,
    login: userController.login,
    getAllEmployees: employeeController.getAllEmployees,
    getEmployeeByID: employeeController.getEmployeeByID,
    addEmployee: employeeController.addEmployee,
    updateEmployeeById: employeeController.updateEmployeeById,
    deleteEmployeeById: employeeController.deleteEmployeeById,
} 

const schema = buildSchema(`
    type Query {
        login(username: String!, password: String!): User
        getAllEmployees: Employees
        getEmployeeByID(id: String): Employee
    },
    type Mutation {
        signup(username: String!, email: String!, password: String!): User
        addEmployee(firstname: String!, lastname: String!, email: String!, gender: String, salary: Float!): Employee
        updateEmployeeById(id: String!, firstname: String, lastname: String, email: String, gender: String, salary: Float): Employee
        deleteEmployeeById(id: String): String
    },
    type UserObject {
        username: String
        email: String
        password: String
    },
    type EmployeeObject {
        id: String
        firstname: String
        lastname: String
        email: String
        gender: String
        salary: Float
    },
    type User {
        message: String
        user: UserObject
    },
    type Employee {
        message: String
        employee: EmployeeObject
    },
    type Employees {
        message: String,
        employees: [EmployeeObject]
    }
`);

app.use('/graphql', graphqlHTTP({
  schema,
  rootValue,
  graphiql: true
}));

module.exports = app;