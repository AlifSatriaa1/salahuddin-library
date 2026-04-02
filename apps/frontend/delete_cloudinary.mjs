import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({ 
  cloud_name: 'dyr6flyz3', 
  api_key: '738723584289923', 
  api_secret: '6NNM_iTnggMsNiaarmolfUQJhG0' 
});

async function deleteAllImages() {
    try {
        console.log("Menghapus semua gambar di Cloudinary...");
        
        let nextCursor = null;
        let totalDeleted = 0;

        do {
            // Get all images
            const result = await cloudinary.api.resources({
                type: 'upload',
                max_results: 100,
                next_cursor: nextCursor
            });

            const publicIds = result.resources.map(res => res.public_id);
            
            if (publicIds.length > 0) {
                // Delete them
                const deleteResult = await cloudinary.api.delete_resources(publicIds);
                totalDeleted += publicIds.length;
                console.log(`Berhasil menghapus ${publicIds.length} gambar...`);
            }

            nextCursor = result.next_cursor;
        } while (nextCursor);

        console.log(`✅ Selesai! Sebanyak ${totalDeleted} gambar telah dikosongkan dari Cloudinary Anda.`);
        process.exit(0);

    } catch (error) {
        console.error("Gagal menghapus Cloudinary data:", error);
        process.exit(1);
    }
}

deleteAllImages();
