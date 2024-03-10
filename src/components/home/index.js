import * as React from "react";
import { InfiniteList, ListContextProvider, SimpleList } from "react-admin";
import { useGetList, useList } from "react-admin";
import { Warning } from "@mui/icons-material";
import utils from "../../utils";

const rowStyle = (record, index) => ({
  "&.MuiListItemText-root": {
    ".MuiListItemIcon-root": {
      verticalAlign: "super",
      minWidth: "32px",
      marginLeft: "6px",
    },
    ".MuiListItemText-root": {
      display: "inline-block",
    },
  },
});

export const Home = (props) => {
  const { data, isLoading } = useGetList("notificaciones");
  const listContext = useList({ data, isLoading });
  return (
    <ListContextProvider value={listContext}>
      <InfiniteList
        resource="notificaciones"
        exporter={false}
        {...props}
        sort={{ field: "id", order: "DESC" }}
      >
        <SimpleList
          leftIcon={(record) => (
            <Warning sx={{ color: utils.ragPalette.red }} />
          )}
          rowSx={rowStyle}
          primaryText={(record) => record.cateogoria }
          secondaryText={(record) => record.titulo}        
          linkType={false}
        />
      </InfiniteList>
    </ListContextProvider>
  );
};
