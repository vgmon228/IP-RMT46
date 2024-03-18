const request = require("supertest");
const app = require("../app");
const { hashPassword } = require("../helper/bcryptjs");
const { sequelize } = require("../models");
const { queryInterface } = sequelize;
const { signToken } = require("../helper/jwt");

let access_token

describe("POST /exercise", () => {
    describe("Success", () => {
        test('should return status 200', async () => {
            let { status, body } = await request(app).post("/exercise").set("Authorization", "Bearer " + access_token).send({
                name: "Incline Hammer Curls",
                type: "strength",
                equipment: "dumbbell",
                difficulty: "beginner",
                instructions: "Seat yourself on an incline bench with a dumbbell in each hand. You should pressed firmly against he back with your feet together. Allow the dumbbells to hang straight down at your side, holding them with a neutral grip. This will be your starting position. Initiate the movement by flexing at the elbow, attempting to keep the upper arm stationary. Continue to the top of the movement and pause, then slowly return to the start position.",
                MuscleId: 1,
            })
            expect(status).toBe(201)
            expect(body).toHaveProperty("name")
            expect(body).toHaveProperty("type")
            expect(body).toHaveProperty("MuscleId")
            expect(body).toHaveProperty("equipment")
            expect(body).toHaveProperty("difficulty")
        })
    })

    describe("Failed", () => {
        test('should return status 400', async () => {
            let { status, body } = await request(app).post("/exercise").set("Authorization", "Bearer " + access_token).send({
                name: "",
                type: "strength",
                equipment: "dumbbell",
                difficulty: "beginner",
                instructions: "Seat yourself on an incline bench with a dumbbell in each hand. You should pressed firmly against he back with your feet together. Allow the dumbbells to hang straight down at your side, holding them with a neutral grip. This will be your starting position. Initiate the movement by flexing at the elbow, attempting to keep the upper arm stationary. Continue to the top of the movement and pause, then slowly return to the start position.",
                MuscleId: 1,
            })
            expect(status).toBe(400)
            expect(body).toHaveProperty("message")
        })

        test('should return status 401', async () => {
            let { status, body } = await request(app).post("/exercise").send({
                name: "Incline Hammer Curls",
                type: "strength",
                equipment: "dumbbell",
                difficulty: "beginner",
                instructions: "Seat yourself on an incline bench with a dumbbell in each hand. You should pressed firmly against he back with your feet together. Allow the dumbbells to hang straight down at your side, holding them with a neutral grip. This will be your starting position. Initiate the movement by flexing at the elbow, attempting to keep the upper arm stationary. Continue to the top of the movement and pause, then slowly return to the start position.",
                MuscleId: 1,
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
    access_token = signToken({ id: 1 });
    await queryInterface.bulkInsert('Muscles', [{
        name: 'biceps',
        createdAt: new Date(),
        updatedAt: new Date()
    }], {})
})

afterAll(async () => {
    await queryInterface.bulkDelete('Users', null, { truncate: true, cascade: true, restartIdentity: true })
    await queryInterface.bulkDelete('Muscles', null, { truncate: true, cascade: true, restartIdentity: true })
    await queryInterface.bulkDelete('Exercises', null, { truncate: true, cascade: true, restartIdentity: true })
})