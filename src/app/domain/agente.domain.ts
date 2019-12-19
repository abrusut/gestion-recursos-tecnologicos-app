import { TipoDocumento } from './tipo.documento.domain';

export interface Agente {
  id?: string;
  nombre?: string;
  apellido?: string;
  fechaNacimiento?: Date;
  domicilioCalle?: string;
  domicilioNumero?: number;
  tipoDocumento?: TipoDocumento;
  numeroDocumento?: number;
  sexo?: string;
  telefono?: number;
  email?: string;
  createdAt?: Date;
  updatedAt?: Date;
  fechaBaja?: Date;
}
