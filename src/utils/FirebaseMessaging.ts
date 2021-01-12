import firebase from 'firebase/app';
import 'firebase/messaging';
import packageJson from '../../package.json';
import { cloudMessagingService } from './ApiService';

const projectId: string = "";
const firebaseConfig = {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: projectId,
    storageBucket: "",
    messagingSenderId: "",
    appId: "",
    measurementId: ""
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

export const requestFirebaseNotificationPermission = () =>
    new Promise<string>((resolve) => {
        messaging
            .requestPermission()
            .then(() => messaging.getToken())
            .then((firebaseToken) => {
                resolve(firebaseToken);
            })
            .catch(error => console.log(error))
    });

interface CloudMessage {
    title: string,
    body: string
}

export const onMessageReceive = () =>
    new Promise<CloudMessage>((resolve) => {
        messaging.onMessage((payload) => {
            const title: string = payload.notification?.title ?? "";
            const body: string = payload.notification?.body ?? "";

            resolve({ title: title, body: body });
        });
    });

/** Send message to the topic. Specify department, if you want to send message only just group of people. */
export const sendToTopic = (title: string, body: string, department?: string) => {
    const requestMessage = {
        topic: department ? packageJson.name + "-" + department : packageJson.name,
        projectId: projectId,
        title: title,
        body: body
    }

    cloudMessagingService.post("/topic", requestMessage, {
        success: () => { },
        error: () => { }
    });
}

export const subscribeToTopic = (firebaseToken: string, department?: string) => {
    const requestModel = {
        name: department ? packageJson.name + "-" + department : packageJson.name,
        projectId: projectId,
        token: firebaseToken
    }

    cloudMessagingService.post("/topic/subscribe", requestModel, {
        success: () => { },
        error: () => { }
    });
}

export const unsubscribeFromTopic = (firebaseToken: string, department?: string) => {
    const requestModel = {
        name: department ? packageJson.name + "-" + department : packageJson.name,
        projectId: projectId,
        token: firebaseToken
    }

    cloudMessagingService.delete("/topic/unsubscribe", requestModel, {
        success: () => { },
        error: () => { }
    });
}