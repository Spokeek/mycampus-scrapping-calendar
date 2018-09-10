# mycampus-scrapping-calendar
A node script to scrap the calendar from my school web page

[Warning]
This project is only intended to people at my school. If you are not from, you will mostly see this as useless as it is.
[/Warning]

This script uses NodeJS (developped from version 10) and is intended to be installed on a linux environement.

you will need to define some environement variables to make it work properly.

PAGE_URL: the http url used to scrap containing a "[date]" used as a parameter with US format

COOKIE_ZOPEID: ZOPEID cookie value when using the website in a classic way.
COOKIE_AC: AC cookie value when using the website in a classic way.
DURATION_TO_GET_IN_DAYS: the number of days to scrap on the calendar.
[HTTP_RETRY_COUNT]: optional variable used to define the number of retries to get the page from the website

If all of this is done, the script will create a file named events.ics in the same folder.
You can then put it where you want.
The is allready the run.sh that i use personally to move it to a nginx folder. you can change it as you want.

Feel free to comment if you need to.
