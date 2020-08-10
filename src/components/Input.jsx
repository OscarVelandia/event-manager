import React from 'react';
import styles from './Input.module.css';

const INPUT_TYPE = {
  checkbox: 'checkbox',
  select: 'select',
  input: 'input',
};

export default function Input({
  type,
  id,
  options,
  hasLabel,
  customStyles,
  onChange,
  isSelected,
}) {
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
        <select onChange={({ target }) => onChange(target.value, id)} id={optionsName}>
          {optionsEl}
        </select>
      ) : (
        <input
          onChange={({ target }) => onChange(target, id)}
          type={type}
          id={id}
          name={id}
          checked={isSelected}
        />
      )}
    </div>
  );
}
