import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import isValidPinCode from './../../../util/validatePinCode';
import { useToasts } from 'react-toast-notifications';
import FormControl from '@material-ui/core/FormControl';
import { useHistory } from 'react-router-dom';
import { MenuItem, Select } from '@material-ui/core';
const useStyles = makeStyles({
  heading: {
    fontSize: '24px',
    margin: '8px 0',
    '@media (max-width: 600px)': {
      fontSize: '20px',
    },
  },
  text: {
    fontSize: '16px',
    margin: '0',
    '@media (max-width: 600px)': {
      fontSize: '14px',
    },
  },
  inputBox: {
    margin: '16px 0',
    '@media (max-width: 600px)': {
      margin: '12px 0',
    },
  },
  searchButton: {
    width: '100%',
    padding: '16px',
    color: 'white',
    backgroundColor: '#6045E2',
    fontWeight: '700',
    borderRadius: '4px',
    border: 'none',
    margin: '16px 0',
    cursor: 'pointer',
  },
});

const GetHelp = ({ setSearchQuery }) => {
  const { addToast } = useToasts();
  const history = useHistory();
  const classes = useStyles();
  const [pinCode, setPinCode] = useState('');
  const [validationState, setValidationState] = useState(false);
  const [checkBoxData, setCheckBoxData] = useState({
    bloodPlasma: false,
    oxygen: false,
    ambulance: false,
    medicine: false,
    beds: false,
    icuBeds: false,
    food: false,
    others: false,
  });

const [selectData, setSelectData] = useState({
  bloodPlasmaSelect:'aPositive' || '  aNegative' || 'bPositive' || 'bNegative' || 'oPositive' || 'oNegative'|| 'abPositive' || 'abNegative',
  oxygenSelect:'oxygenCylinder' || 'oxygenRefiling',
  ambulanceSelect:'covidAmbulance' || 'nonCovidAmbulance',
  bedsSelect:'covidBeds' || 'nonCovidBeds',
  icuBedsSelect:'covidICUBeds' || 'nonCovidICUBeds',
  medicineSelect:'covidMedicine' || 'nonCovidMedicine'
})

const {
  bloodPlasmaSelect,
  oxygenSelect,
  ambulanceSelect,
  bedsSelect,
  icuBedsSelect,
  medicineSelect
} = selectData;




  const {
    bloodPlasma,
    oxygen,
    ambulance,
    medicine,
    beds,
    icuBeds,
    food,
    others,
  } = checkBoxData;

  const values = [
    bloodPlasma,
    oxygen,
    ambulance,
    medicine,
    beds,
    icuBeds,
    food,
    others,
  ];

  const getQueryData = () =>{
    const queryData = {}
    if(food){
      queryData["food"] = food
    }
    if(others){
      queryData["others"] = others
    }
    if(oxygen){
      queryData[oxygenSelect] = true
    }
    if(bloodPlasma){
      queryData[bloodPlasmaSelect] = true
    }
    if(ambulance){
      queryData[ambulanceSelect] = true
    }
    if(medicine){
      queryData[medicineSelect] = true
    }
    if(beds){
      queryData[bedsSelect] = true
    }
    if(icuBeds){
      queryData[icuBedsSelect] = true
    }
return queryData
}

const handleSelectChange = (e)=>{
  
  setSelectData({...selectData,[e.target.name]:e.target.value})
}


  const handleChange = (event) => {
    
    setCheckBoxData({
      ...checkBoxData,
      [event.target.name]: event.target.checked,
    });
    
  };


  const handleClickSearch = async () => {
    setValidationState(true);
    console.log(getQueryData())
    if (pinCode.length === 6 && values.some((value) => value === true)) {
      await isValidPinCode(pinCode)
        .then((res) => {
          if (res) {
            setSearchQuery({
              pincode: pinCode,
              ...getQueryData(),
            });
            history.push('/get-help');
          } else {
            addToast('Invalid Pincode', {
              appearance: 'error',
              autoDismiss: true,
            });
            console.log('Invalid Pincode');
          }
        })
        .catch((err) => {
          console.log('err');
          addToast('Error in search', {
            appearance: 'error',
            autoDismiss: true,
          });
        });
    }
  };

  return (
    <Grid container alignItems="center" justify="center">
      <Grid item xs={12}>
        <h3 className={classes.heading}>Get Help</h3>
      </Grid>
      <Grid item xs={12}>
        <FormLabel className={classes.text}>
          Please Enter these necessary details
        </FormLabel>
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Pincode"
          variant="outlined"
          fullWidth
          className={classes.inputBox}
          value={pinCode}
          onInput={(e) => setPinCode(e.target.value)}
          helperText="Enter your pincode"
          error={validationState && pinCode.length !== 6}
        />
      </Grid>
      <Grid item xs={12}>
        <FormControl
          error={validationState && !values.some((value) => value === true)}
        >
          <FormLabel className={classes.text}>
            Check minimum one resources you need
          </FormLabel>
        </FormControl>
        <Grid container justify="flex-start" alignItems="center">
          <Grid item xs={6} md={4} lg={2}>
            <FormControlLabel
              control={
                <Checkbox
                  color="primary"
                  checked={oxygen}
                  onChange={handleChange}
                  name="oxygen"
                />
              }
              label="Oxygen"
            />
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={oxygenSelect}
              name='oxygenSelect'
              onChange={handleSelectChange}
            >
              <MenuItem value="oxygenCylinder">cylinder</MenuItem>
              <MenuItem value="oxygenRefiling">refiling </MenuItem>
            </Select>
          </Grid>
          <Grid item xs={6} md={4} lg={2}>
            <FormControlLabel
              control={
                <Checkbox
                  color="primary"
                  checked={bloodPlasma}
                  onChange={handleChange}
                  name="bloodPlasma"
                />
              }
              label="Blood / Plasma"
            />
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={bloodPlasmaSelect}
              name='bloodPlasmaSelect'
              onChange={handleSelectChange}
            >
              <MenuItem value="oPositive">O+</MenuItem>
              <MenuItem value="oNegative">O- </MenuItem>
              <MenuItem value="aPositive">A+</MenuItem>
              <MenuItem value="aNegative">A- </MenuItem>
              <MenuItem value="bPositive">B+</MenuItem>
              <MenuItem value="bNegative">B- </MenuItem>
              <MenuItem value="abPositive">AB+</MenuItem>
              <MenuItem value="abNegative">AB- </MenuItem>
            </Select>
          </Grid>
          <Grid item xs={6} md={4} lg={2}>
            <FormControlLabel
              control={
                <Checkbox
                  color="primary"
                  checked={ambulance}
                  onChange={handleChange}
                  name="ambulance"
                />
              }
              label="Ambulance"
            />
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={ambulanceSelect}
              onChange={handleSelectChange}
              name='ambulanceSelect'
            >
              <MenuItem value="covidAmbulance">covid</MenuItem>
              <MenuItem value="nonCovidAmbulance">non covid</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={6} md={4} lg={2}>
            <FormControlLabel
              control={
                <Checkbox
                  color="primary"
                  checked={medicine}
                  onChange={handleChange}
                  name="medicine"
                />
              }
              label="Medicines"
            />
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={medicineSelect}
              onChange={handleSelectChange}
              name='medicineSelect'
            >
              <MenuItem value="covidMedicine">covid</MenuItem>
              <MenuItem value="nonCovidMedicine">non covid</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={6} md={4} lg={2}>
            <FormControlLabel
              control={
                <Checkbox
                  color="primary"
                  checked={beds}
                  onChange={handleChange}
                  name="beds"
                />
              }
              label="Beds"
            />
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={bedsSelect}
              onChange={handleSelectChange}
              name='bedsSelect'
            >
              <MenuItem value="covidBeds">covid</MenuItem>
              <MenuItem value="nonCovidBeds">non covid</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={6} md={4} lg={2}>
            <FormControlLabel
              control={
                <Checkbox
                  color="primary"
                  checked={icuBeds}
                  onChange={handleChange}
                  name="icuBeds"
                />
              }
              label="ICU Beds"
            />
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={icuBedsSelect}
              onChange={handleSelectChange}
              name='icuBedsSelect'
            >
              <MenuItem value="covidICUBeds">covid</MenuItem>
              <MenuItem value="nonCovidICUBeds">non covid</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={6} md={4} lg={2}>
            <FormControlLabel
              control={
                <Checkbox
                  color="primary"
                  checked={food}
                  onChange={handleChange}
                  name="food"
                />
              }
              label="Food"
            />
          </Grid>
          <Grid item xs={6} md={4} lg={2}>
            <FormControlLabel
              control={
                <Checkbox
                  color="primary"
                  checked={others}
                  onChange={handleChange}
                  name="others"
                />
              }
              label="Others"
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <button className={classes.searchButton} onClick={handleClickSearch}>
          SEARCH
        </button>
      </Grid>
    </Grid>
  );
};

export default GetHelp;
