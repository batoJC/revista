import { Component, OnInit } from '@angular/core';
import { AuthorService } from 'src/app/services/author.service';
import { AuthorModel } from 'src/app/models/author.model';
import { ActivatedRoute, Router } from '@angular/router';
import { isNullOrUndefined } from 'util';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit {

  constructor(private autorService: AuthorService, private rutaActiva: ActivatedRoute,private router: Router) {
    let hash = this.rutaActiva.snapshot.paramMap.get('hash');
    console.log(hash);
    this.autorService.findByUserHash(hash).subscribe((item) => {
      this.author = item[0];
      if (isNullOrUndefined(this.author)) {
        this.message = 'No se encontro ninguna página que coincida';
      } else {
        console.log(this.author);
        if (this.author.state == 'por confirmar') {
          this.message = 'Bienvenido al sistema de Nuestra revista esperamos que pueda sentirse muy a gusto con nuestro sistema';
          this.action = true;
        } else {
          this.message = 'Usted ya confirmo su correo anteriormente';
        }
      }
    });
  }

  author: AuthorModel;
  message: string = '';
  action = false;

  ngOnInit() {
  }

  Confirmar() {
    this.author.state = 'Confirmado';
    this.autorService.updateEditor(this.author).subscribe((item) => {
      Swal.fire('Logrado!', 'Se ha confirmado tu correo electronico correctamente, ahora ya puedes iniciar sesión', 'success').then(() => {
        this.router.navigate(['login']);
      });
    });
  }

}
