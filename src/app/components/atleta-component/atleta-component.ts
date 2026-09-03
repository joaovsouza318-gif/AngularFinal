import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AtletaService } from '../../services/atleta-service';
import { Pessoa } from '../../models/pessoa-model';

@Component({
  selector: 'app-atleta-component',
  imports: [FormsModule],
  templateUrl: './atleta-component.html',
  styleUrl: './atleta-component.css',
})
export class AtletaComponent {
  nome = '';
  cpf = '';
  sexo = '';
  dataNascimento = '';
  cep = '';
  rua = '';
  bairro = '';
  cidade = '';
  uf = '';

  constructor(private atletaService: AtletaService) {}

  exibeDados(){
    console.log(this.nome,this.cpf,this.sexo,this.cep,this.rua,this.bairro,this.cidade,this.uf)
  }

  salvarAtleta(){
    const pessoaAtleta = new Pessoa();
    pessoaAtleta.nome = this.nome;
    pessoaAtleta.cpf = this.cpf;
    pessoaAtleta.sexo = this.sexo;
    pessoaAtleta.data_nascimento = this.dataNascimento;
    pessoaAtleta.cep = Number(this.cep);
    pessoaAtleta.rua_logradouro = this.rua;
    pessoaAtleta.bairro = this.bairro;
    pessoaAtleta.cidade = this.cidade;
    pessoaAtleta.uf = this.uf;

    this.atletaService.adicionar(pessoaAtleta).subscribe();
}
}
