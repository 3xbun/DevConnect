const express = require("express");
const connectDB = require("./config/db");

const app = express();

// Connect MongoDB
connectDB()

const PORT = process.env.PORT || 5000;

// Routes
app.use('/api/users', require('./routes/api/users.routes'));
app.use('/api/auth', require('./routes/api/auth.routes'));
app.use('/api/posts', require('./routes/api/posts.routes'));
app.use('/api/profile', require('./routes/api/profile.routes'));

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));