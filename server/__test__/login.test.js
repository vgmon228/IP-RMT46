const request = require("supertest");
const app = require("../app");
const { hashPassword } = require("../helper/bcryptjs");
const { sequelize } = require("../models");
const { queryInterface } = sequelize;



const user_1 = {
    email: 'test@mail.com',
    password: '12345'
}

describe("POST /login", () => {
    describe("Success",  () => {
        test('should return status 200 and object of access_token', async () => {
            let { status, body } = await request(app).post("/login").send(user_1)
            expect(status).toBe(200)
            expect(body).toHaveProperty("access_token", expect.any(String)) 
        })
    })
    describe("Failed",  () => {
        test('should return status 400', async () => {
            let { status, body } = await request(app).post("/login").send({
                email:"",
                password:user_1.password
            })
            expect(status).toBe(400)
            expect(body).toHaveProperty("message") 
        })

        test('should return status 400', async () => {
            let { status, body } = await request(app).post("/login").send({
                email:user_1.email,
                password:""
            })
            expect(status).toBe(400)
            expect(body).toHaveProperty("message") 
        })

        test('should return status 401', async () => {
            let { status, body } = await request(app).post("/login").send({
                email:"test@gmail.com",
                password:user_1.password
            })
            expect(status).toBe(401)
            expect(body).toHaveProperty("message") 
        })

        test('should return status 401', async () => {
            let { status, body } = await request(app).post("/login").send({
                email:user_1.email,
                password:'123456'
            })
            expect(status).toBe(401)
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