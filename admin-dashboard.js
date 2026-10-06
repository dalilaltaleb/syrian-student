import { auth, db } from "./firebase.js";

import {
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/12.17.1/firebase-auth.js";

import {
    collection,
    addDoc,
    getDocs,
    deleteDoc,
    getDoc,
    doc,
    updateDoc,
    setDoc
} from "https://www.gstatic.com/firebasejs/12.17.1/firebase-firestore.js";

// ================================
// التأكد من تسجيل الدخول
// ================================

onAuthStateChanged(auth, (user) => {

    if (!user) {
        window.location.href = "admin.html";
    }

});

// ================================
// تسجيل الخروج
// ================================

const logoutBtn = document.querySelector("#logout-btn");

if (logoutBtn) {
    logoutBtn.addEventListener("click", async () => {
        try {
            await signOut(auth);
            window.location.href = "admin.html";
        } catch (error) {
            console.error("Logout error:", error);
            alert("❌ حدث خطأ أثناء تسجيل الخروج");
        }
    });
}

// ================================
// الجامعات
// ================================

const nameInput = document.querySelector("#university-name");
const cityInput = document.querySelector("#university-city");
const logoInput = document.querySelector("#university-logo");
const mapInput = document.querySelector("#university-map");
const typeInput = document.querySelector("#university-type");
const majorsInput = document.querySelector("#university-majors");

const addButton = document.querySelector("#add-university");
const message = document.querySelector("#dashboard-message");
const universitiesList = document.querySelector("#universities-list");


// ================================
// إضافة جامعة
// ================================

if (addButton) {

    addButton.addEventListener("click", async () => {

        const name = nameInput.value.trim();
        const city = cityInput.value.trim();
        const logo = logoInput.value.trim();
        const map = mapInput.value.trim();
        const type = typeInput.value;

        const majors = majorsInput.value
            .split("\n")
            .map(major => major.trim())
            .filter(major => major !== "");


        if (
            !name ||
            !city ||
            !logo ||
            !map ||
            !type ||
            majors.length === 0
        ) {

            message.textContent =
                "⚠️ يرجى تعبئة جميع الحقول";

            message.style.color = "orange";

            return;
        }


        message.textContent =
            "جاري إضافة الجامعة...";


        try {

            await addDoc(
                collection(db, "universities"),
                {
                    name,
                    city,
                    logo,
                    map,
                    type,
                    majors
                }
            );


            message.textContent =
                "✅ تمت إضافة الجامعة بنجاح";

            message.style.color = "green";


            nameInput.value = "";
            cityInput.value = "";
            logoInput.value = "";
            mapInput.value = "";
            typeInput.value = "public";
            majorsInput.value = "";


            await loadUniversities();


        } catch (error) {

            console.error(
                "University error:",
                error
            );

            message.textContent =
                "❌ حدث خطأ أثناء إضافة الجامعة";

            message.style.color = "red";

        }

    });

}


// ================================
// تحميل الجامعات
// ================================

async function loadUniversities() {

    if (!universitiesList) return;


    universitiesList.innerHTML =
        "جاري تحميل الجامعات...";


    try {

        const snapshot =
            await getDocs(
                collection(db, "universities")
            );


        if (snapshot.empty) {

            universitiesList.innerHTML =
                "<p>لا توجد جامعات مضافة حاليًا.</p>";

            return;
        }


        universitiesList.innerHTML = "";


        snapshot.forEach((universityDoc) => {

            const data =
                universityDoc.data();


            const item =
                document.createElement("div");


            item.className =
                "university-item";


            item.innerHTML = `

                <div class="university-info">

                    <strong>
                        ${data.name}
                    </strong>

                    <span>
                        📍 ${data.city}
                    </span>

                    <span>
                        ${
                            data.type === "public"
                                ? "🏫 جامعة حكومية"
                                : "🏢 جامعة خاصة"
                        }
                    </span>

                </div>


                <div class="university-actions">

                    <button
                        class="edit-university"
                        data-id="${universityDoc.id}">
                        ✏️ تعديل
                    </button>

                    <button
                        class="delete-university"
                        data-id="${universityDoc.id}">
                        🗑️ حذف
                    </button>

                </div>

            `;


            universitiesList.appendChild(item);

        });


        // أزرار الحذف

        document
            .querySelectorAll(".delete-university")
            .forEach(button => {

                button.addEventListener(
                    "click",
                    () => {

                        deleteUniversity(
                            button.dataset.id
                        );

                    }
                );

            });


        // أزرار التعديل

        document
            .querySelectorAll(".edit-university")
            .forEach(button => {

                button.addEventListener(
                    "click",
                    () => {

                        editUniversity(
                            button.dataset.id
                        );

                    }
                );

            });


    } catch (error) {

        console.error(
            "Load universities error:",
            error
        );

        universitiesList.innerHTML =
            "❌ حدث خطأ أثناء تحميل الجامعات.";

    }

}


// ================================
// حذف جامعة
// ================================

async function deleteUniversity(id) {

    const confirmed =
        confirm(
            "هل أنتِ متأكدة من حذف هذه الجامعة؟"
        );


    if (!confirmed) return;


    try {

        await deleteDoc(
            doc(db, "universities", id)
        );


        await loadUniversities();


    } catch (error) {

        console.error(
            "Delete university error:",
            error
        );

        alert(
            "❌ حدث خطأ أثناء حذف الجامعة."
        );

    }

}


// ================================
// تعديل جامعة
// ================================

async function editUniversity(id) {

    const newName =
        prompt("اسم الجامعة:");


    if (!newName) return;


    const newCity =
        prompt("المدينة:");


    if (!newCity) return;


    const newLogo =
        prompt("مسار الشعار:");


    if (!newLogo) return;


    const newMap =
        prompt("رابط الخريطة:");


    if (!newMap) return;


    const newType =
        prompt(
            "نوع الجامعة (public أو private):"
        );


    if (
        newType !== "public" &&
        newType !== "private"
    ) {

        alert(
            "⚠️ يجب كتابة public أو private"
        );

        return;
    }


    const newMajors =
        prompt(
            "التخصصات، افصلي بينها بفاصلة:"
        );


    if (!newMajors) return;


    const majors =
        newMajors
            .split(",")
            .map(major => major.trim())
            .filter(major => major !== "");


    try {

        await updateDoc(
            doc(db, "universities", id),
            {
                name: newName.trim(),
                city: newCity.trim(),
                logo: newLogo.trim(),
                map: newMap.trim(),
                type: newType,
                majors: majors
            }
        );


        await loadUniversities();


    } catch (error) {

        console.error(
            "Update university error:",
            error
        );

        alert(
            "❌ حدث خطأ أثناء تعديل الجامعة."
        );

    }

}


// ================================
// تحميل الجامعات عند فتح لوحة الإدارة
// ================================

loadUniversities();


// ================================
// Dashboard Tabs
// ================================

const dashboardTabs =
    document.querySelectorAll(".dashboard-tab");

const dashboardSections =
    document.querySelectorAll(".dashboard-section");


dashboardTabs.forEach(tab => {

    tab.addEventListener("click", () => {

        dashboardTabs.forEach(item => {
            item.classList.remove("active");
        });


        dashboardSections.forEach(section => {
            section.classList.remove("active");
        });


        tab.classList.add("active");


        const sectionId =
            tab.dataset.section;

        const selectedSection =
            document.getElementById(sectionId);


        if (selectedSection) {
            selectedSection.classList.add("active");
        }

    });

});

// ================================
// Rankings
// ================================

const rankingUniversity =
    document.querySelector("#ranking-university");

const rankingType =
    document.querySelector("#ranking-type");

const rankingPosition =
    document.querySelector("#ranking-position");

const rankingWorldRank =
    document.querySelector("#ranking-world-rank");

const addRankingButton =
    document.querySelector("#add-ranking");

const rankingMessage =
    document.querySelector("#ranking-message");

const rankingsList =
    document.querySelector("#rankings-list");


// ================================
// إضافة ترتيب
// ================================

if (addRankingButton) {

    addRankingButton.addEventListener(
        "click",
        async () => {

            const university =
                rankingUniversity.value.trim();

            const type =
                rankingType.value;

            const position =
                Number(rankingPosition.value);

            const worldRank =
                Number(rankingWorldRank.value);


            if (
                !university ||
                !position ||
                !worldRank
            ) {

                rankingMessage.textContent =
                    "⚠️ يرجى تعبئة جميع الحقول";

                rankingMessage.style.color =
                    "orange";

                return;
            }


            rankingMessage.textContent =
                "جاري إضافة الترتيب...";


            try {

                await addDoc(
                    collection(db, "rankings"),
                    {
                        university: university,
                        type: type,
                        position: position,
                        worldRank: worldRank
                    }
                );


                rankingMessage.textContent =
                    "✅ تمت إضافة الترتيب بنجاح";

                rankingMessage.style.color =
                    "green";


                rankingUniversity.value = "";
                rankingType.value = "public";
                rankingPosition.value = "";
                rankingWorldRank.value = "";


                await loadRankings();


            } catch (error) {

                console.error(
                    "Ranking error:",
                    error
                );

                rankingMessage.textContent =
                    "❌ حدث خطأ أثناء إضافة الترتيب";

                rankingMessage.style.color =
                    "red";

            }

        }
    );

}


// ================================
// تحميل الترتيبات
// ================================

async function loadRankings() {

    if (!rankingsList) return;


    rankingsList.innerHTML =
        "جاري تحميل الترتيبات...";


    try {

        const snapshot =
            await getDocs(
                collection(db, "rankings")
            );


        if (snapshot.empty) {

            rankingsList.innerHTML =
                "<p>لا توجد ترتيبات مضافة حاليًا.</p>";

            return;
        }


        rankingsList.innerHTML = "";


        snapshot.forEach(
            (rankingDoc) => {

                const data =
                    rankingDoc.data();


                const item =
                    document.createElement("div");


                item.className =
                    "ranking-item";


                item.innerHTML = `

                    <div class="ranking-info">

                        <strong>
                            #${data.position || "-"} —
                            ${data.university}
                        </strong>

                        <span>
                            ${
                                data.type === "public"
                                    ? "جامعة حكومية"
                                    : "جامعة خاصة"
                            }
                        </span>

                        <span>
                            🌍 الترتيب العالمي:
                            #${data.worldRank || "-"}
                        </span>

                    </div>


                    <div class="ranking-actions">

                        <button
                            class="edit-ranking"
                            data-id="${rankingDoc.id}">
                            ✏️ تعديل
                        </button>


                        <button
                            class="delete-ranking"
                            data-id="${rankingDoc.id}">
                            🗑️ حذف
                        </button>

                    </div>

                `;


                rankingsList.appendChild(item);

            }
        );


        // ================================
        // أزرار الحذف
        // ================================

        document
            .querySelectorAll(".delete-ranking")
            .forEach(button => {

                button.addEventListener(
                    "click",
                    () => {

                        deleteRanking(
                            button.dataset.id
                        );

                    }
                );

            });


        // ================================
        // أزرار التعديل
        // ================================

        document
            .querySelectorAll(".edit-ranking")
            .forEach(button => {

                button.addEventListener(
                    "click",
                    () => {

                        editRanking(
                            button.dataset.id
                        );

                    }
                );

            });


    } catch (error) {

        console.error(
            "Load rankings error:",
            error
        );

        rankingsList.innerHTML =
            "❌ حدث خطأ أثناء تحميل الترتيبات.";

    }

}


// ================================
// حذف ترتيب
// ================================

async function deleteRanking(id) {

    const confirmed =
        confirm(
            "هل أنتِ متأكدة من حذف هذا الترتيب؟"
        );


    if (!confirmed) return;


    try {

        await deleteDoc(
            doc(db, "rankings", id)
        );


        await loadRankings();


    } catch (error) {

        console.error(
            "Delete ranking error:",
            error
        );


        alert(
            "❌ حدث خطأ أثناء حذف الترتيب."
        );

    }

}


// ================================
// تعديل ترتيب
// ================================

async function editRanking(id) {

    try {

        const rankingRef =
            doc(db, "rankings", id);

        const snapshot =
            await getDoc(rankingRef);


        if (!snapshot.exists()) {

            alert(
                "⚠️ لم يتم العثور على الترتيب."
            );

            return;
        }


        const data =
            snapshot.data();


        const newUniversity =
            prompt(
                "اسم الجامعة:",
                data.university || ""
            );


        if (newUniversity === null) return;


        const newType =
            prompt(
                "نوع الجامعة (public أو private):",
                data.type || "public"
            );


        if (newType === null) return;


        if (
            newType !== "public" &&
            newType !== "private"
        ) {

            alert(
                "⚠️ يجب كتابة public أو private"
            );

            return;
        }


        const newPosition =
            prompt(
                "الترتيب المحلي:",
                data.position || ""
            );


        if (newPosition === null) return;


        const newWorldRank =
            prompt(
                "الترتيب العالمي:",
                data.worldRank || ""
            );


        if (newWorldRank === null) return;


        await updateDoc(
            rankingRef,
            {
                university:
                    newUniversity.trim(),

                type:
                    newType,

                position:
                    Number(newPosition),

                worldRank:
                    Number(newWorldRank)
            }
        );


        alert(
            "✅ تم تعديل الترتيب بنجاح"
        );


        await loadRankings();


    } catch (error) {

        console.error(
            "Update ranking error:",
            error
        );


        alert(
            "❌ حدث خطأ أثناء تعديل الترتيب."
        );

    }

}

// ================================
// تحميل الترتيبات عند فتح الصفحة
// ================================

loadRankings();

// ================================
// Documents
// ================================

const documentTitle =
    document.querySelector("#document-title");

const documentDescription =
    document.querySelector("#document-description");

const addDocumentButton =
    document.querySelector("#add-document");

const documentMessage =
    document.querySelector("#document-message");

const documentsList =
    document.querySelector("#documents-list");


// ================================
// إضافة ورقة
// ================================

if (addDocumentButton) {

    addDocumentButton.addEventListener(
        "click",
        async () => {

            const title =
                documentTitle.value.trim();

            const description =
                documentDescription.value.trim();


            if (!title || !description) {

                documentMessage.textContent =
                    "⚠️ يرجى تعبئة جميع الحقول";

                documentMessage.style.color =
                    "orange";

                return;
            }


            documentMessage.textContent =
                "جاري إضافة الورقة...";


            try {

                await addDoc(
                    collection(db, "documents"),
                    {
                        title: title,
                        description: description
                    }
                );


                documentMessage.textContent =
                    "✅ تمت إضافة الورقة بنجاح";

                documentMessage.style.color =
                    "green";


                documentTitle.value = "";
                documentDescription.value = "";


                await loadDocuments();


            } catch (error) {

                console.error(
                    "Document error:",
                    error
                );

                documentMessage.textContent =
                    "❌ حدث خطأ أثناء إضافة الورقة";

                documentMessage.style.color =
                    "red";

            }

        }
    );

}


// ================================
// تحميل الأوراق
// ================================

async function loadDocuments() {

    if (!documentsList) return;


    documentsList.innerHTML =
        "جاري تحميل الأوراق...";


    try {

        const snapshot =
            await getDocs(
                collection(db, "documents")
            );


        if (snapshot.empty) {

            documentsList.innerHTML =
                "<p>لا توجد أوراق مضافة حاليًا.</p>";

            return;
        }


        documentsList.innerHTML = "";


        snapshot.forEach(
            (documentDoc) => {

                const data =
                    documentDoc.data();


                const item =
                    document.createElement("div");

                item.className =
                    "document-item";


                item.innerHTML = `

                    <strong>
                        ${data.title}
                    </strong>

                    <p>
                        ${data.description}
                    </p>

                    <div class="document-actions">

                        <button
                            class="edit-document"
                            data-id="${documentDoc.id}">
                            ✏️ تعديل
                        </button>

                        <button
                            class="delete-document"
                            data-id="${documentDoc.id}">
                            🗑️ حذف
                        </button>

                    </div>

                `;


                documentsList.appendChild(item);

            }
        );


        document
            .querySelectorAll(".delete-document")
            .forEach(button => {

                button.addEventListener(
                    "click",
                    () => {

                        deleteDocument(
                            button.dataset.id
                        );

                    }
                );

            });


        document
            .querySelectorAll(".edit-document")
            .forEach(button => {

                button.addEventListener(
                    "click",
                    () => {

                        editDocument(
                            button.dataset.id
                        );

                    }
                );

            });


    } catch (error) {

        console.error(
            "Load documents error:",
            error
        );

        documentsList.innerHTML =
            "❌ حدث خطأ أثناء تحميل الأوراق.";

    }

}


// ================================
// حذف ورقة
// ================================

async function deleteDocument(id) {

    const confirmed =
        confirm(
            "هل أنتِ متأكدة من حذف هذه الورقة؟"
        );


    if (!confirmed) return;


    try {

        await deleteDoc(
            doc(db, "documents", id)
        );


        await loadDocuments();


    } catch (error) {

        console.error(
            "Delete document error:",
            error
        );

        alert(
            "❌ حدث خطأ أثناء حذف الورقة."
        );

    }

}


// ================================
// تعديل ورقة
// ================================

async function editDocument(id) {

    const newTitle =
        prompt("اسم الورقة:");


    if (!newTitle) return;

     const newDescription =
        prompt("الوصف:");


    if (!newDescription) return;

    


    try {

        await updateDoc(
            doc(db, "documents", id),
            {
                title: newTitle.trim(),
                description: newDescription.trim()
            }
        );


        await loadDocuments();


    } catch (error) {

        console.error(
            "Update document error:",
            error
        );

        alert(
            "❌ حدث خطأ أثناء تعديل الورقة."
        );

    }

}


// تحميل الأوراق عند فتح لوحة الإدارة

loadDocuments();

// ================================
// SERVICES
// ================================

const serviceTitle = document.querySelector("#service-title");
const serviceDescription = document.querySelector("#service-description");


const addServiceButton = document.querySelector("#add-service");
const serviceMessage = document.querySelector("#service-message");
const servicesList = document.querySelector("#services-list");


// إضافة خدمة
if (addServiceButton) {
    addServiceButton.addEventListener("click", async () => {

        const title = serviceTitle.value.trim();
        const description = serviceDescription.value.trim();
        

        if (!title || !description) {
            serviceMessage.textContent = "⚠️ يرجى تعبئة اسم الخدمة والوصف";
            serviceMessage.style.color = "orange";
            return;
        }

        serviceMessage.textContent = "جاري إضافة الخدمة...";

        try {

            await addDoc(collection(db, "services"), {
                title: title,
                description: description,
                
            });

            serviceMessage.textContent = "✅ تمت إضافة الخدمة بنجاح";
            serviceMessage.style.color = "green";

            serviceTitle.value = "";
            serviceDescription.value = "";
        

            await loadServices();

        } catch (error) {

            console.error("Service error:", error);

            serviceMessage.textContent =
                "❌ حدث خطأ أثناء إضافة الخدمة";

            serviceMessage.style.color = "red";
        }
    });
}


// تحميل الخدمات
async function loadServices() {

    if (!servicesList) return;

    servicesList.innerHTML = "جاري تحميل الخدمات...";

    try {

        const snapshot = await getDocs(
            collection(db, "services")
        );

        if (snapshot.empty) {

            servicesList.innerHTML =
                "<p>لا توجد خدمات مضافة حاليًا.</p>";

            return;
        }

        servicesList.innerHTML = "";

        snapshot.forEach((serviceDoc) => {

            const data = serviceDoc.data();

            const item = document.createElement("div");

            item.className = "service-item";

            item.innerHTML = `
                <strong>${data.title}</strong>

                <p>${data.description}</p>

                

                <div class="service-actions">

                    <button
                        class="edit-service"
                        data-id="${serviceDoc.id}">
                        ✏️ تعديل
                    </button>

                    <button
                        class="delete-service"
                        data-id="${serviceDoc.id}">
                        🗑️ حذف
                    </button>

                </div>
            `;

            servicesList.appendChild(item);
        });


        // حذف
        document
            .querySelectorAll(".delete-service")
            .forEach(button => {

                button.addEventListener("click", () => {

                    deleteService(button.dataset.id);

                });

            });


        // تعديل
        document
            .querySelectorAll(".edit-service")
            .forEach(button => {

                button.addEventListener("click", () => {

                    editService(button.dataset.id);

                });

            });

    } catch (error) {

        console.error("Load services error:", error);

        servicesList.innerHTML =
            "❌ حدث خطأ أثناء تحميل الخدمات.";
    }
}


// حذف خدمة
async function deleteService(id) {

    const confirmed = confirm(
        "هل أنتِ متأكدة من حذف هذه الخدمة؟"
    );

    if (!confirmed) return;

    try {

        await deleteDoc(
            doc(db, "services", id)
        );

        await loadServices();

    } catch (error) {

        console.error(
            "Delete service error:",
            error
        );

        alert(
            "❌ حدث خطأ أثناء حذف الخدمة."
        );
    }
}


// تعديل خدمة
async function editService(id) {

    const newTitle = prompt("اسم الخدمة:");

    if (!newTitle) return;

    const newDescription =
        prompt("وصف الخدمة:");

    if (!newDescription) return;

    const newIcon =
        prompt("أيقونة الخدمة (اختياري):");

    try {

        await updateDoc(
            doc(db, "services", id),
            {
                title: newTitle.trim(),
                description: newDescription.trim(),
                icon: newIcon ? newIcon.trim() : ""
            }
        );

        await loadServices();

    } catch (error) {

        console.error(
            "Update service error:",
            error
        );

        alert(
            "❌ حدث خطأ أثناء تعديل الخدمة."
        );
    }
}


// تحميل الخدمات عند فتح لوحة التحكم
loadServices();



// ================================
// Registration
// ================================


// ================================
// عناصر الحقول
// ================================

const registrationLabel =
    document.querySelector("#registration-label");

const registrationTitle =
    document.querySelector("#registration-title");

const registrationDescription =
    document.querySelector("#registration-description");

const registrationHighlight =
    document.querySelector("#registration-highlight");

const registrationNote =
    document.querySelector("#registration-note");

const registrationWhatsapp =
    document.querySelector("#registration-whatsapp");


// ================================
// عناصر التحكم
// ================================

const addRegistrationButton =
    document.querySelector("#add-registration");

const registrationMessage =
    document.querySelector("#registration-message");

const registrationList =
    document.querySelector("#registration-list");


// ================================
// تحميل بيانات التسجيل
// ================================

async function loadRegistration() {

    try {

        const registrationRef =
            doc(
                db,
                "sitecontent",
                "registration"
            );

        const snapshot =
            await getDoc(registrationRef);


        // إذا لا توجد بيانات
        if (!snapshot.exists()) {

            if (registrationList) {

                registrationList.innerHTML =
                    "<p>لا توجد بيانات تسجيل حاليًا.</p>";

            }

            return;
        }


        const data =
            snapshot.data();


        // ================================
        // عرض البطاقة فقط
        // ================================

        if (registrationList) {

            registrationList.innerHTML = `

                <div class="registration-item">

                    <strong>
                        ${data.label || ""}
                    </strong>

                    <h3>
                        ${data.title || ""}
                    </h3>

                    <p>
                        ${data.description || ""}
                    </p>

                    ${
                        data.descriptionHighlight
                            ? `
                                <p>
                                    ${data.descriptionHighlight}
                                </p>
                              `
                            : ""
                    }

                    <p>
                        ${data.note || ""}
                    </p>

                    ${
                        data.whatsappUrl
                            ? `
                                <p>
                                    رابط واتساب:
                                    ${data.whatsappUrl}
                                </p>
                              `
                            : ""
                    }


                    <div class="registration-actions">

                        <button
                            type="button"
                            class="edit-registration">
                            ✏️ تعديل
                        </button>

                        <button
                            type="button"
                            class="delete-registration">
                            🗑️ حذف
                        </button>

                    </div>

                </div>

            `;

        }


        console.log(
            "تم تحميل بيانات التسجيل في لوحة التحكم ✅"
        );


    } catch (error) {

        console.error(
            "Registration load error:",
            error
        );

    }

}


// ================================
// إضافة بيانات التسجيل
// ================================

if (addRegistrationButton) {

    addRegistrationButton.addEventListener(
        "click",
        async () => {

            try {

                const registrationRef =
                    doc(
                        db,
                        "sitecontent",
                        "registration"
                    );


                const snapshot =
                    await getDoc(
                        registrationRef
                    );


                // منع إضافة بطاقة ثانية
                if (snapshot.exists()) {

                    registrationMessage.textContent =
                        "⚠️ توجد بطاقة تسجيل بالفعل، استخدمي زر التعديل.";

                    registrationMessage.style.color =
                        "orange";

                    return;
                }


                // ================================
                // إضافة البيانات
                // ================================

                await setDoc(
                    registrationRef,
                    {

                        label:
                            registrationLabel.value.trim(),

                        title:
                            registrationTitle.value.trim(),

                        description:
                            registrationDescription.value.trim(),

                        descriptionHighlight:
                            registrationHighlight.value.trim(),

                        note:
                            registrationNote.value.trim(),

                        whatsappUrl:
                            registrationWhatsapp.value.trim()

                    }
                );


                registrationMessage.textContent =
                    "✅ تمت إضافة بيانات التسجيل بنجاح";

                registrationMessage.style.color =
                    "green";


                // تفريغ الحقول بعد الإضافة
                registrationLabel.value = "";

                registrationTitle.value = "";

                registrationDescription.value = "";

                registrationHighlight.value = "";

                registrationNote.value = "";

                registrationWhatsapp.value = "";


                // إعادة تحميل البطاقة
                await loadRegistration();


            } catch (error) {

                console.error(
                    "Registration add error:",
                    error
                );


                registrationMessage.textContent =
                    "❌ حدث خطأ أثناء الإضافة";

                registrationMessage.style.color =
                    "red";

            }

        }
    );

}


// ================================
// تعديل بيانات التسجيل
// ================================

async function editRegistrationData() {

    try {

        const registrationRef =
            doc(
                db,
                "sitecontent",
                "registration"
            );


        const snapshot =
            await getDoc(
                registrationRef
            );


        if (!snapshot.exists()) {

            registrationMessage.textContent =
                "⚠️ لا توجد بيانات لتعديلها.";

            registrationMessage.style.color =
                "orange";

            return;
        }


        const data =
            snapshot.data();


        // ================================
        // قيم جديدة
        // ================================

        const newLabel =
            prompt(
                "العنوان الصغير:",
                data.label || ""
            );

        if (newLabel === null)
            return;


        const newTitle =
            prompt(
                "العنوان الرئيسي:",
                data.title || ""
            );

        if (newTitle === null)
            return;


        const newDescription =
            prompt(
                "الوصف:",
                data.description || ""
            );

        if (newDescription === null)
            return;


        const newHighlight =
            prompt(
                "النص المميز:",
                data.descriptionHighlight || ""
            );

        if (newHighlight === null)
            return;


        const newNote =
            prompt(
                "الملاحظة:",
                data.note || ""
            );

        if (newNote === null)
            return;


        const newWhatsapp =
            prompt(
                "رابط واتساب:",
                data.whatsappUrl || ""
            );

        if (newWhatsapp === null)
            return;


        // ================================
        // تحديث Firestore
        // ================================

        await updateDoc(
            registrationRef,
            {

                label:
                    newLabel.trim(),

                title:
                    newTitle.trim(),

                description:
                    newDescription.trim(),

                descriptionHighlight:
                    newHighlight.trim(),

                note:
                    newNote.trim(),

                whatsappUrl:
                    newWhatsapp.trim()

            }
        );


        registrationMessage.textContent =
            "✅ تم تعديل بيانات التسجيل بنجاح";

        registrationMessage.style.color =
            "green";


        await loadRegistration();


    } catch (error) {

        console.error(
            "Registration update error:",
            error
        );


        registrationMessage.textContent =
            "❌ حدث خطأ أثناء التعديل";

        registrationMessage.style.color =
            "red";

    }

}


// ================================
// حذف بيانات التسجيل
// ================================

async function deleteRegistrationData() {

    const confirmed =
        confirm(
            "هل أنتِ متأكدة من حذف قسم التسجيل؟"
        );


    if (!confirmed)
        return;


    try {

        await deleteDoc(
            doc(
                db,
                "sitecontent",
                "registration"
            )
        );


        registrationMessage.textContent =
            "✅ تم حذف بيانات التسجيل";

        registrationMessage.style.color =
            "green";


        await loadRegistration();


    } catch (error) {

        console.error(
            "Registration delete error:",
            error
        );


        registrationMessage.textContent =
            "❌ حدث خطأ أثناء الحذف";

        registrationMessage.style.color =
            "red";

    }

}


// ================================
// أزرار التعديل والحذف داخل البطاقة
// ================================

if (registrationList) {

    registrationList.addEventListener(
        "click",
        async (event) => {


            // ================================
            // زر التعديل
            // ================================

            const editButton =
                event.target.closest(
                    ".edit-registration"
                );


            if (editButton) {

                await editRegistrationData();

                return;

            }


            // ================================
            // زر الحذف
            // ================================

            const deleteButton =
                event.target.closest(
                    ".delete-registration"
                );


            if (deleteButton) {

                await deleteRegistrationData();

                return;

            }

        }
    );

}


// ================================
// تحميل التسجيل عند فتح لوحة التحكم
// ================================

loadRegistration();