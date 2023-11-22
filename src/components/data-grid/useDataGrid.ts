import { GridCellEditStartParams, GridColDef, GridApiCommon, GridValidRowModel, useGridApiRef } from "@mui/x-data-grid";
import { useState } from "react";
import _ from 'lodash';

export interface UseDataGridParams<IRow> {
  dataGrid: {
    rowSelectionModel: string[],
    onRowSelectionModelChange: (params: any[]) => void,
    rows: GridValidRowModel[],
    columns: GridColDef[],
    processRowUpdate: (newRow: GridValidRowModel, oldRow: GridValidRowModel) => GridValidRowModel,
  },
  changedRowsIds: string[],
  changedRows: GridValidRowModel[],
  setChangedRowsId: (d: string[]) => void,
  setChangedRows: (d: GridValidRowModel[]) => void,
}

export function useDataGrid<IRow>(rows: GridValidRowModel[], columns: GridColDef[]): UseDataGridParams<IRow> {
  const [rowSelectionModel, setRowSelectionModel] = useState<string[]>([]);
  const onRowSelectionModelChange = (params: any[]) => {
    setRowSelectionModel(params);
  };
  const [changedRowsIds, setChangedRowsId] = useState<string[]>([])
  const [changedRows, setChangedRows] = useState<GridValidRowModel[]>([])

  const processRowUpdate = (newRow: GridValidRowModel, oldRow: GridValidRowModel): GridValidRowModel => {
    // if (!_.isEqual(newRow, oldRow) && !changedRowsIds.includes(newRow.id)) {
      setChangedRowsId(prev => [...prev, newRow.id])
      setChangedRows(prev => [...prev, newRow])
    // }
    return newRow
  }

  return {
    dataGrid: {
      rowSelectionModel,
      onRowSelectionModelChange,
      rows,
      columns,
      processRowUpdate,
    },
    changedRowsIds,
    changedRows,
    setChangedRowsId,
    setChangedRows,
  }
}