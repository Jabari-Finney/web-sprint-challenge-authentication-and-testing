const request = require('supertest')
const server = require('./../api/server')
const db = require('./../data/dbConfig')

beforeAll(async () => {
  await db.migrate.rollback()
  await db.migrate.latest()
})
afterAll(async () => {
  await db.destroy()
})
// Write your tests here
test('sanity', () => {
  expect(true).toBe(true)
})

//[POST] register
describe('[POST] /api/auth/register',()=>{
  it('Adding a new user',async()=>{
    const res = await request(server).post('/api/auth/register').send({username:'bob',password:'123'})
    expect(res.status).toBe(200)
    expect(res.body.username).toBe('bob')
  })
  it('missing adding a username',async ()=>{
    const res = await request(server).post('/api/auth/register').send({password:'123'})
    expect(res.status).not.toBe(200)
  })

})
//[POST]Login
describe('[POST] /api/auth/login',()=>{
  it('signing in with the right login',async ()=>{
    const res = await request(server).post('/api/auth/login').send({username:'bob',password:'123'})
    expect(res.status).toBe(200)
    expect(res.body).toMatchObject({message:'welcome,bob'})
  })
  it('Wrong Login',async()=>{
    const res = await request(server).post('/api/auth/login').send({username:'bobby',password:'123'})
    expect(res.status).toBe(401)
    expect(res.body).toMatchObject({message:'Invalid credentials'})
  })
  
})

describe('[GET] /api/jokes',()=>{
  it('trying to get jokes without token', async()=>{
    const res = await request(server).get('/api/jokes')
    expect(res.status).toBe(401)
    expect(res.body).toMatchObject({message:'token required'})
  })
  // it('trying to get jokes with token', async()=>{
  //   const res = await request(server).get('/api/jokes').send({Authorization:'$2a$08$miWasv8q6gkivyPCvtoG9etbpUeMoATS30Sd2FeMJGvo0QA26izoy'})
  //   expect(res.status).toBe(200)
  //   expect(res.body).toHaveLength(3)
  // })

})