const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;
  const repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0,
  }
  repositories.push(repository);

  return response.json(repository);

});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.param;
  const{ title, url, techs } = request.body;

  const findRepositotyIndex = repositories.findIndex(repository =>
    repository.id ===id
    );

    if (!findRepositotyIndex === -1){
      return response.status(400).json({error:'Repository does not exists.'});
    }

    const  repository = {
      id,
      title,
      url,
      techs,
      likes: repositories[findRepositotyIndex].likes,
    };
    repositories[findRepositotyIndex] = repository
    return response.json(repository);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const findRepositotyIndex = repositories.findIndex(repository =>
  repository.id ===id
  );
  
  if (findRepositotyIndex >= 0 ) {
    repositories.splice(findRepositotyIndex, -1);
  } else {
    return response.status(400).json({ error: 'Repository does not exists.' });
  }
  return response.status(204).send();

});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;
  const findRepositotyIndex = repositories.findIndex(repository =>
    repository.id ===id
    );

    if (findRepositotyIndex >= 0 ) {
      repositories.splice(findRepositotyIndex, -1);
    } else {
      return response.status(400).json({ error: 'Repository does not exists.' });
    }
    repositories[findRepositotyIndex].likes += 1;
    return response.json(repositories[findRepositotyIndex]);

});

module.exports = app;
