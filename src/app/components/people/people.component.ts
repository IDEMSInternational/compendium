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
  activePerson: Person | null = null

  constructor(private personService: PersonService) {
    this.people$ = this.personService.getAll()
  }

  ngOnInit(): void { }

  logDbObject() {
    this.personService.logFirestoreObject()
  }

  logAllPeople() {
    this.people$.forEach(value => console.log(value));
  }

  toggleAddingPerson() {
    this.addingPerson = !this.addingPerson
  }

  selectPerson(person: Person) {
    this.activePerson = person
  }

  deselectPerson() {
    this.activePerson = null
  }
}
