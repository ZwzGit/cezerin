import React from 'react'
import { Link } from 'react-router'

import messages from 'lib/text'

import FontIcon from 'material-ui/FontIcon';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import MenuItem from 'material-ui/MenuItem';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Search from './search';

export default class Buttons extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openDelete: false
    };
  }

  showDelete = () => {
    this.setState({openDelete: true});
  };

  closeDelete = () => {
    this.setState({openDelete: false});
  };

  deleteOrders = () => {
    this.setState({openDelete: false});
    this.props.onDelete();
  };

  render() {
    const { search, setSearch, selectedCount, onDelete } = this.props;

    const actionsDelete = [
      <FlatButton
        label={messages.actions_cancel}
        primary={true}
        onTouchTap={this.closeDelete}
      />,
      <FlatButton
        label={messages.actions_delete}
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.deleteOrders}
      />,
    ];

    return (
      <span>
        <Search value={search} setSearch={setSearch} />
        {selectedCount > 0 &&
          <span>
            <IconButton touch={true} tooltip={messages.actions_delete} onTouchTap={this.showDelete}>
              <FontIcon color="#fff" className="material-icons">delete</FontIcon>
            </IconButton>
            <Dialog
              title={messages.messages_deleteForever}
              actions={actionsDelete}
              modal={false}
              open={this.state.openDelete}
              onRequestClose={this.closeDelete}
              >
              {messages.orders_aboutDelete.replace('{count}', selectedCount)}
            </Dialog>
          </span>
        }
        <IconMenu
         iconButtonElement={
           <IconButton touch={true}>
             <FontIcon color="#fff" className="material-icons">more_vert</FontIcon>
           </IconButton>
         }
         targetOrigin={{horizontal: 'right', vertical: 'top'}}
         anchorOrigin={{horizontal: 'right', vertical: 'top'}}
        >
          <MenuItem containerElement={<Link to="/admin/orders/statuses" />} primaryText="TODO" />
          {selectedCount > 0 &&
            <span>
            <MenuItem primaryText={messages.orders_setClosed} onTouchTap={this.props.setClosed} />
            <MenuItem primaryText={messages.orders_setCancelled} onTouchTap={this.props.setCancelled} />
            <MenuItem primaryText={messages.orders_setDelivered} onTouchTap={this.props.setDelivered} />
            <MenuItem primaryText={messages.orders_setPaid} onTouchTap={this.props.setPaid} />
            <MenuItem primaryText={messages.orders_setHold} onTouchTap={this.props.setHold} />
            <MenuItem primaryText={messages.orders_setDraft} onTouchTap={this.props.setDraft} />
          </span>
          }
        </IconMenu>
      </span>
    )
  }
}
