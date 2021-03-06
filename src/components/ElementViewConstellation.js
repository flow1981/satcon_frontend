import React, { Component } from "react";
import { List, Button, Icon, Header, Popup } from "semantic-ui-react";

const ElementViewConstellation = ({ item, removeConOnClick }) => {
  const handleConClick = item => {
    console.log("remove constellation on click");
    removeConOnClick(item);
  };

  return (
    <React.Fragment>
      <List.Item key={item.name}>
        <List.Content floated="right">
          <Popup
            basic
            content="Remove this constellation from View"
            trigger={
              <Button color="orange" icon onClick={() => handleConClick(item)}>
                <Icon name="window close" />
              </Button>
            }
          />
        </List.Content>
        <List.Content>
          <p>{item.name}</p>
        </List.Content>
      </List.Item>
    </React.Fragment>
  );
};

export default ElementViewConstellation;
