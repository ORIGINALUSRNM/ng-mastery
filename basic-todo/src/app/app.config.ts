import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  DOCUMENT,
  inject,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { WINDOW } from './tokens/window.token';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    {
      provide: WINDOW,
      useFactory: () => inject(DOCUMENT).defaultView,
    },
  ],
};
