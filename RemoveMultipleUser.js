import React from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

import { useMutation } from '@apollo/react-hooks';
import { Button, DialogActions, DialogContent, IconButton, Typography } from '@material-ui/core';

import { REMOVE_USERS_FROM_UNIT } from 'graphql/mutations/units';
function RemoveMultipleUser({ ModalState, setModalState, selectedUserId, unitId, refetch, setSelectedUsers }) {
    const [removeUsers] = useMutation(REMOVE_USERS_FROM_UNIT, {
        variables: { input: { unitId: unitId, userIds: selectedUserId } },
        onCompleted: () => {
            refetch();
            // setProfile(false);
            // window.location.reload(true);
        }
    });
    const { t } = useTranslation();

    return (
        <div>
            <IconButton onClick={() => ModalState(false)}></IconButton>
            <DialogContent>
                <Typography>{t('user.popupDeleteUsers')}</Typography>
            </DialogContent>
            <DialogActions>
                <Button
                    color='primary'
                    onClick={() => {
                        removeUsers();
                        setModalState(false);
                        setSelectedUsers([]);
                    }}
                >
                    {t('action.delete')}
                </Button>
                <Button color='primary' onClick={() => setModalState(false)}>
                    {' '}
                    {t('action.cancel')}{' '}
                </Button>
            </DialogActions>
        </div>
    );
}
RemoveMultipleUser.propTypes = {
    ModalState: PropTypes.array,
    setModalState: PropTypes.func,
    selectedUserId: PropTypes.array,
    unitId: PropTypes.any,
    refetch: PropTypes.func,
    setSelectedUsers: PropTypes.func
};

export default RemoveMultipleUser;
