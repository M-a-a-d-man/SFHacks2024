
/**
 * @return javascript object.
 */
export async function fetchData(){
    fetch('/api/data')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
  })
  .catch(error => {
    console.error('There was a problem with your fetch operation:', error);
    return null;
  });
}

interface DataType{
    report_time: Date,
    last_report_user: string,
    coordinates: {
        lat:number,
        lng:number,
    },
    timezone:string,
}

/**
 * 
 * @param data jsObject data to be sent to the server, 
 */
export async function postData(data:DataType){
  // Options for the fetch() function
    const requestOptions = {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json' // Specify content type as JSON
        },
        body: JSON.stringify(postData) // Convert data to JSON format
    };
  
    // Send POST request
    fetch('/api/mongo', requestOptions)
    .then(response => {
        if (!response.ok) {
        throw new Error('Network response was not ok');
        }
        console.log('POST request successful:', data);
        return response.json();
    })
    .catch(error => {
        console.error('There was a problem with the post operation:', error);
    });
}


