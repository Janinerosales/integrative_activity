const button = document.getElementById('submit');

button.addEventListener("click", () => {
    let name = document.getElementById('name').value;
    let address = document.getElementById('address').value;
    let phone = document.getElementById('phone').value;
    let gender = document.getElementById('gender').value;
    let birthdate = document.getElementById('birthdate').value;

    const data = {
        name: name,
        address: address,
        phone: phone, 
        gender: gender,
        birthdate: birthdate,
    };

    fetch('http://localhost/integrative_activity/activity.php', {
        method: "POST",
        headers: {
            "Content-Type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify(data),
    })
    .then((res) => res.json())
    .then(response => {
        console.log(response);
        fetchAndDisplay();
    });

});

    function fetchAndDisplay() {
        fetch('http://localhost/integrative_activity/ass.php')
        .then(response => response.json())
        .then(data => {
            let tableBody = document.getElementById('tableBody');

            tableBody.innerHTML = '';

            for(let i = 0; i < data.length; i++){
                let tableRow = `<tr>
                              <td>${data[i].id}</td>
                              <td>${data[i].name}</td>
                              <td>${data[i].address}</td>
                              <td>${data[i].phone}</td>
                              <td>${data[i].gender}</td>
                              <td>${data[i].birthdate}</td>
                            </tr>`;
                tableBody.innerHTML += tableRow;
            }
        })
        .catch(error => console.error('error!', error));
    }
    fetchAndDisplay();