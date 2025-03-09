import express from 'express'
import cors from 'cors'
import { createProxyMiddleware } from 'http-proxy-middleware'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const PORT = 5050

app.use(cors())

app.use(
  '/api',
  createProxyMiddleware({
    target: process.env.API_URL,
    changeOrigin: true,
    secure: false,
    pathRewrite: { '^/api': '' }
  })
)

app.listen(PORT, () => {
  console.log(`Proxy server running at http://localhost:${PORT}`)
})
