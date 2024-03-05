import React, { Component } from "react";
import {
  InfiniteList,
  SimpleList,
  ReferenceField,
  TextField,
  Create,
  Edit,
  TextInput,
  DateTimeInput,
  ReferenceInput,
  NumberInput,
  SimpleForm,
  useGetIdentity,
  TopToolbar,
  PrevNextButtons,
  ListButton,
  AutocompleteInput,
  useRecordContext,
  required,
  SelectInput,
} from "react-admin";

import utils from "../../utils";
import { Receipt, Paid } from "@mui/icons-material";

const MovimientosList = (props) => {
  return (
    <InfiniteList
      exporter={false}
      {...props}
      sort={{ field: "fechaMovimiento", order: "DESC" }}
    >
      <SimpleList
        leftIcon={(record) =>
          record.tipo > 2 ? (
            <Receipt sx={{ color: utils.ragPalette.red }} />
          ) : (
            <Paid sx={{ color: utils.ragPalette.green }} />
          )
        }
        primaryText={(record) =>
          `${utils.uFormat(
            record.fechaMovimiento
          )} $${record.importe.toLocaleString()} `
        }
        secondaryText={
          <>
            <TextField
              source="id"
              sx={{
                "&::before": { content: '"#"' },
              }}
            />
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
            <TextField source="descripcion" sx={{ marginLeft: "4px" }} />
          </>
        }
        linkType={(record) => (record.canEdit ? "edit" : "show")}
      />
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
const TipoMovimientoOptionRenderer = () => {
  const record = useRecordContext();
  return (
    <div style={{ display: "flex" }}>
      {record.tipo === "ingreso" ? (
        <Paid sx={{ color: utils.ragPalette.green }} />
      ) : (
        <Receipt sx={{ color: utils.ragPalette.red }} />
      )}
      <TextField source="nombre" />
    </div>
  );
};

const MovimientosCreate = (props) => {
  const { data } = useGetIdentity();
  const optionText = <TipoMovimientoOptionRenderer />;

  return (
    <Create
      {...props}
      redirect={"list"}
      actions={
        <TopToolbar title="Movimientos">
          <ListButton />
        </TopToolbar>
      }
    >
      <SimpleForm>
        <DateTimeInput
          source="fechaMovimiento"
          defaultValue={new Date()}
          validate={required()}
        />
        <ReferenceInput source="tipo" reference="tiposMovimiento">
          <SelectInput
            label="Tipo"
            optionText={optionText}
            validate={required()}
          />
        </ReferenceInput>
        <NumberInput source="importe" validate={required()} />
        <TextInput source="descripcion" multiline />
        <ReferenceInput source="id_huesped" reference="huespedes">
          <AutocompleteInput
            filterToQuery={filterToQuery}
            optionText={(huesped) =>
              `#${huesped.id} ${huesped.nombre},${huesped.apellido}`
            }
          />
        </ReferenceInput>
        <TextInput source="user" defaultValue={data?.fullName} disabled />
      </SimpleForm>
    </Create>
  );
};

const MovimientosEdit = (props) => {
  const tiposMovimientoOptionText = <TipoMovimientoOptionRenderer />;

  return (
    <Edit
      {...props}
      actions={
        <TopToolbar>
          <PrevNextButtons />
          <ListButton />
        </TopToolbar>
      }
    >
      <SimpleForm>
        <NumberInput source="id" disabled />
        <DateTimeInput source="fechaMovimiento" validate={required()} />
        <NumberInput source="importe" validate={required()} />
        <ReferenceInput source="tipo" reference="tiposMovimiento">
          <SelectInput
            optionText={tiposMovimientoOptionText}
            validate={required()}
          />
        </ReferenceInput>
        <TextInput source="descripcion" multiline />
        <ReferenceInput source="id_huesped" reference="huespedes">
          <AutocompleteInput
            filterToQuery={filterToQuery}
            optionText={(huesped) =>
              `#${huesped.id} ${huesped.nombre},${huesped.apellido}`
            }
          />
        </ReferenceInput>
        <TextInput source="user" disabled />
      </SimpleForm>
    </Edit>
  );
};
export default {
  list: MovimientosList,
  create: MovimientosCreate,
  edit: MovimientosEdit,
};
