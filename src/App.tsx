import { ChangeEvent } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { time } from './libraries/time';
import { Row } from './components/Row';
import { Column } from './components/Column';
import { DateTimeValidationError, MobileDatePicker, PickerChangeHandlerContext } from '@mui/x-date-pickers';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';
import { HtmlElement } from './enums/HtmlElement';
import { useStore } from './hooks/useStore';
import { DataRow } from './interfaces/DataRow';

export const App = () => {
   const [
      getBeginOn,
      getBottomGlucoseRange,
      getDataRows,
      getTopGlucoseRange,
      setBeginOn,
      setBottomGlucoseRange,
      setDataRows,
      setStartingGlucose,
      setTopGlucoseRange,
   ] = useStore(state => [
      state.getBeginOn,
      state.getBottomGlucoseRange,
      state.getDataRows,
      state.getTopGlucoseRange,
      state.setBeginOn,
      state.setBottomGlucoseRange,
      state.setDataRows,
      state.setStartingGlucose,
      state.setTopGlucoseRange,
   ])

   const generateDataRow = (lastDateTime: string, lastGlucose: number, trendDirection: number, trendDuration: number, currentDataRows: DataRow[]) => {
      const nextDate = time.adjustMinutes(5, lastDateTime);
      const nextDateTime = nextDate.getTime();
      const currentDateTime = new Date().getTime();
      if (nextDateTime > currentDateTime) {
         setDataRows(currentDataRows);
         return;
      }
      const movement = getGlucoseMovement(0);
      const directionCheck = Math.floor(Math.random() * (4 + trendDuration));
      const nextTrendDuration = directionCheck <= 4 ? trendDuration + 1 : 1;
      const nextTrendDirection = directionCheck <= 4 ? trendDirection : trendDirection * -1;
      const nextGlucose = lastGlucose + (movement * nextTrendDirection);
      const nextDataRows = [...currentDataRows];
      nextDataRows.push({
         dateTime: time.getIsoDateTimeString(nextDate),
         glucose: nextGlucose,
      })
      generateDataRow(time.getIsoDateTimeString(nextDate), nextGlucose, nextTrendDirection, nextTrendDuration, nextDataRows);
   }

   const getGlucoseMovement = (carryover: number): number => {
      const movement = Math.floor(Math.random() * 6);
      if (movement !== 6)
         return movement + carryover;
      return getGlucoseMovement(movement + carryover);
   }

   const getDataTableRows = () => {
      return getDataRows().map(dataRow => {
         const { dateTime, glucose } = dataRow;
         return (
            <TableRow key={`dataRow-${dateTime}`}>
               <TableCell
                  size={'small'}
                  sx={{
                     paddingBottom: '2px',
                     paddingTop: '2px',
                  }}
               >
                  {dateTime}
               </TableCell>
               <TableCell
                  size={'small'}
                  sx={{
                     paddingBottom: '2px',
                     paddingTop: '2px',
                  }}
               >
                  {glucose}
               </TableCell>
            </TableRow>
         )
      })
   }

   const updateBeginOn = (value: Dayjs | null, _context: PickerChangeHandlerContext<DateTimeValidationError>) => {
      setBeginOn(value);
      if (value) {
         setDataRows([]);
         const startingGlucose = Math.ceil((getBottomGlucoseRange() + getTopGlucoseRange()) / 2);
         setStartingGlucose(startingGlucose);
         generateDataRow(value.toISOString(), startingGlucose, 1, 1,[]);
      }
   }

   const updateBottomGlucoseRange = (event: ChangeEvent<HTMLInputElement>) => {
      const bottomGlucoseRange = Number(event.target.value);
      setBottomGlucoseRange(bottomGlucoseRange);
   }

   const updateTopGlucoseRange = (event: ChangeEvent<HTMLInputElement>) => {
      const topGlucoseRange = Number(event.target.value);
      setTopGlucoseRange(topGlucoseRange);
   }

   return <>
      <Row sx={{ paddingLeft: 2, paddingTop: 2 }}>
         <Column xs={6}>
            <TextField
               label={'Bottom of Glucose Range'}
               onChange={updateBottomGlucoseRange}
               required={true}
               size={'small'}
               sx={{ width: 300 }}
               type={'number'}
               value={getBottomGlucoseRange()}
            />
         </Column>
         <Column xs={6}>
            <TextField
               label={'Top of Glucose Range'}
               onChange={updateTopGlucoseRange}
               required={true}
               size={'small'}
               sx={{ width: 300 }}
               type={'number'}
               value={getTopGlucoseRange()}
            />
         </Column>
      </Row>
      <Row sx={{ paddingLeft: 2, paddingTop: 2 }}>
         <Column xs={12} sm={12} md={12} lg={10} xl={8}>
            <MobileDatePicker
               aria-label={'Begin On'}
               label={'Begin On'}
               maxDate={dayjs(time.getIsoDateString())}
               minDate={dayjs(time.getIsoDateString(time.adjustDays(-10, time.getDateObject())))}
               onChange={updateBeginOn}
               value={getBeginOn()}
            />
         </Column>
      </Row>
      <Row sx={{ paddingLeft: 2, paddingTop: 2 }}>
         <Column xs={12}>
            <Typography
               sx={{ marginBottom: 2 }}
               variant={HtmlElement.h5}
            >
               Generated Data
            </Typography>
         </Column>
      </Row>
      <Row sx={{ paddingLeft: 2, paddingRight: 2, paddingTop: 2 }}>
         <Column xs={12} sm={12} md={12} lg={10} xl={8}>
            <Paper sx={{
               overflow: 'hidden',
               width: '100%',
            }}>
               <TableContainer sx={{ maxHeight: '50vh' }}>
                  <Table stickyHeader={true}>
                     <TableHead>
                        <TableRow>
                           <TableCell sx={{
                              paddingBottom: 0.5,
                              paddingTop: 0.5,
                           }}>
                              Date/Time
                           </TableCell>
                           <TableCell sx={{
                              paddingBottom: 0.5,
                              paddingTop: 0.5,
                           }}>
                              Glucose
                           </TableCell>
                        </TableRow>
                     </TableHead>
                     <TableBody>
                        {getDataTableRows()}
                     </TableBody>
                  </Table>
               </TableContainer>
            </Paper>
         </Column>
      </Row>
   </>
}