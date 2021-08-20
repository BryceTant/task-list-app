import PropTypes from 'prop-types'
import Button from './Button'
import { useLocation } from 'react-router-dom'

const Header = ({ title, onAdd, displayAdd }) => {

    const location = useLocation()

    return (
        <header className = 'header'>
            <h1>{title}</h1>
            {location.pathname === '/' && // hides the add/close button on the about page
            <Button color = {displayAdd ? 'red' : 'green' }
            text={displayAdd ? 'Close' : 'Add'}
            onClick = {onAdd}/>}
        </header>
    )
}

Header.defaultProps = {
    title: 'Task Tracker'
}

Header.propTypes = {
    title: PropTypes.string.isRequired
}

export default Header