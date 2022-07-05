import { useRef, useState } from 'react'
import { Usuario } from './models/Usuario'

export default function App() {
  const [usuarios, setUsuarios] = useState([]);
  const formRef = useRef(null);

  async function onSubmitForm(event) {
    event.preventDefault();
    const formulario = new FormData(event.target);
    const dados = new Usuario(Object.fromEntries(formulario));
    setUsuarios((usuarios) => [...usuarios, dados]);
    event.currentTarget.reset();
  }

  async function onEditItem(event) {
    const { dataset } = event.currentTarget;
    const index = usuarios.findIndex(({ id }) => id === dataset.id);
    const [dados] = usuarios.filter((_, idx) => idx === index);
    const [usuario, profissao, botao, checkbox] = formRef.current.querySelectorAll('input');
    usuario.value = dados.nome;
    profissao.value = dados.profissao;
    botao.value = 'Salvar Alteração';
    checkbox.checked = true;
  }

  async function onRemoveItem(event) {
    const { dataset } = event.currentTarget;
    const index = usuarios.findIndex(({ id }) => id === dataset.id);
    setUsuarios((usuarios) => [...usuarios.filter((_, idx) => idx !== index)]);
  }

  return (
    <div className="container">
      <div className="mt-4 display-6">Cadastro de Usuários</div>
      <p className="mt-3">Cadastre, edite e exclua usuários pelo painel de controle de usuários</p>

      <table className="table align-middle mt-4">
        <thead>
          <tr>
            <th scope="col">Nome</th>
            <th scope="col">Profissão</th>
            <th scope="col">Ação</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map(({ id, nome, profissao }) => (
            <tr key={id} id={id}>
              <td>{nome}</td>
              <td>{profissao}</td>
              <td className="d-flex gap-1">
                <span role="button" data-id={id} onClick={onEditItem} className="btn btn-primary">
                  <i className="bi bi-pencil"></i>
                </span>
                <span role="button" data-id={id} onClick={onRemoveItem} className="btn btn-danger">
                  <i className="bi bi-trash"></i>
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      <div className="mt-5">
        <h2>Cadastrar</h2>

        <form ref={formRef} onSubmit={onSubmitForm}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Nome</label>
            <input type="text" className="form-control" id="username" name="nome" placeholder="Nome pessoal" />
          </div>
          <div className="mb-3">
            <label htmlFor="job" className="form-label">Profissão</label>
            <input type="text" className="form-control" id="job" name="profissao" placeholder="Profissão" />
          </div>
          <input className="btn btn-primary" type="submit" value="Cadastrar"></input>
          <input className="d-none" type="checkbox" name="isEditMode" disabled />
        </form>
      </div>
    </div>
  );
}
