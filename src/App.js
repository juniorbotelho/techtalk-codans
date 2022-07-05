export default function App() {
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
          <tr>
            <td scope="row">Jamilton Damasceno</td>
            <td>Professor</td>
            <td className="d-flex gap-1">
              <span className="btn btn-primary">
                <i class="bi bi-pencil"></i>
              </span>
              <span className="btn btn-primary">
                <i class="bi bi-trash"></i>
              </span>
            </td>
          </tr>
        </tbody>
      </table>
      
      <div className="mt-5">
        <h2>Cadastrar</h2>
        
        <form>
          <div className="mb-3">
            <label htmlFor="username" class="form-label">Nome</label>
            <input type="text" className="form-control" id="username" name="username" placeholder="Nome pessoal" />
          </div>
          <div className="mb-3">
            <label htmlFor="job" class="form-label">Profissão</label>
            <input type="text" className="form-control" id="job" name="job" placeholder="Profissão" />
          </div>
          <input class="btn btn-primary" type="submit" value="Cadastrar"></input>
        </form>
      </div>
    </div>
  );
}
