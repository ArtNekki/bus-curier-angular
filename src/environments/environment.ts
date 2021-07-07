// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  api_url: 'https://api.busbox.guru',
  firebaseConfig: {
    apiKey: 'AIzaSyBn4my8mkySLnBi2fbuZZcmadCdycF9AsI',
    authDomain: 'bus-curier.firebaseapp.com',
    projectId: 'bus-curier',
    storageBucket: 'bus-curier.appspot.com',
    messagingSenderId: '598951510582',
    appId: '1:598951510582:web:526e76dd43471f009f0e97'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
