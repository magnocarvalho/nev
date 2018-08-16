import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

  constructor(private route: Router, private logar: AuthService, private snackEmail: MatSnackBar) { }
  form = new FormGroup(
    {
      email: new FormControl('', [Validators.required, Validators.email]),
      pass: new FormControl('', [Validators.required, Validators.minLength(6)]),
      nome:  new FormControl('', [Validators.required]),
      username:  new FormControl('', [Validators.required]),
      painame:  new FormControl('', [Validators.required]),
    }
  );
  openSnackBar(frase) {
    this.snackEmail.open(frase, 'OK', {
      duration: 6000
    });
  }
  ngOnInit() {
  }
  fazerLogin(e) {
    //comunica com o backend e aguarda a resposta.
    e.preventDefault();
    this.logar.registarUsuario({
      nome: this.form.get('nome').value,
      email: this.form.get('email').value,
      pass: this.form.get('pass').value
    }).subscribe(result => {
      this.openSnackBar('E-mail cadastrado com sucesso');
    }, err => {
      console.log(err);
      if (err.code === 'auth/email-already-in-use') {
        this.openSnackBar('E-mail ja cadastrado');
      }
    });
  }

}
