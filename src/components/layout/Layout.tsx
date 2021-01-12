import { requestFirebaseNotificationPermission, onMessageReceive, subscribeToTopic } from '../../utils/FirebaseMessaging';

export default function Layout() {

    useEffect(() => {
        if (user.user.department) {
            requestFirebaseNotificationPermission().then((firebaseToken) => {
                subscribeToTopic(firebaseToken);
                subscribeToTopic(firebaseToken, user.user.department);
            });
        }

        // eslint-disable-next-line
    }, [user.user.department]);

    onMessageReceive().then((message) => pushNotification(message.title, message.body));
}