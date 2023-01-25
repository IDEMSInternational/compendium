import { Component, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';
import { PersonService } from 'src/app/core/services/person/person.service';
import { Person } from 'src/app/shared/models/person';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss']
})
export class PeopleComponent implements OnInit {
  people$: Observable<Person[]>;
  addingPerson = false

  constructor(private personService: PersonService) {
    this.people$ = this.personService.getAll()
  }

  ngOnInit(): void { }

  toggleAddingPerson() {
    this.addingPerson = !this.addingPerson
  }

}
