import React, { Component } from "react";
import {
  List,
  Datagrid,
  TextField,
  DateField,
  EditButton,
  DeleteButton,
  Show,
  TabbedShowLayout,
  ReferenceManyField,
  ShowButton,
  NumberField,
  BooleanField,
  UrlField,
  ReferenceField,
  CreateButton,
  useRecordContext,
} from "react-admin";

const HuespedesList = (props) => {
  return (
    <List {...props} exporter={false}>
      <Datagrid bulkActionButtons={false}>
        <ShowButton title="Detalles" label="Ver" />
        <TextField source="id" />
        <TextField source="nombre" />
        <TextField source="apellido" />
        <TextField source="dni" />
        <DateField source="fechaIngreso" />
        <EditButton title="editar" label="Editar" />
      </Datagrid>
    </List>
  );
};

const CreateMovimientoButton = () => {
  const record = useRecordContext();
  return (
    <CreateButton
    label="Registrar Pago"
      resource="movimientos"
      state={{
        record: { id_huesped: record.id, tipo: 1 },
      }}
    />
  );
};

const HuespedesShow = (props) => {
  return (
    <Show>
      <TabbedShowLayout>
        <TabbedShowLayout.Tab label="Datos">
          <TextField source="id" />
          <TextField source="nombre" />
          <TextField source="apellido" />
          <TextField source="dni" />
          <DateField source="fechaIngreso" />
          <DateField source="fechaEgreso" />
        </TabbedShowLayout.Tab>
        <TabbedShowLayout.Tab label="Facturas" path="facturas">
          <ReferenceManyField
            reference="facturas"
            target="id_huesped"
            label={false}
          >
            <Datagrid bulkActionButtons={false}>
              <TextField source="id" />
              <DateField source="desde" />
              <TextField source="tipo" />
              <TextField source="numero" />
              <BooleanField source="enviada" />
              <NumberField source="importe" />
              <UrlField source="link" target="new" />
              <EditButton />
            </Datagrid>
          </ReferenceManyField>
        </TabbedShowLayout.Tab>
        <TabbedShowLayout.Tab label="Pagos" path="pagos">
          <ReferenceManyField
            reference="movimientos"
            target="id_huesped"
            label={false}
          >
            <Datagrid bulkActionButtons={false}>
              <TextField source="id" />
              <DateField showTime={true} Field source="fechaMovimiento" />
              <ReferenceField reference="tiposMovimiento" source="tipo">
                <TextField
                  source="nombre"
                  sx={{
                    fontVariant: "small-caps",
                    marginLeft: "4px",
                    fontWeight: "bold",
                  }}
                />
              </ReferenceField>
              <TextField source="descripcion" />
              <NumberField source="importe" />
              <TextField source="user" />
              <EditButton />
            </Datagrid>
          </ReferenceManyField>
          <CreateMovimientoButton />
        </TabbedShowLayout.Tab>
      </TabbedShowLayout>
    </Show>
  );
};

export default {
  list: HuespedesList,
  show: HuespedesShow,
};
