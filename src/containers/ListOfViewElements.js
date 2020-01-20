import React, {Component} from 'react';
import {Tab, List, Button, Segment, Confirm} from 'semantic-ui-react'

import ElementViewList from '../components/ElementViewList'
import ModalSaveView from '../components/ModalSaveView'

class ListOfViewElements extends Component {
    constructor(props) {
        super(props);
        this.state = { modelOpen: false }
    }
  

    show = () => {
        console.log("show modal")
        this.setState({ modelOpen: true })
    }
    // handleConfirm = () => this.setState({ open: false })
    // handleCancel = () => this.setState({ open: false })
  
    handleClearButtonClick = () => {
        console.log("clearview")
        this.props.clearView()
    }

    handleModalClose = () => {
        // this.setState({modelOpen: false})
    }

    handleModalConfirm = (item) => {
        // this.setState({modelOpen: false})
        console.log("confirm")
    }


    render() { 
        const {view} = this.props
        return (
            
            <React.Fragment>
            <ModalSaveView 
                modalOpen={this.state.modelOpen}
                handleClose={this.handleModalClose}
                handleConfirm={this.handleModalConfirm}
                valueIntoModal={this.props.watchlists}
            />
            <Button
                attached='top'
                onClick={this.show}
            >
                Save as Watchlist
            </Button>
            {/* <Confirm
                    open={this.state.open}
                    header='Select which slot to save it to'
                    onCancel={this.handleCancel}
                    onConfirm={this.handleConfirm}
            /> */}
            <Button
                attached='top'
                onClick={this.handleClearButtonClick}
            >
                Clear View
            </Button>
            <Segment attached>
                <List divided verticalAlign='middle'>
                    {view.map( item =>
                        <ElementViewList
                            key={item.name} item={item}
                            removeSatOnClick={this.props.removeSatOnClick}
                            removeSatAndConOnClick={this.props.removeSatAndConOnClick}
                        />
                    )}
                </List>
            </Segment>


        </React.Fragment>
          );
    }
}
 
export default ListOfViewElements;