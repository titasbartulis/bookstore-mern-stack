import "./About_Bookhub.css";
import aboutImg from "../../images/about-img.jpg";

const About = () => {
  return (
    <section className='about'>
      <div className='container'>
        <div className='section-title'>
          <h2>About</h2>
        </div>

        <div className='about-content grid'>
          <div className='about-img'>
            <img src = {aboutImg} alt = "" />
          </div>
          <div className='about-text'>
            <h2 className='about-title fs-26 ls-1'>About BookHub</h2>
            <p className='fs-17'>Welcome to BookHub, where every book tells a story and every page opens a new world. Our online haven for book enthusiasts is more than just a store; it's a journey through the infinite possibilities of literature. At BookHub, we understand that a book is not just an object, but an experience waiting to unfold.</p>
            <p className='fs-17'>With an extensive collection that spans timeless classics to contemporary masterpieces, we curate our selection to inspire, challenge, and entertain. Whether you're looking to dive deep into historical sagas, solve thrilling mysteries, or indulge in romantic tales, we're here to guide you to your next great read.</p>
            <p className='fs-17'>Curiosity piqued by a title? Enamored by a cover? Seeking a deeper connection with the words you wish to embrace? Simply enter the name of the book in our intuitive search bar. Our comprehensive database is designed to bring you closer to the authors, the stories, and the experiences behind each book. You'll find detailed synopses, critical analyses, author biographies, reader reviews, and much more to enrich your reading experience.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
