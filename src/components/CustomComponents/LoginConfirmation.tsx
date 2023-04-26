import React, { Component } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';


class LoginConfirmation extends Component {
  state = {
    open: false,
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleLogin = () => {
    this.handleClose();
   
    window.location.href = '/login';
  };

  render() {
    return (
      <div>
        <Button onClick={this.handleOpen} >
          Login
        </Button>
        <Dialog open={this.state.open} onClose={this.handleClose}>
          <DialogTitle>Login Confirmation</DialogTitle>
          <DialogContent>
            <p>Are you sure you want to log in?</p>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleLogin} color="primary">
              Login
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default LoginConfirmation;
