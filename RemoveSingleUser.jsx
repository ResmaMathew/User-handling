import React from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

import { useMutation } from '@apollo/react-hooks';
import { Button, DialogActions, DialogContent, IconButton, Typography } from '@material-ui/core';

import { REMOVE_USER_FROM_UNIT } from 'graphql/mutations/units';
function RemoveSingleUser({ ModalState, setModalState, selectedUserId, unitId, refetch, setSelectedUsers }) {
    const [removeUser] = useMutation(REMOVE_USER_FROM_UNIT, {
        variables: { unitId: unitId, userId: selectedUserId.toString() },
        onCompleted: () => {
            refetch();
            //setProfile(false);
        }
    });
    const { t } = useTranslation();

    return (
        <div>
            <IconButton onClick={() => ModalState(false)}></IconButton>
            <DialogContent>
                <Typography>{t('user.popupDeleteMessage')}</Typography>
            </DialogContent>
            <DialogActions>
                <Button
                    color='primary'
                    onClick={() => {
                        removeUser();
                        // setProfile(false);
                        setModalState(false);
                        setSelectedUsers([]);
                    }}
                >
                    {t('action.delete')}
                </Button>
                <Button onClick={() => setModalState(false)} color='primary'>
                    {' '}
                    {t('action.cancel')}{' '}
                </Button>
            </DialogActions>
        </div>
    );
}
RemoveSingleUser.propTypes = {
    ModalState: PropTypes.array,
    setModalState: PropTypes.func,
    selectedUserId: PropTypes.array,
    unitId: PropTypes.any,
    refetch: PropTypes.func,
    setSelectedUsers: PropTypes.func
};

export default RemoveSingleUser;
