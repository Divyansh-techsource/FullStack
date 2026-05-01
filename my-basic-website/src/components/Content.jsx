import './Content.css';

// Card Component - receives props
function Card({ image, title, description }) {
  return (
    <div className="card">
      <div className="card-image">{image}</div>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

// Button Component - receives props
function Button({ text, onClick }) {
  return (
    <button className="btn" onClick={onClick}>
      {text}
    </button>
  );
}

function Content({ cards, buttonText, onButtonClick }) {
  return (
    <main className="main-content">
      <section className="intro">
        <h2>About This Project</h2>
        <p>This is a simple website built with React and CSS to demonstrate components and props.</p>
      </section>

      <section className="cards-section">
        <h2>Featured Items</h2>
        <div className="cards-container">
          {cards.map((card, index) => (
            <Card 
              key={index}
              image={card.image}
              title={card.title}
              description={card.description}
            />
          ))}
        </div>
      </section>

      <section className="cta-section">
        <h2>Get Started</h2>
        <p>Click the button below to see props in action!</p>
        <Button text={buttonText} onClick={onButtonClick} />
      </section>
    </main>
  );
}

export default Content;
