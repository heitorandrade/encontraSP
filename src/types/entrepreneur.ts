export type EntrepreneurCategory =
  | "Consultoria"
  | "Alimentacao"
  | "Saude"
  | "Tecnologia"
  | "Criativo";

export type EntrepreneurTag =
  | "Atendimento remoto"
  | "Entrega local"
  | "Agenda rapida"
  | "Empresa verificada"
  | "Sob demanda"
  | "B2B"
  | "Atendimento presencial";

export interface Entrepreneur {
  id: string;
  name: string;
  category: EntrepreneurCategory;
  region: string;
  distanceKm: number;
  image: string;
  shortDescription: string;
  description: string;
  tags: EntrepreneurTag[];
  contactUrl: string;
  address: string;
  phone: string;
}
