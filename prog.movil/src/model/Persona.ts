import { NivelEducacional } from "./NivelEducacional";

export class Persona {
  public nombre = '';
  public apellido = '';
  public nivelEducacional: NivelEducacional = new NivelEducacional(0, '');
  public fechaNacimiento = '';
}
