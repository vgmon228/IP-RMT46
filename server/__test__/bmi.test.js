const request = require("supertest");
const app = require("../app");
const { hashPassword } = require("../helper/bcryptjs");
const { sequelize } = require("../models");
const { signToken } = require("../helper/jwt");
const { queryInterface } = sequelize;


let access_token

describe.skip("POST /bmi", () => {
    describe("Success", () => {
        test('should return status 200', async () => {
            let { status, body } = await request(app).post("/bmi").set("Authorization", "Bearer " + access_token).send({
                height: 175,
                weight: 80
            })
            expect(status).toBe(200)
            expect(body).toHaveProperty("bmi")
            expect(body).toHaveProperty("status")
        })
    })

    describe("Failed", () => {
        test('should return status 400', async () => {
            let { status, body } = await request(app).post("/bmi").set("Authorization", "Bearer " + access_token).send({
                height:"",
                weight: 80
            })
            expect(status).toBe(400)
            expect(body).toHaveProperty("message")
        })

        test('should return status 400', async () => {
            let { status, body } = await request(app).post("/bmi").set("Authorization", "Bearer " + access_token).send({
                height: 175,
                weight: ""
            })
            expect(status).toBe(400)
            expect(body).toHaveProperty("message")
        })

        test('should return status 401', async () => {
            let { status, body } = await request(app).post("/bmi").send({
                height: 175,
                weight: 80
            })
            expect(status).toBe(401)
            expect(body).toHaveProperty("message")
        })

    })
})

beforeAll(async () => {
    await queryInterface.bulkInsert('Users', [{
        id: 1,
        username: 'test',
        email: 'test@mail.com',
        password: hashPassword('12345'),
        createdAt: new Date(),
        updatedAt: new Date()
    }], {})
    access_token = signToken({ id: 1});
})

afterAll(async () => {
    await queryInterface.bulkDelete('Users', null, { truncate: true, cascade: true, restartIdentity: true })
})