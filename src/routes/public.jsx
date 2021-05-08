import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import BackGroundData from './../assets/background.svg';
import { makeStyles } from '@material-ui/core/styles';
import Contribute from '../main/pages/contribute/contribute';
import Container from '@material-ui/core/Container';
import Home from './../main/pages/home/home';
import HelpUsPage from '../main/pages/helpUsPosts/helpUsPage';
import AskForHelp from '../main/pages/askForHelp/askForHelp';
import { getHelpPost } from './../main/services/help-api';
import { ToastProvider } from 'react-toast-notifications';
import GetHelpPage from '../main/pages/getHelpPage/getHelpPage';
import ScrollToTop from '../utility/scroll-to-top';

const useStyles = makeStyles({
  root: {
    backgroundImage: `url(${BackGroundData})`,
    width: '100%',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    padding: '18px 0 0 0',
  },
  container: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: '5px',
    borderTopRightRadius: '5px',
  },
});

const PublicRouter = () => {
  const classes = useStyles();
  const [getHelpPosts, setGetHelpPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState({
    pincode: '',
    bloodPlasma: false,
    oxygen: false,
    ambulance: false,
    medicine: false,
    beds: false,
    food: false,
    others: false,
  });
  const fetchGetHelpPost = async () => {
    const res = await getHelpPost();
    setGetHelpPosts(res || []);
  };

  useEffect(() => {
    fetchGetHelpPost();
    return () => {};
  }, []);

  return (
    <div className={classes.root}>
      <Container maxWidth="md" className={classes.container}>
        <BrowserRouter>
          <ScrollToTop />
          <ToastProvider placement="bottom-right">
            <Switch>
              <Route path="/get-help">
                <GetHelpPage searchQuery={searchQuery} />
              </Route>
              <Route path="/ask-for-help">
                <AskForHelp  fetchGetHelpPost={fetchGetHelpPost}  />
              </Route>
              <Route path="/help-us-posts">
                <HelpUsPage getHelpPosts={getHelpPosts} />
              </Route>
              <Route path="/contribute">
                <Contribute  fetchGetHelpPost={fetchGetHelpPost} />
              </Route>
              <Route path="/">
                <Home
                  getHelpPosts={getHelpPosts}
                  setSearchQuery={setSearchQuery}
                />
              </Route>
            </Switch>
          </ToastProvider>
        </BrowserRouter>
      </Container>
    </div>
  );
};

export default PublicRouter;
