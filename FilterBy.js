import React from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import { grey } from '@material-ui/core/colors';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import ListItemText from '@material-ui/core/ListItemText';
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

export const FilterBy = ({ values, onChange }) => {
    const { t } = useTranslation();
    const classes = useStyles();

    //     const mappingList = { verified: 'verified', notVerified: 'not verified' };
    //     return <DropdownListFilter label='Label' mappingList={mappingList} values={values} setValues={onChange} />;
    // };

    const handleFilter = (e) => {
        onChange(e.target.value);
    };

    return (
        <div>
            <FormControl variant='filled' className={classes.formControl}>
                <InputLabel id='multiple-select-filter' className={classes.label}>
                    {t('user.filterBy')}
                </InputLabel>

                <Select
                    labelId='demo-simple-select-label'
                    id='demo-simple-select'
                    className={classes.selector}
                    multiple
                    value={values}
                    renderValue={(selected) => selected.join(',')}
                    onChange={handleFilter}
                >
                    <MenuItem value={'verified'} key={values}>
                        <Checkbox color='primary' checked={values && values.indexOf('verified') > -1} />
                        <ListItemText primary='verified' />
                    </MenuItem>
                    <MenuItem value={'notVerified'}>
                        <Checkbox color='primary' checked={values && values.indexOf('notVerified') > -1} />
                        <ListItemText primary='not verified' />
                    </MenuItem>
                    {/* <MenuItem value={'newest'}>Newest</MenuItem>
                    <MenuItem value={'oldest'}>Oldest</MenuItem> */}
                </Select>
            </FormControl>
        </div>
    );
};
FilterBy.propTypes = {
    values: PropTypes.array,
    onChange: PropTypes.func
};
