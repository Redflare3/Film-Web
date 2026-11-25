import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import FormTambahFilm from './components/FormTambahFilm'
import CariFilmAPI from './components/CariFilmAPI'
import DaftarFilm from './components/DaftarFilm'
import Footer from './components/Footer'
import './App.css'
//Tempat CRUD nya
const API_URL = 'http://localhost:3000/film'

async function bacaError(res) {
  try {
    const body = await res.json()
    return Array.isArray(body.message) ? body.message.join(', ') : body.message
  } catch {
    return `Server membalas status ${res.status}`
  }
}

function App() {
  const [daftarFilm, setDaftarFilm] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [percobaan, setPercobaan] = useState(0)
  const [pesan, setPesan] = useState(null)

  const [kataKunci, setKataKunci] = useState('')
  const [genreAktif, setGenreAktif] = useState('Semua')
  const [urutan, setUrutan] = useState('rating')

  useEffect(() => {
    const controller = new AbortController()

    async function ambilFilm() {
      setLoading(true)
      setError(null)
      try {
        const res = await fetch(API_URL, { signal: controller.signal })
        if (!res.ok) throw new Error(`Server membalas status ${res.status}`)
        setDaftarFilm(await res.json())
      } catch (err) {
        if (err.name === 'AbortError') return
        setError(
          err.message === 'Failed to fetch'
            ? 'Backend tidak dapat dihubungi. Pastikan server NestJS sudah berjalan.'
            : err.message
        )
      } finally {
        if (!controller.signal.aborted) setLoading(false)
      }
    }

    ambilFilm()
    return () => controller.abort()
  }, [percobaan])

  const tambahFilm = async (filmBaru) => {
    setPesan(null)
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(filmBaru),
      })
      if (!res.ok) throw new Error(await bacaError(res))
      const tersimpan = await res.json()
      setDaftarFilm((lama) => [...lama, tersimpan])
    } catch (err) {
      setPesan(`Gagal menambah film: ${err.message}`)
    }
  }

  const ubahRating = async (id, ratingLama) => {
    const input = window.prompt('Rating baru (0-10):', ratingLama)
    if (input === null) return

    const rating = Number(input)
    if (input.trim() === '' || Number.isNaN(rating) || rating < 0 || rating > 10) {
      setPesan('Rating harus berupa angka 0 sampai 10.')
      return
    }

    setPesan(null)
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rating }),
      })
      if (!res.ok) throw new Error(await bacaError(res))
      const diperbarui = await res.json()
      setDaftarFilm((lama) => lama.map((f) => (f.id === id ? diperbarui : f)))
    } catch (err) {
      setPesan(`Gagal mengubah rating: ${err.message}`)
    }
  }


  const hapusFilm = async (id) => {
    if (!window.confirm('Hapus film ini dari koleksi?')) return

    setPesan(null)
    try {
      const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error(await bacaError(res))
      setDaftarFilm((lama) => lama.filter((f) => f.id !== id))
    } catch (err) {
      setPesan(`Gagal menghapus film: ${err.message}`)
    }
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

        <CariFilmAPI
          onTambah={tambahFilm}
          judulTersimpan={daftarFilm.map((f) => f.judul.toLowerCase())}
        />

        <section id="koleksi" className="koleksi">
          <h2 className="section-judul">Daftar Film</h2>

          {pesan && <div className="pesan">{pesan}</div>}

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

          {loading && (
            <div className="status status--loading">
              <span className="spinner" />
              Memuat data dari database...
            </div>
          )}

          {error && (
            <div className="status status--error">
              <p> Gagal mengambil data: {error}</p>
              <button
                className="tombol tombol--outline"
                onClick={() => setPercobaan((p) => p + 1)}
              >
                Coba Lagi
              </button>
            </div>
          )}

          {!loading && !error && (
            <DaftarFilm
              daftarFilm={filmTampil}
              totalFilm={daftarFilm.length}
              onHapus={hapusFilm}
              onUbahRating={ubahRating}
            />
          )}
        </section>
      </main>

      <Footer namaApp="FilmVault" />
    </>
  )
}

export default App