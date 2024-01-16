const express = require('express');
const router = express.Router();
const { Chapter, Story } = require('../models');
const Validator = require('fastest-validator');

const v = new Validator();

// Validator schema for chapter data
const chapterSchema = {
  story_id: { type: 'string', positive: true, integer: true },
  chapter_title: { type: 'string', min: 3 },
  story_chapter: { type: 'string' },
  last_updated: { type: 'date', convert: true },
};

// Validation function
const validateChapter = (data) => {
  const validationResult = v.validate(data, chapterSchema);

  if (validationResult !== true) {
    return { error: 'Validation Error', details: validationResult };
  }

  return null;
};

// GET all chapters
router.get('/', async (req, res) => {
  try {
    const chapters = await Chapter.findAll({
      include: [
        {
          model: Story,
          as: 'story',
        },
      ],
    });
    res.json(chapters);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET chapter by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const chapter = await Chapter.findByPk(id, {
      include: [
        {
          model: Story,
          as: 'story',
        },
      ],
    });
    if (!chapter) {
      return res.status(404).json({ error: 'Chapter not found' });
    }
    res.json(chapter);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// POST create a new chapter
router.post('/', async (req, res) => {
  const { story_id, chapter_title, story_chapter, last_updated } = req.body;

  // Validation
  const validationError = validateChapter({ story_id, chapter_title, story_chapter, last_updated });
  if (validationError) {
    return res.status(400).json(validationError);
  }

  try {
    const newChapter = await Chapter.create({ story_id, chapter_title, story_chapter, last_updated });
    res.status(201).json(newChapter);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
// ...

// PATCH update a chapter
router.patch('/:id', async (req, res) => {
    const { id } = req.params;
    const { story_id, chapter_title, story_chapter, last_updated } = req.body;
  
    try {
      const chapter = await Chapter.findByPk(id, {
        include: [
          {
            model: Story,
            as: 'story',
          },
        ],
      });
      if (!chapter) {
        return res.status(404).json({ error: 'Chapter not found' });
      }
  
      // Validation
      const validationError = validateChapter({ story_id, chapter_title, story_chapter, last_updated });
      if (validationError) {
        return res.status(400).json(validationError);
      }
  
      chapter.story_id = story_id || chapter.story_id;
      chapter.chapter_title = chapter_title || chapter.chapter_title;
      chapter.story_chapter = story_chapter || chapter.story_chapter;
      chapter.last_updated = last_updated || chapter.last_updated;
  
      await chapter.save();
  
      res.json(chapter);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  // DELETE a chapter
  router.delete('/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      const chapter = await Chapter.findByPk(id);
      if (!chapter) {
        return res.status(404).json({ error: 'Chapter not found' });
      }
  
      await chapter.destroy();
  
      res.json({ message: 'Chapter deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

module.exports = router;
