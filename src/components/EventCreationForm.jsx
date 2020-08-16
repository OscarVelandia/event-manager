import React from 'react';
import Input from './Input';

const inputStyles = {
  width: '80%',
};

// Categories manage their own state since have more than 1 value initially
const EventCreationForm = ({ categories, formData, onChange }) => {
  const { label, description, location, date } = formData;
  return (
    <form>
      <Input
        type="input"
        id="Name"
        name="label"
        value={label}
        customStyles={inputStyles}
        hasLabel
        onChange={onChange}
      />
      <Input
        type="input"
        id="Description"
        name="description"
        value={description}
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
        value={location}
        customStyles={inputStyles}
        hasLabel
        onChange={onChange}
      />
      <Input
        type="input"
        id="Date"
        name="date"
        value={date}
        customStyles={inputStyles}
        hasLabel
        onChange={onChange}
      />
    </form>
  );
};

export default EventCreationForm;
