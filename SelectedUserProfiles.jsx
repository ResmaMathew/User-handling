import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

import { Avatar, Button, Dialog, Typography } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/styles';

import { getInitials } from 'helpers/name';

import RemoveMultilpleUser from './RemoveMultipleUser';

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(2),
        marginLeft: theme.spacing(2)
    },
    value: {
        display: 'flex'
    },
    paper: {
        marginTop: theme.spacing(5)
    },
    typo: {
        margin: theme.spacing(2)
    },
    avatar: {
        margin: theme.spacing(1.5),
        fontSize: '12px',
        marginTop: theme.spacing(1)
    },
    typography: {
        margin: theme.spacing(3),
        marginTop: theme.spacing(3),
        fontFamily: 'Roboto',
        fonStyle: 'normal',
        fontWeight: 'normal',
        fontSize: '24px',
        letterSpacing: '0.18px',
        color: '#2B8CDA'
    },
    content: {
        marginTop: -theme.spacing(1)
    },
    divider: {
        marginTop: theme.spacing(5)
    },
    removeButton: {
        color: '#B00020'
    }
}));
const SelectedUserProfile = ({ users, selectedUserId, unitId, refetch, setProfile, setSelectedUsers }) => {
    const classes = useStyles();
    const { t } = useTranslation();
    const selectedUsers = users.filter((user) => selectedUserId.includes(user.id));
    const [ModalState, setModalState] = useState(false);

    return (
        <div className={classes.root}>
            <div className={classes.content}>
                <Typography className={classes.typography}>
                    {' '}
                    {t('user.selectedUsers')} ({selectedUsers.length})
                </Typography>
                {selectedUsers.map((user) => {
                    return (
                        <div className={classes.value} key={user.id}>
                            <Avatar className={classes.avatar} src={user.avatarUrl}>
                                {getInitials(user.firstName + ' ' + user.lastName)}
                            </Avatar>
                            <Typography className={classes.typo}>{user.firstName + ' ' + user.lastName}</Typography>
                        </div>
                    );
                })}
            </div>
            <div align='right'>
                <Button
                    className={classes.removeButton}
                    variant='outlined'
                    onClick={() => {
                        setModalState(!ModalState);
                    }}
                >
                    <CloseIcon />
                    {t('user.removeUsers')}
                </Button>
                <Dialog open={ModalState} onClose={() => setModalState(false)}>
                    <RemoveMultilpleUser
                        ModalState={ModalState}
                        setModalState={setModalState}
                        unitId={unitId}
                        selectedUserId={selectedUserId}
                        refetch={refetch}
                        setProfile={setProfile}
                        setSelectedUsers={setSelectedUsers}
                    />
                </Dialog>
            </div>
        </div>
    );
};
SelectedUserProfile.propTypes = {
    users: PropTypes.array.isRequired,
    selectedUserId: PropTypes.array,
    unitId: PropTypes.any,
    refetch: PropTypes.func,
    setProfile: PropTypes.func,
    setSelectedUsers: PropTypes.func
};
export default SelectedUserProfile;
