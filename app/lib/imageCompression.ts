import imageCompression from 'browser-image-compression';

export const compressImage = async (file: File): Promise<string> => {
    const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1200,
        useWebWorker: true,
        fileType: 'image/jpeg' as const,
        initialQuality: 0.8
    };

    try {
        const compressedFile = await imageCompression(file, options);
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result as string);
            reader.onerror = reject;
            reader.readAsDataURL(compressedFile);
        });
    } catch (error) {
        console.error('Image compression failed:', error);
        // Fallback to original file
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result as string);
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    }
};
