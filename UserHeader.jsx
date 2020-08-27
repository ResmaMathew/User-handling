import React from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

import { Grid, Paper } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/styles';

import { FilterBy } from '../FilterBy';
import { SearchInput } from '../SearchInput';
import { SortBy } from '../SortBy';

const useStyles = makeStyles((theme) => ({
    paper: {
        height: '80px'
    },
    button: {
        color: 'rgba(0, 0, 0, 0.38)',
        margin: theme.spacing(4)
    },
    filter: {
        marginRight: theme.spacing(2)
    }
}));

const UserHeader = ({ filters, setFilters }) => {
    const { t } = useTranslation();
    const classes = useStyles();

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}
        >
            <Grid container spacing={3}>
                <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                    <Paper className={classes.paper} elevation={3} variant='outlined' square>
                        <div style={{ display: 'flex' }}>
                            <Grid item xl={4} lg={4} md={4} sm={12} xs={12}>
                                <div className={classes.search}>
                                    <SearchInput
                                        onChange={(searchText) => {
                                            setFilters({ ...filters, searchText });
                                        }}
                                        value={filters.searchText}
                                    />
                                </div>
                            </Grid>
                            <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
                                <div className={classes.filter}>
                                    <FilterBy
                                        onChange={(filterBy) => {
                                            setFilters({ ...filters, filterBy: [...filterBy] });
                                        }}
                                        values={filters.filterBy}
                                    />
                                </div>
                            </Grid>
                            <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
                                <div>
                                    <SortBy
                                        onChange={(sortBy) => {
                                            setFilters({ ...filters, sortBy });
                                        }}
                                        value={filters.sortBy}
                                    />
                                </div>
                            </Grid>
                            <Grid item xl={2} lg={2} md={2} sm={12} xs={12}>
                                <Button
                                    size='small'
                                    className={classes.button}
                                    startIcon={<CloseIcon />}
                                    onClick={() => setFilters({ filterBy: [] })}
                                >
                                    {t('user.clearAll')}
                                </Button>
                            </Grid>
                        </div>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
};

UserHeader.propTypes = {
    filters: PropTypes.array,
    setFilters: PropTypes.func
};

export default UserHeader;
