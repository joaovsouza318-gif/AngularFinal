import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CorridaService } from '../../services/corrida-service';
import { Corrida } from '../../models/corrida-model';

@Component({
  selector: 'app-corridas-component',
  imports: [FormsModule],
  templateUrl: './corridas-component.html',
  styleUrl: './corridas-component.css',
})
export class CorridasComponent implements OnInit {
  idCorrida: number | null = null;
  descricao = '';
  data = '';
  niveis = '';
  modalidadesDisponiveis = ['5', '10', '15', '21'];
  modalidadesSelecionadas: string[] = [];
  modoEdicao = false;

  constructor(
    private corridaService: CorridaService,
    private route: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id');

    if (idParam) {
      const id = Number(idParam);
      this.modoEdicao = true;

      this.corridaService.buscarPorId(id).subscribe(corrida => {
        this.idCorrida = corrida.idCorrida;
        this.descricao = corrida.descricao;
        this.data = this.formatarDataParaInput(corrida.data);
        this.niveis = corrida.niveis;
        this.modalidadesSelecionadas = this.parseModalidades(corrida.niveis);

        // Sem zone.js (app zoneless), o Angular não percebe sozinho essa
        // mudança vinda de um subscribe assíncrono; forçamos a atualização
        // da tela para os campos refletirem os dados carregados.
        this.cdr.detectChanges();
      });
    }
  }

  modalidadeSelecionada(modalidade: string): boolean {
    return this.modalidadesSelecionadas.includes(modalidade);
  }

  alternarModalidade(modalidade: string, selecionada: boolean) {
    if (selecionada) {
      if (!this.modalidadesSelecionadas.includes(modalidade)) {
        this.modalidadesSelecionadas = [...this.modalidadesSelecionadas, modalidade]
          .sort((a, b) => Number(a) - Number(b));
      }
      return;
    }

    this.modalidadesSelecionadas = this.modalidadesSelecionadas
      .filter((item) => item !== modalidade);
  }

  salvarCorrida() {
    if (this.modalidadesSelecionadas.length === 0) {
      return;
    }

    const corrida = new Corrida();
    corrida.idCorrida = this.idCorrida ?? 0;
    corrida.descricao = this.descricao;
    corrida.data = this.data ? new Date(`${this.data}T00:00:00`) : null;

    // O MockAPI já possui o campo "niveis". Para manter compatibilidade,
    // salvamos as modalidades selecionadas em uma string separada por vírgula.
    corrida.niveis = this.modalidadesSelecionadas.join(',');

    const operacao = this.modoEdicao
      ? this.corridaService.alterar(corrida)
      : this.corridaService.adicionar(corrida);

    operacao.subscribe(() => {
      if (this.modoEdicao) {
        this.router.navigate(['/listarCorridas']);
      } else {
        this.limparFormulario();
      }
    });
  }

  cancelarEdicao() {
    this.router.navigate(['/listarCorridas']);
  }

  limparFormulario() {
    this.descricao = '';
    this.data = '';
    this.niveis = '';
    this.modalidadesSelecionadas = [];
  }

  private parseModalidades(niveis: string): string[] {
    if (!niveis) {
      return [];
    }

    return niveis
      .split(',')
      .map((item) => item.trim())
      .filter((item) => item.length > 0);
  }

  private formatarDataParaInput(data: Date | string | null): string {
    if (!data) {
      return '';
    }

    const d = new Date(data);
    const ano = d.getFullYear();
    const mes = String(d.getMonth() + 1).padStart(2, '0');
    const dia = String(d.getDate()).padStart(2, '0');

    return `${ano}-${mes}-${dia}`;
  }
}
