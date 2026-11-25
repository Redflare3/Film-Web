require('dotenv/config');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const films = [
  { judul: 'The Grand Budapest Hotel', tahun: 2014, genre: 'Komedi', sutradara: 'Wes Anderson', rating: 8.1, cover: '/covers/grand-budapest-hotel.jpg', sinopsis: 'Seorang concierge hotel legendaris dan anak didiknya terseret kasus pencurian lukisan berharga di tengah dunia yang sedang berubah.' },
  { judul: 'Interstellar', tahun: 2014, genre: 'Sci-Fi', sutradara: 'Christopher Nolan', rating: 8.7, cover: '/covers/interstellar.jpg', sinopsis: 'Sekelompok astronot melintasi lubang cacing untuk mencari planet baru bagi umat manusia.' },
  { judul: 'Parasite', tahun: 2019, genre: 'Thriller', sutradara: 'Bong Joon-ho', rating: 8.5, cover: '/covers/parasite.jpg', sinopsis: 'Sebuah keluarga miskin perlahan menyusup ke kehidupan keluarga kaya, hingga rahasia di bawah rumah mereka terungkap.' },
  { judul: 'Your Name', tahun: 2016, genre: 'Animasi', sutradara: 'Makoto Shinkai', rating: 8.4, cover: '/covers/your-name.jpg', sinopsis: 'Dua remaja yang tidak saling kenal tiba-tiba bertukar tubuh dan mulai mencari tahu hubungan di antara mereka.' },
  { judul: 'The Raid', tahun: 2011, genre: 'Aksi', sutradara: 'Gareth Evans', rating: 7.6, cover: '/covers/the-raid.jpg', sinopsis: 'Tim polisi terjebak di gedung apartemen yang dikuasai gembong kriminal dan harus bertarung naik lantai demi lantai.' },
  { judul: 'Whiplash', tahun: 2014, genre: 'Drama', sutradara: 'Damien Chazelle', rating: 8.5, cover: '/covers/whiplash.jpg', sinopsis: 'Seorang drummer muda berambisi menjadi hebat di bawah bimbingan instruktur musik yang sangat keras.' },
  { judul: 'Arrival', tahun: 2016, genre: 'Sci-Fi', sutradara: 'Denis Villeneuve', rating: 7.9, cover: '/covers/arrival.jpg', sinopsis: 'Seorang ahli bahasa ditugaskan berkomunikasi dengan makhluk asing yang tiba-tiba mendarat di berbagai penjuru dunia.' },
  { judul: 'Eternal Sunshine of the Spotless Mind', tahun: 2004, genre: 'Romansa', sutradara: 'Michel Gondry', rating: 8.3, cover: '/covers/eternal-sunshine.jpg', sinopsis: 'Sepasang kekasih memilih menghapus kenangan satu sama lain, lalu menyadari apa yang sebenarnya ingin mereka simpan.' },
];

async function main() {
  if ((await prisma.film.count()) > 0) {
    console.log('Tabel film sudah berisi data, seed dilewati.');
    return;
  }
  await prisma.film.createMany({ data: films });
  console.log(`Seed selesai: ${films.length} film ditambahkan.`);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());