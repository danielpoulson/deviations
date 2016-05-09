import moment from 'moment';

export function calculateDay (date, closed) {
  if (date) {
     if(closed === 0){
         var currentTime = new Date().getTime();
         var logTime = new Date(date).getTime();
         var timeDiff = Math.abs(currentTime - logTime);
         var dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

         return dayDiff;
     } else {
         return "-";
     }
 }
}
