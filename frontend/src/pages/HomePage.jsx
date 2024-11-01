import { useMovieStore } from '../stores/useMovieStore';
import MoviePoster from '../components/MoviePoster';
import { useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

const HomePage = () => {
  const { movies, getMovies } = useMovieStore();

  useEffect(() => {
    getMovies();
  }, [getMovies]);

  return (
    <div className="bg-gray-100">
      {/* Banner Section */}
      <div
        className="relative bg-cover bg-center h-96"
        style={{ backgroundImage: `url('/path/to/banner-image.jpg')` }}
      >
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-black opacity-50"></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white">
          <h1 className="text-4xl font-bold">CHÍNH THỨC KHỞI CHIẾU</h1>
          <p className="mt-4 text-xl">Ngày xưa có một chuyện tình</p>
          <button className="mt-8 px-6 py-2 bg-red-600 text-white rounded-full">
            Ra rạp ngay thôi!
          </button>
        </div>
      </div>

      <div className="p-8">
        <h2 className="text-3xl font-bold text-center my-6">MOVIE SELECTION</h2>
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={10} // Giảm khoảng cách giữa các poster
          slidesPerView={4}
          navigation={true}
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
          loop={true}
          onSwiper={swiper => console.log(swiper)}
          onSlideChange={() => console.log('slide change')}
        >
          {movies.map(movie => (
            <SwiperSlide key={movie._id} style={{ width: 'auto' }}>
              <MoviePoster movie={movie} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default HomePage;
