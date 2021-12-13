import "./App.css";
import React, { Component } from "react";
// import PropTypes from "prop-types";
import { nanoid } from "nanoid";
import ContactForm from "./components/ContactForm/ContactForm.jsx";
import { ContactList } from "./components/ContactList/ContactList";
import { Filter } from "./components/Filter/Filter";
import { saveToLocalStore, loadLocalStore } from "./utils/localStorage";

export default class App extends Component {
  // static propTypes = {
  //   prop: PropTypes,
  // };

  state = {
    contacts: [],
    filter: "",
  };

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
  componentDidUpdate = () => {
    saveToLocalStore("CONTACTS", this.state.contacts);
  };

  componentDidMount = () => {
    this.loadContacts();
  };

  setFilter = (e) => {
    const value = e.target.value.toLowerCase();
    this.setState({ filter: value });
  };

  loadContacts = () => {
    const newContacts = loadLocalStore("CONTACTS") || [];
    this.setState(() => ({ contacts: [...newContacts] }));
    return this.state.contacts;
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
