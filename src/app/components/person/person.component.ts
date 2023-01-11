import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PersonService } from 'src/app/core/services/person/person.service';
import { TagService } from 'src/app/core/services/tag/tag.service';
import { Person } from 'src/app/shared/models/person';
import { Tag } from 'src/app/shared/models/tag';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss']
})
export class PersonComponent implements OnInit {
  @Input() person: Person = new Person
  allTags$: Observable<Tag[]>
  assignedTags: Tag[] = []
  editingDetails = false
  editingTags = false
  addingTags = false
  deleted = false

  constructor(private personService: PersonService, public tagService: TagService) {
    this.allTags$ = this.tagService.getAll()
  }

  async ngOnInit() {
    if (this.person.tagIds) {
      for (let tagId of this.person.tagIds) {
        if (tagId) {
          this.assignedTags.push((await this.tagService.getTagFromId(tagId)))
        }
      }
    }
  }

  toggleEditingDetails() {
    this.editingDetails = !this.editingDetails
  }

  toggleEditingTags() {
    this.editingTags = !this.editingTags
  }

  toggleAddingTags() {
    this.addingTags = !this.addingTags
  }

  deletePerson() {
    if (this.person.id) {
      this.personService.delete(this.person.id)
      this.toggleEditingDetails()
      this.deleted = true
    }
  }

  updatePerson() {
    if (this.person.id) {
      this.personService.update(this.person.id, this.person)
      this.toggleEditingDetails()
    }
  }

  assignTag(tagId: string) {
    if (this.person.tagIds?.indexOf(tagId) !== -1) {
      console.log("This tag is already assigned to this person")
    } else {
      if (!this.person.tagIds) {
        this.person.tagIds = [tagId]
      } else {
        this.person.tagIds.push(tagId)
      }
      this.updatePerson()
    }
  }

  unassignTag(tagId: string) {
    // Remove tagId from person.tagIds
    this.person.tagIds?.forEach((id, index) => {
      if (id === tagId) this.person.tagIds?.splice(index, 1)
    })
    this.personService.unassignTag(this.person.id!, tagId)
  }

  async getTagFromId(tagId: string) {
    return (await this.tagService.getTagFromId(tagId))
  }

}
