import React, { Component } from "react";
import {
  List,
  Datagrid,
  TextField,
  ReferenceInput,
  required,
  SelectInput,
  NumberField,
  FunctionField,
} from "react-admin";

import utils from "../../utils";

const filters = [
  <ReferenceInput
    source="id_convenio"
    reference="convenios_vencimiento"
    alwaysOn={true}
    sort={{ field: "id", order: "ASC" }}
  >
    <SelectInput
      label="Convenio"
      source="id_convenio"
      optionText="nombre"
      validate={required()}
    />
  </ReferenceInput>,
];
const rowStyle = (record, index) => {
  console.log("r %o", record);
  const d = new Date();
  return {
    backgroundColor:
      d <= new Date(record.hasta) && d >= new Date(record.desde)
        ? utils.ragPalette.green
        : "inherit",
  };
};

const ConveniosList = (props) => {
  return (
    <List
      exporter={false}
      {...props}
      filters={filters}
      filterDefaultValues={{ id_convenio: "1" }}
      sort={{ field: "desde", order: "DESC" }}
      storeKey={false}
    >
      <Datagrid bulkActionButtons={false} rowSx={rowStyle}>
        <TextField source="nombre" />

        <FunctionField
          source="desde"
          render={(record) => utils.uFormat(record.desde, "yyyy-MMMM")}
        />
        <NumberField source="importe_diario" label="DIARIO S/IVA" />
        <NumberField source="importe_mensual" label="MENSUAL S/IVA" />

        <NumberField
          source="importe_diario"
          label="DIARIO IVA 10.5%"
          transform={(value) => value * 1.105}
        />
        <NumberField
          source="importe_diario"
          label="DIARIO IVA 21%"
          transform={(value) => value * 1.21}
        />
        <NumberField
          source="importe_mensual"
          label="MENSUAL IVA 10.5%"
          transform={(value) => value * 1.105}
        />
        <NumberField
          source="importe_mensual"
          label="MENSUAL IVA 21%"
          transform={(value) => value * 1.21}
        />
      </Datagrid>
    </List>
  );
};

export default {
  list: ConveniosList,
};
