import firebase from 'firebase';
import { config } from './firebaseConfig';

firebase.initializeApp(config);
var database = firebase.database();

export const itemsRef = database.ref('bruinmart/items/');
export const usersRef = database.ref('bruinmart/users/');
