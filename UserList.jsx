import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

import { useMutation } from '@apollo/react-hooks';
import {
    Avatar,
    Button,
    Checkbox,
    Dialog,
    DialogContent,
    DialogContentText,
    Divider,
    FormControlLabel,
    FormGroup,
    Grid,
    Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';

import { INVITE_USERS } from 'graphql/mutations/user';
import { logError } from 'helpers/error';
import { getInitials } from 'helpers/name';

import { NewUserInvite } from '../NewUserInvite/NewUserInvite';
import SelectedUserProfiles from './SelectedUserProfiles/SelectUserProfiles';
import UserProfile from './UserProfile/UserProfile';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(2),
        padding: theme.spacing(3, 2),
        maxHeight: 690,
        overflow: 'auto'
    },
    section2: {
        marginTop: theme.spacing(2),
        padding: theme.spacing(1, 1),
        marginLeft: -theme.spacing(2.8),
        minHeight: 200
    },
    group: {
        margin: theme.spacing(1, 0)
    },
    root: {
        display: 'flex',
        margin: theme.spacing(0.5)
    },
    avatar: {
        marginRight: theme.spacing(1),
        fontSize: '12px',
        marginTop: theme.spacing(1)
    },
    typo: {
        marginTop: theme.spacing(1)
    },
    selectall: {
        marginTop: -theme.spacing(0.5)
    },
    typography: {
        marginTop: theme.spacing(1),
        marginLeft: theme.spacing(2),
        color: 'rgba(0, 0, 0, 0.6)'
    },
    errorIcon: {
        marginTop: theme.spacing(1),
        marginLeft: theme.spacing(2),
        color: ' rgba(0, 0, 0, 0.38)'
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: -theme.spacing(0.5),
        marginBottom: -theme.spacing(3),
        marginLeft: -theme.spacing(0.5),
        marginRight: -theme.spacing(0.5),
        background: 'rgba(33, 33, 33, 0.08)'
    },
    button: {
        align: 'right'
    },
    dialogPaper: {
        width: '300px',
        height: '200px'
    },
    newUserButton: {
        marginRight: theme.spacing(2),
        marginTop: theme.spacing(0.2)
    },
    newUserontent: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(2)
    },
    submit: {
        height: '25px',
        marginTop: theme.spacing(1),
        marginLeft: theme.spacing(1),
        fontSize: '12px'
    },
    dialogHeader: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    cancelIcon: {
        marginTop: -theme.spacing(1),
        height: '20px'
    },
    subText: {
        marginTop: -theme.spacing(3),
        marginLeft: theme.spacing(12.5),
        fontSize: '12px',
        color: 'rgba(0, 0, 0, 0.6)'
    },
    divider: {
        marginTop: theme.spacing(4),
        marginBottom: theme.spacing(1.9)
    }
}));
const UserList = ({ users, searchResults, unitName, unitId, refetch }) => {
    const { t } = useTranslation();
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [selectedUsers, setSelectedUsers] = useState([]);

    const [setProfile] = useState(true);
    const [emails, setEmails] = useState([]);

    const [updatedFeedFields] = useMutation(INVITE_USERS, {
        onCompleted: () => {
            refetch();
            handleClose();
        },
        onError: (error) => logError(error)
    });

    useEffect(() => {
        setSelectedUsers([]);
    }, [searchResults]);

    const handleSelectAll = (event) => {
        let selectedUsers;

        if (event.target.checked) {
            selectedUsers = users.map((user) => user.id);
        } else {
            selectedUsers = [];
        }

        setSelectedUsers(selectedUsers);
    };
    const handleSelectOne = (event, id) => {
        const selectedIndex = selectedUsers.indexOf(id);
        let newSelectedUsers = [];

        if (selectedIndex === -1) {
            newSelectedUsers = newSelectedUsers.concat(selectedUsers, id);
        } else if (selectedIndex === 0) {
            newSelectedUsers = newSelectedUsers.concat(selectedUsers.slice(1));
        } else if (selectedIndex === selectedUsers.length - 1) {
            newSelectedUsers = newSelectedUsers.concat(selectedUsers.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelectedUsers = newSelectedUsers.concat(
                selectedUsers.slice(0, selectedIndex),
                selectedUsers.slice(selectedIndex + 1)
            );
        }

        setSelectedUsers(newSelectedUsers);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleSendInvite = () => {
        updatedFeedFields({
            variables: { input: { emails: emails, unitId: unitId } }
        });
    };

    return (
        <>
            <div className={classes.root}>
                <Grid container spacing={3}>
                    <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                        <div className={classes.header}>
                            <Checkbox
                                size='small'
                                className={classes.selectall}
                                checked={selectedUsers.length === users.length}
                                color='primary'
                                indeterminate={selectedUsers.length > 0 && selectedUsers.length < users.length}
                                onChange={handleSelectAll}
                            />
                            <Typography className={classes.typography}>
                                {t('user.showing')} {selectedUsers.length} {t('user.of')} {users.length}
                            </Typography>
                            <div align='right' className={classes.newUserButton}>
                                <Button
                                    className={classes.button}
                                    color='primary'
                                    startIcon={<AddIcon />}
                                    onClick={handleClickOpen}
                                >
                                    {t('user.createNewUser')}
                                </Button>
                                <Dialog open={open} onClose={handleClose} aria-labelledby='form-dialog-title' fullWidth>
                                    <DialogContent>
                                        <div className={classes.dialogHeader}>
                                            <DialogContentText>
                                                {' '}
                                                {t('user.inviteUserstoJoin')} {unitName} {t('user.onAdtube')}
                                            </DialogContentText>
                                            <Button onClick={handleClose} className={classes.cancelIcon}>
                                                <CloseIcon />
                                            </Button>
                                        </div>
                                        <Divider />
                                        <div className={classes.newUserontent}>
                                            <NewUserInvite emails={emails} setEmails={setEmails} />

                                            <Button
                                                small
                                                className={classes.submit}
                                                onClick={() => {
                                                    handleSendInvite();
                                                    refetch();
                                                    setOpen(false);
                                                    setEmails([]);
                                                }}
                                                color='primary'
                                                variant='contained'
                                            >
                                                {t('user.sendInvite')}
                                            </Button>
                                        </div>
                                    </DialogContent>
                                </Dialog>
                            </div>
                        </div>
                    </Grid>
                </Grid>
            </div>

            <Grid container spacing={3}>
                <Grid item xl={4} lg={4} md={12} sm={12} xs={12}>
                    <div className={classes.paper}>
                        <FormGroup>
                            {searchResults.map((user) => {
                                return (
                                    <>
                                        <div className={classes.root}>
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        checked={selectedUsers.indexOf(user.id) !== -1}
                                                        color='primary'
                                                        onChange={(event) => handleSelectOne(event, user.id)}
                                                    />
                                                }
                                            />
                                            <Avatar className={classes.avatar} src={user.avatarUrl}>
                                                {getInitials(user.firstName + ' ' + user.lastName)}
                                            </Avatar>

                                            <Typography className={classes.typo}>
                                                {user.firstName && user.lastName
                                                    ? user.firstName + ' ' + user.lastName
                                                    : 'Pending User'}
                                            </Typography>

                                            {user.verified.toString() === 'false' && (
                                                <ErrorOutlineIcon className={classes.errorIcon} />
                                            )}
                                        </div>
                                        <Typography className={classes.subText}> {user.email}</Typography>
                                    </>
                                );
                            })}
                        </FormGroup>
                    </div>
                </Grid>
                <Divider className={classes.divider} orientation='vertical' flexItem />

                <Grid item xl={7} lg={7} md={12} sm={12} xs={12}>
                    {/* <Paper className={classes.section2} variant='outlined' square> */}

                    <div className={classes.section2}>
                        {selectedUsers.length === 1 && (
                            <>
                                <UserProfile
                                    selectedUserId={selectedUsers}
                                    users={users}
                                    refetch={refetch}
                                    unitId={unitId}
                                    setSelectedUsers={setSelectedUsers}
                                    setProfile={setProfile}
                                />
                            </>
                        )}
                        {selectedUsers.length > 1 && (
                            <SelectedUserProfiles
                                selectedUserId={selectedUsers}
                                users={users}
                                refetch={refetch}
                                unitId={unitId}
                                setSelectedUsers={setSelectedUsers}
                                setProfile={setProfile}
                            />
                        )}
                    </div>
                    {/* </Paper> */}
                </Grid>
            </Grid>
        </>
    );
};
UserList.propTypes = {
    users: PropTypes.array.isRequired,
    searchResults: PropTypes.array,
    unitName: PropTypes.string,
    unitId: PropTypes.string,
    refetch: PropTypes.func
};

export default UserList;
