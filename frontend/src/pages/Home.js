import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="home-container">
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Umów się online</h1>
          <h1 class="text-3xl font-bold underline">
            Hello world!
          </h1>
          <p className="hero-description">
            Chcesz umówić się do fryzjera, barbera, stylistki paznokci lub salonu
            masażu w okolicy? Szukasz miejsca, w którym najlepsi specjaliści
            zadbają o Twoją brodę, brwi lub zrobią relaksujący masaż?
          </p>
          <p className="hero-description">
            ReserveHub to darmowa aplikacja do rezerwacji, dzięki której z łatwością
            znajdziesz wolny termin i wygodnie umówisz się na wizytę. Bez
            dzwonienia — rezerwujesz o każdej porze i z dowolnego miejsca.
          </p>
          <Link
            to="/services"
            style={{
              display: 'inline-block',
              padding: '12px 24px',
              backgroundColor: '#00a3ff',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '4px',
              fontWeight: 'bold',
              marginTop: '20px'
            }}
          >
            Odkryj usługi w okolicy
          </Link>
        </div>
        <div className="hero-image">
          <img
            src="/images/reservation-illustration.svg"
            alt="Rezerwacja online"
            style={{ width: '100%', maxWidth: '500px' }}
          />
        </div>
      </section>

      <section className="secondary-section">
        <div className="secondary-image">
          <img
            src="/images/mobile-app.svg"
            alt="Aplikacja mobilna"
            style={{ width: '100%', maxWidth: '400px' }}
          />
        </div>
        <div className="secondary-content">
          <h2 className="secondary-title">Coś Ci wypadło? Nie szkodzi!</h2>
          <p className="secondary-description">
            Pobierz ReserveHub — darmową aplikację do rezerwacji — i zarządzaj
            swoimi wizytami, gdziekolwiek jesteś. Zmień termin wizyty lub
            odwołaj rezerwację bez dzwonienia.
          </p>
          <p className="secondary-description">
            Wiemy, że każdego dnia dużo się u Ciebie dzieje, dlatego będziemy
            Ci przypominać o zbliżających się wizytach.
          </p>
        </div>
      </section>
    </div>
  );
}

export default Home; 