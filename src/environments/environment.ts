/* eslint-disable @typescript-eslint/naming-convention */
export const environment = {
  firebase: {
    apiKey: "AIzaSyDrZpLnEWCzbAB2iXM1uizR8J9Z8iP414c",
    authDomain: "amigao-fcm.firebaseapp.com",
    projectId: "amigao-fcm",
    storageBucket: "amigao-fcm.appspot.com",
    messagingSenderId: "139473613556",
    appId: "1:139473613556:web:84143a5ba3fc3381bea4a1",
    measurementId: "G-DW9N8LQLDQ"
  },
  production: false,
  API_BASE_PATH: 'http://localhost:1337/api',
  // API_BASE_PATH: 'https://strapi-wkfc.onrender.com/api',
  BASE_PATH: 'http://localhost:1337',
  // BASE_PATH: 'https://strapi-wkfc.onrender.com',
  STRIPE_KEY: 'pk_test_2qqvb6DTqKondL46mnEjZ68e',
  populate: '?populate=*'
};
