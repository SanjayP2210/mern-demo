import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchContact, deleteContact } from "../reducers/contactReducer";
import Loader from "../components/Loader/Loader";
export const AdminContacts = () => {
  const dispatch = useDispatch();
  const { contacts, isContactDeleted, loading } = useSelector(
    (state) => state.contact
  );
  const [contactData, setContactData] = useState([]);

  useEffect(() => {
    dispatch(fetchContact());
  }, []);

  useEffect(() => {
    if (contacts) {
      setContactData(contacts);
    }
  }, [contacts]);

  useEffect(() => {
    if (isContactDeleted) {
      dispatch(fetchContact());
    }
  }, [isContactDeleted]);
  return (
    <>
      {loading && <Loader />}
      <section className="admin-contacts-section">
        <div className="contact-content container">
          <h1 className="main-heading">Contact List</h1>
        </div>

        <div className="admin-users admin-contact-form">
          {contactData.map((curContactData, index) => {
            const { username, email, message, _id } = curContactData;

            return (
              <div key={index} className="contact-card">
                <p>{username}</p>
                <br />
                <p>{email}</p>
                <br />
                <p>{message}</p>
                <br />
                <br />
                <button
                  className="btn"
                  onClick={() => dispatch(deleteContact(_id))}
                >
                  delete
                </button>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
};
