# mycampus-scrapping-calendar
A node script to scrap the calendar from my school web page


[Warning]
This project is only intended to people at my school. If you are not from, you will mostly see this as useless as it is.
[/Warning]


This script uses NodeJS (developped from version 10) and is intended to be installed on a linux environement.


you will need to define some environement variables to make it work properly.


URL_PATTERN: the http url pattern used to scrap containing the $USERNAME parameter and the $DATE parameter.

USERNAME_TO_SCRAP: The username to scrap on the website (use the official format used in the url).

DURATION_TO_GET_IN_WEEKS: the number of weeks to scrap on the calendar.

CURRENT_DATE: Parameter used to defined the current day when the script is run, as it will begin to work on the current week, you can move this week with this value.

EXPORT_PATH: Path where the script file will be created (./)

EXPORT_VALUE: Name of the ics file (events.ics)


Feel free to comment if you need to.