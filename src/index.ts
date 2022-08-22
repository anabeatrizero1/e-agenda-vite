import { IPaginaHTML } from "./shared/pagina.interface.js";

class Index implements IPaginaHTML {
  btnCadastrar: HTMLButtonElement;

  constructor(){
    this.configurarElementos();
  }
  // Metodo responsável pelo data binding dos elementos da página
  public configurarElementos(): void { }

}

new Index();