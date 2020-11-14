import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import React from 'react';
import { languageCodes } from './../common/languages';

export interface SelectLanguageProps {
  value: any;
  onChange: (val: any) => any;
}

const SelectLanguage: React.FC<SelectLanguageProps> = ({ value, onChange }) => {
  const langs = Object.entries(languageCodes);
  return (
    <div style={{ marginTop: '20px', marginBottom: '20px' }}>
      <InputLabel id='select-lang'>Select Language</InputLabel>
      <Select
        style={{ marginTop: '15px' }}
        variant='outlined'
        labelId='select-lang'
        value={value}
        fullWidth={true}
        onChange={e => onChange(e.target.value)}
      >
        {langs.map(([code, label]) => (
          <MenuItem key={code} value={code}>
            {label}
          </MenuItem>
        ))}
      </Select>
    </div>
  );
};

export default SelectLanguage;
