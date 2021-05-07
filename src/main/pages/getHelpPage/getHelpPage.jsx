import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { searchContributionPost } from './../../services/contribute-api';
import SearchPost from './searchPost/searchPost';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles({
  heading: {
    fontSize: '28px',
    margin: '14px 0',
    '@media (max-width: 600px)': {
      fontSize: '22px',
    },
  },
  button: {
    width: '100%',
    padding: '10px 12px',
    color: 'white',
    backgroundColor: '#6045E2',
    fontWeight: '700',
    borderRadius: '4px',
    border: 'none',
    margin: '16px 5px',
  },
});

const GetHelpPage = ({ searchQuery }) => {
  const [searchData, setSearchData] = useState([]);
  const history = useHistory();

  const fetchContributionPost = async (formData) => {
    try {
      const res = await searchContributionPost(formData);
      if (res.status === 200) {
        setSearchData(res.data.ResponseData);
        console.log(res.data.ResponseData);
      }
    } catch (error) {
      setSearchData([]);
      console.log(error);
    }
  };

  const handleCancel = () => {
    history.push('/');
  };

  useEffect(() => {
    const {
      aPositive,
      aNegative,
      bPositive,
      bNegative,
      abPositive,
      abNegative,
      oPositive,
      oNegative,
      oxygenCylinder,
      oxygenRefiling,
      covidAmbulance,
      nonCovidAmbulance,
      covidMedicine,
      nonCovidMedicine,
      covidBeds,
      nonCovidBeds,
      covidICUBeds,
      nonCovidICUBeds,
      food,
      others,
      pincode
    } = searchQuery;
    const formData = new FormData();
    formData.append('pincode', +pincode);
    food && formData.append('food', food);
    others && formData.append('others', others);
    aPositive && formData.append('aPositive',aPositive)
    bPositive && formData.append('bPositive',bPositive)
    aNegative && formData.append('aNegative',aNegative)
    bNegative && formData.append('bNegative',bNegative)
    abPositive && formData.append('abPositive',abPositive)
    abNegative && formData.append('abNegative',abNegative)
    oPositive && formData.append('oPositive',oPositive)
    oNegative && formData.append('oNegative',oNegative)
    oxygenCylinder && formData.append('oxygenCylinder',oxygenCylinder)
    oxygenRefiling && formData.append('oxygenRefiling',oxygenRefiling)
    covidAmbulance && formData.append('covidAmbulance',covidAmbulance)
    nonCovidAmbulance && formData.append('nonCovidAmbulance',nonCovidAmbulance)
    covidMedicine && formData.append('covidMedicine',covidMedicine)
    nonCovidMedicine && formData.append('nonCovidMedicine',nonCovidMedicine)
    covidBeds && formData.append('covidBeds',covidBeds)
    nonCovidBeds && formData.append('nonCovidBeds',nonCovidBeds)
    covidICUBeds && formData.append('covidICUBeds',covidICUBeds)
    nonCovidICUBeds && formData.append('nonCovidICUBeds',nonCovidICUBeds)

    fetchContributionPost(formData);

    return () => {};
  }, [searchQuery]);

  const classes = useStyles();

  return (
    <Grid container justify="center" alignItems="center">
      <Grid item xs={12} md={11} style={{ minHeight: '100vh' }}>
        <Grid container justify="center" alignItems="center">
          <Grid item xs={12}>
            <Grid
              container
              justify="space-between"
              alignItems="center"
              spacing={2}
            >
              <Grid item xs={8} md={10}>
                <h3 className={classes.heading}>Results of Your search</h3>
              </Grid>
              <Grid item xs={4} md={2}>
                <button className={classes.button} onClick={handleCancel}>
                  Go Back
                </button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <SearchPost searchData={searchData} />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default GetHelpPage;
