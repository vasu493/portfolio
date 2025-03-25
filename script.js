document.addEventListener("DOMContentLoaded", loadMedicines);

function addMedicine() {
    let name = document.getElementById("medicineName").value;
    let dosage = document.getElementById("dosage").value;
    let time = document.getElementById("time").value;
    if (!name || !dosage || !time) return alert("Please fill all fields");
    
    let medicine = { name, dosage, time };
    let medicines = JSON.parse(localStorage.getItem("medicines")) || [];
    medicines.push(medicine);
    localStorage.setItem("medicines", JSON.stringify(medicines));
    
    loadMedicines();
    setNotification(time, name);
}

function loadMedicines() {
    let medicines = JSON.parse(localStorage.getItem("medicines")) || [];
    let list = document.getElementById("medicineList");
    list.innerHTML = "";
    
    medicines.forEach((med, index) => {
        let li = document.createElement("li");
        li.innerHTML = `${med.name} - ${med.dosage} - ${med.time} <button onclick="deleteMedicine(${index})">Delete</button>`;
        list.appendChild(li);
    });
}

function deleteMedicine(index) {
    let medicines = JSON.parse(localStorage.getItem("medicines"));
    medicines.splice(index, 1);
    localStorage.setItem("medicines", JSON.stringify(medicines));
    loadMedicines();
}

function setNotification(time, medicine) {
    let now = new Date();
    let notifyTime = new Date();
    let [hours, minutes] = time.split(":");
    notifyTime.setHours(hours, minutes, 0, 0);
    let delay = notifyTime - now;
    if (delay < 0) delay += 86400000;
    
    setTimeout(() => alert(`Time to take ${medicine}!`), delay);
}

function askDoctor() {
    let question = document.getElementById("question").value.toLowerCase();
    let chat = document.getElementById("chat");
    let responses = {
        "headache": "You can take Paracetamol (500mg) and rest in a quiet place.",
        "fever": "Drink plenty of fluids, take Ibuprofen (200mg) every 6 hours, and rest.",
        "cough": "Take a cough syrup like Benadryl and drink warm water with honey.",
        "cold": "Stay warm, drink herbal tea, and take Vitamin C supplements.",
        "stomach pain": "Avoid spicy food, drink warm water, and take antacids like Gelusil.",
        "diarrhea": "Drink ORS solution, avoid solid food for a while, and take Loperamide if severe.",
        "constipation": "Increase fiber intake, drink plenty of water, and take mild laxatives if needed.",
        "acidity": "Take an antacid like Rantac 150 and avoid oily foods.",
        "back pain": "Apply a hot or cold compress, take Ibuprofen (400mg), and do light stretching."
    };
    let reply = responses[question] || "I'm sorry, I don't have information on that. Please consult a doctor.";
    chat.innerHTML += `<p><strong>You:</strong> ${question}</p>`;
    chat.innerHTML += `<p><strong>AI Doctor:</strong> ${reply}</p>`;
}
