const dbUrl = 'https://salahuddin-library-default-rtdb.asia-southeast1.firebasedatabase.app';

const dataToMerge = {
  "tags/dummy_tag_1": { name: "Sains & Ilmu Pasti", color: "#10b981", created_at: new Date().toISOString() },
  "tags/dummy_tag_2": { name: "Teknologi", color: "#3b82f6", created_at: new Date().toISOString() },
  "tags/dummy_tag_3": { name: "Sastra & Fiksi", color: "#f59e0b", created_at: new Date().toISOString() },

  "books/dummy_book_1": { title: "Dunia Sophie", author: "Jostein Gaarder", stock: 3, cover: "https://picsum.photos/id/1010/400/600", created_at: new Date().toISOString() },
  "books/dummy_book_2": { title: "Belajar Cepat ReactJS", author: "Programmer Zaman Now", stock: 5, cover: "https://picsum.photos/id/1025/400/600", created_at: new Date().toISOString() },
  "books/dummy_book_3": { title: "Kosmos", author: "Carl Sagan", stock: 2, cover: "https://picsum.photos/id/1035/400/600", created_at: new Date().toISOString() },

  "book_tags/dummy_book_1/dummy_tag_3": true,
  "book_tags/dummy_book_2/dummy_tag_2": true,
  "book_tags/dummy_book_3/dummy_tag_1": true,

  "users/dummy_user_1": { email: "member1@contoh.com", name: "Salsabila (Member Aktif)", role: "member", join_date: new Date(Date.now() - 5000000000).toISOString(), donated_books: 1, programs_joined: [], member_status: "verified", ktp_url: "https://picsum.photos/id/111/800/500", payment_status: "paid", payment_date: new Date().toISOString() },
  "users/dummy_user_2": { email: "pending@contoh.com", name: "Rahmat (Tunggu Konfirmasi)", role: "member", join_date: new Date(Date.now() - 100000000).toISOString(), donated_books: 0, programs_joined: [], member_status: "pending_approval", ktp_url: "https://picsum.photos/id/112/800/500", payment_status: "unpaid", payment_date: null },
  "users/dummy_user_3": { email: "nonmember@contoh.com", name: "Jamal (Non-Member)", role: "member", join_date: new Date().toISOString(), donated_books: 0, programs_joined: [], member_status: "non-member", ktp_url: null, payment_status: "unpaid", payment_date: null },

  "loans/dummy_loan_1": { user_id: "dummy_user_1", book_id: "dummy_book_2", borrow_date: new Date(Date.now() - 300000000).toISOString(), due_date: new Date(Date.now() + 300000000).toISOString(), return_date: null, status: "borrowed", renewal_count: 0, created_at: new Date(Date.now() - 300000000).toISOString(), fine_amount: 0 },
  "loans/dummy_loan_2": { user_id: "dummy_user_1", book_id: "dummy_book_1", borrow_date: new Date(Date.now() - 1000000000).toISOString(), due_date: new Date(Date.now() - 500000000).toISOString(), return_date: new Date(Date.now() - 400000000).toISOString(), status: "returned", renewal_count: 0, created_at: new Date(Date.now() - 1000000000).toISOString(), fine_amount: 0 },
  "loans/dummy_loan_3": { user_id: "dummy_user_3", book_id: "dummy_book_3", borrow_date: new Date(Date.now() - 864000000).toISOString(), due_date: new Date(Date.now() - 200000000).toISOString(), return_date: null, status: "borrowed", renewal_count: 1, created_at: new Date(Date.now() - 864000000).toISOString(), fine_amount: 5000 }, 

  "donations/dummy_donation_1": { donor_name: "Hamdan Syukri", whatsapp: "081234567890", book_count: 15, book_titles: "1. Kumpulan Kitab Kuning\n2. Biografi Tokoh\n3. Laskar Pelangi", status: "contacted", created_at: new Date(Date.now() - 86400000).toISOString() },
  "donations/dummy_donation_2": { donor_name: "Anisa Fitri", whatsapp: "089876543210", book_count: 2, book_titles: "Novel Hujan Tereliye", status: "received", created_at: new Date(Date.now() - 172800000).toISOString() },

  "feedback/dummy_feedback_1": { name: "Bapak Setia", email: "setia@contoh.com", message: "Wah, koleksi bukunya sekarang jauh lebih rapi admin! Lanjutkan pengabdiannya 👏", is_read: false, created_at: new Date().toISOString() },
  "feedback/dummy_feedback_2": { name: "Fauziah", email: "fauziahinstitute@contoh.com", message: "Apakah web ini juga melayani donasi dalam bentuk rak buku? Kebetulan ada lebih di rumah.", is_read: true, created_at: new Date(Date.now() - 86400000).toISOString() }
};

async function seedData() {
  try {
    console.log("🚀 Menyuntikkan paket lengkap (Tags, Peminjaman, KTP, Donasi, Ulasan) secara serentak...");
    
    // PATCH will cleanly update the nested paths without overwriting other existing data
    const response = await fetch(`${dbUrl}/.json`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dataToMerge)
    });

    if (response.ok) {
      console.log("✅ Berhasil! Semua tabel (Peminjaman, Tags, KTP, Donasi, Users, dll) kini punya data cantik bergambar!");
    } else {
      console.error("❌ Gagal injeksi:", await response.text());
    }
  } catch (error) {
    console.error("❌ Terjadi kesalahan script:", error.message);
  }
}

seedData();
