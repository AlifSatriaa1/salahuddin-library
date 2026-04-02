const dbUrl = 'https://salahuddin-library-default-rtdb.asia-southeast1.firebasedatabase.app';

const dummyBooks = [
  {
    title: "Filosofi Koding Modern",
    author: "Riza Fahmi",
    stock: 5,
    cover: "https://picsum.photos/id/20/400/600",
    created_at: new Date().toISOString(),
  },
  {
    title: "Sejarah Dunia yang Disembunyikan",
    author: "Jonathan Black",
    stock: 2,
    cover: "https://picsum.photos/id/24/400/600",
    created_at: new Date().toISOString(),
  },
  {
    title: "Seni Berpikir Positif",
    author: "Ibrahim Elfiky",
    stock: 8,
    cover: "https://picsum.photos/id/36/400/600",
    created_at: new Date().toISOString(),
  },
  {
    title: "Menguasai Pemrograman Web",
    author: "Web Bos",
    stock: 3,
    cover: "https://picsum.photos/id/48/400/600",
    created_at: new Date().toISOString(),
  },
  {
    title: "Psikologi Komunikasi",
    author: "Jalaluddin Rakhmat",
    stock: 4,
    cover: "https://picsum.photos/id/60/400/600",
    created_at: new Date().toISOString(),
  }
];

const dummyDonations = [
  {
    donor_name: "Ahmad Zaki",
    whatsapp: "081234567890",
    book_count: 5,
    book_titles: "1. Belajar React\n2. NextJS Mastery",
    status: "pending",
    created_at: new Date(Date.now() - 86400000).toISOString()
  },
  {
    donor_name: "Siti Sarah",
    whatsapp: "089876543210",
    book_count: 2,
    book_titles: "1. Novel Hujan by Tere Liye",
    status: "received",
    created_at: new Date(Date.now() - 172800000).toISOString()
  }
];

const dummyUsers = [
  {
    email: "agus.dummy@example.com",
    name: "Agus Pratama",
    role: "member",
    join_date: new Date(Date.now() - 1000000000).toISOString(),
    donated_books: 2,
    programs_joined: [],
    member_status: "verified",
    ktp_url: "https://picsum.photos/id/111/800/500",
    payment_status: "paid",
    payment_date: new Date().toISOString()
  },
  {
    email: "budi.dummy@example.com",
    name: "Budi Santoso",
    role: "member",
    join_date: new Date(Date.now() - 500000000).toISOString(),
    donated_books: 0,
    programs_joined: [],
    member_status: "pending_approval",
    ktp_url: "https://picsum.photos/id/112/800/500",
    payment_status: "unpaid",
    payment_date: null
  }
];

async function seedData() {
  try {
    console.log("📡 Menambahkan Dummy Buku...");
    for (const book of dummyBooks) {
      await fetch(`${dbUrl}/books.json`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(book)
      });
    }

    console.log("📦 Menambahkan Dummy Donasi...");
    for (const donation of dummyDonations) {
      await fetch(`${dbUrl}/donations.json`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(donation)
      });
    }

    console.log("🧑‍💻 Menambahkan Dummy User...");
    for (const user of dummyUsers) {
      await fetch(`${dbUrl}/users.json`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
      });
    }

    console.log("✅ Seeding selesai! Data berhasil masuk ke Firebase.");
  } catch (error) {
    console.error("❌ Terjadi kesalahan:", error.message);
  }
}

seedData();
