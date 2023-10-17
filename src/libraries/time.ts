import { Milliseconds } from '../enums/Milliseconds';

export const time = (() => {
   const addOffset = (date?: Date | string) => {
      const offset = new Date().getTimezoneOffset();
      const dateObject = getDateObject(date);
      return adjustMinutes(offset, dateObject);
   }

   const adjustDays = (days: number, date?: Date | string) => {
      const dateObject = getDateObject(date);
      return new Date(dateObject.getTime() + (Milliseconds.day * days));
   }

   const adjustHours = (hours: number, date?: Date | string) => {
      const dateObject = getDateObject(date);
      return new Date(dateObject.getTime() + (Milliseconds.hour * hours));
   }

   const adjustMinutes = (minutes: number, date?: Date | string) => {
      const dateObject = getDateObject(date);
      return new Date(dateObject.getTime() + (Milliseconds.minute * minutes));
   }

   const adjustYears = (years: number, date?: Date | string) => {
      const dateObject = getDateObject(date);
      return new Date(dateObject.getTime() + (Milliseconds.year * years));
   }

   const getDateObject = (date?: Date | string) => {
      if (typeof date === 'undefined' || date === '')
         return new Date();
      if (typeof date === 'string')
         return new Date(date);
      return date;
   }

   const getIsoDateString = (date?: Date | string) => {
      const dateObject = getDateObject(date);
      return dateObject.toISOString().split('T')[0];
   }

   const removeOffset = (date?: Date | string) => {
      const offset = (new Date().getTimezoneOffset()) * -1;
      const dateObject = getDateObject(date);
      return adjustMinutes(offset, dateObject);
   }

   return {
      addOffset,
      adjustDays,
      adjustHours,
      adjustMinutes,
      adjustYears,
      getDateObject,
      getIsoDateString,
      removeOffset,
   }
})()