const { gql } = require('apollo-server-express');

exports.typeDefs = gql `
    type Employee {
        id: ID!
        firstname: String!
        lastname: String!
        email: String! 
        gender: String!
        salary: Float!
        message: String
        error: String
    }
    type User {
        username: String!
        email: String!
        password: String!
        message: String
        error: String
    }
    type Query {
        login(username: String!, password: String!): String
        getEmployees: [Employee]
        getEmployeeByID(id: ID!): Employee
    }
    type Mutation {
        addEmployee(firstname: String!
            lastname: String!
            email: String!
            gender: String!
            salary: Float!): Employee
        updateEmployee(id: String!
            firstname: String!
            lastname: String!
            email: String!
            gender: String!
            salary: Float!): Employee
        
        deleteEmployee(id: String!): Employee
        signup(username: String!, 
            email: String!, 
            password: String!): User
                
    }
`