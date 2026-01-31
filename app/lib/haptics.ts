// Haptic feedback utility
export const triggerHaptic = (type: 'light' | 'medium' | 'heavy' = 'light') => {
    try {
        if (typeof navigator !== 'undefined' && 'vibrate' in navigator && navigator.vibrate) {
            const patterns = {
                light: 10,
                medium: 20,
                heavy: 30
            };
            navigator.vibrate(patterns[type]);
        }
    } catch (error) {
        // Silently fail on iOS Safari which doesn't support vibrate
    }
};

// Check if haptic is supported
export const isHapticSupported = () => {
    try {
        return typeof navigator !== 'undefined' && 'vibrate' in navigator;
    } catch {
        return false;
    }
};
