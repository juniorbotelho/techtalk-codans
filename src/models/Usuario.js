import { v4 as uuidv4 } from 'uuid'

export class Usuario {
  id = "";
  nome = "";
  profissao = "";

  constructor({ id, nome, profissao }) {
    this.id = id ?? uuidv4();
    this.nome = nome;
    this.profissao = profissao;
  }
}
