const colorPickerBtn = document.getElementById('color-picker')
const colorList = document.querySelector('.all-colors')
let pickedColors = JSON.parse(localStorage.getItem('colors') || "[]")
const shwoColors = ()=>{
    colorList.innerHTML= ""
    colorList.innerHTML = pickedColors.map(color =>`
    <li class="color">
        <span class="rect"  style="background:${color}; border:2px solid black;"></span>
        <span class="value" style:"margin-right:13px;">${color}</span>
    </li>
    `).join("");
}

const activateEyeDroper = async ()=>{
    try{
        const eyeDrop = new EyeDropper();
        const {sRGBHex} = await eyeDrop.open()
        navigator.clipboard.writeText(sRGBHex)
        pickedColors.push(sRGBHex)
        localStorage.setItem("colors",JSON.stringify(pickedColors))
        shwoColors()
        // console.log(sRGBHex)
    }
    catch(error){
        console.error("The Error: ",error)
    }
}
colorPickerBtn.addEventListener('click',activateEyeDroper);
shwoColors()

document.getElementById('clear-all').addEventListener("click",()=>{
    localStorage.clear()
    shwoColors()
})