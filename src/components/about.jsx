import { useState } from "react";

function About() {
  const [contact, setContact] = useState({ name: "", phone: "", email: "" });

  function handleSubmit() {
    event.preventDefault();
    setContact({
      name: "",
      phone: "",
      email: "",
    });
  }

  return (
    <div>
      <h1>About</h1>
      <div className="about">
        <img className="about-images" src="Azil.png" alt="Azil" />
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Adipisci
          magni numquam beatae autem amet pariatur, reiciendis itaque aliquid
          ratione assumenda quas at quod et? Asperiores dolorem tempore minima
          deleniti odio! Lorem ipsum dolor sit amet consectetur adipisicing
          elit. Itaque et laboriosam nesciunt laborum deserunt dolores qui
          consequatur, obcaecati maiores, eligendi dolorem blanditiis, doloribus
          aperiam est dolor non amet repudiandae inventore.
        </p>
      </div>
      <div className="about">
        <img className="about-images" src="AzilM.png" alt="Azil" />
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Adipisci
          magni numquam beatae autem amet pariatur, reiciendis itaque aliquid
          ratione assumenda quas at quod et? Asperiores dolorem tempore minima
          deleniti odio! Lorem ipsum dolor sit amet consectetur adipisicing
          elit. Itaque et laboriosam nesciunt laborum deserunt dolores qui
          consequatur, obcaecati maiores, eligendi dolorem blanditiis, doloribus
          aperiam est dolor non amet repudiandae inventore.
        </p>
      </div>
      <div className="about-form">
        <form onSubmit={handleSubmit}>
          <h2>Contact us:</h2>
          <label htmlFor="name">
            <input
              htmlFor="name"
              placeholder="Name"
              maxLength={20}
              name="name"
              value={contact.name}
              onChange={(e) => setContact({ ...contact, name: e.target.value })}
              type="text"
            />
          </label>
          <label>
            <input
              htmlFor="phone"
              placeholder="Phone"
              maxLength={20}
              name="phone"
              value={contact.phone}
              onChange={(e) =>
                setContact({ ...contact, phone: e.target.value })
              }
              type="text"
            />
          </label>
          <label>
            <input
              htmlFor="email"
              placeholder="Email"
              maxLength={20}
              name="email"
              value={contact.email}
              onChange={(e) =>
                setContact({ ...contact, email: e.target.value })
              }
              type="email"
            />
          </label>
          <button>Send</button>
        </form>
      </div>
    </div>
  );
}

export default About;
