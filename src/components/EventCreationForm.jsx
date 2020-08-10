import React from 'react';
import Input from './Input';

const inputStyles = {
  width: '80%',
};

const EventCreationForm = ({ categories, onChange }) => {
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
        type="select"
        id="Category"
        name="category"
        customStyles={inputStyles}
        options={categories}
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
