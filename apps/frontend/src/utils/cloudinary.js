export const uploadToCloudinary = async (file) => {
    const cloudName = 'dyr6flyz3';
    const apiKey = '738723584289923';
    const apiSecret = '6NNM_iTnggMsNiaarmolfUQJhG0';

    const timestamp = Math.round((new Date).getTime() / 1000);

    // Generate signature: SHA-1 of `timestamp=${timestamp}${apiSecret}`
    const encodeUtf8 = (str) => new TextEncoder().encode(str);
    const data = encodeUtf8(`timestamp=${timestamp}${apiSecret}`);
    
    // Use Web Crypto API
    const hashBuffer = await crypto.subtle.digest('SHA-1', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const signature = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

    const formData = new FormData();
    formData.append('file', file);
    formData.append('api_key', apiKey);
    formData.append('timestamp', timestamp);
    formData.append('signature', signature);

    const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: 'POST',
        body: formData
    });

    const result = await response.json();
    if (result.secure_url) {
        return result.secure_url;
    } else {
        throw new Error(result.error?.message || 'Cloudinary upload failed');
    }
};
