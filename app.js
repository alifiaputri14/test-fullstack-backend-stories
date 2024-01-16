require('dotenv').config();
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors'); // Import paket cors

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const categoriesRouter = require('./routes/categories');
const statusesRouter = require('./routes/statuses');
const storiesRouter = require('./routes/stories');
const storyTagsRouter = require('./routes/story_tags');
const chaptersRouter = require('./routes/chapters');

const app = express();

app.use(logger('dev'));
app.use(cors()); // Terapkan middleware cors di sini
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/categories', categoriesRouter);
app.use('/statuses', statusesRouter);
app.use('/stories', storiesRouter);
app.use('/story-tags', storyTagsRouter);
app.use('/chapters', chaptersRouter);

module.exports = app;
