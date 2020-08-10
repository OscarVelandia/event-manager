import React from 'react';
import Input from './Input';

const inputStyles = {
  width: '80%',
};

const EventCreationForm = ({ onChange }) => {
  return (
    <form>
      <Input
        type="input"
        id="Name"
        name="label"
        customStyles={inputStyles}
        hasLabel
        onChange={onChange}
      />
      <Input
        type="input"
        id="Description"
        name="description"
        customStyles={inputStyles}
        hasLabel
        onChange={onChange}
      />
      <Input
        type="input"
        id="Category"
        name="categoryLabel"
        customStyles={inputStyles}
        hasLabel
        onChange={onChange}
      />
      <Input
        type="input"
        id="Location"
        name="location"
        customStyles={inputStyles}
        hasLabel
        onChange={onChange}
      />
      <Input
        type="input"
        id="Date"
        name="date"
        customStyles={inputStyles}
        hasLabel
        onChange={onChange}
      />
    </form>
  );
};

export default EventCreationForm;
