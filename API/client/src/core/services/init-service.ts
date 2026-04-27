import { inject, Injectable } from '@angular/core';
import { AccountService } from './account-service';
import { of, tap } from 'rxjs';
import { LikesService } from './likes-service';
import { PresenceService } from './presence-service';

@Injectable({
  providedIn: 'root',
})
export class InitService {
  private accountService = inject(AccountService);
  private likesService = inject(LikesService);
  private presenceService = inject(PresenceService);

  init() {
    return this.accountService.refreshToken().pipe(
      tap((user) => {
        if (user) {
          this.accountService.currentUser.set(user);
          this.likesService.getLikeIds();
          this.accountService.startTokenRefreshInterval();
          this.presenceService.createHubConnection(user);
        }
      }),
    );
  }
}
