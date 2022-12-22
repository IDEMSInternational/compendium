import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PersonService } from 'src/app/core/services/person/person.service';
import { Person } from 'src/app/shared/models/person';

@Component({
  selector: 'app-add-person',
  templateUrl: './add-person.component.html',
  styleUrls: ['./add-person.component.scss']
})
export class AddPersonComponent implements OnInit {
  people$: Observable<Person[]>;

  constructor(private personService: PersonService) {
    this.people$ = this.personService.getAll()
  }

  ngOnInit(): void {}

  logDbObject() {
    this.personService.logFirestoreObject()
  }

  logAllPeople() {
    this.people$.forEach(value => console.log(value));
  }

}
