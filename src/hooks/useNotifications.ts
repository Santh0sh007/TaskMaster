import { useState, useEffect } from 'react';
import { LocalNotifications } from '@capacitor/local-notifications';
import { Capacitor } from '@capacitor/core';

export const useNotifications = () => {
    const [permission, setPermission] = useState<PermissionStatus | string>('default');

    const [remindersEnabled, setRemindersEnabled] = useState<boolean>(() => {
        const saved = localStorage.getItem('flavortown-reminders-enabled');
        return saved === 'true';
    });

    useEffect(() => {
        localStorage.setItem('flavortown-reminders-enabled', remindersEnabled.toString());
        checkPermission();
    }, [remindersEnabled]);

    const checkPermission = async () => {
        if (Capacitor.isNativePlatform()) {
            const status = await LocalNotifications.checkPermissions();
            setPermission(status.display);
        } else if ('Notification' in window) {
            setPermission(Notification.permission);
        }
    };

    const requestPermission = async () => {
        try {
            if (Capacitor.isNativePlatform()) {
                console.log('Requesting native permissions...');
                const status = await LocalNotifications.requestPermissions();
                console.log('Permission status:', status);
                setPermission(status.display);

                if (status.display !== 'granted') {
                    alert(`Permission ${status.display}. Please check app settings.`);
                }
                return status.display === 'granted';
            } else if ('Notification' in window) {
                const result = await Notification.requestPermission();
                setPermission(result);
                return result === 'granted';
            }
        } catch (error) {
            console.error('Permission request failed:', error);
            alert('Failed to request notification permission: ' + error);
        }
        return false;
    };

    const toggleReminders = async () => {
        if (!remindersEnabled) {
            const granted = await requestPermission();
            if (granted) {
                setRemindersEnabled(true);
            } else {
                alert('Notification permission is required for reminders.');
            }
        } else {
            setRemindersEnabled(false);
        }
    };

    const sendNotification = async (title: string, body: string) => {
        if (!remindersEnabled) return false;

        if (Capacitor.isNativePlatform()) {
            try {
                await LocalNotifications.schedule({
                    notifications: [
                        {
                            title,
                            body,
                            id: Math.floor(Math.random() * 10000),
                            schedule: { at: new Date(Date.now() + 1000) },
                            sound: 'default'
                        }
                    ]
                });
                return true;
            } catch (e) {
                console.error('LocalNotification error:', e);
                return false;
            }
        } else if ('Notification' in window && Notification.permission === 'granted') {
            new Notification(title, { body });
            return true;
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
