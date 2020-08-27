import React from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

import { Button, DialogActions, DialogContent, IconButton } from '@material-ui/core';
function ResendInvite({ ResendModalState, setResendModalState }) {
    const { t } = useTranslation();

    return (
        <div>
            <IconButton onClick={() => ResendModalState(false)}></IconButton>
            <DialogContent>{t('user.resendInviteMessage')} </DialogContent>
            <DialogActions>
                <Button onClick={() => setResendModalState(false)}> OK </Button>
            </DialogActions>
        </div>
    );
}
ResendInvite.propTypes = {
    ResendModalState: PropTypes.array,
    setResendModalState: PropTypes.func
};

export default ResendInvite;
