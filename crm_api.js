async function crm_auth(){
    const url = "https://kiberoneminsk.s20.online/v2api/auth/login";

    const data = {
        "email": "lera71642@gmail.com",
        "api_key": "3447236a-89ff-11ee-bc12-3cecefbdd1ae"
    }

    var token = ""
    return await fetch(url, {
        method: "POST",
        headers: {},
        body: JSON.stringify(data),
      }).then(
            (response) => {return response.json()});
}


async function find_teacher(number, br){
    return crm_auth().then(async (token_obj) => {
        const head = {
            "X-ALFACRM-TOKEN": token_obj.token
        };

        console.log(head)
        
        const url = "https://kiberoneminsk.s20.online/v2api/"+ br + "/teacher/index"
        
        const data = {
            "phone": number
        }

        console.log(data)

        return await fetch(url, {
            method: "POST",
            headers: head,
            body: JSON.stringify(data),
          }).then(
                (response) => {return response.json()});

    }
    )
}

export { crm_auth, find_teacher }