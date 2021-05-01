import React from 'react';
import ContributeBanner from './components/contributeBanner/contributeBanner';
import GetHelpSearch from './components/getHelpSearch/getHelpSearch';
import HelpUs from './components/helpUs/helpUs';
import ContactUs from './components/contactUs/contactUs';
import Grid from '@material-ui/core/Grid';

const Home = ({ getHelpPosts, setSearchQuery }) => {
  return (
    <Grid container justify='center' alignItems='center' >
      <Grid item xs={12} md={11} >
        <ContributeBanner />
        <GetHelpSearch setSearchQuery={setSearchQuery} />
        <HelpUs getHelpPosts={getHelpPosts} />
        <ContactUs />
        <Grid item xs={12}>
          <Grid container justify='center' alignItems='center' style={{marginBottom: '10px'}}>
            <Grid item>
            <p>&copy;Copyright 2021 by <a href="https://www.artificialbrix.com/" target="_blank" rel="noreferrer" style={{textDecoration: "none"}}>Artificial Brix</a></p>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>

  );
};

export default Home;
