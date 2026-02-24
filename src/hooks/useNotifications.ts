import { useState, useEffect } from 'react';

export const useNotifications = () => {
    const [permission, setPermission] = useState<NotificationPermission>(
        typeof window !== 'undefined' && 'Notification' in window ? Notification.permission : 'default'
    );

    const [remindersEnabled, setRemindersEnabled] = useState<boolean>(() => {
        const saved = localStorage.getItem('flavortown-reminders-enabled');
        return saved === 'true';
    });

    useEffect(() => {
        localStorage.setItem('flavortown-reminders-enabled', remindersEnabled.toString());
        // Sync permission on load
        if (typeof window !== 'undefined' && 'Notification' in window) {
            setPermission(Notification.permission);
        }
    }, [remindersEnabled]);

    const requestPermission = async () => {
        if (!('Notification' in window)) {
            alert('This browser does not support desktop notifications.');
            return false;
        }

        try {
            const result = await Notification.requestPermission();
            setPermission(result);
            return result === 'granted';
        } catch (error) {
            console.error('Error requesting notification permission:', error);
            return false;
        }
    };

    const toggleReminders = async () => {
        if (!remindersEnabled) {
            // When turning ON, request permission
            const status = await Notification.requestPermission();
            setPermission(status);

            if (status === 'granted') {
                setRemindersEnabled(true);
            } else if (status === 'denied') {
                alert('Notifications are blocked. Please enable them in browser settings.');
            }
            // If dismissed (default), we don't turn on
        } else {
            setRemindersEnabled(false);
        }
    };

    const sendNotification = (title: string, options?: NotificationOptions) => {
        if (!('Notification' in window)) return false;

        if (permission === 'granted' && remindersEnabled) {
            try {
                new Notification(title, {
                    ...options,
                });
                return true;
            } catch (e) {
                console.error('Failed to create notification:', e);
                return false;
            }
        }
        return false;
    };

    return {
        permission,
        remindersEnabled,
        toggleReminders,
        sendNotification,
        requestPermission
    };
};
