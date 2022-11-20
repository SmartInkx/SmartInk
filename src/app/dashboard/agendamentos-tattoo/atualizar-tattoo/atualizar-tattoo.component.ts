import { LoginService } from './../../../login/login.service';
import { Validators } from '@angular/forms';
import { DatePipe } from '@angular/common'
import { Component, OnInit } from '@angular/core';
import { DateAdapter } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalPiercingComponent } from 'src/app/modal-piercing/modal-piercing.component';
import { ModalTattooComponent } from 'src/app/modal-tattoo/modal-tattoo.component';
import { AgendamentosTattooService } from '../agendamentos-tattoo.service';
import { AgendamentosTattoo } from '../agendamentosTattoo';

@Component({
  selector: 'app-atualizar-tattoo',
  templateUrl: './atualizar-tattoo.component.html',
  styleUrls: ['./atualizar-tattoo.component.scss'],
})
export class AtualizarTattooComponent implements OnInit {
  opened = false;
  panelOpenState = false;
  agendamentosTattoo: AgendamentosTattoo;

  constructor(
    public dialog: MatDialog,
    private service: AgendamentosTattooService,
    private serviceLogin: LoginService,
    private router: Router,
    private activatedRouter: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    const id = this.activatedRouter.snapshot.paramMap.get('id')
    this.service.listarTattooId(id).subscribe(tatoo => this.agendamentosTattoo = tatoo)
  }

  abreDialog() {
    const dialogRef = this.dialog.open(ModalTattooComponent, {
      maxWidth: '100vw',
      maxHeight: '85vh',
    });
    dialogRef.afterClosed();
  }

  openDialog() {
    const dialogRef = this.dialog.open(ModalPiercingComponent);
    dialogRef.afterClosed();
  }

  updateTattoo(): void {
    this.service.atualizarTatto(this.agendamentosTattoo).subscribe(() => {
      this.service.showText(
        'SISTEMA',
        `Agendamento alterado com sucesso`,
        'toast-success'
      );
    })
    this.goBack();
  }

  goBack(): void {
    this.router.navigate(['/agendamentostattoo'])
  }

  logout() {
    this.serviceLogin.removerTokenLocalStorage();
    this.router.navigate(['/home']);
  }

}
