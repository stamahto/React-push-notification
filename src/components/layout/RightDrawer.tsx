import { requestFirebaseNotificationPermission, unsubscribeFromTopic } from '../../utils/FirebaseMessaging';

export default function RightDrawer() {

    const logout = () => {
        requestFirebaseNotificationPermission().then((firebaseToken) => {
            unsubscribeFromTopic(firebaseToken as string);
            unsubscribeFromTopic(firebaseToken as string, user.user.department);

            user.logout();
        });
    }
    
}
