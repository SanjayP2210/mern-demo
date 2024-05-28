import { Link, NavLink, useNavigate } from "react-router-dom";

export const Home = () => {
  const navigate = useNavigate();
  return (
    <>
      <main>
        <section>
          <div>
            <div className="home-page-contain content">
              <h1>Design Your House</h1>
              <p>
                By using our website you can design your own website very
                beautiful. <br /> Lorem, ipsum dolor sit amet consectetur
                adipisicing elit.{" "}
              </p>
              <div>
                <br />
                <br />
                <button
                  type="button"
                  onClick={() => {
                    navigate("/contact");
                  }}
                >
                  connect now{" "}
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};
