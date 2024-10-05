import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAuth0 } from '@auth0/auth0-angular';
import { provideAnimations } from '@angular/platform-browser/animations'; 
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAuth0({
      domain: 'dev-qerco0ngptsqmvbv.us.auth0.com',
      clientId: '3FktI24ALRH8ZskCYYmxB2GSp92Zmtfo',
      authorizationParams: {
        redirect_uri: window.location.origin
      }
    }),
    provideAnimations()
  ] 
};
