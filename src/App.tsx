import { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { time } from "./libraries/time";

export const App = () => {
   const [beginOn, setBeginOn] = useState<Dayjs | null>(dayjs(time.getIsoDateString(time.adjustDays(-30))));

   return <>

   </>
}