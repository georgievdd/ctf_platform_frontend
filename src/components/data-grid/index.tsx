import React, { MutableRefObject, useEffect, useRef, useState } from 'react';
import {
  GridRowHeightReturnValue,
  DataGrid as MuiDataGrid,
  gridPageCountSelector,
  gridPageSelector,
  useGridApiContext,
  useGridApiRef,
  useGridSelector,
} from '@mui/x-data-grid';
import { GridApi } from '@mui/x-data-grid';
import { Theme, styled } from '@mui/material/styles';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import { useTheme } from '../../theme';
import { THEME } from '../../consts';
import { Box, Button, Grid, IconButton, SvgIconTypeMap, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import { UseDataGridParams } from './useDataGrid';
import { makeStyles } from '@mui/styles';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import AddModal from './addModal';
import { IUseObject } from './useAddData';

const PAGE_SIZE = 15;
export default function DataGrid<IRow>({
  state,
  AddIcon,
  addObject,
  addOnclick,
  onDelete,
  saveChanges,
  cellList
} : {
  state: UseDataGridParams<IRow>,
  AddIcon: OverridableComponent<SvgIconTypeMap<{}, "svg">>,
  addObject: IUseObject,
  addOnclick: () => void,
  onDelete: (ids: string[]) => void,
  saveChanges: () => void,
  cellList?: boolean,
}) {
  const [showAdd, setShowAdd] = useState(false);
  const { rows, rowSelectionModel } = state.dataGrid;
  const [paginationModel, setPaginationModel] = React.useState({
    pageSize: PAGE_SIZE,
    page: 0,
  });
  const { theme } = useTheme();
  const containerStyle: React.CSSProperties = { 
    width: 'auto', 
    border: `2px solid ${theme.palette.mode === 'light' ? '#d9d9d9' : 'rgb(67, 67, 67)'}`,
    borderRadius: '10px',
  };
  const classes = useStyle();

  return (
    <>
      <Box>
        <Grid mb={1} container gap={2}>
          <Button variant='contained' color='secondary' onClick={() => setShowAdd(true)}>
            <AddIcon sx={{marginRight: '5px'}}/>
            Добавить
          </Button>
          <Button sx={{width: '150px'}} variant='contained' color='error' disabled={rowSelectionModel.length === 0} onClick={() => onDelete(rowSelectionModel)}>
            <DeleteIcon/>
            Удалить {rowSelectionModel.length === 0 ? '' : `(${rowSelectionModel.length})`}
          </Button>
          <Button variant='contained' color='success' disabled={state.changedRowsIds.length === 0} onClick={saveChanges}>
            <SaveAsIcon/>
            Сохранить изменения
          </Button>
        </Grid>
        <Box sx={containerStyle}>
          <StyledDataGrid
            checkboxSelection
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
            pageSizeOptions={[PAGE_SIZE]}
            slots={{
              pagination: CustomPagination,
              noRowsOverlay: CustomNoRowsOverlay
            }}
            autoHeight
            rowHeight={rows.length ? 50 : 230}
            getRowHeight={params => (
              cellList ? 150 : undefined
            )}
            getRowClassName={params => rowSelectionModel.includes(params.id as string) ? classes.selectedRow : ''}
            rows={state.dataGrid.rows}
            columns={state.dataGrid.columns}
            onRowSelectionModelChange={state.dataGrid.onRowSelectionModelChange}
            rowSelectionModel={state.dataGrid.rowSelectionModel}
            processRowUpdate={state.dataGrid.processRowUpdate}
          />
        </Box>
      </Box>
      <AddModal open={showAdd} setOpen={setShowAdd} addObject={addObject} onSubmit={addOnclick}/>
    </>
  );
}

const useStyle = makeStyles((theme: Theme) => ({
  selectedRow: {
    backgroundColor: `${theme.palette.mode === 'light' ? '#E0E0E0' : '#2F2F2F'} !important`
  }
}));

function customCheckbox(theme: Theme) {
  return {
    '& .MuiCheckbox-root svg': {
      width: 16,
      height: 16,
      backgroundColor: 'transparent',
      border: `1px solid ${
        theme.palette.mode === 'light' ? '#d9d9d9' : 'rgb(67, 67, 67)'
      }`,
      borderRadius: 2,
    },
    '& .MuiCheckbox-root svg path': {
      display: 'none',
    },
    '& .MuiCheckbox-root.Mui-checked:not(.MuiCheckbox-indeterminate) svg': {
      backgroundColor: theme.palette.mode === THEME.DARK ? 'white' : 'rgb(67, 67, 67)',
      borderColor: theme.palette.mode === THEME.DARK ? 'white' : 'rgb(67, 67, 67)',
    },
    '& .MuiCheckbox-root.Mui-checked .MuiIconButton-label:after': {
      position: 'absolute',
      display: 'table',
      border: '2px solid #fff',
      borderTop: 0,
      borderLeft: 0,
      transform: 'rotate(45deg) translate(-50%,-50%)',
      opacity: 1,
      transition: 'all .2s cubic-bezier(.12,.4,.29,1.46) .1s',
      content: '""',
      top: '50%',
      left: '39%',
      width: 5.71428571,
      height: 9.14285714,
    },
    '& .MuiCheckbox-root.MuiCheckbox-indeterminate .MuiIconButton-label:after': {
      width: 8,
      height: 8,
      backgroundColor: '#1890ff',
      transform: 'none',
      top: '39%',
      border: 0,
    },
  };
}
const StyledDataGrid = styled(MuiDataGrid)(({ theme }) => ({
  border: 0,
  color:
    theme.palette.mode === 'light' ? 'rgba(0,0,0,.85)' : 'rgba(255,255,255,0.85)',
  fontFamily: [
    '-apple-system',
    'BlinkMacSystemFont',
    '"Segoe UI"',
    'Roboto',
    '"Helvetica Neue"',
    'Arial',
    'sans-serif',
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(','),
  WebkitFontSmoothing: 'auto',
  letterSpacing: 'normal',
  '& .MuiDataGrid-columnsContainer': {
    backgroundColor: theme.palette.mode === 'light' ? '#fafafa' : '#1d1d1d',
  },
  '& .MuiDataGrid-iconSeparator': {
    display: 'block',
  },
  '& .MuiDataGrid-columnHeader, .MuiDataGrid-cell': {
    borderRight: `1px solid ${
      theme.palette.mode === 'light' ? '#f0f0f0' : '#303030'
    }`,
  },
  '& .MuiDataGrid-columnsContainer, .MuiDataGrid-cell': {
    borderBottom: `1px solid ${
      theme.palette.mode === 'light' ? '#f0f0f0' : '#303030'
    }`,
  },
  '& .MuiDataGrid-cell': {
    // border: '1px solid #D9D9D9',
    color:
      theme.palette.mode === 'light' ? 'rgba(0,0,0,.85)' : 'rgba(255,255,255,0.65)',
  },
  '& .MuiPaginationItem-root': {
    borderRadius: 0,
  },
  ...customCheckbox(theme),
}));

function CustomPagination() {
  const apiRef = useGridApiContext();
  const page = useGridSelector(apiRef, gridPageSelector);
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);

  return (
    <Pagination
      color="primary"
      variant="outlined"
      shape="rounded"
      page={page + 1}
      count={pageCount}
      // @ts-expect-error
      renderItem={(props2) => <PaginationItem {...props2} disableRipple />}
      onChange={(event: React.ChangeEvent<unknown>, value: number) =>
        apiRef.current.setPage(value - 1)
      }
    />
  );
}
const StyledGridOverlay = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
  '& .ant-empty-img-1': {
    fill: theme.palette.mode === 'light' ? '#aeb8c2' : '#262626',
  },
  '& .ant-empty-img-2': {
    fill: theme.palette.mode === 'light' ? '#f5f5f7' : '#595959',
  },
  '& .ant-empty-img-3': {
    fill: theme.palette.mode === 'light' ? '#dce0e6' : '#434343',
  },
  '& .ant-empty-img-4': {
    fill: theme.palette.mode === 'light' ? '#fff' : '#1c1c1c',
  },
  '& .ant-empty-img-5': {
    fillOpacity: theme.palette.mode === 'light' ? '0.8' : '0.08',
    fill: theme.palette.mode === 'light' ? '#f5f5f5' : '#fff',
  },
}));
function CustomNoRowsOverlay() {
  return (
    <StyledGridOverlay>
      <svg
        style={{ flexShrink: 0 }}
        width="240"
        height="200"
        viewBox="0 0 184 152"
        aria-hidden
        focusable="false"
      >
        <g fill="none" fillRule="evenodd">
          <g transform="translate(24 31.67)">
            <ellipse
              className="ant-empty-img-5"
              cx="67.797"
              cy="106.89"
              rx="67.797"
              ry="12.668"
            />
            <path
              className="ant-empty-img-1"
              d="M122.034 69.674L98.109 40.229c-1.148-1.386-2.826-2.225-4.593-2.225h-51.44c-1.766 0-3.444.839-4.592 2.225L13.56 69.674v15.383h108.475V69.674z"
            />
            <path
              className="ant-empty-img-2"
              d="M33.83 0h67.933a4 4 0 0 1 4 4v93.344a4 4 0 0 1-4 4H33.83a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4z"
            />
            <path
              className="ant-empty-img-3"
              d="M42.678 9.953h50.237a2 2 0 0 1 2 2V36.91a2 2 0 0 1-2 2H42.678a2 2 0 0 1-2-2V11.953a2 2 0 0 1 2-2zM42.94 49.767h49.713a2.262 2.262 0 1 1 0 4.524H42.94a2.262 2.262 0 0 1 0-4.524zM42.94 61.53h49.713a2.262 2.262 0 1 1 0 4.525H42.94a2.262 2.262 0 0 1 0-4.525zM121.813 105.032c-.775 3.071-3.497 5.36-6.735 5.36H20.515c-3.238 0-5.96-2.29-6.734-5.36a7.309 7.309 0 0 1-.222-1.79V69.675h26.318c2.907 0 5.25 2.448 5.25 5.42v.04c0 2.971 2.37 5.37 5.277 5.37h34.785c2.907 0 5.277-2.421 5.277-5.393V75.1c0-2.972 2.343-5.426 5.25-5.426h26.318v33.569c0 .617-.077 1.216-.221 1.789z"
            />
          </g>
          <path
            className="ant-empty-img-3"
            d="M149.121 33.292l-6.83 2.65a1 1 0 0 1-1.317-1.23l1.937-6.207c-2.589-2.944-4.109-6.534-4.109-10.408C138.802 8.102 148.92 0 161.402 0 173.881 0 184 8.102 184 18.097c0 9.995-10.118 18.097-22.599 18.097-4.528 0-8.744-1.066-12.28-2.902z"
          />
          <g className="ant-empty-img-4" transform="translate(149.65 15.383)">
            <ellipse cx="20.654" cy="3.167" rx="2.849" ry="2.815" />
            <path d="M5.698 5.63H0L2.898.704zM9.259.704h4.985V5.63H9.259z" />
          </g>
        </g>
      </svg>
      <Typography variant='h4'>Пусто</Typography>
    </StyledGridOverlay>
  );
}