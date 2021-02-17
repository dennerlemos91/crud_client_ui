import { Endereco } from "./endereco.interface";
import { Telefone } from "./telefone.interface";
export interface Cliente {
  id: number;
  nome: string;
  cpf: string;
  endereco: Endereco;
  telefones: Telefone[];
  emails: string[];
}
