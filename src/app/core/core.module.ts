import { NgModule, Optional, SkipSelf } from '@angular/core';

import { PersonService } from './services/person/person.service';
import { AuthService } from './services/firebase/auth/auth.service';

@NgModule({
  declarations: [],
  imports: [],
  providers: [AuthService, PersonService]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only'
      );
    }
  }
}
