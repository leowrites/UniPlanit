import { useState } from 'react'
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle'
import { StyledMenuItem, NavbarMenu, StyledPopover } from './NavbarMenu'
import Typography from '@mui/material/Typography';

export default function Profile({ sx, profileInfo, isUser, handleClick }) {
    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl)
    // using md as breakpoints for mobile version
    const handleMenuClose = () => {
        setAnchorEl(null)
    }
    return (
        <>
            {
                isUser ?
                    <>
                        {/* User Icon, show at all times */}
                        <IconButton size='large' aria-controls='menu-account' aria-haspopup='true'
                            onClick={e => setAnchorEl(e.currentTarget)} color='inherit'
                            sx={sx}>
                            <AccountCircle />
                        </IconButton>
                        <NavbarMenu id='menu-account' anchorElNav={anchorEl}
                            handleMenuClose={handleMenuClose}>
                            <StyledMenuItem onClick={handleClick}>My Account</StyledMenuItem>
                            <StyledMenuItem onClick={handleClick}>Settings</StyledMenuItem>
                        </NavbarMenu>
                    </>
                    :
                    <>
                        {/*Friend Icon. Show on screen larger than small*/}
                        <AccountCircle
                            aria-controls={'mouse-over-popover'}
                            aria-haspopup='true'
                            onMouseEnter={e => setAnchorEl(e.currentTarget)}
                            onMouseLeave={() => setAnchorEl(null)}
                            color='inherit'
                            sx={sx} />
                        <StyledPopover id='mouse-over-popover' sx={{ pointerEvents: 'none' }}
                            open={open} anchorEl={anchorEl}
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                            transformOrigin={{ vertical: 'top', horizontal: 'center' }}
                            onClose={() => setAnchorEl(null)}
                            disableRestoreFocus
                        >
                            <Typography p={1} > friend </Typography>
                        </StyledPopover>
                    </>
            }
        </>
    )
}