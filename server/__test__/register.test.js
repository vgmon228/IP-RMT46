const request = require("supertest");
const app = require("../app");
const { hashPassword } = require("../helper/bcryptjs");
const { sequelize } = require("../models");
const { queryInterface } = sequelize;

const user_1 = {
    email: 'test@mail.com',
    password: '12345'
}

describe("POST /register", () => {
    describe("Success", () => {
        test('should return status 201', async () => {
            let { status, body } = await request(app).post("/register").send({    
                username: 'staff',
                email:'vgmon@gmail.com',
                password: '12345',
            })
            expect(status).toBe(201)
            expect(body).toHaveProperty("username")
            expect(body).toHaveProperty("email")
        })  
    })

    describe("Failed", () => {
        test('should return status 400', async () => {
            let { status, body } = await request(app).post("/register").send({    
                username: 'staff',
                email:'test@mail.com',
                password: '12345',
            })
            console.log(body)
            expect(status).toBe(400)
            expect(body).toHaveProperty("message")
        })

        test('should return status 400', async () => {
            let { status, body } = await request(app).post("/register").send({    
                username: 'staff',
                email:'test',
                password: '12345',
            })
            console.log(body)
            expect(status).toBe(400)
            expect(body).toHaveProperty("message")
        })  

        test('should return status 400', async () => {
            let { status, body } = await request(app).post("/register").send({    
                username: '',
                email:'test',
                password: '12345',
            })
            console.log(body)
            expect(status).toBe(400)
            expect(body).toHaveProperty("message")
        }) 

        test('should return status 400', async () => {
            let { status, body } = await request(app).post("/register").send({    
                username: 'staff',
                email:'',
                password: '12345',
            })
            console.log(body)
            expect(status).toBe(400)
            expect(body).toHaveProperty("message")
        }) 

        test('should return status 400', async () => {
            let { status, body } = await request(app).post("/register").send({    
                username: 'staff',
                email:'www@www.com',
                password: '',
            })
            console.log(body)
            expect(status).toBe(400)
            expect(body).toHaveProperty("message")
        }) 
    })
})


beforeAll(async () => {
    await queryInterface.bulkInsert('Users', [{
        username: 'test',
        email: 'test@mail.com',
        password: hashPassword('12345'),
        createdAt: new Date(),
        updatedAt: new Date()
    }], {})
})

afterAll(async () => {
    await queryInterface.bulkDelete('Users', null, { truncate: true, cascade: true, restartIdentity: true })
})