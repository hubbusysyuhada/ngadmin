import {
    TableCell,
    TableRow
} from '@material-ui/core'


export default function Restaurant ({props}) {
    return (
        <>
            <TableRow key={props.id} >
                <TableCell component="th" scope="row" align="center" >
                    {props.index + 1}
                </TableCell>
                <TableCell align="center" >
                    {props.name}
                </TableCell>
            </TableRow>
        </>
    )
}