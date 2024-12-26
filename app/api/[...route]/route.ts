import { db } from '@/utils/prisma'
import { Hono } from 'hono'
import { handle } from 'hono/vercel'

// export const runtime = 'edge'

const app = new Hono().basePath('/api')

app.get('/inquirys', async (c) => {
  const inquirys = await db.inquiry.findMany()

  return c.json({
    message: 'success',
    inquirys: inquirys
  })
})

app.get('/hello', (c) => {
  return c.json({
    message: 'Hello from Hono!'
  })
})

app.get('/hello/:name', (c) => {
  const name = c.req.param("name")
  return c.json({
    message: `Hello from ${name}!`
  })
})

app.get('/hoge', (c) => {
  return c.json({
    message: 'hoge'
  })
})

export const GET = handle(app)
