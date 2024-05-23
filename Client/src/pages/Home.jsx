import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <>
      <main>
        <section className="section-hero">
          <div className="container grid grid-two-cols">
            <div className="hero-content">
              <h1>Welcome to Demo</h1>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam
                in quaerat similique natus obcaecati labore, sapiente soluta
                recusandae quod quam cum voluptatum. Rerum, nisi impedit
                perspiciatis temporibus officia perferendis quaerat.
              </p>
              <div className="btn btn-group">
                <Link to="/contact">
                  <button className="btn">connect now</button>
                </Link>
                <Link to="/services">
                  <button className="btn secondary-btn">learn more</button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};
