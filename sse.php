<?php

date_default_timezone_set('America/Vancouver');
// tell the browser this is an event stream
header('Content-Type: text/event-stream');
// disable caching
header('Cache-Control: no-cache');
// allows the sender to hint about how the connection may be used to set a timeout and a maximum amount of requests
header('Connection: keep-alive');
// setting this to “no” will allow unbuffered responses suitable for Comet and HTTP streaming applications
header('X-Accel-Buffering: no');

// just a general counter for our message IDs
$counter = 1;

// we need a loop to handle our events
// this loop will echo out strings that obey the event-stream protocol
while (1) {
    // send out the ID
    echo 'id: ' . $counter . PHP_EOL;

    $curDate = date(DATE_ISO8601);
    $json = json_encode(['time' => $curDate]);
    echo 'data: ' . $json . PHP_EOL . PHP_EOL;

    $counter++;

    ob_end_flush();
    flush();

    sleep(2);
}
