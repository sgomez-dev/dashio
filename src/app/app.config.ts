import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes), provideFirebaseApp(() => initializeApp({ projectId: "dashio-ed34b", appId: "1:448468082402:web:d3accd1fc5c6de75d548bb", storageBucket: "dashio-ed34b.firebasestorage.app", apiKey: "AIzaSyDUM-J4DwlF1GjMIICcFgrFvnuzhCgoK2k", authDomain: "dashio-ed34b.firebaseapp.com", messagingSenderId: "448468082402" })), provideAuth(() => getAuth()), provideFirestore(() => getFirestore())
  ]
};
