const express = require('express');
const todosRouter = require('./routes/todos');

const app = express();
app.use(express.json());
app.use('/todos', todosRouter);

if (require.main === module) {
  const port = process.env.PORT || 3000;
  app.listen(port, () => console.log(`Todo API listening on port ${port}`));
}

module.exports = app;
