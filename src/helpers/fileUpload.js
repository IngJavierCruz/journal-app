export const fileUpload = async(file) => {
    
    const cloudUrl = 'https://api.cloudinary.com/v1_1/dy8scrp8n/upload';

    const formData = new FormData();
    formData.append('upload_preset', 'journal-app');
    formData.append('file', file);

    try {

        const resp = await fetch(cloudUrl, {
            method: 'POST',
            body: formData
        });

        if ( resp.ok ) {
            const cloudResp = await resp.json();
            return cloudResp.secure_url;
        } else {
            throw await resp.json();
        }



    } catch (err) {
        throw err;        
    }

}