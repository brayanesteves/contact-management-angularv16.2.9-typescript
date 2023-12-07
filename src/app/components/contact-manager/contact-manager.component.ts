import { Component, OnInit } from '@angular/core';
import { INaturalPerson } from 'src/app/models/INaturalPerson';
import { NaturalPersonService } from 'src/app/services/natural-person.service';

@Component({
  selector: 'app-contact-manager',
  templateUrl: './contact-manager.component.html',
  styleUrls: ['./contact-manager.component.css']
})
export class ContactManagerComponent implements OnInit {

  public        loading:boolean          = false;
  public naturalPersons:INaturalPerson[] = [];
  public   errorMessage:string | null    = null;

  constructor(private naturalPersonService:NaturalPersonService) { }

  ngOnInit(): void {
    this.getAllNaturalPersonFromServer();
  }

  public getAllNaturalPersonFromServer() {
    this.loading = true;
    this.naturalPersonService.getNaturalPersonsAll().subscribe((data) => {
      console.log(data)
      this.naturalPersons = data;
      this.loading        = false;
    }, (error) => {
      this.errorMessage = error;
      this.loading      = false;
    });
  }

  public delete(reference:number | undefined) {
    if(reference) {
      this.naturalPersonService.delete(reference).subscribe((data) => {
        this.getAllNaturalPersonFromServer();
      }, (error) => {
        this.errorMessage = error;
        this.loading      = false;
      });
    }
  }
}
