import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { INaturalPerson } from 'src/app/models/INaturalPerson';
import { NaturalPersonService } from 'src/app/services/natural-person.service';

@Component({
  selector: 'app-view-contact',
  templateUrl: './view-contact.component.html',
  styleUrls: ['./view-contact.component.css']
})
export class ViewContactComponent implements OnInit{

  public loading:boolean              = false;
  public reference:string | null      = null;
  public naturalPerson:INaturalPerson = {} as INaturalPerson;
  public errorMessage:string | null   = null;

  constructor(private activatedRoute:ActivatedRoute,
              private naturalPersonService:NaturalPersonService) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((param) => {
      this.reference = param.get("reference");
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

  public isNotEmpty() {
    return Object.keys(this.naturalPerson).length > 0;
  }
}
