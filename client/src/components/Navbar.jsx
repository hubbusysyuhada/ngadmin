import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Tabs, Button } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import ShoppingCartTwoToneIcon from '@material-ui/icons/ShoppingCartTwoTone';
import RestorePageTwoToneIcon from '@material-ui/icons/RestorePageTwoTone';
import RestaurantIcon from '@material-ui/icons/Restaurant';
import ExitToAppTwoToneIcon from '@material-ui/icons/ExitToAppTwoTone';
import { useHistory, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { USER_LOGOUT } from '../store/actions'
// import { state_user } from '../graphql/ApolloConfig'
import textLogo from '../assets/chefschoice-text.png'
// import { useQuery } from '@apollo/client'
// import { USER_PROFILE } from '../graphql/ApolloQuery'
import Swal from 'sweetalert2'

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    height: '100%',
    flexDirection: 'column'
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
    width: '100%',
  }
}));

export default function VerticalTabs() {
    const loggedUser = useSelector(state => state.AuthReducer.loggedUser)
    const dispatch = useDispatch()
    const location = useLocation().pathname
    const history = useHistory()
    const classes = useStyles();
    const [value, setValue] = useState(0);
    // const { client } = useQuery(USER_PROFILE, {
    //     context: {
    //         headers: {
    //             access_token: localStorage.getItem('access_token')
    //         }
    //     }
    // })

    useEffect(() => {
        if (location === '/cart') setValue(1)
        else if (location === '/history') setValue(2)
        else setValue(0)
    }, [])

    const handleChange = (event, newValue) => {
    setValue(newValue);
    };

    function logout (event) {
        event.preventDefault()
        Swal.fire({
            icon: 'question',
            text: 'ARE YOU SURE WANT TO LOG OUT?',
            showDenyButton: true,
            confirmButtonText: `YES`,
            denyButtonText: `NO`,
            showClass: {
                popup: 'animate__animated animate__fadeInDown'
              },
              hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
              }
        }).then(({isConfirmed}) => {
            if (isConfirmed) {
                Swal.fire({
                    icon: 'success',
                    text: 'LOGGED OUT',
                    showClass: {
                        popup: 'animate__animated animate__fadeInDown'
                      },
                      hideClass: {
                        popup: 'animate__animated animate__fadeOutUp'
                      }
                })
                // console.log(dispatch, '<<<< dispatch');
                // console.log(loggedUser, '<<< logged user setelah logout 117');
                // console.log(dispatch(USER_LOGOUT), '<<< dispatch user logout');
                // console.log(loggedUser, '<<< logged user setelah logout 119');
                // console.log(dispatch(USER_LOGOUT()), '<<< dispatch user logout()');
                // console.log(loggedUser, '<<< logged user setelah logout 121');
                dispatch(USER_LOGOUT())
                console.log(loggedUser, '<<< logged user setelah logout 123');
                localStorage.removeItem('access_token')
                localStorage.removeItem('year')
                localStorage.removeItem('name')
                history.push('/auth')
            }
        })
    }

    return (
    <div className={classes.root}>
            <img src={textLogo} alt="image cannot be shown" style={{width: '180px', textAlign: 'center', margin: 'auto'}}/>
        <div>
            <Tabs
                orientation="vertical"
                variant="scrollable"
                value={value}
                onChange={handleChange}
                aria-label="Vertical tabs example"
                className={classes.tabs}
            >
                <Button
                style={{margin: '10px',
                textAlign: 'left',
                fontFamily: 'monospace',
                paddingLeft: '7%'
                }}
                onClick={() => {
                    setValue(0)
                    history.push('/')
                }}
                >
                    {<RestaurantIcon/>} HOME
                </Button>
                <Button
                style={{margin: '10px',
                textAlign: 'left',
                fontFamily: 'monospace',
                paddingLeft: '7%'
                }}
                onClick={() => {
                    setValue(1)
                    history.push('/cart')
                }}
                >
                    {<ShoppingCartTwoToneIcon/>} CART
                </Button>
                <Button
                style={{margin: '10px',
                textAlign: 'left',
                fontFamily: 'monospace',
                paddingLeft: '18%'
                }}
                onClick={() => {
                    setValue(2)
                    history.push('/history')
                }}
                >
                    {<RestorePageTwoToneIcon/>} HISTORY
                </Button>
                <Button
                style={{margin: '10px',
                textAlign: 'left',
                fontFamily: 'monospace',
                marginTop: '230%',
                paddingLeft: '15%',
                // position: 'relative',
                // bottom: 0
                }}
                onClick={logout}
                >
                    {<ExitToAppTwoToneIcon/>} LOGOUT
                </Button>
            </Tabs>
        </div>
    </div>
    );
}
