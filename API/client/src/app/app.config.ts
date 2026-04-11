import {
  ApplicationConfig,
  provideAppInitializer,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';
import { inject } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { InitService } from '../core/services/init-service';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZonelessChangeDetection(),
    provideRouter(routes, withViewTransitions()),
    provideHttpClient(),
    provideAppInitializer(async () => {
      const initService = inject(InitService);
      return new Promise<void>((resolve) => {
        setTimeout(async () => {
          try {
            await lastValueFrom(initService.init());
          } finally {
            const splash = document.getElementById('initial-splash');
            if (splash) {
              splash.remove();
            }
            resolve();
          }
        }, 500);
      });
    }),
  ],
};
