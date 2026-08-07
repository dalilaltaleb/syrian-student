

// ===============================
//  الجامعات
// ==============================


const universities = [

{
    name: "جامعة حلب",
    city: "حلب",
    image: "images/ALEPPO.jpg",
    website: "https://www.alepuniv.edu.sy",
    
},

{
    name: "جامعة دمشق",
    city: "دمشق",
    image: "images/Damascus.jpg.jpg",
    website: "https://www.damascusuniversity.edu.sy",
    
},

{
    name: "جامعة تشرين",
    city: "اللاذقية",
    image: "images/tishreen.jpeg",
    website: "https://maps.google.com/?q=جامعة+تشرين",
    
},


{
    name: "جامعة ماري الخاصة",
    city: "ادلب",
    image: "images/mari.webp",
    website: " https://www.mari.edu.sy/",
    
},


{
    name: "جامعة حماة",
    city: "حماة",
    image: "images/hama.jpg",
    website: "https://hama-univ.edu.sy/ ",
    
},


{
    name: "جامعة ايبلا الخاصة",
    city: "ادلب",
    image: "images/ablee.jpg",
    website: "https://www.ebla.edu.sy/home ",
    
},







];

const list = document.getElementById("universities-list");

function showUniversities(data){

    list.innerHTML = "";

    data.forEach(uni=>{

        list.innerHTML += `

        <div class="uni-card">

            <img src="${uni.image}" alt="${uni.name}">

            <div class="uni-content">

                <h3>${uni.name}</h3>

                <p>📍 ${uni.city}</p>

                <div class="uni-links">

                    <a href="${uni.website}" target="_blank">
                    🌐 الموقع
                    </a>

                    
            
    

                </div>

            </div>

        </div>

        `;

    });

}

showUniversities(universities);










function showTable(id, button){

document.getElementById("public").style.display="none";
document.getElementById("private").style.display="none";

document.getElementById(id).style.display="block";

document.querySelectorAll(".tab-btn").forEach(btn=>{
btn.classList.remove("active");
});

button.classList.add("active");

}


const darkBtn = document.getElementById("darkModeToggle");

// إذا كان الوضع الليلي محفوظ
if(localStorage.getItem("theme") === "dark"){
    document.body.classList.add("dark-mode");
    darkBtn.innerHTML = "☀️";
}

darkBtn.addEventListener("click", function(){

    document.body.classList.toggle("dark-mode");

    if(document.body.classList.contains("dark-mode")){
        darkBtn.innerHTML = "☀️";
        localStorage.setItem("theme","dark");
    }else{
        darkBtn.innerHTML = "🌙";
        localStorage.setItem("theme","light");
    }

});




const topBtn = document.getElementById("topBtn");

window.addEventListener("scroll", () => {

    if(window.scrollY > 300){

        topBtn.style.display = "block";

    }else{

        topBtn.style.display = "none";

    }

});

topBtn.addEventListener("click", () => {

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

});


const messages = [

    "🤍 اللهم صلِّ وسلم على نبينا محمد ﷺ",

    "🌱 الصبر مفتاح الفرج.",

    "😊 عد للعشرة... باقي شوي.",

    "📚 نتمنى لك رحلة جامعية موفقة.",

    "🎓 أهلاً بك في دليل الطالب السوري."

];

const loadingText = document.getElementById("loadingText");

let index = 0;

const changeMessage = setInterval(() => {

    index = (index + 1) % messages.length;

    loadingText.textContent = messages[index];

}, 1000);

window.addEventListener("load", () => {

    clearInterval(changeMessage);

    setTimeout(() => {

        document.getElementById("loader").style.display = "none";

    }, 1200);

});








