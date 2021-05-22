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
import { USER_LOGOUT, SET_USER } from '../store/actions'
import textLogo from '../assets/ngadmin-logo.png'
import Swal from 'sweetalert2'
import { RiMailSendFill, RiMailDownloadFill } from 'react-icons/ri'
import { MdInsertInvitation } from 'react-icons/md'
import { FaTasks, FaUserTie } from 'react-icons/fa'
import { IconContext } from 'react-icons'

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
    
    useEffect(() => {
      if (location === '/suratmasuk') setValue(0)
      else if (location === '/undanganmasuk') setValue(1)
      else if (location === '/suratkeluar') setValue(2)
      else if (location === '/spt') setValue(3)
      else if (location === '/user') setValue(4)
      else setValue(0)
      if (!loggedUser) dispatch(SET_USER())
      console.log(loggedUser, '<<< loggedUser');
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
            <img src={textLogo} alt="image cannot be shown" style={{width: '180px', textAlign: 'center', margin: 'auto', marginTop: '15px'}}/>
        <div>
          <IconContext.Provider value={{ size: '23px' }}>
            <Tabs
                orientation="vertical"
                variant="scrollable"
                value={value}
                onChange={handleChange}
                aria-label="Vertical tabs example"
                className={classes.tabs}
            >
                <Button
                style={{
                  margin: '10px',
                  textAlign: 'left',
                  justifyContent: 'flex-start',
                  fontFamily: 'monospace',
                  paddingLeft: '15%',
                  marginTop: '20px'
                }}
                onClick={() => {
                    setValue(0)
                    history.push('/suratmasuk')
                }}
                >
                    {<RiMailDownloadFill/>} <span style={{marginLeft: '15px'}}>SURAT MASUK</span>
                </Button>
                <Button
                style={{
                  margin: '10px',
                  textAlign: 'left',
                  justifyContent: 'flex-start',
                  fontFamily: 'monospace',
                  paddingLeft: '15%'
                }}
                onClick={() => {
                    setValue(1)
                    history.push('/undanganmasuk')
                }}
                >
                    {<MdInsertInvitation/>} <span style={{marginLeft: '15px'}}>UNDANGAN MASUK</span>
                </Button>
                <Button
                style={{
                  margin: '10px',
                  textAlign: 'left',
                  justifyContent: 'flex-start',
                  fontFamily: 'monospace',
                  paddingLeft: '15%'
                }}
                onClick={() => {
                    setValue(2)
                    history.push('/suratkeluar')
                }}
                >
                    {<RiMailSendFill/>} <span style={{marginLeft: '15px'}}>SURAT KELUAR</span>
                </Button>
                <Button
                style={{
                  margin: '10px',
                  textAlign: 'left',
                  justifyContent: 'flex-start',
                  fontFamily: 'monospace',
                  paddingLeft: '15%'
                }}
                onClick={() => {
                    setValue(3)
                    history.push('/spt')
                }}
                >
                  {<FaTasks/>} <span style={{marginLeft: '15px'}}>SPT</span>
                </Button>
                { loggedUser ? loggedUser.name === 'admin' ? 
                <Button
                style={{
                  margin: '10px',
                  textAlign: 'left',
                  justifyContent: 'flex-start',
                  fontFamily: 'monospace',
                  paddingLeft: '15%'
                }}
                onClick={() => {
                    setValue(4)
                    history.push('/user')
                }}
                >
                  {<FaUserTie/>} <span style={{marginLeft: '15px'}}>USER</span>
                </Button>
                :
                <Button
                style={{
                  margin: '10px',
                  textAlign: 'left',
                  justifyContent: 'flex-start',
                  fontFamily: 'monospace',
                  paddingLeft: '15%',
                  height: '33px'
                }}
                disabled
                />
                :
                ''
                }
                <Button
                style={{
                  margin: '10px',
                  textAlign: 'left',
                  justifyContent: 'flex-start',
                  fontFamily: 'monospace',
                  paddingLeft: '15%',
                  marginTop: '170%'
                }}
                onClick={logout}
                >
                    {<ExitToAppTwoToneIcon/>} LOGOUT
                </Button>
            </Tabs>
          </IconContext.Provider>
        </div>
    </div>
    );
}
