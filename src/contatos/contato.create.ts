import { IPaginaFormulario } from "../shared/pagina.create.interface";
import { IPaginaHTML } from "../shared/pagina.interface";
import { IRepositorio } from "../shared/repositorio.inerface";
import { Contato } from "./models/contato.model";
import { ContatoRepositoryLocalStorage } from "./repositories/contatos.repository.local-storage";


class ContatoPaginaCadastro implements IPaginaHTML, IPaginaFormulario {
  private txtNome: HTMLInputElement;
  private txtEmail: HTMLInputElement;
  private txtTelefone: HTMLInputElement;
  private txtEmpresa: HTMLInputElement;
  private txtCargo: HTMLInputElement;
  private btnSalvar: HTMLButtonElement;

  private idSelecionado: string;

  constructor(private repositorioContatos: IRepositorio<Contato>, id?: string) {
    this.configurarElementos();

    if (id) {
      this.idSelecionado = id;

      const contatoSelecionado = this.repositorioContatos.selecionarPorId(id);

      if (contatoSelecionado) {
        this.preencherFormulario(contatoSelecionado);
      }
    }
  }
  preencherFormulario(contatoSelecionado: Contato) {
    this.txtNome.value = contatoSelecionado.nome;
    this.txtEmail.value = contatoSelecionado.email;
    this.txtTelefone.value = contatoSelecionado.telefone;
    this.txtEmpresa.value = contatoSelecionado.empresa;
    this.txtCargo.value = contatoSelecionado.cargo;
  }

  configurarElementos(): void {
    this.txtNome = document.getElementById("txtNome") as HTMLInputElement;
    this.txtEmail = document.getElementById("txtEmail") as HTMLInputElement;
    this.txtTelefone = document.getElementById("txtTelefone") as HTMLInputElement;
    this.txtEmpresa = document.getElementById("txtEmpresa") as HTMLInputElement;
    this.txtCargo = document.getElementById("txtCargo") as HTMLInputElement;
    this.btnSalvar = document.getElementById("btnSalvar") as HTMLButtonElement;

    this.btnSalvar.addEventListener("click", (_evt: any) => this.gravarRegistro());

  }
  gravarRegistro(): void {
    const contato = this.obterDadosFormularario();

      if(!this.idSelecionado)
        this.repositorioContatos.inserir(contato);
      else
        this.repositorioContatos.editar(contato.id, contato);
        
      window.location.href = "contato.list.html";
  }
  obterDadosFormularario() {
    const nome = this.txtNome.value;
    const email = this.txtEmail.value;
    const telefone = this.txtTelefone.value;
    const empresa = this.txtEmpresa.value;
    const cargo = this.txtCargo.value;

    let contato = null;

    if (!this.idSelecionado)
      contato = new Contato(nome, email, telefone, empresa, cargo);
    else
      contato = new Contato(nome, email, telefone, empresa, cargo, this.idSelecionado);

    return contato;

  }

  // private IsFone(numero: string) {
  //   var regex = new RegExp('^\\([0-9]{2}\\)((3[0-9]{3}-[0-9]{4})|(9[0-9]{3}-[0-9]{5}))$');
  //   return regex.test(numero);
  // }

  // private IsEmail(email: string) {
  //   var emailPattern = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;
  //   return emailPattern.test(email);
  // }
}
const parametros = new URLSearchParams(window.location.search);

const id = parametros.get("id") as (string);

new ContatoPaginaCadastro(new ContatoRepositoryLocalStorage(), id);

// function verificarRegistro(contato: Contato): boolean {
//   if (this.IsEmail(contato.email) && this.IsFone(contato.telefone)) {
//     return true;   
//   }else{
//     return false;
//   }
// }
