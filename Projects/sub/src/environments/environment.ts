// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyDdfdAF2_FcRDgli1I6F2nlPNcIhF70_Ls',
    authDomain: 'league-active-notes.firebaseapp.com',
    databaseURL: 'https://league-active-notes.firebaseio.com',
    projectId: 'league-active-notes',
    storageBucket: 'league-active-notes.appspot.com',
    messagingSenderId: '522337780126',
  },
};

/*
 * In development mode, for easier debugging, you can ignore zone related error
 * stack frames such as `zone.run`/`zoneDelegate.invokeTask` by importing the
 * below file. Don't forget to comment it out in production mode
 * because it will have a performance impact when errors are thrown
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
