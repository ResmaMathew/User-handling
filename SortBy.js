import React from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
    formControl: {
        width: '100%',
        height: 56,
        margin: theme.spacing(2),
        minWidth: 150
    },
    selector: {
        backgroundColor: grey[50],
        '&.MuiFilledInput-underline:before': {
            borderBottomColor: 'rgba(0, 0, 0, 0.12)'
        }
    },
    label: {
        color: theme.palette.text.hint
    }
}));

export const SortBy = ({ value, onChange }) => {
    const classes = useStyles();
    const { t } = useTranslation();
    const handleSort = (e) => {
        onChange(e.target.value);
    };

    // useEffect(() => {
    //     const results = users.sort((a, b) => b.firstName.localeCompare(a.firstName));
    //     console.log('RESULT', results);
    // }, [setValues]);

    return (
        <div>
            <FormControl variant='filled' className={classes.formControl}>
                <InputLabel id='multiple-select-filter' className={classes.label}>
                    {t('user.sortBy')}
                </InputLabel>

                <Select
                    labelId='demo-simple-select-label'
                    id='demo-simple-select'
                    className={classes.selector}
                    value={value}
                    onChange={handleSort}
                >
                    <MenuItem value={'asc'}>A-Z</MenuItem>
                    <MenuItem value={'desc'}>Z-A</MenuItem>
                    {/* <MenuItem value={'newest'}>Newest</MenuItem>
                    <MenuItem value={'oldest'}>Oldest</MenuItem> */}
                </Select>
            </FormControl>
        </div>
    );
};

SortBy.propTypes = {
    value: PropTypes.object,
    onChange: PropTypes.func
};
