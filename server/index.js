import express from 'express'
import cors from 'cors'
import { createProxyMiddleware } from 'http-proxy-middleware'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const PORT = 4000 // Change if needed

app.use(cors())

app.use(
  '/api',
  createProxyMiddleware({
    target: process.env.API_URL, // Replace with your actual API
    changeOrigin: true,
    secure: false,
    pathRewrite: { '^/api': '' } // Remove "/api" prefix
  })
)

app.listen(PORT, () => {
  console.log(`Proxy server running at http://localhost:${PORT}`)
})
