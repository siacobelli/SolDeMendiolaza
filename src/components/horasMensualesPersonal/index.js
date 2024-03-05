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
} from "react-admin";

import utils from "../../utils";
import { Grid } from "@mui/material";

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
        <NumberField source="adicional" />
        <NumberField source="horas_cuidado_diurno" />
        <NumberField source="horas_cuidado_nocturno" />
        <NumberField source="horas_talleres" />
        <NumberField source="horas_limpieza" />
        <NumberField source="horas_sessiones" />
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
