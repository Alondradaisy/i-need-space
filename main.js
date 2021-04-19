const search = document.getElementById('search');
search.addEventListener('click', function() {
    const mapbox = document.getElementById('api-key').value;
    const address = document.getElementById('address').value;
    const norad = document.getElementById('norad').value;
    const addressInput = encodeURI(address); // encodes the address by user
    const displayResults = document.querySelector('.displayResults');
    
    const mapboxURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${addressInput}.json?access_token=${mapbox}`
    fetch(mapboxURL)
    .then(rawResponse => rawResponse.json())
    .then(data => {
        console.log(data)
        const latitude = data.features[0].center[1]
        const longitude = data.features[0].center[0]
        console.log(latitude, longitude)
        const noradURL = `https://satellites.fly.dev/passes/${norad}?lat=${latitude}&lon=${longitude}&limit=1&days=15&visible_only=true`
        
        fetch(noradURL)  
        .then(rawResponse => rawResponse.json())
        .then(data => {
            //console.log(rawResponse);
            const rise = data[0].rise.utc_datetime
            const culmination = data[0].culmination.utc_datetime
            const set = data[0].set.utc_datetime
            const convert = date => {
                let visibilityDate = new Date(date); //date that it will be visible
                return visibilityDate;
            }
            const display = document.createElement('h3')
            display.className = displayResults

            const riseFirst = document.createElement('div')
            riseFirst.className = displayResults
            riseFirst.innerHTML = `<p>Display Rise Date&Time</p>${convert(rise)}`
            displayResults.append(riseFirst)

            const culminationSecond = document.createElement('div')
            culminationSecond.className = displayResults
            culminationSecond.innerHTML = `<p>Display Rise Date&Time</p>${convert(culmination)}`
            displayResults.append(culminationSecond)

            const setThird = document.createElement('div')
            setThird.className = displayResults
            setThird.innerHTML = `<p>Display Rise Date&Time</p>${convert(set)}`
            displayResults.append(setThird)

        })
        
        
    })
})
