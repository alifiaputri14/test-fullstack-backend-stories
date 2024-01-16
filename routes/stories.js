const express = require('express');
const router = express.Router();
const Validator = require('fastest-validator');
const { Story, Category, Status, StoryTag } = require('../models');

const v = new Validator();

// Validator schema for story fields
const storySchema = {
  title: { type: 'string', min: 3, max: 255 },
  author: { type: 'string', min: 3, max: 255 },
  synopsis: { type: 'string', max: 5000 },
  category_id: { type: 'string', positive: true },
  story_cover: { type: 'string', max: 255 },
  status_id: { type: 'string', positive: true },
};

// GET all stories
router.get('/', async (req, res) => {
  try {
    const stories = await Story.findAll({
      include: [
        { model: Category, as: 'category' },
        { model: Status, as: 'status' },
        { model: StoryTag, as: 'story_tags' }
      ],
    });
    res.json(stories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET story by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const story = await Story.findByPk(id, {
      include: [
        { model: Category, as: 'category' },
        { model: Status, as: 'status' },
      ],
    });
    if (!story) {
      return res.status(404).json({ error: 'Story not found' });
    }
    res.json(story);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// POST create a new story
router.post('/', async (req, res) => {
  const { title, author, synopsis, category_id, story_cover, status_id } = req.body;

  // Validation
  const validationResult = v.validate({ title, author, synopsis, category_id, story_cover, status_id }, storySchema);

  if (validationResult !== true) {
    return res.status(400).json({ error: 'Validation Error', details: validationResult });
  }

  try {
    const newStory = await Story.create({ title, author, synopsis, category_id, story_cover, status_id });
    res.status(201).json(newStory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.patch('/:id', async (req, res) => {
    const { id } = req.params;
    const { title, author, synopsis, category_id, story_cover, status_id } = req.body;
  
    // Validation
    const validationResult = v.validate({ title, author, synopsis, category_id, story_cover, status_id }, storySchema);
  
    if (validationResult !== true) {
      return res.status(400).json({ error: 'Validation Error', details: validationResult });
    }
  
    try {
      const updatedStory = await Story.update(
        { title, author, synopsis, category_id, story_cover, status_id },
        { where: { story_id: id }, returning: true }
      );
  
      if (updatedStory[0] === 0) {
        return res.status(404).json({ error: 'Story not found' });
      }
  
      res.json(updatedStory[1][0]); // Send the updated story
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  // DELETE a story by ID
  router.delete('/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      const deletedRows = await Story.destroy({ where: { story_id: id } });
  
      if (deletedRows === 0) {
        return res.status(404).json({ error: 'Story not found' });
      }
  
      res.json({ message: 'Story deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

module.exports = router;
