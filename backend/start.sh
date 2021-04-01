NOW=`date '+%F_%H:%M:%S'` && node index.js 2>&1 | tee $NOW.backend.log

