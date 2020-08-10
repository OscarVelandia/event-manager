import React from 'react';
import Input from './Input';

const inputStyles = {
  width: '80%',
};

const EventCreationForm = ({ categories }) => {
  return (
    <form>
      <Input type="input" id="Name" customStyles={inputStyles} hasLabel />
      <Input type="input" id="Description" customStyles={inputStyles} hasLabel />
      <Input
        type="select"
        id="Category"
        customStyles={inputStyles}
        options={categories}
        hasLabel
      />
      <Input type="input" id="Location" customStyles={inputStyles} hasLabel />
      <Input type="input" id="Date" customStyles={inputStyles} hasLabel />
    </form>
  );
};

export default EventCreationForm;
