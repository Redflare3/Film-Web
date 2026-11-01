import KartuFilm from './KartuFilm'

function DaftarFilm({ daftarFilm, totalFilm }) {
  if (totalFilm === 0) {
    return <p className="kosong">Belum ada data film</p>
  }

  if (daftarFilm.length === 0) {
    return <p className="kosong">Tidak ada film yang cocok dengan pencarian.</p>
  }

  return (
    <div className="daftar">
      {daftarFilm.map((film) => (
        <KartuFilm
          key={film.id}
          judul={film.judul}
          tahun={film.tahun}
          genre={film.genre}
          sutradara={film.sutradara}
          rating={film.rating}
          cover={film.cover}
        />
      ))}
    </div>
  )
}

export default DaftarFilm