import React, { Component } from "react";
import {
  List,
  Datagrid,
  TextField,
  DateField,
  EditButton,
  DeleteButton,
  reactAdminFetchActions,
} from "react-admin";

const HuespedList = (props) => {
  return (
    <List {...props}>
      <Datagrid>
        <TextField source="id" />
        <TextField source="nombre" />
        <EditButton />
        <DeleteButton />
      </Datagrid>
    </List>
  );
};

export default HuespedList;
