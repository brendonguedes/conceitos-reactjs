import React, { useState, useEffect } from "react";
import { Form, Input } from '@rocketseat/unform'
import api from './services/api'
import { MdAddCircle } from 'react-icons/md'
import { IoMdRemoveCircle } from 'react-icons/io'
import "./styles.css";


function App() {
  const [repositories, setRepositories] = useState([])

  useEffect(() => {
    api.get('repositories')
      .then(res => {
        setRepositories(res.data)
      })
  }, [])


  async function handleAddRepository(data, { resetForm }) {
  
    const response = await api.post('repositories', {
      title: `${data.repository}`,
      url: "https://github.com/brendonguedes/",
      techs: ["ReactJS", "React Native", "NodeJS", "Docker", "NextJS"]
    })
    
    const repository = response.data
    setRepositories([...repositories, repository])
    resetForm()
  }


  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`)
    
    const newRepositories = repositories.filter(
      repository => repository.id !== id
    )

    setRepositories(newRepositories)
  }

  return (
    <div id="container">
      <h1>Conceitos do ReactJS</h1>
      <br/>
      <div id="ul">
        <ul data-testid="repository-list">
        {repositories.map(repository => (<li key={repository.id}>{repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              <IoMdRemoveCircle /> 
              Remover
            </button>
            </li> ))
            }

        </ul>
        <br/>
        <Form onSubmit={handleAddRepository}>
          <button type="submit"> <MdAddCircle /> Adicionar</button>
          <Input name="repository" type="text" placeholder="Nome do repositório" />
        </Form>
      </div>     
    </div>
  );
}

export default App;
