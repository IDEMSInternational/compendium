import { Component, OnInit } from '@angular/core';
import { Person } from 'src/app/shared/models/person';
import { PersonService } from 'src/app/core/services/person/person.service';

@Component({
  selector: 'app-add-person',
  templateUrl: './add-person.component.html',
  styleUrls: ['./add-person.component.scss']
})
export class AddPersonComponent implements OnInit {
  person: Person = new Person
  submitted = false

  constructor(private personService: PersonService) { }

  ngOnInit(): void {
  }

  async savePerson() {
    const docRef = await this.personService.create(this.person)
    console.log("Added person with ID:", docRef.id)
    this.submitted = true
  }

  newPerson() {
    this.submitted = false
    this.person = new Person
  }
}
