import React, { useContext, useEffect, useState } from 'react';

import { useLazyQuery } from '@apollo/react-hooks';
import { Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { Context as activeUnitContext } from 'context/units/activeUnitContext';
import { GET_UNIT } from 'graphql/queries/user';

import UserHeader from '../UserHeader/UserHeader';
import UserList from '../UserList/UserList';

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: -theme.spacing(1)
    }
}));

export const Users = () => {
    const classes = useStyles();
    const {
        state: { activeUnit }
    } = useContext(activeUnitContext);

    const [filters, setFilters] = useState({ filterBy: [], sortBy: {}, searchText: '' });
    const [users, setUsers] = useState([]);

    const [getUnit] = useLazyQuery(GET_UNIT, {
        variables: { id: activeUnit.id },
        onCompleted: (res) => {
            setUsers([...res.getUnit.users]);
        },
        fetchPolicy: 'network-only'
    });

    useEffect(() => {
        getUnit();
    }, []);

    let searchResults = users;

    if (filters.searchText) {
        searchResults = users.filter((user) =>
            (user.firstName + ' ' + user.lastName).toLowerCase().includes(filters.searchText)
        );
    }
    if (filters.sortBy) {
        if (filters.sortBy === 'asc') {
            searchResults = searchResults.sort((a, b) => {
                if (a.firstName) {
                    return a.firstName.localeCompare(b.firstName);
                } else {
                    return false;
                }
            });
        }

        if (filters.sortBy === 'desc') {
            searchResults = searchResults.sort((a, b) => {
                if (a.firstName) {
                    return b.firstName.localeCompare(a.firstName);
                } else {
                    return false;
                }
            });
        }
    }

    if (filters.filterBy && filters.filterBy.length !== 0) {
        searchResults = searchResults.filter(
            (user) =>
                (user.verified && filters.filterBy.includes('verified')) ||
                (!user.verified && filters.filterBy.includes('notVerified'))
        );
    }

    return (
        <div className={classes.root}>
            <Paper variant='outlined' square>
                <UserHeader filters={filters} setFilters={setFilters} />

                <UserList
                    users={users}
                    searchResults={searchResults}
                    unitName={activeUnit.name}
                    unitId={activeUnit.id}
                    refetch={getUnit}
                />
            </Paper>
        </div>
    );
};
