import React from 'react';
import styles from './Input.module.css';

const INPUT_TYPE = {
  checkbox: 'checkbox',
  select: 'select',
  input: 'input',
};

const Input = ({
  type,
  id,
  name,
  value,
  options,
  hasLabel,
  customStyles,
  onChange,
  isSelected,
}) => {
  const inputType = INPUT_TYPE[type];
  const optionsEl =
    options &&
    options.map(({ id: selectId, label }) => {
      return (
        <React.Fragment key={selectId}>
          <option key={selectId} value={selectId}>
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
        <select onChange={({ target }) => onChange(target, name)} id={id}>
          {optionsEl}
        </select>
      ) : (
        <input
          onChange={({ target }) => onChange(target, name || id)}
          type={type}
          id={id}
          name={name || id}
          value={value}
          checked={Boolean(isSelected)}
        />
      )}
    </div>
  );
};

export default Input;
