import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(public api: ApiService, public auth: AuthService) { }
  usuarios = [];
  ngOnInit() {
    let parm = this.auth.getUsuario;
    console.log(parm);
    this.api.carregarUsuarios().subscribe(res =>{
      this.usuarios = res;
    })
  }

}
