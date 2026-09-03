import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AtletaService } from '../../services/atleta-service';
import { Pessoa } from '../../models/pessoa-model';

@Component({
  selector: 'app-atleta-component',
  imports: [FormsModule],
  templateUrl: './atleta-component.html',
  styleUrl: './atleta-component.css',
})
export class AtletaComponent implements OnInit {
  idAtleta: number | null = null;
  nome = '';
  cpf = '';
  sexo = '';
  dataNascimento = '';
  peso: number | null = null;
  altura: number | null = null;
  cep = '';
  rua = '';
  bairro = '';
  cidade = '';
  uf = '';
  modoEdicao = false;

  constructor(
    private atletaService: AtletaService,
    private route: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id');

    if (!idParam) {
      return;
    }

    const id = Number(idParam);
    this.modoEdicao = true;

    this.atletaService.listar().subscribe((atletas) => {
      const atleta = atletas.find((item) => item.id === id);

      if (!atleta) {
        this.router.navigate(['/listarAtletas']);
        return;
      }

      this.idAtleta = atleta.id ?? null;
      this.nome = atleta.nome;
      this.cpf = atleta.cpf;
      this.sexo = atleta.sexo;
      this.dataNascimento = atleta.data_nascimento;
      this.peso = atleta.peso === null ? null : Number(atleta.peso);
      this.altura = atleta.altura === null ? null : Number(atleta.altura);
      this.cep = String(atleta.cep ?? '');
      this.rua = atleta.rua_logradouro;
      this.bairro = atleta.bairro;
      this.cidade = atleta.cidade;
      this.uf = atleta.uf;

      this.cdr.detectChanges();
    });
  }

  salvarAtleta() {
    if (this.peso === null || this.altura === null) {
      return;
    }

    const pessoaAtleta = new Pessoa();
    pessoaAtleta.id = this.idAtleta ?? undefined;
    pessoaAtleta.nome = this.nome;
    pessoaAtleta.cpf = this.cpf;
    pessoaAtleta.sexo = this.sexo;
    pessoaAtleta.data_nascimento = this.dataNascimento;
    pessoaAtleta.peso = Number(this.peso);
    pessoaAtleta.altura = Number(this.altura);
    pessoaAtleta.cep = Number(this.cep);
    pessoaAtleta.rua_logradouro = this.rua;
    pessoaAtleta.bairro = this.bairro;
    pessoaAtleta.cidade = this.cidade;
    pessoaAtleta.uf = this.uf;

    const operacao = this.modoEdicao
      ? this.atletaService.alterar(pessoaAtleta)
      : this.atletaService.adicionar(pessoaAtleta);

    operacao.subscribe(() => {
      if (this.modoEdicao) {
        this.router.navigate(['/listarAtletas']);
      } else {
        this.limparFormulario();
      }
    });
  }

  cancelarEdicao() {
    this.router.navigate(['/listarAtletas']);
  }

  limparFormulario() {
    this.nome = '';
    this.cpf = '';
    this.sexo = '';
    this.dataNascimento = '';
    this.peso = null;
    this.altura = null;
    this.cep = '';
    this.rua = '';
    this.bairro = '';
    this.cidade = '';
    this.uf = '';
  }
}
