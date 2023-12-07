import { Component, OnInit }      from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { INaturalPerson }         from 'src/app/models/INaturalPerson';
import { NaturalPersonService }   from 'src/app/services/natural-person.service';

@Component({
     selector:  'app-edit-contact',
  templateUrl:  './edit-contact.component.html',
    styleUrls: ['./edit-contact.component.css']
})
export class EditContactComponent implements OnInit {

  public loading:boolean              = false;
  public reference:string | null      = null;
  public naturalPerson:INaturalPerson = {} as INaturalPerson;
  public errorMessage:string | null   = null;

  constructor(private activateRoute:ActivatedRoute,
              private naturalPersonService: NaturalPersonService,
              private router:Router) { }

  ngOnInit(): void {
    this.activateRoute.paramMap.subscribe((param) => {
      this.reference = param.get('reference');
    });
    if(this.reference) {
      this.loading = true;
      this.naturalPersonService.getNaturalPerson(this.reference).subscribe((data) => {
        this.naturalPerson = data;
        this.loading       = false;
      }, (error) => {
        this.errorMessage = error;
        this.loading      = false;
      });
    }
  }

  public update() {
    if(this.reference) {      
      this.naturalPersonService.update(this.naturalPerson, this.reference).subscribe((data) => {
        this.router.navigate(['/']).then();
      }, (error) => {
        this.errorMessage = error;
        this.router.navigate([`/contacts/edit/${this.reference}`]).then();
      });
    }
  }

}