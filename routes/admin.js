// routes/admin.js
const express = require('express')
const router = express.Router()
const Query = require('../models/Query')

// List all queries (Admin)
router.get('/queries', async (req, res) => {
  try {
    const list = await Query.find().sort({ createdAt: -1 })
    res.json(list)
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})

// Update status (Admin)
router.patch('/queries/:id/status', async (req, res) => {
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
