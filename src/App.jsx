import "./App.css";
import React, { Component } from "react";
// import PropTypes from "prop-types";
import { nanoid } from "nanoid";
import ContactForm from "./components/ContactForm/ContactForm.jsx";
import { ContactList } from "./components/ContactList/ContactList";
import { Filter } from "./components/Filter/Filter";

export default class App extends Component {
  // static propTypes = {
  //   prop: PropTypes,
  // };

  state = {
    contacts: [
      { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
      { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
      { id: "id-3", name: "Eden Clements", number: "645-17-79" },
      { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
    ],
    filter: "",
  };

  componentDidMount = ({ name, number }) => {};

  setContacts = ({ name, number }) => {
    const { contacts } = this.state;
    const contact = {
      id: nanoid(),
      name,
      number,
    };
    contacts.some((i) => i.name === name)
      ? alert(`${name} is already in contacts`)
      : this.setState(({ contacts }) => ({
          contacts: [contact, ...contacts],
        }));
  };

  deleteContact = (id) => {
    this.setState((p) => ({
      contacts: p.contacts.filter((i) => i.id !== id),
    }));
  };

  setFilter = (e) => {
    const value = e.target.value.toLowerCase();
    this.setState({ filter: value });
  };

  getContacts = () => {
    const { contacts, filter } = this.state;
    return contacts.filter((i) => i.name.toLowerCase().includes(filter));
  };

  render() {
    const getContacts = this.getContacts();
    return (
      <div className="App">
        <h1>Phonebook</h1>
        <ContactForm submitForm={this.setContacts} />
        <h2>Contacts</h2>
        <Filter filter={this.setFilter} />
        <ContactList
          contacts={getContacts}
          deleteContact={this.deleteContact}
        />
      </div>
    );
  }
}
