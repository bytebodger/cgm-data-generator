import { create } from 'zustand';
import dayjs, { Dayjs } from 'dayjs';
import { time } from '../libraries/time';
import { DataRow } from '../interfaces/DataRow';

interface State {
   // values
   beginOn: Dayjs | null,
   bottomGlucoseRange: number,
   dataRows: DataRow[],
   startingGlucose: number,
   topGlucoseRange: number,
   // getters
   getBeginOn: () => Dayjs | null,
   getBottomGlucoseRange: () => number,
   getDataRows: () => DataRow[],
   getStartingGlucose: () => number,
   getTopGlucoseRange: () => number,
   // setters
   setBeginOn: (beginOn: Dayjs | null) => void,
   setBottomGlucoseRange: (bottomGlucoseRange: number) => void,
   setDataRows: (dataRows: DataRow[]) => void,
   setStartingGlucose: (startingGlucose: number) => void,
   setTopGlucoseRange: (topGlucoseRange: number) => void,
}

export const useStore = create<State>()((set, get) => ({
   // values
   beginOn: dayjs(time.getIsoDateString(time.adjustDays(-30))),
   bottomGlucoseRange: 70,
   dataRows: [],
   startingGlucose: 0,
   topGlucoseRange: 150,
   // getters
   getBeginOn: () => get().beginOn,
   getBottomGlucoseRange: () => get().bottomGlucoseRange,
   getDataRows: () => get().dataRows,
   getStartingGlucose: () => get().startingGlucose,
   getTopGlucoseRange: () => get().topGlucoseRange,
   // setters
   setBeginOn: beginOn => set(() => ({ beginOn })),
   setBottomGlucoseRange: bottomGlucoseRange => set(() => ({ bottomGlucoseRange })),
   setDataRows: dataRows => set(() => ({ dataRows })),
   setStartingGlucose: startingGlucose => set(() => ({ startingGlucose })),
   setTopGlucoseRange: topGlucoseRange => set(() => ({ topGlucoseRange })),
}))