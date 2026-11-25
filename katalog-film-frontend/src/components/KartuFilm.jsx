import Poster from './Poster'

function KartuFilm({
  id, judul, tahun, genre, sutradara, rating, cover, onHapus, onUbahRating,
}) {
  return (
    <article className="kartu">
      <div className="kartu__poster">
        <Poster cover={cover} judul={judul} />
      </div>
      <h3 className="kartu__judul">{judul}</h3>
      <p className="kartu__sutradara">{sutradara}</p>
      <div className="kartu__bawah">
        <span className="meta">{tahun} · {genre}</span>
        <span className="rating">⭐ {rating.toFixed(1)}</span>
      </div>
      <div className="kartu__aksi">
        <button className="tombol tombol--outline" onClick={() => onUbahRating(id, rating)}>
          Ubah rating
        </button>
        <button className="tombol tombol--hapus" onClick={() => onHapus(id)}>
          Hapus
        </button>
      </div>
    </article>
  )
}

export default KartuFilm