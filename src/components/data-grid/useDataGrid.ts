import { GridCellEditStartParams, GridColDef, GridApiCommon, GridValidRowModel, useGridApiRef } from "@mui/x-data-grid";
import { useState } from "react";
import _ from 'lodash';

export interface UseDataGridParams<IRow> {
  rowSelectionModel: string[],
  onRowSelectionModelChange: (params: any[]) => void,
  rows: GridValidRowModel[],
  columns: GridColDef[],
  changedRowsIds: string[],
  processRowUpdate: (newRow: GridValidRowModel, oldRow: GridValidRowModel) => GridValidRowModel
}

export function useDataGrid<IRow>(rows: GridValidRowModel[], columns: GridColDef[]): UseDataGridParams<IRow> {
  const [rowSelectionModel, setRowSelectionModel] = useState<string[]>([]);
  const onRowSelectionModelChange = (params: any[]) => {
    setRowSelectionModel(params);
  };
  const [changedRowsIds, setChangedRows] = useState<string[]>([]);

  const processRowUpdate = (newRow: GridValidRowModel, oldRow: GridValidRowModel): GridValidRowModel => {
    if (!_.isEqual(newRow, oldRow) && !changedRowsIds.includes(newRow.id)) {
      setChangedRows(prev => [...prev, newRow.id]);
    }

    return newRow;
  }

  return {
    rowSelectionModel,
    onRowSelectionModelChange,
    rows,
    columns,
    processRowUpdate,
    changedRowsIds,
  }
}