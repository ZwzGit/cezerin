import React from 'react'
import { Link } from 'react-router'

import messages from 'lib/text'
import GroupSelect from 'modules/customer-groups/select'

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
      groupId: null,
      openSetGroup: false,
      openDelete: false
    };
  }

  showSetGroup = () => {
    this.setState({openSetGroup: true});
  };

  showDelete = () => {
    this.setState({openDelete: true});
  };

  closeSetGroup = () => {
    this.setState({openSetGroup: false});
  };

  closeDelete = () => {
    this.setState({openDelete: false});
  };

  deleteCustomers = () => {
    this.setState({openDelete: false});
    this.props.onDelete();
  };

  saveSetGroup = () => {
    this.setState({openSetGroup: false});
    this.props.onSetGroup(this.state.groupId);
  };

  selectSetGroup = (groupId) => {
    this.setState({groupId: groupId});
  }

  render() {
    const { search, setSearch, selectedCount, onDelete } = this.props;

    const actionsSetGroup = [
      <FlatButton
        label={messages.actions_cancel}
        primary={true}
        onTouchTap={this.closeSetGroup}
      />,
      <FlatButton
        label={messages.actions_save}
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.saveSetGroup}
      />,
    ];

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
        onTouchTap={this.deleteCustomers}
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
              {messages.customers_aboutDelete.replace('{count}', selectedCount)}
            </Dialog>
            <Dialog
              title={messages.customers_setGroup}
              actions={actionsSetGroup}
              modal={false}
              open={this.state.openSetGroup}
              onRequestClose={this.closeSetGroup}
              autoScrollBodyContent={true}
            >
              <GroupSelect
                onSelect={this.selectSetGroup}
                selectedId={this.state.groupId}
                showRoot={true}
                showAll={false}
              />
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
          <MenuItem containerElement={<Link to="/admin/customers/groups" />} primaryText={messages.customerGroups_titleEditMany} />
          {selectedCount > 0 &&
            <MenuItem primaryText={messages.customers_setGroup} onTouchTap={this.showSetGroup} />
          }
        </IconMenu>
      </span>
    )
  }
}
