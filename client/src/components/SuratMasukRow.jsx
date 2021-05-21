import { useState } from 'react'
import { state_user } from '../graphql/ApolloConfig'
// import { useMutation } from '@apollo/client'
import {
    Typography,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Box,
    Collapse,
    Button,
    Snackbar
} from '@material-ui/core'
import Swal from 'sweetalert2'
import MuiAlert from '@material-ui/lab/Alert';
import { AiFillPrinter } from "react-icons/ai";

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function Restaurant ({props}) {
    const [openAddToCart, setOpenAddToCart] = useState(false)
    // const [addToCart, {data: updateCartData, loading: updateCartLoading}] = useMutation(UPDATE_CART)
    // const [clearUserCart, {data: clearCartData}] = useMutation(CLEAR_CART)
    const [open, setOpen] = useState(false);
    // let {setOne: set1, setTwo: set2, setThree: set3, setFour: set4, setFive: set5} = props
    // set1 = set1.split(' - ')
    // set1[1] = set1[1].replace('MYR', '')
    // set2 = set2.split(' - ')
    // set2[1] = set2[1].replace('MYR', '')
    // set3 = set3.split(' - ')
    // set3[1] = set3[1].replace('MYR', '')
    // set4 = set4.split(' - ')
    // set4[1] = set4[1].replace('MYR', '')
    // set5 = set5.split(' - ')
    // set5[1] = set5[1].replace('MYR', '')
    // const menus = [set1, set2, set3, set4, set5]

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpenAddToCart(false);
    };

    function updateCart (event, menu) {
        event.preventDefault()
    //     const restaurantName = props.name
    //     const foodName = `${menu[0]} - MYR${menu[1]}`
    //     const restaurantId = props.id


    //     if (!state_user().user.cart || state_user().user.cart.restaurant === restaurantName) {
    //         let flag = true
    //         let temp = JSON.parse(JSON.stringify(state_user()))
            
    //         if (temp.user.cart) {
    //             let latestCart = temp.user.cart.foods
    //             latestCart.forEach(food => {
    //                 if (food.name === foodName) {
    //                     flag = false
    //                     food.quantity++
    //                 }
    //             })
    //             if (flag) latestCart.push({
    //                 name: foodName,
    //                 quantity: 1
    //             })
    //         } else {
    //             temp.user.cart = {
    //                 restaurant: restaurantName,
    //                 restaurantId,
    //                 foods : [
    //                     {
    //                         name: foodName,
    //                         quantity: 1
    //                     }
    //                 ]
    //             }
    //         }
    //         setOpenAddToCart(true)

    //         state_user(temp)

    //         addToCart({
    //             context: {
    //                 headers: {
    //                     access_token: localStorage.getItem('access_token')
    //                 }
    //             },
    //             variables: {
    //                 restaurantName,
    //                 foodName,
    //                 quantity: 1,
    //                 restaurantId
    //             },
    //             refetchQueries: [
    //                 {
    //                     query: USER_PROFILE,
    //                     context: {
    //                         headers: {
    //                             access_token: localStorage.getItem('access_token')
    //                         }
    //                     }
    //                 }
    //             ]
    //         })
    //     } else {
    //         Swal.fire({
    //             title: 'WOOPSIE...',
    //             text: `ANOTHER RESTAURANT IS IN YOUR CART, CHOOSE THIS RESTAURANT INSTEAD?`,
    //             showDenyButton: true,
    //             confirmButtonText: `Yes`,
    //             denyButtonText: `No`,
    //             showClass: {
    //                 popup: 'animate__animated animate__fadeInDown'
    //               },
    //               hideClass: {
    //                 popup: 'animate__animated animate__fadeOutUp'
    //               }
    //         }).then(({isConfirmed}) => {

    //             if (isConfirmed) {
    //                 setOpenAddToCart(true)
    //                 clearUserCart(
    //                     {
    //                         context: {
    //                             headers: {
    //                                 access_token: localStorage.getItem('access_token')
    //                             }
    //                         }
    //                     }
    //                 )
    //                 addToCart({
    //                     context: {
    //                         headers: {
    //                             access_token: localStorage.getItem('access_token')
    //                         }
    //                     },
    //                     variables: {
    //                         restaurantName,
    //                         foodName,
    //                         quantity: 1,
    //                         restaurantId
    //                     },
    //                     refetchQueries: [
    //                         {
    //                             query: USER_PROFILE,
    //                             context: {
    //                                 headers: {
    //                                     access_token: localStorage.getItem('access_token')
    //                                 }
    //                             }
    //                         }
    //                     ]
    //                 })
                    
    //                 let temp = JSON.parse(JSON.stringify(state_user()))
    //                 temp.user.cart.restaurant = restaurantName
    //                 temp.user.cart.restaurantId = restaurantId
    //                 temp.user.cart.foods = [
    //                     {
    //                         name: foodName,
    //                         quantity: 1
    //                     }
    //                 ]
    //                 state_user(temp)
    //             }
    //         })
    //     }
    }
    // console.log(props, '<<< props dari row');
    return (
        <>
            <TableRow key={props.id} onClick={() => setOpen(!open)} >
                <TableCell component="th" scope="row" align="center">
                    {props.id}
                </TableCell>
                <TableCell align="left">
                    {props.Tanggal}
                </TableCell>
                <TableCell align="left">
                    {props.AsalSurat}
                </TableCell>
                <TableCell align="left">
                    {props.Perihal}
                </TableCell>
                <TableCell align="left">
                    <AiFillPrinter/>
                </TableCell>
            </TableRow>

            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <Box margin={1}>
                    <Typography variant="h6" gutterBottom component="div" style={{textAlign: 'center', marginTop: '20px', marginBottom: '20px'}}>
                        {props.name}'s Menu
                    </Typography>
                    <Table size="small" aria-label="purchases">
                        <TableHead>
                        <TableRow>
                            <TableCell align="center" style={{width: '5%'}}>No.</TableCell>
                            <TableCell align="left" style={{width: '65%'}}>Food/Beverage</TableCell>
                            <TableCell align="center" style={{width: '15%'}}>Price (MYR)</TableCell>
                            <TableCell align="left" style={{width: '15%'}}/>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                            {/* {menus.map((menu, index) => {
                                return (
                                    <TableRow>
                                        <TableCell align="center" style={{width: '5%'}}>{index + 1}</TableCell>
                                        <TableCell align="left" style={{width: '65%'}}>{menu[0]}</TableCell>
                                        <TableCell align="center" style={{width: '15%'}}>{menu[1]}</TableCell>
                                        <TableCell align="center" style={{width: '15%'}}><Button size="small" onClick={(event) => {updateCart(event, menu)}}>add to cart</Button></TableCell>
                                    </TableRow>
                                )
                            })} */}
                        </TableBody>
                    </Table>
                    </Box>
                </Collapse>
                </TableCell>
            </TableRow>
            <Snackbar open={openAddToCart} autoHideDuration={2000} onClose={handleClose} anchorOrigin={{vertical: 'top', horizontal: 'right'}}>
                <Alert onClose={handleClose} severity="success">
                Yumm! your food has been added to your cart!
                </Alert>
            </Snackbar>
        </>
    )
}