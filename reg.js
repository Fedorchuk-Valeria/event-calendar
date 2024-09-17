document.getElementById("reg").addEventListener('click', e => {
    const br = document.getElementById("brunchs");
    console.log(br.value)
    const input = document.getElementById("phone");
    input.placeholder = br.value
})