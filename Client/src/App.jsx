import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Register } from "./pages/Register.jsx";
import { Login } from "./pages/Login.jsx";
import { User } from "./pages/User.jsx";
import { Navbar } from "./components/Navbar/Navbar.jsx";
import { Logout } from "./pages/Logout.jsx";
import { AdminUpdate } from "./pages/Admin-Update.jsx";
import { Error } from "./pages/Error.jsx";
import { Home } from "./pages/Home.jsx";
import { AdminContacts } from "./pages/Admin-Contacts.jsx";
import { Contact } from "./pages/Contact.jsx";
import PrivateRoute from "./router/privateRouter.jsx";
import AuthorForm from "./pages/AuthorForm.jsx";
import BookForm from "./pages/BookForm.jsx";
import BookList from "./pages/BookList.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/" element={<Home />} />
          <Route path="*" element={<Error />} />
          <Route path="/book" element={<BookList />} />
          <Route path="/add-book" element={<BookForm />} />
          <Route path="/author" element={<AuthorForm />} />
          <Route path="/admin" element={<PrivateRoute />}>
            <Route path="users" element={<User />} />
            <Route path="contacts" element={<AdminContacts />} />
            <Route path="user/:id/edit" element={<AdminUpdate />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
