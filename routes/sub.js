    
const express = require('express')
const router = express.Router()
const Query = require('../models/Query')

// Create query
router.post('/', async (req, res) => {
  try {
    const { name, email, question } = req.body || {}
    if (!name || !email || !question) {
      return res.status(400).json({ error: 'name, email, question required' })
    }
    const q = await Query.create({ name, email, question })
    res.status(201).json(q)
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})

// List all (simple admin view - no auth in MVP)
router.get('/', async (req, res) => {
  try {
    const list = await Query.find().sort({ createdAt: -1 })
    res.json(list)
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})

// Update status (admin)
router.patch('/:id/status', async (req, res) => {
  try {
    const { status } = req.body || {}
    if (!['OPEN', 'IN_PROGRESS', 'RESOLVED'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status' })
    }

    const q = await Query.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    )

    if (!q) return res.status(404).json({ error: 'Not found' })
    res.json(q)
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})

module.exports = router
