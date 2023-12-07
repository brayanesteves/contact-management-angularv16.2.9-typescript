import { Component, OnInit }    from '@angular/core';
import { Router } from '@angular/router';
import { INaturalPerson }       from 'src/app/models/INaturalPerson';
import { NaturalPersonService } from 'src/app/services/natural-person.service';

@Component({
     selector:  'app-add-contact',
  templateUrl:  './add-contact.component.html',
    styleUrls: ['./add-contact.component.css']
})
export class AddContactComponent implements OnInit {

  public loading:boolean              = false;
  public personNatural:INaturalPerson = {} as INaturalPerson;
  public errorMessage:string | null   = null;

  constructor(private personNaturalService: NaturalPersonService,
              private router:Router) { }

  ngOnInit(): void {
    
  }

  public create() {
    this.personNaturalService.create(this.personNatural).subscribe((data) => {
      this.router.navigate(['/']).then();
    }, (error) => {
      this.errorMessage = error;
      this.router.navigate(['/contacts/add']).then();
    });
  }

}
