const request = require('supertest');

const app = require('../app')

let studentId;

const student = {
    firstName: "Antony",
    lastName: "Alanya",
    birthday: "2020-08-15",
    program: "Mate"
}

const BASE_URL = '/api/v1/students'

test("POST => BASE_URL, should statusCode(201), and res.body.firstName === student.firstName", async()=> {
    const res = await request(app)
    .post(BASE_URL)
    .send(student)

    studentId = res.body.id 
    expect(res.status).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe(student.firstName)
});

test("GET => BASE_URL, should return status(200), and res.body.length === 1", async()=> {
    const res = await request(app)
    .get(BASE_URL)
    
    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
});

test("GET ONE => BASE_URL/studentId/, should return statusCode 200, and res.body.firstName === student.firstName ", async()=> {
    const res = await request(app)
    .get(`${BASE_URL}/${studentId}`)

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe(student.firstName)
});

test("PUT => BASE_URL/studentId/, should return statusCode 200, and res.body.firstName === studentUpdate.firstName", async()=> {
    const studentUpdate = {
        firstName: 'Vianey',
        lastName: 'Reyes'
    }

    const res = await request(app)
    .put(`${BASE_URL}/${studentId}`)
    .send(studentUpdate)

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe(studentUpdate.firstName)
});