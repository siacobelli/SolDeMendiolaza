import React, { Component } from "react";
import { InfiniteList, SimpleList } from "react-admin";

const RAGPALETTE_RED = "#E16A69";
const RAGPALETTE_AMBER = "#FFE06A";
const RAGPALETTE_GREEN = "#B5D568";

const TiposMovimientoList = (props) => {
  return (
    <InfiniteList {...props} sort={{ field: "id", order: "DESC" }}>
      <SimpleList
        primaryText={(record) => record.nombre}
        secondaryText={(record) => `${record.tipo}`}
        linkType={(record) => (record.canEdit ? "edit" : "show")}
        rowSx={(record) => ({
          fontSize: "18px",
          backgroundColor:
            record.tipo === "egreso" ? RAGPALETTE_RED : RAGPALETTE_GREEN,
        })}
      />
    </InfiniteList>
  );
};

export default {
  list: TiposMovimientoList,
  simpleList: TiposMovimientoList,
};
