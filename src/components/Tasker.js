import React, { useEffect, useState, useRef } from 'react'

const Tasker = () => {
  
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

  //https://stackoverflow.com/questions/53024496/state-not-updating-when-using-react-state-hook-within-setinterval
  //https://overreacted.io/making-setinterval-declarative-with-react-hooks/
  const useInterval = (callback, delay) => {
    const savedCallback = useRef()
  
    // Remember the latest callback.
    useEffect(() => {
      savedCallback.current = callback
    }, [callback])
  
    // Set up the interval.
    useEffect(() => {
      function tick() {
        savedCallback.current()
      }
      if (delay !== null) {
        let id = setInterval(tick, delay)
        return () => clearInterval(id)
      }
    }, [delay])
  }

  const [delay, setDelay] = useState(500)
  const [isRunning, setIsRunning] = useState(true)

  const [count, setCount] = useState(0)
  const [maxCount, setMaxCount] = useState(100)
  const [devices, setDevices] = useState([])
  
  const incoporateNewData = (newData) => {
    setDevices((prevDevices) => {
      if(newData.length > 0) {

        newData.forEach((newDevice) => {
          let deviceFound = false

          prevDevices.forEach((prevDevice, i) => {
            if(prevDevice.device === newDevice.device) {
              deviceFound = true
              prevDevice.tasks = [...new Set([...prevDevice.tasks, ...newDevice.tasks])]
            }
          })

          if(!deviceFound) {
            prevDevices.push(newDevice)
          }
        })
      }
      return prevDevices
    })
  }

  useInterval(() => {

    if(count < maxCount) {
      setCount(count + 1)
      incoporateNewData(getResponse())
    }
    else {
      setIsRunning(false)
    }
    
  }, isRunning ? delay : null)

  useEffect(() => {
    setDevices(getResponse())
  },[])

  const markComplete = (device, task) => {

    setDevices((prevDevices) => {

      //find the device where the task is complete
      //then filter the completed task from it
      let updatedTasks = prevDevices.reduce((acc, prevDevice) => {
        if(prevDevice.device === device) {
          acc = prevDevice.tasks.filter(existingTask => existingTask != task) 
        }
        return acc
      },[])

      //return prevDevices back, but use updated tasks for the device just updated
      return prevDevices.map((prevDevice) => {
        if(prevDevice.device === device) {
          prevDevice.tasks = updatedTasks
        }
        return prevDevice
      })

    })
  }

  return (
    <>
      <div>Mock api call count: {count}</div>
      <div>Tries left: {maxCount - count}</div>
      <table border='1'>
        <thead>
        <tr>
          <th>Device</th>
          <th>Tasks</th>
        </tr>
        </thead>
        <tbody>
        {
          devices.sort((a,b) => (a.device > b.device) ? 1 : ((b.device > a.device) ? -1 : 0)).map((device, i) => {
            return (
              <tr key={i}>
                <td>{ device.device }</td>
                <td>{ device.tasks.sort().map((task, i) => {
                  return <button key={i} onClick={() => markComplete(device.device, task)}>{task}</button>
                })}</td>
              </tr>
            )
          })
        }
       </tbody>
      </table>
    </>
  )
}

export default Tasker