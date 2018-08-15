import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public api: ApiService,private route: Router, public logar: AuthService, private snackEmail: MatSnackBar) { }

  ngOnInit() {
  }
  form = new FormGroup(
    {
      email: new FormControl('', [Validators.required, Validators.email]),
      pass: new FormControl('', [Validators.required, Validators.minLength(6)])
    }
  );
  openSnackBar(frase) {
    this.snackEmail.open(frase, 'OK', {
      duration: 6000
    });
  }
  login(e) {
    this.logar.login({
      email: this.form.get('email').value,
      pass: this.form.get('pass').value
    }).subscribe(result => {
      
      this.route.navigate(['/dashboard']);
    }, err => {
      this.openSnackBar('Erro no login');
    });
  }

}
