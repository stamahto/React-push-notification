const notificationOptions = (body: string | undefined) => {
    const options: NotificationOptions = {
        icon: '/logo192.png',
        body: body,
        vibrate: 300
    }

    return options;
}

const pushNotification = (message: string, body?: string) => {
    navigator.serviceWorker.getRegistration().then((reg: any) =>
        reg.showNotification(message, notificationOptions(body)))
        .catch(() => console.log(message));
}

export { pushNotification }
