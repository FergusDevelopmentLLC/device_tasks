var getResponse = function(){
  var tasks = ["task1", "task2", "task3","task4","task5" ];
  var devices = ["device1", "device2", "device3","device4","device5", "device6", "device7"];
  var response = [];
  devices.forEach(function(device){
      if (Math.random() >= 0.7){
          var task_names = [];
          tasks.forEach(function(task){
              if (Math.random() >= 0.7){
                  task_names.push(task);
              }
          });
          if(task_names.length > 0){
              response.push({"device":device, "tasks":task_names})
          }
      }
  });
  return response;
};

/*
Use the above getResponse function to simulate a response from a periodically recurring HTTP request. Use the response information to create a UI with a column/row structure of the following format"

+------------+------------------+
| Device     | Tasks            |
+------------+------------------+
| device1    | task3, task4,    |
|            | task3            |
+------------+------------------+
| device2    |                  |
+------------+------------------+
| device3    |                  |
+------------+------------------+

Cause your dynamic UI to (a) add rows for new devices referenced by any response, and (b) add new tasks that come in each response to the list of tasks for the associated device. For example, a response of...

[{"device":"device1","tasks":["task2"]}, {"device":"device2","tasks":["task5", "task4"]}]

...with a starting state matching the above table will result in a new table as follows:
+------------+------------------+
| Device     | Tasks            |
+------------+------------------+
| device1    | task3, task4,    |
|            | task3, task2     |
+------------+------------------+
| device2    | task5, task4     |
+------------+------------------+
| device3    |                  |
+------------+------------------+

Also, create a method in the UI of "completing" tasks and making them disappear to make room for new tasks. In the sample solution video, tasks are completed by clicking them.

If you are finished with extra time, please spend your remaining time making a more user-friendly and professional-looking UI.  If possible, we would like to get an idea of your flair for design!

*/

// YOUR SOLUTION JAVASCRIPT CODE HERE