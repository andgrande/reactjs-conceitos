import React, { useEffect, useState } from "react";
import api from "./services/api";

import "./styles.css";

function App() {
  const [ repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    })
  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: `Bela ${Date.now()}`,
      url: "https://github.com/andgrande/node-conceitos",
      techs: [
        "Node.js",
        "Javascript",
        "ReactJS",
      ]
    });

    const data = response.data;
    setRepositories([...repositories, data]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);

    const repositoryIndex = repositories.findIndex(repository => repository.id === id);
    const repositoriesArray = repositories;

    repositoriesArray.splice(repositoryIndex, 1);
    setRepositories([...repositoriesArray]);
  }

  return (
    <div>
      <ul data-testid="repository-list">

        {repositories.map(repository => {
            return (
              <li key={repository.id}>
                {repository.title}
                <button onClick={() => handleRemoveRepository(repository.id)}>
                  Remover
                </button>
              </li>
            )

          })}

      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
