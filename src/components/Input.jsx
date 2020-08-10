import React from 'react';
import styles from './Input.module.css';

const INPUT_TYPE = {
  checkbox: 'checkbox',
  select: 'select',
  input: 'input',
};

const Input = ({
  type,
  name,
  id,
  options,
  hasLabel,
  customStyles,
  onChange,
  isSelected,
}) => {
  const inputType = INPUT_TYPE[type];
  const [optionsName] = options ? Object.keys(options) : [];
  const optionsEl =
    options &&
    options.map(({ id: selectId, label }) => {
      return (
        <React.Fragment key={selectId}>
          <option key={selectId} value={label}>
            {label}
          </option>
        </React.Fragment>
      );
    });

  return (
    <div style={customStyles} className={`${styles[inputType]} ${styles.positioning}`}>
      <label htmlFor={id} className={styles.title}>
        {hasLabel && id}
      </label>
      {options ? (
        <select onChange={({ target }) => onChange(target, id)} id={optionsName}>
          {optionsEl}
        </select>
      ) : (
        <input
          onChange={({ target }) => onChange(target, name || id)}
          type={type}
          id={id}
          name={name || id}
          checked={Boolean(isSelected)}
        />
      )}
    </div>
  );
};

export default Input;
