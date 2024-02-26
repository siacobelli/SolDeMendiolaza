import React, { Component } from "react";
import {
  List,
  Datagrid,
  TextField,
  DateField,
  EditButton,
  DeleteButton,
} from "react-admin";

const HuespedesList = (props) => {
  return (
    <List {...props}>
      <Datagrid>
        <TextField source="id" />
        <TextField source="nombre" />
        <TextField source="apellido" />
        <TextField source="dni" />
        <DateField source="fechaIngreso" />
        <EditButton title="editar" label="Editar" />
        <DeleteButton label="Eliminar" />
      </Datagrid>
    </List>
  );
};

export default HuespedesList;
