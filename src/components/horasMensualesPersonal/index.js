import React, { Component, useEffect, useState } from "react";
import { supabase } from "../supabaseProvider";
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
  useRecordContext,
  Show,
  SimpleShowLayout,
} from "react-admin";

import utils from "../../utils";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Drawer,
  Grid,
  Stack,
} from "@mui/material";

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

const horasRender = (horas, color, text) =>
  horas ? (
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
        #{horas.toLocaleString()}
      </span>
    </div>
  ) : (
    ""
  );

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
        <WrapperField sortable={false} label="Horas" textAlign="left">
          <Stack>
            <FunctionField
              render={(record) =>
                horasRender(record.horas_cuidado_diurno, "inherit", "Diurnas")
              }
            />
            <FunctionField
              render={(record) =>
                horasRender(
                  record.horas_cuidado_nocturno,
                  "inherit",
                  "Nocturno"
                )
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

const LiquidacionComponent = () => {
  const record = useRecordContext();
  const [liquidacion, setLiquidacion] = useState({});

  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error } = await supabase.rpc("getliquidacion", {
          id_personal: record.id_personal,
          periodo: record.periodo,
        });
        setLiquidacion(data[0]);
      } catch (error) {
        console.error(error);
      }
    };
    if (record) fetchData();
  }, [record, setLiquidacion]); // Empty dependency array ensures this effect runs only once on mount

  /*alias
importe_liquidacion
detalle_horas_texto
mensaje */

  return (
    <>
      <Button variant="outlined" onClick={() => setOpen(true)}>
        Ver Liquidacion
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle id="alert-dialog-title">
          Liquidacion
          {` ${liquidacion.periodo} #${liquidacion.id_personal} - ${liquidacion.nombre_personal}`}
        </DialogTitle>
        <DialogContent>
          <Show actions={false}>
            <SimpleShowLayout record={liquidacion}>
              <NumberField Field source="importe_liquidacion" />
              <TextField source="alias" />
              <TextField multiline source="detalle_horas_texto" />
              <TextField multiline source="mensaje" />
            </SimpleShowLayout>
          </Show>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cerrar</Button>
        </DialogActions>
      </Dialog>
    </>
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
          <Grid item xs={2} sx={{ maxWidth: "150px", maxHeight: "60px" }}>
            <BooleanInput source="pagado" />
          </Grid>
          <Grid item xs={2} sx={{ maxWidth: "150px", maxHeight: "60px" }}>
            <LiquidacionComponent />
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
