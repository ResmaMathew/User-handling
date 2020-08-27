import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import { Input, makeStyles, Paper } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
const useStyles = makeStyles((theme) => ({
    root: {
        borderRadius: '4px',
        alignItems: 'center',
        padding: theme.spacing(1),
        display: 'flex',
        flexBasis: 420,
        Fill: 'Solid rgba(0, 0, 0, 0.04)',
        margin: theme.spacing(2),
        height: 54
    },
    icon: {
        marginRight: theme.spacing(1),
        color: theme.palette.text.secondary
    },
    input: {
        flexGrow: 1,
        fontSize: '14px',
        lineHeight: '16px',
        letterSpacing: '-0.05px'
    }
}));
export const SearchInput = ({ value, onChange, ...props }) => {
    const classes = useStyles();
    const { className, paperStyle, iconStyle, textStyle, ...rest } = props;
    const handleChange = (event) => {
        onChange(event.target.value);
    };

    return (
        <Paper {...rest} className={clsx(classes.root, className)} style={paperStyle}>
            <Input
                {...rest}
                className={classes.input}
                disableUnderline
                style={textStyle}
                value={value}
                defaultValue={value}
                onChange={handleChange}
            />
            <SearchIcon className={classes.icon} style={iconStyle} />
        </Paper>
    );
};
SearchInput.propTypes = {
    className: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    paperStyle: PropTypes.object,
    iconStyle: PropTypes.object,
    textStyle: PropTypes.object
};
