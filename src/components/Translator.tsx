import {
  Button,
  makeStyles,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';
import axios from 'axios';
import React, { useState } from 'react';
import { apiUrl } from '../config';
import SelectLanguage from './SelectLanguage';

const useStyles = makeStyles({
  root: {
    margin: '30px auto',
    padding: '0 50px',
    maxWidth: '1200px',
    display: 'block',
    marginLeft: 'auto',
  },
  rootSmall: {
    padding: '0 20px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    columnGap: '20px',
  },
  small: {
    gridTemplateColumns: '1fr',
  },
});

interface TranslatorProps {}

const Translator: React.FC<TranslatorProps> = () => {
  const classes = useStyles();

  const [textToTranslate, setTextToTranslate] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [selectedLang, setSelectedLang] = useState('ur');
  const [loading, setLoading] = useState(false);
  const theme = useTheme();
  const isLarge = useMediaQuery(theme.breakpoints.up('sm'));

  const handleTranslate = async () => {
    setLoading(true);
    try {
      const response = await axios.post(apiUrl, {
        src: textToTranslate,
        to: selectedLang,
      });
      setTranslatedText(response.data.translated);
    } catch (e) {
      alert('There was an error' + e);
    }
    setLoading(false);
  };

  const handleLanguageChange = (language: string) => {
    setSelectedLang(language);
  };

  return (
    <div
      className={
        isLarge ? classes.root : `${classes.root} ${classes.rootSmall}`
      }
    >
      <div className={isLarge ? classes.grid : `${classes.small}`}>
        <div>
          <Typography variant='h6'>Enter Text</Typography>
          <TextField
            value={textToTranslate}
            onChange={e => setTextToTranslate(e.target.value)}
            fullWidth={true}
            variant='filled'
            rows={14}
            multiline={true}
          />
        </div>
        <div>
          <Typography variant='h6'>Translation</Typography>
          <TextField
            disabled
            value={translatedText}
            fullWidth={true}
            variant='filled'
            rows={14}
            multiline={true}
          />
        </div>
      </div>

      <div className={isLarge ? classes.grid : `${classes.small}`}>
        <div>
          <SelectLanguage
            value={selectedLang}
            onChange={handleLanguageChange}
          />
        </div>
      </div>

      <Typography className={loading ? '' : 'd-none'}>Please Wait</Typography>
      <div>
        <Button
          disabled={loading}
          style={{ marginTop: '15px' }}
          onClick={handleTranslate}
          size='large'
          color='primary'
          variant='contained'
        >
          Translate
        </Button>
        <Button
          style={{ marginTop: '15px', marginLeft: '10px' }}
          onClick={() => navigator.clipboard.writeText(translatedText)}
          size='large'
          color='secondary'
          variant='outlined'
        >
          Copy
        </Button>
      </div>
    </div>
  );
};

export default Translator;
