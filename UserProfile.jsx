import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

import { useMutation } from '@apollo/react-hooks';
import { Avatar, Button, Dialog, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import PhoneIphoneIcon from '@material-ui/icons/PhoneIphone';

import { RESEND_INVITE } from 'graphql/mutations/user';
import { getInitials } from 'helpers/name';

import RemoveSingleUser from './RemoveSingleUser';
import ResendInvite from './ResendInvite';
const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(2),
        marginLeft: theme.spacing(2)
    },
    content: {
        marginTop: -theme.spacing(1),
        display: 'flex',
        justifyContent: 'flex-start'
    },
    avatar: {
        marginRight: theme.spacing(2),
        fontSize: '60px',
        marginTop: theme.spacing(1),
        height: theme.spacing(15),
        width: theme.spacing(15)
    },
    typography: {
        marginTop: theme.spacing(1),
        marginRight: theme.spacing(),
        fontWeight: 'normal',
        fontSize: '20px',
        letterSpacing: '0.18px',
        color: '#2B8CDA'
    },
    resendButton: {
        height: '30px',
        fontSize: '14px'
    },
    subText: {
        display: 'flex',
        marginTop: theme.spacing(1)
    },
    newInvitation: {
        marginTop: -theme.spacing(15),
        display: 'flex',
        justifyContent: 'flex-end'
    },
    removeSection: {
        marginTop: theme.spacing(8)
    },
    icon: {
        color: ' #0578D3',
        marginRight: theme.spacing(1)
    },
    notVerifiedMessage: {
        display: 'flex',
        marginRight: theme.spacing(5),
        color: '#B00020'
    },
    errorIcon: {
        marginRight: theme.spacing(1)
    },
    removeButton: {
        color: '#B00020'
    }
}));
const UserProfile = ({ selectedUserId, users, unitId, refetch, setProfile, setSelectedUsers }) => {
    const classes = useStyles();
    const [ModalState, setModalState] = useState(false);
    const [ResendModalState, setResendModalState] = useState(false);
    const user = users.filter((user) => user.id.toString() === selectedUserId.toString());
    // const [verified, setVerified] = useState(user[0].verified);
    const selectedId = selectedUserId[0];

    const [resendInvite] = useMutation(RESEND_INVITE, {
        variables: { userId: selectedId },
        onCompleted: () => {
            //refetch();
        }
    });
    const { t } = useTranslation();

    return (
        <div className={classes.root}>
            <div className={classes.content}>
                <Avatar variant='square' className={classes.avatar}>
                    {getInitials(user[0].firstName + ' ' + user[0].lastName)}
                </Avatar>
                <div>
                    <Typography className={classes.typography}>
                        {user[0].firstName + ' ' + user[0].lastName}{' '}
                    </Typography>
                    <div className={classes.subText}>
                        <PhoneIphoneIcon className={classes.icon} />
                        <Typography>{user[0].phone}</Typography>
                    </div>
                    <div className={classes.subText}>
                        <MailOutlineIcon className={classes.icon} />
                        <Typography>{user[0].email}</Typography>
                    </div>
                </div>
            </div>

            <div align='right' className={classes.newInvitation}>
                {user[0].verified.toString() === 'false' && (
                    <div className={classes.notVerifiedMessage}>
                        <ErrorOutlineIcon className={classes.errorIcon} />
                        <Typography>{t('user.userVerificationMessage')}</Typography>
                    </div>
                )}
                {user[0].verified.toString() === 'false' && (
                    <Button
                        className={classes.resendButton}
                        variant='contained'
                        color='primary'
                        onClick={() => {
                            setResendModalState(!ResendModalState);
                            resendInvite();
                        }}
                    >
                        {t('user.resendInviteButton')}
                    </Button>
                )}
                <Dialog open={ResendModalState} onClose={() => setResendModalState(false)}>
                    <ResendInvite ResendModalState={ResendModalState} setResendModalState={setResendModalState} />
                </Dialog>
            </div>
            <div align='right' className={classes.removeSection}>
                <Button
                    className={classes.removeButton}
                    variant='outlined'
                    onClick={() => {
                        setModalState(!ModalState);
                    }}
                >
                    <CloseIcon />
                    {t('genericLabel.removeUserMessage')}
                </Button>
                <Dialog open={ModalState} onClose={() => setModalState(false)}>
                    <RemoveSingleUser
                        ModalState={ModalState}
                        setModalState={setModalState}
                        user={user}
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
UserProfile.propTypes = {
    users: PropTypes.array.isRequired,
    selectedUserId: PropTypes.array,
    unitId: PropTypes.string,
    refetch: PropTypes.func,
    setProfile: PropTypes.func,
    setSelectedUsers: PropTypes.func
};
export default UserProfile;
