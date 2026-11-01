import { useState } from 'react'
import Navbar from './components/Navbar'
import FormTambahFilm from './components/FormTambahFilm'
import DaftarFilm from './components/DaftarFilm'
import Footer from './components/Footer'
import './App.css'

function App() {
  const [daftarFilm, setDaftarFilm] = useState([
    {
      id: 1, judul: 'The Grand Budapest Hotel', tahun: 2014, genre: 'Komedi',
      sutradara: 'Wes Anderson', rating: 8.1,
      sinopsis: 'Seorang concierge hotel legendaris dan anak didiknya terseret kasus pencurian lukisan berharga di tengah dunia yang sedang berubah.',
      cover: '/covers/grand-budapest-hotel.jpg',
    },
    {
      id: 2, judul: 'Interstellar', tahun: 2014, genre: 'Sci-Fi',
      sutradara: 'Christopher Nolan', rating: 8.7,
      sinopsis: 'Sekelompok astronot melintasi lubang cacing untuk mencari planet baru bagi umat manusia yang bumi-nya mulai tak layak huni.',
      cover: '/covers/interstellar.jpg',
    },
    {
      id: 3, judul: 'Parasite', tahun: 2019, genre: 'Thriller',
      sutradara: 'Bong Joon-ho', rating: 8.5,
      sinopsis: 'Sebuah keluarga miskin perlahan menyusup ke kehidupan keluarga kaya, hingga rahasia di bawah rumah mereka terungkap.',
      cover: '/covers/parasite.jpg',
    },
    {
      id: 4, judul: 'Your Name', tahun: 2016, genre: 'Animasi',
      sutradara: 'Makoto Shinkai', rating: 8.4,
      sinopsis: 'Dua remaja yang tidak saling kenal tiba-tiba bertukar tubuh dan mulai mencari tahu hubungan di antara mereka.',
      cover: '/covers/your-name.jpg',
    },
    {
      id: 5, judul: 'The Raid', tahun: 2011, genre: 'Aksi',
      sutradara: 'Gareth Evans', rating: 7.6,
      sinopsis: 'Tim polisi terjebak di gedung apartemen yang dikuasai gembong kriminal dan harus bertarung naik lantai demi lantai.',
      cover: '/covers/the-raid.jpg',
    },
    {
      id: 6, judul: 'Whiplash', tahun: 2014, genre: 'Drama',
      sutradara: 'Damien Chazelle', rating: 8.5,
      sinopsis: 'Seorang drummer muda berambisi menjadi hebat di bawah bimbingan instruktur musik yang sangat keras.',
      cover: '/covers/whiplash.jpg',
    },
    {
      id: 7, judul: 'Arrival', tahun: 2016, genre: 'Sci-Fi',
      sutradara: 'Denis Villeneuve', rating: 7.9,
      sinopsis: 'Seorang ahli bahasa ditugaskan berkomunikasi dengan makhluk asing yang tiba-tiba mendarat di berbagai penjuru dunia.',
      cover: '/covers/arrival.jpg',
    },
    {
      id: 8, judul: 'Eternal Sunshine of the Spotless Mind', tahun: 2004, genre: 'Romansa',
      sutradara: 'Michel Gondry', rating: 8.3,
      sinopsis: 'Sepasang kekasih memilih menghapus kenangan satu sama lain, lalu menyadari apa yang sebenarnya ingin mereka simpan.',
      cover: '/covers/eternal-sunshine.jpg',
    },
  ])

  const [kataKunci, setKataKunci] = useState('')
  const [genreAktif, setGenreAktif] = useState('Semua')
  const [urutan, setUrutan] = useState('rating')

  const tambahFilm = (filmBaru) => {
    setDaftarFilm([...daftarFilm, { id: Date.now(), ...filmBaru }])
  }

  const daftarGenre = ['Semua', ...new Set(daftarFilm.map((f) => f.genre))]

  const kata = kataKunci.trim().toLowerCase()
  const filmTampil = daftarFilm
    .filter((f) => genreAktif === 'Semua' || f.genre === genreAktif)
    .filter((f) =>
      [f.judul, f.sutradara, f.genre].join(' ').toLowerCase().includes(kata)
    )
    .sort((a, b) => {
      if (urutan === 'rating') return b.rating - a.rating
      if (urutan === 'tahun') return b.tahun - a.tahun
      return a.judul.localeCompare(b.judul)
    })

  return (
  <>
    <Navbar
      kataKunci={kataKunci}
      onUbahKataKunci={setKataKunci}
      daftarGenre={daftarGenre}
      genreAktif={genreAktif}
      onUbahGenre={setGenreAktif}
    />

    <main className="page">
      <FormTambahFilm onTambah={tambahFilm} />

      <section id="koleksi" className="koleksi">
        <h2 className="section-judul">Daftar Film</h2>
        <div className="toolbar">
          <span>
            <strong>{filmTampil.length} film</strong> ditampilkan
          </span>
          <label className="toolbar__urut">
            Urutkan
            <select
              className="select"
              value={urutan}
              onChange={(e) => setUrutan(e.target.value)}
            >
              <option value="rating">Rating tertinggi</option>
              <option value="tahun">Tahun terbaru</option>
              <option value="judul">Judul A-Z</option>
            </select>
          </label>
        </div>

        <DaftarFilm daftarFilm={filmTampil} totalFilm={daftarFilm.length} />
      </section>
    </main>

    <Footer namaApp="FilmVault" />
  </>
)
}

export default App