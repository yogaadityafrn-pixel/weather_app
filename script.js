const apiKey = "f5a801ae97ca356070c868fb531892d4"; 
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&lang=id&q=";

// SELEKTOR DOM
const searchInput = document.getElementById("cityInput");
const weatherResult = document.getElementById("weatherResult");
const errorMessage = document.getElementById("errorMessage");
const container = document.querySelector(".container");
const panelKanan = document.getElementById("bgImage");


const hiasanImages = [
    // 1. Musim Salju (Winter) - Nuansa Putih & Dingin
    "https://images.unsplash.com/photo-1491002052546-bf38f186af56?q=80&w=2008&auto=format&fit=crop",
    
   // 2. Musim Gugur (Autumn) - GANTI BARU (Hutan Oranye Cerah)
    "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?q=80&w=2074&auto=format&fit=crop",
    
    // 3. Musim Panas (Summer) - Nuansa Cerah & Langit Biru
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2073&auto=format&fit=crop"
];

let currentIndex = 0; 

// --- FUNGSI CARI CUACA ---
async function getWeather() {
    const city = searchInput.value;
    if(city === "") return;

    try {
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
        
        if (response.status == 404) {
            errorMessage.style.display = "block";
            weatherResult.style.display = "none";
        } else {
            const data = await response.json();

            // Render Teks
            document.querySelector(".city").innerHTML = "Kota " + data.name;
            document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c";
            document.querySelector(".description").innerHTML = data.weather[0].description;
            document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
            document.querySelector(".wind").innerHTML = data.wind.speed + " km/j";
            
            // Tampilkan Hasil & Ubah Mode Layout
            weatherResult.style.display = "block";
            errorMessage.style.display = "none";
            container.classList.add("result-mode");
        }
    } catch (error) {
        console.error("Error:", error);
    }
}

// --- FUNGSI GANTI GAMBAR OTOMATIS ---
function putarSlideshow() {
    
    panelKanan.style.backgroundImage = `url('${hiasanImages[currentIndex]}')`;
    
    
    currentIndex++;
    
   
    if (currentIndex >= hiasanImages.length) {
        currentIndex = 0;
    }
}

// Event Listener Enter
searchInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") getWeather();
});


putarSlideshow();

setInterval(putarSlideshow, 2000);