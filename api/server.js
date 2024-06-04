const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');
const session = require('express-session');

const prisma = new PrismaClient();
const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use(session({
  secret: 'hemmelig',
  resave: false,
  saveUninitialized: true,
}));

app.post('/api/events', async (req, res) => {
  const { title, image, location, time } = req.body;
  const eventTime = new Date(time);

  if (isNaN(eventTime)) {
    return res.status(400).json({ error: 'Invalid time format. Please use ISO-8601 format.' });
  }

  try {
    const userId = req.session.userId; 
    const user = await prisma.user.findUnique({ where: { id: userId } });

    const event = await prisma.event.create({
      data: {
        title,
        image,
        location,
        time: eventTime,
        createdBy: user.name, 
      },
    });
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/events', async (req, res) => {
  try {
    const events = await prisma.event.findMany();
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/register', async (req, res) => {
  const { email, password, name } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
      },
    });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (user && await bcrypt.compare(password, user.password)) {
      req.session.userId = user.id; // Store the user ID in the session
      res.status(200).json({ message: 'Login successful' });
    } else {
      res.status(401).json({ error: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(5000, () => {
  console.log('Server is running on http://localhost:5000');
});
