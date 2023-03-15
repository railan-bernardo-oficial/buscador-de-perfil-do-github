import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import './Styles.css';
import api from './services/api';

function App() {

  const [input, setInput] = useState('');
  const [result, setResult] = useState({});
  const [repos, setRepos] = useState([]);

  async function handleSearch() {

    if (input === '') {
      alert('Ops, precisa adicionar um nome');
      setInput('');
      return;
    }

    try {

      const response = await api.get(`${input}`);
      setResult(response.data)

      const responseRepos = await api.get(`${input}/repos`);
      setRepos(responseRepos.data)

      setInput('');

    } catch (error) {
      alert('erro')
      setInput('');
    }

  }

  return (
    <div className="container">
      <div className="containerSearch">
        <h1>Digite o nome do Perfil</h1>
        <div className="boxInput">
          <input
            type="text"
            placeholder="Buscar perfil"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button onClick={handleSearch}>
            <FiSearch />
          </button>
        </div>
      </div>
      {Object.keys(result).length > 0 && (
        <div className='boxResult'>
          <div className='boxImg'>
            <img src={result.avatar_url} />
          </div>
          <h2>{result.name}</h2>
          <div className='contentList'>
            <div className='infos'>
              <p><b>Bio</b>: {result.bio}</p>
              <p><b>Reposítórios</b>: {result.public_repos}</p>
              <p><b>Seguindo</b>: {result.following}</p>
              <p><b>Seguidores</b>: {result.followers}</p>
              <p><b>Cidade</b>: {result.location}</p>
            </div>
            <div className='repos'>
              {repos.map(repo => (
                <div className='boxRepos'>
                  <p><span className='text'>{repo.name}</span> <span className='status'>{repo.visibility}</span></p>
                  <span className='circle'>{repo.language}</span>
                </div>
              ))};
            </div>
          </div>
        </div>
      )};
    </div>
  );
}

export default App;
