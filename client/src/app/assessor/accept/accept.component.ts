import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AssessorModel } from 'src/app/models/assessor.model';
import { AssessorService } from 'src/app/services/assessor.service';
import { isNullOrUndefined } from 'util';
import Swal from 'sweetalert2';
import { UserService } from 'src/app/services/user.service';
import { EmailService } from 'src/app/services/email.service';


@Component({
  selector: 'app-accept',
  templateUrl: './accept.component.html',
  styleUrls: ['./accept.component.css']
})
export class AcceptComponent implements OnInit {

  constructor(private rutaActiva: ActivatedRoute, private router: Router,private assessorService:AssessorService,private userService:UserService,private emailService:EmailService) {
    let hash = this.rutaActiva.snapshot.paramMap.get('hash');
    this.assessorService.findByUserHash(hash).subscribe((item) => {
      this.assessor = item[0];
      if (isNullOrUndefined(this.assessor)) {
        this.message = 'No se encontro ninguna página que coincida';
      } else {
        if (this.assessor.state == 'pendiente de respuesta') {
          this.message = 'Bienvenido al sistema de Nuestra revista, por favor confirme su participación como evaluador en la revista';
          this.action = true;
        } else {
          this.message = 'Usted ya confirmo su participación anteriormente';
        }
      }
    });
  }

  assessor: AssessorModel;
  message: string = '';
  action = false;

  ngOnInit() {
  }

  Confirmar(state){
    this.assessor.state = state;
    this.assessorService.updateAssessor(this.assessor).subscribe((item) => {
      let msg = (state == 'evaluador')? 'confirmado' : 'rechazado';
    this.userService.findUser(this.assessor.editor_id,'').subscribe((item)=>{
      this.emailService.sendEmail(`El evaluador ${this.assessor.first_name} ${this.assessor.second_name} ${this.assessor.first_last_name} ${this.assessor.second_last_name} a ${msg} la participación en la revista`,'Confirmación evaluador',item.email).subscribe(item => {
        Swal.fire('Logrado!', 'Se ha confirmado tu participación en la revista, ahora ya puedes iniciar sesión', 'success').then(() => {
          this.router.navigate(['login']);
        });
      });
    });
    });
  }

}
