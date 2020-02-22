(function(ext) {
    // Cleanup function when the extension is unloaded
    ext._shutdown = function() {};

    // Status reporting code
    // Use this to report missing hardware, plugin or unsupported browser
    ext._getStatus = function() {
        return {status: 2, msg: 'Ready'};
    };

    ext.check_sensors = function(callback) {
        // Make an AJAX call to check the sensors
        $.ajax({
              url: 'http://192.168.1.67:2010/api/v1.0/sensorControl/getAvailableSensorsToStream',
              success: function( sensorData ) {
                  callback(sensorData[0]);
              },
	          error: function(xhr, status, err) {
		        callback(status)
              }
        });
    };

    // Block and block menu descriptions
    var descriptor = {
        blocks: [
            ['R', 'check sensors api from local node server', 'check_sensors'],
        ]
    };

    // Register the extension
    ScratchExtensions.register('Weather extension', descriptor, ext);
})({});
