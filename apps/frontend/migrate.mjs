import fs from 'fs';
import { createClient } from '@supabase/supabase-js';
import crypto from 'crypto';

// Supabase config
const supabaseUrl = 'https://xuuzgbmxfxpctyhbifni.supabase.co';
const supabaseKey = 'sb_publishable_bpvGJz9Bg-XcWObGyA9Zjw_WUn6nu0o';
const supabase = createClient(supabaseUrl, supabaseKey);

// Cloudinary config
const cloudName = 'dyr6flyz3';
const apiKey = '738723584289923';
const apiSecret = '6NNM_iTnggMsNiaarmolfUQJhG0';

async function uploadToCloudinary(fileUrl) {
    if (!fileUrl) return null;
    if (fileUrl.includes('cloudinary')) return fileUrl; 
    console.log(`Uploading to Cloudinary: ${fileUrl}`);
    
    const timestamp = Math.round((new Date).getTime() / 1000);
    const signatureString = `timestamp=${timestamp}${apiSecret}`;
    const signature = crypto.createHash('sha1').update(signatureString).digest('hex');

    const formData = new FormData();
    formData.append('file', fileUrl);
    formData.append('api_key', apiKey);
    formData.append('timestamp', timestamp);
    formData.append('signature', signature);

    try {
        const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
            method: 'POST',
            body: formData
        });
        const result = await response.json();
        if (result.secure_url) {
            return result.secure_url.replace('/upload/', '/upload/w_1024,c_limit,q_auto,f_auto/');
        } else {
            console.error('Cloudinary upload error:', result);
            return fileUrl; 
        }
    } catch(e) {
        console.error('Fetch error:', e);
        return fileUrl;
    }
}

async function run() {
    console.log("Starting Migration...");

    const { data: users, error: ue } = await supabase.from('users').select('*');
    if (ue) console.error(ue);
    const usersMap = {};
    for (const u of users || []) {
        if (u.ktp_url) u.ktp_url = await uploadToCloudinary(u.ktp_url);
        usersMap[u.id] = u;
    }

    const { data: books, error: be } = await supabase.from('books').select('*');
    if (be) console.error(be);
    const booksMap = {};
    for (const b of books || []) {
        if (b.cover) b.cover = await uploadToCloudinary(b.cover);
        booksMap[b.id] = b;
    }

    const { data: loans, error: le } = await supabase.from('loans').select('*');
    if (le) console.error(le);
    const loansMap = {};
    for (const l of loans || []) {
        loansMap[l.id] = l;
    }

    const { data: tags, error: te } = await supabase.from('tags').select('*');
    if (te) console.error(te);
    const tagsMap = {};
    for (const t of tags || []) {
        tagsMap[t.id] = t;
    }

    const { data: bookTags, error: bte } = await supabase.from('book_tags').select('*');
    if (bte) console.error(bte);
    const bookTagsMap = {};
    for (const bt of bookTags || []) {
        if (!bookTagsMap[bt.book_id]) bookTagsMap[bt.book_id] = {};
        bookTagsMap[bt.book_id][bt.tag_id] = true;
    }

    const { data: donations, error: de } = await supabase.from('donations').select('*');
    if (de) console.error(de);
    const donationsMap = {};
    for (const d of donations || []) {
        donationsMap[d.id] = d;
    }

    const { data: feedback, error: fe } = await supabase.from('feedback').select('*');
    if (fe) console.error(fe);
    const feedbackMap = {};
    for (const f of feedback || []) {
        feedbackMap[f.id] = f;
    }

    console.log("Saving all data to 'firebase_data.json'...");
    
    const exportData = {
        users: usersMap,
        books: booksMap,
        loans: loansMap,
        tags: tagsMap,
        book_tags: bookTagsMap,
        donations: donationsMap,
        feedback: feedbackMap
    };

    fs.writeFileSync('firebase_data.json', JSON.stringify(exportData, null, 2));

    console.log("Migration Complete!");
    console.log("⚠️ PENTING: Silakan buka Firebase Console -> Realtime Database -> klik ikon 3 titik (Menu) -> Import JSON -> Pilih file 'firebase_data.json'");
    process.exit(0);
}

run();
