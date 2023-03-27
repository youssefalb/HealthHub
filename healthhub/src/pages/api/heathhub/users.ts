import createUser from '../heathhub/createUser'

export default function handler(req, res) {
  if (req.method === 'POST') {
    createUser(req, res)
  } else {
    res.status(400).json({ error: 'Invalid request method' })
  }
}