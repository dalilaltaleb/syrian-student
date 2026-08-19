

// ===============================
// الجامعات السورية
// =============================



const universities = [

    {
        name: "جامعة حلب",
        city: "حلب",
        logo: "images/logos/alepun.webp",
        map: "https://www.google.com/maps/search/?api=1&query=جامعة+حلب",
        type: "public"
    },

    {
        name: "جامعة دمشق",
        city: "دمشق",
         logo: "images/logos/damac.webp",
         map: "https://www.google.com/maps/search/?api=1&query=جامعة+دمشق",
        type: "public"
    },

    {
        name: "جامعة اللاذقية",
        city: "اللاذقية",
        logo: "images/logos/alaz.webp",
         map: "https://www.google.com/maps/search/?api=1&query=جامعة+تشرين+اللاذقية" ,
        type: "public"
    },

    {
        name: "جامعة حماة",
        city: "حماة",
        logo: "images/logos/hama.webp",
        map: "https://www.google.com/maps/search/?api=1&query=جامعة+حماة",
        type: "public"
    },

    {
    name: "جامعة حمص",
    city: "حمص",
    logo: "images/logos/homs.webp",
    map: "https://www.google.com/maps/search/?api=1&query=جامعة+حمص",
    type: "public"
},

{
    name: "الجامعة الافتراضية السورية",
    city: "دمشق",
    logo: "images/logos/svu.webp",
    map: "https://www.google.com/maps/search/?api=1&query=الجامعة+الافتراضية+السورية",
    type: "public"
},

{
    name: "جامعة طرطوس",
    city: "طرطوس",
    logo: "images/logos/tartus.webp",
    map: "https://www.google.com/maps/search/?api=1&query=جامعة+طرطوس",
    type: "public"
},

{
    name: "جامعة الفرات",
    city: "دير الزور",
    logo: "images/logos/alforat.webp",
    map: "https://www.google.com/maps/search/?api=1&query=جامعة+الفرات+دير+الزور",
    type: "public"
},

{
    name: "جامعة إدلب",
    city: "إدلب",
     logo: "images/logos/idlib.webp",  
    map: "https://www.google.com/maps/search/?api=1&query=جامعة+إدلب",
    type: "public"
},

{
    name: "جامعة ماري الخاصة",
    city: "إدلب  ",
    logo: "images/logos/mpu.webp",
    map: "https://www.google.com/maps/place/36%C2%B005'55.0%22N+36%C2%B043'17.6%22E/@36.0986038,36.7215583,17z/data=!3m1!4b1!4m4!3m3!8m2!3d36.0986038!4d36.7215583",
    type: "private"
},



    {
    name: "جامعة إيبلا الخاصة",
    city: "إدلب  ",
    logo: "images/logos/ebls.webp",  
    map: "https://maps.app.goo.gl/9ohXbFLibtLM5q8R6?g_st=aw",
    type: "private"
},

   {
    name: "الجامعة العربية الدولية",
    city: "درعا",
    logo: "images/logos/aiu.webp",  
    map: "https://www.google.com/maps/search/?api=1&query=الجامعة+العربية+الدولية",
    type: "private"
},

{
    name: "الجامعة الدولية الخاصة للعلوم والتكنولوجيا",
    city: "درعا",
    logo: "images/logos/iust.webp",  
    map: "https://www.google.com/maps/search/?api=1&query=الجامعة+الدولية+الخاصة+للعلوم+والتكنولوجيا",
    type: "private"
},

{
    name: "الجامعة السورية الخاصة",
    city: "دمشق",
    logo: "images/logos/spu.webp",  
    map: "https://www.google.com/maps/search/?api=1&query=الجامعة+السورية+الخاصة+الكسوة",
    type: "private"
},

{
    name: "جامعة الأندلس الخاصة للعلوم الطبية",
    city: "طرطوس",
    logo: "images/logos/au.webp",  
    map: "https://www.google.com/maps/search/?api=1&query=جامعة+الأندلس+الخاصة+القدموس",
    type: "private"
},

{
    name: "جامعة القلمون الخاصة",
    city: "ريف دمشق ",
    logo: "images/logos/kalamun.webp",   
    map: "https://www.google.com/maps/search/?api=1&query=جامعة+القلمون+دير+عطية",
    type: "private"
},

{
    name: "جامعة الوادي الدولية",
    city: "حمص ",
    logo: "images/logos/wiu.webp",  
    map: "https://www.google.com/maps/search/?api=1&query=جامعة+الوادي+الدولية+وادي+النضارة",
    type: "private"
},

{
    name: "جامعة الشام الخاصة",
    city: "ريف دمشق",
    logo: "images/logos/alsham.webp",  
    map: "https://www.google.com/maps/search/?api=1&query=جامعة+الشام+الخاصة",
    type: "private"
},

{
    name: "جامعة المنارة الخاصة",
    city: "اللاذقية",
    logo: "images/logos/manaara.webp",  
    map: "https://www.google.com/maps/search/?api=1&query=جامعة+المنارة+الخاصة+اللاذقية",
    type: "private"
},

{
    name: "جامعة الجزيرة الخاصة",
    city: "درعا ",
    logo: "images/logos/ipu.webp",  
    map: "https://www.google.com/maps/search/?api=1&query=جامعة+الجزيرة+الخاصة",
    type: "private"
},

{
    name: "الجامعة الوطنية الخاصة",
    city: "حماة",
    logo: "images/logos/wpu.webp",  
    map: "https://www.google.com/maps/search/?api=1&query=الجامعة+الوطنية+الخاصة+حماة",
    type: "private"
},

{
    name: "جامعة الحواش الخاصة",
    city: "حمص",
    logo: "images/logos/hpu.webp",  
    map: "https://www.google.com/maps/search/?api=1&query=جامعة+الحواش+الخاصة",
    type: "private"
},

{
    name: "جامعة الاتحاد الخاصة",
    city: "درعا",
    logo: "images/logos/alithad.webp",  
    map: "https://www.google.com/maps/search/?api=1&query=جامعة+الاتحاد+الخاصة",
    type: "private"
},

{
    name: "الجامعة العربية الخاصة للعلوم والتكنولوجيا",
    city: "حماة",
    logo: "images/logos/ulu.webp",  
    map: "https://www.google.com/maps/search/?api=1&query=الجامعة+العربية+الخاصة+للعلوم+والتكنولوجيا",
    type: "private"
},

{
    name: "جامعة اليرموك الخاصة",
    city: "درعا",
    logo: "images/logos/ypu.webp",  
    map: "https://www.google.com/maps/search/?api=1&query=جامعة+اليرموك+الخاصة",
    type: "private"
},

{
    name: "جامعة أنطاكية السورية الخاصة",
    city: "ريف دمشق",
    logo: "images/logos/asu.webp",  
    map: "https://www.google.com/maps/search/?api=1&query=جامعة+أنطاكية+السورية+الخاصة",
    type: "private"
},

{
    name: "جامعة قاسيون الخاصة للعلوم والتكنولوجيا",
    city: "دمشق",
    logo: "images/logos/pu.webp",  
    map: "https://www.google.com/maps/search/?api=1&query=جامعة+قاسيون+الخاصة",
    type: "private"
},

{
    name: "جامعة بلاد الشام للعلوم الشرعية",
    city: "دمشق",
    logo: "images/logos/sham.webp",  
    map: "https://www.google.com/maps/search/?api=1&query=جامعة+بلاد+الشام+للعلوم+الشرعية",
    type: "private"
},

{
    name: "الجامعة الدولية للعلوم والنهضة",
    city: " حلب   ",
    logo: "images/logos/iusr.webp",  
    map: "https://www.google.com/maps/search/?api=1&query=الجامعة+الدولية+للعلوم+والنهضة+أعزاز",
    type: "private"
},

{
    name: "جامعة الشهباء الخاصة",
    city: "حلب",
    logo: "images/logos/suu.webp",  
    map: "https://www.google.com/maps/search/?api=1&query=جامعة+الشهباء+الخاصة+حلب",
    type: "private"
},

{
    name: "جامعة الرشيد الدولية الخاصة للعلوم والتكنولوجيا",
    city: "درعا",
    logo: "images/logos/ru.webp",  
    map: "https://www.google.com/maps/search/?api=1&query=جامعة+الرشيد+الدولية+الخاصة",
    type: "private"
},

{
    name: "جامعة قرطبة الخاصة",
    city: "حلب",
    logo: "images/logos/cpu.webp",  
    map: "https://www.google.com/maps/search/?api=1&query=جامعة+قرطبة+الخاصة+حلب",
    type: "private"
},

{
    name: "جامعة الزيتونة الدولية",
    city: "حلب ",
    logo: "images/logos/ziu.webp",  
    map: "https://www.google.com/maps/search/?api=1&query=جامعة+الزيتونة+الدولية+أعزاز",
    type: "private"
},

{
    name: "جامعة الشمال الخاصة",
    city: "ادلب ",
    logo: "images/logos/spus.webp",  
    map: "https://www.google.com/maps/search/?api=1&query=جامعة+الشمال+الخاصة+سرمدا",
    type: "private"
},





];


const list = document.getElementById("universities-list");

if (list) {

    function showUniversities(data) {

        list.innerHTML = "";

        if (data.length === 0) {

            list.innerHTML = `
                <p class="no-results">
                    لم يتم العثور على جامعة.
                </p>
            `;

            return;
        }

        data.forEach(uni => {

            list.innerHTML += `

                <div class="uni-card">

                    <img src="${uni.logo}" alt="شعار ${uni.name}">

                    <div class="uni-content">

                        <h3>${uni.name}</h3>

                        <p>📍 ${uni.city}</p>

                        <div class="uni-links">

                            <a href="${uni.map}"
                               target="_blank"
                               rel="noopener noreferrer"
                               class="map-btn">
                                الخريطة
                            </a>

                        </div>

                    </div>

                </div>

            `;

        });

    }


    // عرض الجامعات الحكومية عند فتح الصفحة

    showUniversities(
        universities.filter(uni => uni.type === "public")
    );


    // تبديل حكومية / خاصة

    function filterUniversities(type, button) {

        const filtered = universities.filter(
            uni => uni.type === type
        );

        showUniversities(filtered);


        document.querySelectorAll(".university-tab").forEach(btn => {

            btn.classList.remove("active");

        });

        button.classList.add("active");

    }

}




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

if (darkBtn) {

    if (localStorage.getItem("theme") === "dark") {

        document.body.classList.add("dark-mode");

        darkBtn.innerHTML = "☀️";

    }

    darkBtn.addEventListener("click", function () {

        document.body.classList.toggle("dark-mode");

        if (document.body.classList.contains("dark-mode")) {

            darkBtn.innerHTML = "☀️";

            localStorage.setItem("theme", "dark");

        } else {

            darkBtn.innerHTML = "🌙";

            localStorage.setItem("theme", "light");

        }

    });

}


const topBtn = document.getElementById("topBtn");

if (topBtn) {

    window.addEventListener("scroll", () => {

        if (window.scrollY > 300) {

            topBtn.style.display = "block";

        } else {

            topBtn.style.display = "none";

        }

    });


    topBtn.addEventListener("click", () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

}



const messages = [

    "🤍 اللهم صلِّ وسلم على نبينا محمد ﷺ",

    "🌱 الصبر مفتاح الفرج.",

    "😊 عد للعشرة... باقي شوي.",

    "📚 نتمنى لك رحلة جامعية موفقة.",

    "🎓 أهلاً بك في دليل الطالب السوري."

];

const loadingText = document.getElementById("loadingText");

if (loadingText) {

    let index = 0;

    const changeMessage = setInterval(() => {

        index = (index + 1) % messages.length;

        loadingText.textContent = messages[index];

    }, 1600);


    window.addEventListener("load", () => {

        clearInterval(changeMessage);

        setTimeout(() => {

            const loader = document.getElementById("loader");

            if (loader) {
                loader.style.display = "none";
            }

        }, 1200);

    });

}







