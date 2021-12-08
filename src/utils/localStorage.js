const addContact = (newContact) => {
  const oldContacts = JSON.parse(localStorage.getItem("contacts")) || [];
  const newContacts = [...oldContacts, newContact];
  const stringifyNewContacts = JSON.stringify(newContacts);
  localStorage.setItem("contacts", stringifyNewContacts);
};
const getItems = (key) => {
  try {
    const serializedState = localStorage.getItem(key);
    return serializedState === null ? undefined : JSON.parse(serializedState);
  } catch (error) {
    console.error("Get state error: ", error.message);
  }
};

export { addContact, getItems };
