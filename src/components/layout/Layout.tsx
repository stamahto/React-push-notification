import { requestFirebaseNotificationPermission, onMessageReceive, subscribeToTopic } from '../../utils/FirebaseMessaging';
import { pushNotification } from '../common/PushNotification';

export default function Layout() {

    useEffect(() => {
        if (user.user.department) {
            requestFirebaseNotificationPermission().then((firebaseToken) => {
                subscribeToTopic(firebaseToken);
                subscribeToTopic(firebaseToken, user.user.department);
            });
        }

    }, [user.user.department]);

    onMessageReceive().then((message) => pushNotification(message.title, message.body));
}
