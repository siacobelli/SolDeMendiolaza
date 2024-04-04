import React, { Component } from "react";
import {
  Datagrid,
  TextField,
  ReferenceInput,
  required,
  FunctionField,
  DateInput,
  BooleanField,
  ReferenceField,
  InfiniteList,
  Create,
  TopToolbar,
  ListButton,
  SimpleForm,
  AutocompleteInput,
  NumberInput,
  TextInput,
  BooleanInput,
  EditButton,
  Edit,
  WrapperField,
  NumberField,
} from "react-admin";

import utils from "../../utils";
import { Grid, Stack } from "@mui/material";

const filters = [
  <DateInput
    source="periodo"
    alwaysOn={true}
    validate={required()}
    parse={(dateString) => {
      if (!dateString) return null;
      const date = new Date(dateString);
      return new Date(date.getFullYear(), date.getMonth(), 1).toISOString();
    }}
  />,
];
const date = new Date();
date.setMonth(date.getMonth() - 1);
date.setDate(1);
const defaultFilterDate = date.toISOString();

const horasRender = (horas, color, text) => horas ? (
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
      #{(horas).toLocaleString()}
    </span>
  </div>
) : "" ;

const HorasMensualesPersonalList = (props) => {
  return (
    <InfiniteList
      exporter={false}
      {...props}
      filters={filters}
      filterDefaultValues={{
        periodo: defaultFilterDate,
      }}
      sort={{ field: "id_personal", order: "ASC" }}
      storeKey={false}
    >
      <Datagrid bulkActionButtons={false}>
        <EditButton label="" />

        <FunctionField
          source="periodo"
          render={(record) => utils.uFormat(record.periodo, "yyyy-MMMM")}
        />
        <ReferenceField reference="personal" source="id_personal">
          <FunctionField
            source="id"
            render={(record) =>
              `#${record.id} ${record.nombre},${record.apellido}`
            }
          />
        </ReferenceField>
        <BooleanField source="pagado" />
        {/* 
        <NumberField source="horas_cuidado_diurno" />
        <NumberField source="horas_cuidado_nocturno" />
        <NumberField source="horas_talleres" />
        <NumberField source="horas_limpieza" />
        <NumberField source="horas_sessiones" /> */}
        <NumberField source="adicional" />
        <WrapperField
          sortable={false}
          label="Horas"
          textAlign="left"
        >
          <Stack>
            <FunctionField
              render={(record) =>
                horasRender(record.horas_cuidado_diurno, "inherit", "Diurnas")
              }
            />
            <FunctionField
              render={(record) =>
                horasRender(record.horas_cuidado_nocturno, "inherit", "Nocturno")
              }
            />
            <FunctionField
              render={(record) =>
                horasRender(record.horas_talleres, "inherit", "Talleres")
              }
            />
            <FunctionField
              render={(record) =>
                horasRender(record.horas_limpieza, "inherit", "Limpieza")
              }
            />
            <FunctionField
              render={(record) =>
                horasRender(record.horas_sessiones, "inherit", "Sesiones")
              }
            />
          </Stack>
        </WrapperField>
        <TextField source="notas" />
      </Datagrid>
    </InfiniteList>
  );
};

const filterToQuery = (search) =>
  search
    ? {
        "@or": {
          "nombre@ilike": `%${search}%`,
          "apellido@ilike": `%${search}%`,
        },
      }
    : {};

const HorasMensualesPersonalCreate = (props) => {
  return (
    <Create
      {...props}
      redirect={"list"}
      actions={
        <TopToolbar title="Horas Mensuals Personal">
          <ListButton label="Lista" />
        </TopToolbar>
      }
    >
      <SimpleForm>
        <Grid
          container
          width="100%"
          columns={4}
          rowSpacing={1}
          columnSpacing={1}
          sx={{ maxWidth: "550px" }}
        >
          <Grid item xs={2} sx={{ maxWidth: "150px", maxHeight: "60px" }}>
            <ReferenceInput
              source="id_personal"
              reference="personal"
              sort={{ field: "id", order: "ASC" }}
              fullWidth
            >
              <AutocompleteInput
                filterToQuery={filterToQuery}
                optionText={(personal) =>
                  `#${personal.id} ${personal.nombre},${personal.apellido}`
                }
              />
            </ReferenceInput>
          </Grid>
          <Grid item xs={2} sx={{ maxWidth: "150px", maxHeight: "60px" }}>
            <DateInput
              source="periodo"
              fullWidth
              validate={required()}
              defaultValue={defaultFilterDate}
              parse={(dateString) => {
                if (!dateString) return null;
                const date = new Date(dateString);
                return new Date(
                  date.getFullYear(),
                  date.getMonth(),
                  1
                ).toISOString();
              }}
            />
          </Grid>
          <Grid item xs={2} sx={{ maxWidth: "150px", maxHeight: "60px" }}>
            <NumberInput source="horas_cuidado_diurno" defaultValue={0} />
          </Grid>
          <Grid item xs={2} sx={{ maxWidth: "150px", maxHeight: "60px" }}>
            <NumberInput source="horas_cuidado_nocturno" defaultValue={0} />
          </Grid>
          <Grid item xs={2} sx={{ maxWidth: "150px", maxHeight: "60px" }}>
            <NumberInput source="horas_talleres" defaultValue={0} />
          </Grid>
          <Grid item xs={2} sx={{ maxWidth: "150px", maxHeight: "60px" }}>
            <NumberInput source="horas_sessiones" defaultValue={0} />
          </Grid>
          <Grid item xs={2} sx={{ maxWidth: "150px", maxHeight: "60px" }}>
            <NumberInput source="horas_limpieza" defaultValue={0} />
          </Grid>
          <Grid item xs={4} sx={{ maxWidth: "150px", maxHeight: "60px" }}>
            <NumberInput source="adicional" defaultValue={0} />
          </Grid>
          <Grid item xs={4} sx={{ maxHeight: "150px" }}>
            <TextInput
              source="notas"
              multiline
              fullWidth
              sx={{ minHeight: "140px", overflow: "auto", maxHeight: "140px" }}
            />
          </Grid>
        </Grid>
      </SimpleForm>
    </Create>
  );
};

const HorasMensualesPersonalEdit = (props) => {
  return (
    <Edit
      {...props}
      redirect={"list"}
      actions={
        <TopToolbar title="Horas Mensuales Personal">
          <ListButton label="Lista" />
        </TopToolbar>
      }
    >
      <SimpleForm>
        <Grid
          container
          width="100%"
          columns={4}
          rowSpacing={1}
          columnSpacing={1}
          sx={{ maxWidth: "550px" }}
        >
          <Grid item xs={2} sx={{ maxWidth: "150px", maxHeight: "60px" }}>
            <ReferenceInput
              source="id_personal"
              reference="personal"
              sort={{ field: "id", order: "ASC" }}
              fullWidth
            >
              <AutocompleteInput
                filterToQuery={filterToQuery}
                optionText={(personal) =>
                  `#${personal.id} ${personal.nombre},${personal.apellido}`
                }
              />
            </ReferenceInput>
          </Grid>
          <Grid item xs={2} sx={{ maxWidth: "150px", maxHeight: "60px" }}>
            <DateInput
              source="periodo"
              fullWidth
              validate={required()}
              parse={(dateString) => {
                if (!dateString) return null;
                const date = new Date(dateString);
                return new Date(
                  date.getFullYear(),
                  date.getMonth(),
                  1
                ).toISOString();
              }}
            />
          </Grid>
          <Grid item xs={2} sx={{ maxWidth: "150px", maxHeight: "60px" }}>
            <NumberInput source="horas_cuidado_diurno" defaultValue={0} />
          </Grid>
          <Grid item xs={2} sx={{ maxWidth: "150px", maxHeight: "60px" }}>
            <NumberInput source="horas_cuidado_nocturno" defaultValue={0} />
          </Grid>
          <Grid item xs={2} sx={{ maxWidth: "150px", maxHeight: "60px" }}>
            <NumberInput source="horas_talleres" defaultValue={0} />
          </Grid>
          <Grid item xs={2} sx={{ maxWidth: "150px", maxHeight: "60px" }}>
            <NumberInput source="horas_sessiones" defaultValue={0} />
          </Grid>
          <Grid item xs={2} sx={{ maxWidth: "150px", maxHeight: "60px" }}>
            <NumberInput source="horas_limpieza" defaultValue={0} />
          </Grid>
          <Grid item xs={4} sx={{ maxWidth: "150px", maxHeight: "60px" }}>
            <NumberInput source="adicional" defaultValue={0} />
          </Grid>
          <Grid item xs={4} sx={{ maxHeight: "150px" }}>
            <TextInput
              source="notas"
              multiline
              fullWidth
              sx={{ minHeight: "140px", overflow: "auto", maxHeight: "140px" }}
            />
          </Grid>
          <Grid item xs={4} sx={{ maxWidth: "150px", maxHeight: "60px" }}>
            <BooleanInput source="pagado" />
          </Grid>
        </Grid>
      </SimpleForm>
    </Edit>
  );
};

export default {
  list: HorasMensualesPersonalList,
  create: HorasMensualesPersonalCreate,
  edit: HorasMensualesPersonalEdit,
};
