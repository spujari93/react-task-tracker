//import PropTypes from 'prop-types'
import {Button} from './Button.js'

//allows to look at the route we are currently on
import {useLocation} from 'react-router-dom'


const Header = ({title,onAdd,showAdd}) => {
    const location = useLocation()
        return (
        <header className='header'> 
        <h1>{title}</h1>
        {location.pathname==='/' &&(<Button color={showAdd ? 'red' : 'green'} text={showAdd ? 'CLose' : 'Add'} onClick={onAdd}/>)}
        </header>
    )
}

//if we have not passed a prop in header then the 
//defaultprops will be rendered
//Header.defaultProps = {
//title : 'Task Tracker',
//}

//PROPTYPES IS A WAY TO MAKE YOUR CODE ROBUST AND CATCH ERRORS. SO IF WE PASS IN A NUMBER INSTEAD OF A STRING IN 
//TITLE THEN IT WILL SEND A WARNING as it is expecting a string
// Header.propTypes={
//     title: PropTypes.string.isRequired,
// }


//CSS IN JS
// const headingStyle = {
//     color: 'red',
//     backgroundColor: 'black'
// }
export default Header
