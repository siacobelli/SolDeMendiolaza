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
  WrapperField,
} from "react-admin";

import utils from "../../utils";
import { Stack } from "@mui/material";

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
  const d = new Date();
  return {
    backgroundColor:
      d <= new Date(record.hasta) && d >= new Date(record.desde)
        ? utils.ragPalette.green
        : "inherit",
  };
};

const importeRender = (importe, color, text, percentage = 1) => (
  <div style={{ borderBottom: "2px dotted " + color, margin: "2px" }}>
    <span
      style={{
        fontWeight: "bolder",
      }}
    >
      {text}:
    </span>
    <span
      style={{
        display: "inline-block",
        minWidth: "100px",
        marginLeft: "4px",
        textAlign: "center",
      }}
    >
      ${(importe * percentage).toLocaleString()}
    </span>
  </div>
);

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
        <TextField source="nombre" sortable={false} />
        <FunctionField
          sortable={false}
          source="desde"
          render={(record) => utils.uFormat(record.desde, "yyyy-MMMM")}
        />
        <WrapperField
          sortable={false}
          source="importe_diario"
          label="Importe Diario"
          textAlign="right"
        >
          <Stack>
            <FunctionField
              render={(record) =>
                importeRender(record.importe_diario, "#006400", "SIN IVA", 1)
              }
            />

            <FunctionField
              render={(record) =>
                importeRender(
                  record.importe_diario,
                  "#00016459",
                  "10.5%",
                  1.105
                )
              }
            />
            <FunctionField
              render={(record) =>
                importeRender(record.importe_diario, "#f4a036", "21 %", 1.21)
              }
            />
          </Stack>
        </WrapperField>
        <WrapperField
          sortable={false}
          source="importe_mensual"
          label="Importe Mensual"
          textAlign="right"
        >
          <Stack>
            <FunctionField
              render={(record) =>
                importeRender(record.importe_mensual, "#006400", "SIN IVA", 1)
              }
            />

            <FunctionField
              render={(record) =>
                importeRender(
                  record.importe_mensual,
                  "#00016459",
                  "10.5%",
                  1.105
                )
              }
            />
            <FunctionField
              render={(record) =>
                importeRender(record.importe_mensual, "#f4a03682", "21 %", 1.21)
              }
            />
          </Stack>
        </WrapperField>
      </Datagrid>
    </List>
  );
};

export default {
  list: ConveniosList,
};
