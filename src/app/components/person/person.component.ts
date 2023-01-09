import { Component, Input, OnInit } from '@angular/core';
import { PersonService } from 'src/app/core/services/person/person.service';
import { Person } from 'src/app/shared/models/person';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss']
})
export class PersonComponent implements OnInit {
  @Input() person: Person = new Person
  editMode = false
  deleted = false

  constructor(private personService: PersonService) { }

  ngOnInit(): void {
  }

  toggleEditMode() {
    this.editMode = !this.editMode
  }

  deletePerson() {
    if (this.person.id) {
      this.personService.delete(this.person.id)
      this.toggleEditMode()
      this.deleted = true
    }
  }

  updatePerson() {
    if (this.person.id) {
      this.personService.update(this.person.id, this.person)
      this.toggleEditMode()
    }
  }

}
