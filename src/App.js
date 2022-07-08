import { useRef, useState } from 'react'
import { Usuario } from './models/Usuario'

export default function App() {
  const [usuarios, setUsuarios] = useState([]);
  const [editMode, setEditMode] = useState({ id: "", toggle: false });
  const formRef = useRef(null);

  async function onSubmitForm(event) {
    event.preventDefault();
    const formulario = new FormData(event.target);
    if (editMode.toggle) {
      const dados = new Usuario({
        id: editMode.id,
        ...Object.fromEntries(formulario),
      });
      const index = usuarios.findIndex(({ id }) => id === editMode.id);
      const editados = usuarios.map((usuario, idx) => idx === index ? dados : usuario);
      setUsuarios(editados);
      setEditMode({ id: '', toggle: false });
    } else {
      const dados = new Usuario(Object.fromEntries(formulario));
      setUsuarios((usuarios) => [...usuarios, dados]);
    }
    event.currentTarget.reset();
  }

  async function onEditItem(event) {
    const { dataset } = event.currentTarget;
    const index = usuarios.findIndex(({ id }) => id === dataset.id);
    const [dados] = usuarios.filter((_, idx) => idx === index);
    setEditMode({ id: dados.id, toggle: true });
    const [nome, profissao] = formRef.current.querySelectorAll('input');
    nome.value = dados.nome;
    profissao.value = dados.profissao;
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
            <label htmlFor="nome" className="form-label">Nome</label>
            <input type="text" className="form-control" id="nome" name="nome" placeholder="Nome pessoal" />
          </div>
          <div className="mb-3">
            <label htmlFor="profissao" className="form-label">Profissão</label>
            <input type="text" className="form-control" id="profissao" name="profissao" placeholder="Profissão" />
          </div>
          <input className="btn btn-primary" type="submit" value="Cadastrar"></input>
        </form>
      </div>
    </div>
  );
}
