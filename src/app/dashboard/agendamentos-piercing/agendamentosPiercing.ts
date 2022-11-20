export interface AgendamentosPiercing {
  id: number;
  data: string;
  horario: string;
  local_piercing: string;
  nome_cliente: string;
  nome_profissional: string;
  telefone: string;
  valor: number,
  material_piercing: Material[];
}

export interface Material {
  id: number;
  tipo: string;
}
